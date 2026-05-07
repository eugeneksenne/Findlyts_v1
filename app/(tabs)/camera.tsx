import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView, Modal, Pressable, Button, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { X, Zap, RefreshCcw, Sparkles, Type, Music, MapPin, CheckCircle2, Flame, ChevronUp, Users, EyeOff } from 'lucide-react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function CameraScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<'PHOTO' | 'VIDEO' | 'LIVE'>('PHOTO');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [showLocationSheet, setShowLocationSheet] = useState(false);
  const [locationPrivacy, setLocationPrivacy] = useState<'PUBLIC' | 'FOLLOWERS' | 'OFF'>('PUBLIC');
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 bg-[#0D0F14] justify-center items-center px-6">
        <Text className="text-white text-center text-lg mb-6">We need your permission to show the camera</Text>
        <TouchableOpacity 
          className="bg-[#D900FF] px-6 py-3 rounded-full"
          onPress={requestPermission}
        >
          <Text className="font-bold text-black text-lg">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View className="flex-1 bg-[#0D0F14]">
      {/* Real Camera View */}
      <CameraView style={{ flex: 1 }} facing={facing}>
        <View className="flex-1" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
          {/* Dark gradient overlay for top and bottom readability - optional, maybe remove to see clearly */}
          
          {/* Top Header */}
          {!isBroadcasting ? (
            <View className="pt-4 px-4 flex-row justify-between items-start z-10">
              <TouchableOpacity onPress={() => router.push('/(tabs)/discover')} className="w-10 h-10 items-center justify-center">
                <X size={28} color="#fff" />
              </TouchableOpacity>
              
              {/* Center Pill */}
              <View className="items-center">
                <View className="flex-row items-center bg-[#0D0F14]/50 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10">
                  <Text className="text-white font-bold mr-1">Taboo Club</Text>
                  <CheckCircle2 size={14} color="#D900FF" className="text-[#D900FF]" />
                </View>
                <View className="flex-row items-center mt-2">
                  <Text className="text-red-500 text-xs font-semibold mr-1">127 people are live now</Text>
                  <Flame size={12} color="#ef4444" />
                </View>
              </View>

              <View className="flex-row gap-2">
                <TouchableOpacity className="w-10 h-10 items-center justify-center">
                  <Zap size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 items-center justify-center" onPress={toggleCameraFacing}>
                  <RefreshCcw size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View className="pt-4 px-4 flex-row justify-between items-start z-10">
              <View className="bg-red-500/20 px-3 py-1.5 rounded-full border border-red-500 flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                <Text className="text-white font-bold text-xs">LIVE 00:00:15</Text>
              </View>
              <View className="bg-[#0D0F14]/50 backdrop-blur-md px-3 py-1.5 rounded-full flex-row items-center gap-1">
                <Users size={14} color="#fff" />
                <Text className="text-white font-bold text-xs">3.2K</Text>
              </View>
            </View>
          )}
      
      {/* Right Toolbar */}
      {!isBroadcasting && (
        <View className="absolute right-4 top-[20%] items-center gap-6 z-10">
          <TouchableOpacity className="items-center gap-1">
            <Sparkles size={24} color="#fff" />
            <Text className="text-white text-[10px] font-medium mt-1">Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center gap-1">
            <Type size={24} color="#fff" />
            <Text className="text-white text-[10px] font-medium mt-1">Text</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center gap-1">
            <Music size={24} color="#fff" />
            <Text className="text-white text-[10px] font-medium mt-1">Music</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="items-center gap-1 relative" 
            onPress={() => setShowLocationSheet(true)}
          >
            <MapPin size={24} color="#fff" />
            <Text className="text-white text-[10px] font-medium mt-1">Location</Text>
            <View className="absolute bottom-4 right-0 w-2 h-2 rounded-full bg-[#FF0080]" />
          </TouchableOpacity>
        </View>
      )}
      
      <View className="flex-1" />

      {/* Capture Area */}
      <View className="pb-8 pt-4 items-center w-full z-10">
        {mode !== 'LIVE' && (
          <View className="bg-[#0D0F14]/50 backdrop-blur-md px-3 py-1 rounded-full mb-6">
            <Text className="text-white text-xs font-medium">1x</Text>
          </View>
        )}

        {mode === 'LIVE' && (
          <View className="items-center mb-6 opacity-80">
            <ChevronUp size={24} color="#fff" />
            <Text className="text-white text-xs font-medium mt-1">Swipe up to start live</Text>
          </View>
        )}

        {isBroadcasting ? (
          <View className="w-full px-4">
            {/* Live Comments Overlay */}
            <View className="h-40 justify-end mb-4 fade-in z-20">
              <View className="flex-row items-center mb-2">
                <Text className="text-white/60 font-bold mr-2 text-sm">Sarah:</Text>
                <Text className="text-white text-sm">Vibe is crazy! 🔥</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <Text className="text-white/60 font-bold mr-2 text-sm">Mike:</Text>
                <Text className="text-white text-sm">Where is this???</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <Text className="text-[#D900FF] font-bold mr-2 text-sm">Taboo VIP:</Text>
                <Text className="text-white text-sm">Come through 🍾</Text>
              </View>
            </View>
            
            <View className="flex-row items-center justify-between w-full mb-8">
              <TouchableOpacity className="w-12 h-12 rounded-full bg-[#0D0F14]/40 backdrop-blur-md items-center justify-center">
                <RefreshCcw size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="bg-red-500 rounded-full px-8 py-4 shadow-lg shadow-red-500/50"
                onPress={() => setIsBroadcasting(false)}
              >
                <Text className="text-white font-bold text-lg">End Broadcast</Text>
              </TouchableOpacity>
              
              <View className="w-12" />
            </View>
          </View>
        ) : (
          <>
            <View className="flex-row items-center justify-between w-full px-10 mb-8">
              <TouchableOpacity className="w-10 h-10 rounded-lg overflow-hidden border border-white/20">
                <Image source={{ uri: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop' }} className="w-full h-full" />
              </TouchableOpacity>

              <TouchableOpacity 
                className={`w-20 h-20 rounded-full border-[4px] p-1 justify-center items-center ${mode === 'LIVE' ? 'border-[#FF0080]/50' : 'border-white'}`}
                onPress={() => mode === 'LIVE' && setIsBroadcasting(true)}
              >
                <View className={`w-full h-full rounded-full ${mode === 'LIVE' ? 'bg-[#FF0080]' : 'bg-white'}`} />
              </TouchableOpacity>


              <View className="w-10 h-10" />
            </View>

            <View className="flex-row items-center justify-center gap-8 mb-4">
              {['PHOTO', 'VIDEO', 'LIVE'].map((m) => (
                <TouchableOpacity key={m} onPress={() => setMode(m as any)}>
                  <Text className={`font-bold tracking-wider ${mode === m ? 'text-white' : 'text-white/50'}`}>
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="flex-row items-center gap-1.5 opacity-60">
              <Text className="text-white text-[10px]">• Tap for photo</Text>
              <Text className="text-white text-[10px]">• Hold for video</Text>
              <Text className="text-white text-[10px]">• Swipe right to go live</Text>
            </View>
          </>
        )}
      </View>

      {/* Location Sharing Bottom Sheet Mock */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLocationSheet}
        onRequestClose={() => setShowLocationSheet(false)}
      >
        <Pressable 
          className="flex-1 bg-[#0D0F14]/60 justify-end" 
          onPress={() => setShowLocationSheet(false)}
        >
          <Pressable className="bg-[#1c1c1e] rounded-t-3xl p-6" onPress={(e) => e.stopPropagation()}>
            <View className="w-12 h-1.5 bg-white/20 rounded-full self-center mb-6" />
            
            <Text className="text-white text-xl font-bold mb-2">Location Sharing</Text>
            <Text className="text-white/60 text-sm mb-6">Choose who can see where this moment is from.</Text>

            <TouchableOpacity 
              className={`flex-row items-center px-4 py-3 rounded-2xl mb-3 ${locationPrivacy === 'PUBLIC' ? 'bg-white/10 border border-white/20' : ''}`}
              onPress={() => setLocationPrivacy('PUBLIC')}
            >
              <View className="w-10 h-10 rounded-full bg-[#D900FF]/20 items-center justify-center mr-4">
                <MapPin size={20} color="#D900FF" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-base mb-0.5">On (Public)</Text>
                <Text className="text-white/50 text-xs">Everyone can see the club name</Text>
              </View>
              {locationPrivacy === 'PUBLIC' && <CheckCircle2 size={20} color="#D900FF" />}
            </TouchableOpacity>

            <TouchableOpacity 
              className={`flex-row items-center px-4 py-3 rounded-2xl mb-3 ${locationPrivacy === 'FOLLOWERS' ? 'bg-white/10 border border-white/20' : ''}`}
              onPress={() => setLocationPrivacy('FOLLOWERS')}
            >
              <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mr-4">
                <Users size={20} color="#fff" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-base mb-0.5">Followers only</Text>
                <Text className="text-white/50 text-xs">Only your followers can see</Text>
              </View>
              {locationPrivacy === 'FOLLOWERS' && <CheckCircle2 size={20} color="#fff" />}
            </TouchableOpacity>

            <TouchableOpacity 
              className={`flex-row items-center px-4 py-3 rounded-2xl mb-6 ${locationPrivacy === 'OFF' ? 'bg-white/10 border border-white/20' : ''}`}
              onPress={() => setLocationPrivacy('OFF')}
            >
              <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mr-4">
                <EyeOff size={20} color="#fff" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-base mb-0.5">Off (Hidden)</Text>
                <Text className="text-white/50 text-xs">Hide location from everyone</Text>
              </View>
              {locationPrivacy === 'OFF' && <CheckCircle2 size={20} color="#fff" />}
            </TouchableOpacity>

            <View className="bg-white/5 p-4 rounded-xl flex-row items-center justify-center">
              <Text className="text-white/70 text-sm font-medium">You are checked in at this venue</Text>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

        </View>
      </CameraView>
    </View>
  );
}

