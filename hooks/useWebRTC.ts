import { useState, useEffect, useRef } from 'react';
import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, mediaDevices } from '../lib/webrtc';
import { supabase } from '../lib/supabase';

// Define constraints for video calls
const mediaConstraints = {
  audio: true,
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: 'user'
  },
};

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
  ],
};

export function useWebRTCCall(callId: string, role: 'caller' | 'receiver') {
  const [localStream, setLocalStream] = useState<any>(null);
  const [remoteStream, setRemoteStream] = useState<any>(null);
  const [callState, setCallState] = useState<'incoming' | 'outgoing' | 'active' | 'ended'>(role === 'caller' ? 'outgoing' : 'incoming');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const pc = useRef<any>(null);
  const channel = useRef<any>(null);

  useEffect(() => {
    // 1. Initialize Peer Connection
    if (typeof RTCPeerConnection !== 'undefined' && RTCPeerConnection) {
      pc.current = new RTCPeerConnection(ICE_SERVERS);

      // 2. Setup RTCPeerConnection listeners
      pc.current.onicecandidate = (event: any) => {
        if (event.candidate && channel.current) {
          channel.current.send({
            type: 'broadcast',
            event: 'ice-candidate',
            payload: { candidate: event.candidate, from: role },
          });
        }
      };

      pc.current.ontrack = (event: any) => {
        if (event.streams && event.streams[0]) {
          setRemoteStream(event.streams[0]);
        }
      };

      pc.current.onconnectionstatechange = () => {
        if (pc.current?.connectionState === 'disconnected' || pc.current?.connectionState === 'failed') {
          setCallState('ended');
        }
      };
    }

    // 3. Setup Supabase Realtime Channel
    const isMock = process.env.EXPO_PUBLIC_SUPABASE_URL === undefined || process.env.EXPO_PUBLIC_SUPABASE_URL === 'your-supabase-url' || process.env.EXPO_PUBLIC_SUPABASE_URL === '';

    if (!isMock) {
      channel.current = supabase.channel(`call_${callId}`);

      channel.current
        .on('broadcast', { event: 'offer' }, async ({ payload }: any) => {
          if (role === 'receiver' && pc.current && typeof RTCSessionDescription !== 'undefined' && RTCSessionDescription) {
            await pc.current.setRemoteDescription(new RTCSessionDescription(payload.offer));
          }
        })
        .on('broadcast', { event: 'answer' }, async ({ payload }: any) => {
          if (role === 'caller' && pc.current && typeof RTCSessionDescription !== 'undefined' && RTCSessionDescription) {
            await pc.current.setRemoteDescription(new RTCSessionDescription(payload.answer));
          }
        })
        .on('broadcast', { event: 'ice-candidate' }, async ({ payload }: any) => {
          if (payload.from !== role && pc.current && typeof RTCIceCandidate !== 'undefined' && RTCIceCandidate) {
            try {
              await pc.current.addIceCandidate(new RTCIceCandidate(payload.candidate));
            } catch (e) {
              console.error('Error adding ICE candidate', e);
            }
          }
        })
        .on('broadcast', { event: 'end-call' }, () => {
          setCallState('ended');
          endCallLocally();
        })
        .subscribe(async (status: string) => {
          if (status === 'SUBSCRIBED') {
            // Channel is ready, get local media
            try {
              if (typeof mediaDevices !== 'undefined' && mediaDevices && mediaDevices.getUserMedia) {
                const stream = await mediaDevices.getUserMedia(mediaConstraints);
                setLocalStream(stream);
                stream.getTracks().forEach((track: any) => {
                  pc.current?.addTrack(track, stream);
                });

                // If caller, send offer immediately after getting media
                if (role === 'caller') {
                  startCall();
                }
              } else {
                console.warn('getUserMedia not supported in this environment');
                if (role === 'caller') {
                  setTimeout(() => {
                    startCall();
                  }, 1000);
                }
              }
            } catch (err) {
              console.warn('Error accessing media devices.', err);
              // Even if media fails, still allow the signaling to connect for dummy simulation if needed
              if (role === 'caller') {
                 startCall();
              }
            }
          }
        });
    } else {
        // Mock fallback for preview without API keys
        console.warn('Supabase not configured, using mock mode for preview.');
        setTimeout(() => {
            if (role === 'caller') {
              setCallState('active'); // auto accept for preview
            } else {
              setCallState('active'); // auto accept for preview
            }
        }, 1500);
    }

    return () => {
      endCallLocally();
    };
  }, [callId, role]);

  const startCall = async () => {
    if (!pc.current || !channel.current) return;
    try {
      const offer = await pc.current.createOffer();
      await pc.current.setLocalDescription(offer);
      channel.current.send({
        type: 'broadcast',
        event: 'offer',
        payload: { offer },
      });
    } catch (e) {
      console.error('Error creating offer', e);
    }
  };

  const answerCall = async () => {
    if (!pc.current) return;
    try {
      if (pc.current.signalingState !== 'have-remote-offer' && pc.current.signalingState !== 'have-local-pranswer') {
        console.warn('Cannot answer call without a remote offer. State:', pc.current.signalingState);
        setCallState('active'); // Proceed with UI anyway (for mock/preview modes)
        return;
      }
      const answer = await pc.current.createAnswer();
      await pc.current.setLocalDescription(answer);
      if (channel.current) {
        channel.current.send({
          type: 'broadcast',
          event: 'answer',
          payload: { answer },
        });
      }
      setCallState('active');
    } catch (e) {
      console.error('Error creating answer', e);
      setCallState('active'); // Proceed with UI even on error
    }
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track: any) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleSpeaker = () => {
    setIsSpeaker(!isSpeaker);
    // In React Native WebRTC, speaker switching usually requires react-native-incall-manager
    // For now, it's just a state toggle representing UI.
  };

  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track: any) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  const endCallLocally = () => {
    if (localStream) {
      localStream.getTracks().forEach((track: any) => track.stop());
    }
    if (pc.current) {
      pc.current.close();
    }
    if (channel.current) {
      supabase.removeChannel(channel.current);
    }
  };

  const endCall = () => {
    if (channel.current) {
      channel.current.send({
        type: 'broadcast',
        event: 'end-call',
        payload: {},
      });
    }
    setCallState('ended');
    endCallLocally();
  };

  return {
    callState,
    localStream,
    remoteStream,
    isMuted,
    isSpeaker,
    isCameraOff,
    answerCall,
    endCall,
    toggleMute,
    toggleSpeaker,
    toggleCamera,
  };
}
