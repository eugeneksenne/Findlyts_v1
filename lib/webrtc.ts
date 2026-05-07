import { Platform } from 'react-native';

let webrtc: any = {};

if (Platform.OS !== 'web') {
  webrtc = require('react-native-webrtc');
} else if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
  webrtc = {
    RTCPeerConnection: window.RTCPeerConnection,
    RTCSessionDescription: window.RTCSessionDescription,
    RTCIceCandidate: window.RTCIceCandidate,
    mediaDevices: navigator.mediaDevices,
    MediaStream: window.MediaStream,
  };
}

export const {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  mediaDevices,
  MediaStream,
} = webrtc;
