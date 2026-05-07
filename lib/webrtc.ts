import { Platform } from 'react-native';

let webrtc: any = {};

if (Platform.OS !== 'web') {
  webrtc = require('react-native-webrtc');
} else {
  // Mock or use window objects for web
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

