import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { X, Zap, RefreshCcw, Sparkles, Type, Music, MapPin, CheckCircle2, ChevronUp, Users, EyeOff } from 'lucide-react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function CameraScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView | null>(null);
  const [mode, setMode] = useState<'PHOTO' | 'VIDEO' | 'LIVE'>('PHOTO');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastSeconds, setBroadcastSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showLocationSheet, setShowLocationSheet] = useState(false);
  const [locationPrivacy, setLocationPrivacy] = useState<'PUBLIC' | 'FOLLOWERS' | 'OFF'>('PUBLIC');
  const [facing, setFacing] = useState<CameraType>('back');
  const [lastCaptureUri, setLastCaptureUri] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!isBroadcasting) return;
    const id = setInterval(() => setBroadcastSeconds((sec) => sec + 1), 1000);
    return () => clearInterval(id);
  }, [isBroadcasting]);

  const liveTimer = useMemo(() => {
    const minutes = String(Math.floor(broadcastSeconds / 60)).padStart(2, '0');
    const seconds = String(broadcastSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [broadcastSeconds]);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-[#0D0F14] justify-center items-center px-6">
        <Text className="text-white text-center text-lg mb-6">We need camera permission to capture photos and video.</Text>
        <TouchableOpacity className="bg-[#D900FF] px-6 py-3 rounded-full" onPress={requestPermission}>
          <Text className="font-bold text-black text-lg">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => setFacing((current) => (current === 'back' ? 'front' : 'back'));

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.8 });
    if (photo?.uri) setLastCaptureUri(photo.uri);
  };

  const startVideoRecording = async () => {
    if (!cameraRef.current || isRecording) return;
    setIsRecording(true);
    try {
      const video = await cameraRef.current.recordAsync({ maxDuration: 60 });
      if (video?.uri) setLastCaptureUri(video.uri);
    } finally {
      setIsRecording(false);
    }
  };

  const stopVideoRecording = () => {
    if (!cameraRef.current || !isRecording) return;
    cameraRef.current.stopRecording();
  };

  return (
    <View className="flex-1 bg-[#0D0F14]">
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} mode={mode === 'PHOTO' ? 'picture' : 'video'}>
        <View className="flex-1" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
          {!isBroadcasting ? (
            <View className="pt-4 px-4 flex-row justify-between items-start z-10">
              <TouchableOpacity onPress={() => router.push('/(tabs)/discover')} className="w-10 h-10 items-center justify-center">
                <X size={28} color="#fff" />
              </TouchableOpacity>
              <View className="items-center">
                <View className="flex-row items-center bg-[#0D0F14]/50 rounded-full px-4 py-1.5 border border-white/10">
                  <Text className="text-white font-bold">Camera</Text>
                </View>
              </View>
              <View className="flex-row gap-2">
                <TouchableOpacity className="w-10 h-10 items-center justify-center"><Zap size={24} color="#fff" /></TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 items-center justify-center" onPress={toggleCameraFacing}><RefreshCcw size={24} color="#fff" /></TouchableOpacity>
              </View>
            </View>
          ) : (
            <View className="pt-4 px-4 flex-row justify-between items-start z-10">
              <View className="bg-red-500/20 px-3 py-1.5 rounded-full border border-red-500 flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                <Text className="text-white font-bold text-xs">LIVE {liveTimer}</Text>
              </View>
              <View className="bg-[#0D0F14]/50 px-3 py-1.5 rounded-full flex-row items-center gap-1">
                <Users size={14} color="#fff" />
                <Text className="text-white font-bold text-xs">Live</Text>
              </View>
            </View>
          )}

          {!isBroadcasting && (
            <View className="absolute right-4 top-[20%] items-center gap-6 z-10">
              <TouchableOpacity className="items-center gap-1"><Sparkles size={24} color="#fff" /><Text className="text-white text-[10px] font-medium mt-1">Filters</Text></TouchableOpacity>
              <TouchableOpacity className="items-center gap-1"><Type size={24} color="#fff" /><Text className="text-white text-[10px] font-medium mt-1">Text</Text></TouchableOpacity>
              <TouchableOpacity className="items-center gap-1"><Music size={24} color="#fff" /><Text className="text-white text-[10px] font-medium mt-1">Music</Text></TouchableOpacity>
              <TouchableOpacity className="items-center gap-1 relative" onPress={() => setShowLocationSheet(true)}><MapPin size={24} color="#fff" /><Text className="text-white text-[10px] font-medium mt-1">Location</Text><View className="absolute bottom-4 right-0 w-2 h-2 rounded-full bg-[#FF0080]" /></TouchableOpacity>
            </View>
          )}

          <View className="flex-1" />

          <View className="pb-8 pt-4 items-center w-full z-10">
            {mode === 'LIVE' && !isBroadcasting && (
              <View className="items-center mb-6 opacity-80"><ChevronUp size={24} color="#fff" /><Text className="text-white text-xs font-medium mt-1">Tap record to start live</Text></View>
            )}

            {isBroadcasting ? (
              <View className="flex-row items-center justify-between w-full mb-8 px-4">
                <TouchableOpacity className="w-12 h-12 rounded-full bg-[#0D0F14]/40 items-center justify-center" onPress={toggleCameraFacing}><RefreshCcw size={24} color="#fff" /></TouchableOpacity>
                <TouchableOpacity className="bg-red-500 rounded-full px-8 py-4" onPress={() => { setIsBroadcasting(false); setBroadcastSeconds(0); }}><Text className="text-white font-bold text-lg">End Broadcast</Text></TouchableOpacity>
                <View className="w-12" />
              </View>
            ) : (
              <>
                <View className="flex-row items-center justify-between w-full px-10 mb-8">
                  <TouchableOpacity className="w-10 h-10 rounded-lg overflow-hidden border border-white/20 bg-black/30 items-center justify-center">
                    {lastCaptureUri ? <Image source={{ uri: lastCaptureUri }} className="w-full h-full" /> : <Text className="text-white text-xs">—</Text>}
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={`w-20 h-20 rounded-full border-[4px] p-1 justify-center items-center ${mode === 'LIVE' ? 'border-[#FF0080]/50' : 'border-white'}`}
                    onPress={() => {
                      if (mode === 'PHOTO') return void takePhoto();
                      if (mode === 'LIVE') { setIsBroadcasting(true); setBroadcastSeconds(0); }
                    }}
                    onLongPress={mode === 'VIDEO' ? startVideoRecording : undefined}
                    onPressOut={mode === 'VIDEO' ? stopVideoRecording : undefined}
                  >
                    <View className={`w-full h-full rounded-full ${mode === 'LIVE' ? 'bg-[#FF0080]' : mode === 'VIDEO' && isRecording ? 'bg-red-500' : 'bg-white'}`} />
                  </TouchableOpacity>

                  <View className="w-10 h-10" />
                </View>

                <View className="flex-row items-center justify-center gap-8 mb-4">
                  {['PHOTO', 'VIDEO', 'LIVE'].map((m) => (<TouchableOpacity key={m} onPress={() => setMode(m as any)}><Text className={`font-bold tracking-wider ${mode === m ? 'text-white' : 'text-white/50'}`}>{m}</Text></TouchableOpacity>))}
                </View>
              </>
            )}
          </View>

          <Modal animationType="slide" transparent visible={showLocationSheet} onRequestClose={() => setShowLocationSheet(false)}>
            <Pressable className="flex-1 bg-[#0D0F14]/60 justify-end" onPress={() => setShowLocationSheet(false)}>
              <Pressable className="bg-[#1c1c1e] rounded-t-3xl p-6" onPress={(e) => e.stopPropagation()}>
                <View className="w-12 h-1.5 bg-white/20 rounded-full self-center mb-6" />
                <Text className="text-white text-xl font-bold mb-2">Location Sharing</Text>
                <Text className="text-white/60 text-sm mb-6">Choose who can see where this moment is from.</Text>
                {(['PUBLIC', 'FOLLOWERS', 'OFF'] as const).map((privacy) => (
                  <TouchableOpacity key={privacy} className={`flex-row items-center px-4 py-3 rounded-2xl mb-3 ${locationPrivacy === privacy ? 'bg-white/10 border border-white/20' : ''}`} onPress={() => setLocationPrivacy(privacy)}>
                    <Text className="text-white font-semibold flex-1">{privacy}</Text>
                    {locationPrivacy === privacy && <CheckCircle2 size={20} color="#D900FF" />}
                  </TouchableOpacity>
                ))}
                <View className="bg-white/5 p-4 rounded-xl flex-row items-center justify-center"><Text className="text-white/70 text-sm font-medium">Location tag visibility has been updated.</Text></View>
              </Pressable>
            </Pressable>
          </Modal>
        </View>
      </CameraView>
    </View>
  );
}
