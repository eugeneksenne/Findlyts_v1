import React, { useEffect, useRef } from 'react';
import { View, Platform, StyleSheet } from 'react-native';

let RTCView: any = null;
if (Platform.OS !== 'web') {
  RTCView = require('react-native-webrtc').RTCView;
}

interface VideoViewProps {
  stream: any;
  style?: any;
  isLocal?: boolean;
}

export function VideoView({ stream, style, isLocal }: VideoViewProps) {
  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS === 'web' && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return <View style={[style, styles.container, { backgroundColor: '#151922' }]} />;
  }

  if (Platform.OS === 'web') {
    return (
      <View style={[style, styles.container]}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </View>
    );
  }

  if (RTCView) {
    return (
      <RTCView
        streamURL={stream.toURL()}
        style={[style, styles.container]}
        objectFit="cover"
        mirror={isLocal}
      />
    );
  }

  return <View style={[style, styles.container, { backgroundColor: '#151922' }]} />;
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
