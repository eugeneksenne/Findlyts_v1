import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, Image, Modal, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PhoneOff, Phone, Video as VideoIcon, MicOff, Volume2, UserPlus, MessageCircle, ChevronUp, ChevronLeft, Wifi, CameraOff, RefreshCcw, Sparkles, MonitorUp, Focus, MessageSquare, LayoutTemplate, SlidersHorizontal, Mic, MoreHorizontal } from 'lucide-react-native';
import { useWebRTCCall } from '../../hooks/useWebRTC';
import { VideoView } from '../../components/VideoView';

export default function CallScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const numericId = parseInt(id as string) || 1;
  const role = numericId === 3 ? 'caller' : 'receiver';
  
  const {
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
  } = useWebRTCCall(id as string, role);

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === 'active') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  useEffect(() => {
    if (callState === 'ended') {
      router.back();
    }
  }, [callState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAccept = () => {
    answerCall();
    setTimer(0);
  };

  const handleEnd = () => {
    endCall();
    router.back();
  };


  // -----------------------------------------
  // INCOMING / OUTGOING VIDEO CALL
  // -----------------------------------------
  if (callState === 'incoming' || callState === 'outgoing') {
    return (
      <View className="flex-1 bg-[#0D0F14]">
        {/* Local Video Background (Blurred) */}
        <View className="absolute inset-0 opacity-50">
           {localStream && !isCameraOff && (
              <VideoView stream={localStream} isLocal style={{ width: '100%', height: '100%' }} />
           )}
        </View>

        {/* Dark atmospheric background */}
        <View className="absolute inset-0 bg-[#D900FF]/5 backdrop-blur-2xl" />
        
        <View className="px-4 py-2 absolute top-14 left-0 z-50">
          <TouchableOpacity onPress={() => router.back()} className="p-2 w-12 rounded-full bg-black/40 backdrop-blur-md">
            <ChevronLeft size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center justify-center relative z-10">
          <View className="items-center mb-12">
            <Text className="text-white text-4xl font-black tracking-tighter mb-2 drop-shadow-md">
              {callState === 'outgoing' ? 'Mike' : '@neo'}
            </Text>
            <Text className="text-[#00FF66] font-bold tracking-widest uppercase text-xs">
              {callState === 'outgoing' ? 'Calling...' : 'Incoming Video Call'}
            </Text>
          </View>

          {/* Large Avatar with Glow Pulse */}
          <View className="relative w-56 h-56 items-center justify-center mb-16">
            <View className="absolute inset-0 bg-[#00FF66] rounded-full opacity-20 transform scale-[1.5]" />
            <View className="absolute inset-0 bg-[#00FF66] border-2 border-[#00FF66] rounded-full opacity-40 transform scale-[1.2]" />
            
            <View className="w-full h-full rounded-full border-[4px] border-[#151922] overflow-hidden shadow-[0_0_40px_rgba(0,255,102,0.3)] bg-[#151922]">
               <Image 
                source={{ uri: callState === 'outgoing' 
                  ? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' 
                  : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' 
                }} 
                className="w-full h-full opacity-90"
               />
            </View>
          </View>
        </View>

        {/* Bottom Actions */}
        <View className="pb-16 px-12 flex-row justify-around items-end">
          {callState === 'outgoing' ? (
             <View className="items-center">
               <TouchableOpacity onPress={handleEnd} className="w-20 h-20 rounded-full bg-[#FF0080]/20 items-center justify-center mb-3 border border-[#FF0080]/50 shadow-[0_0_20px_rgba(255,0,128,0.3)]">
                 <PhoneOff size={32} color="#FF0080" />
               </TouchableOpacity>
               <Text className="text-white/60 text-xs font-bold uppercase tracking-widest">Cancel</Text>
             </View>
          ) : (
            <>
              <View className="items-center">
                <TouchableOpacity onPress={handleEnd} className="w-20 h-20 rounded-full bg-[#FF0080]/20 items-center justify-center mb-3 border border-[#FF0080]/50 shadow-[0_0_20px_rgba(255,0,128,0.3)]">
                  <PhoneOff size={32} color="#FF0080" />
                </TouchableOpacity>
                <Text className="text-white/60 text-xs font-bold uppercase tracking-widest">Decline</Text>
              </View>
              
              <View className="items-center">
                <TouchableOpacity onPress={handleAccept} className="w-20 h-20 rounded-full bg-[#00FF66]/20 items-center justify-center mb-3 border border-[#00FF66]/50 shadow-[0_0_20px_rgba(0,255,102,0.3)]">
                  <Phone size={32} color="#00FF66" fill="#00FF66" />
                </TouchableOpacity>
                <Text className="text-white/60 text-xs font-bold uppercase tracking-widest">Accept</Text>
              </View>
            </>
          )}
        </View>
      </View>
    );
  }

  // -----------------------------------------
  // ACTIVE VIDEO CALL
  // -----------------------------------------
  return (
    <View className="flex-1 bg-[#0D0F14]">
      {/* Remote Video Background */}
      <View className="absolute inset-0">
        <VideoView stream={remoteStream} style={{ width: '100%', height: '100%' }} />
      </View>

      <View className="px-4 py-2 flex-row justify-between items-center relative z-10 pt-14 bg-black/20 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 w-12 rounded-full bg-black/40 backdrop-blur-md">
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-white text-lg font-bold drop-shadow-md">@neo</Text>
          <Text className="text-white/80 text-xs font-mono drop-shadow-md bg-black/40 px-2 py-0.5 rounded-full mt-1">{formatTime(timer)}</Text>
        </View>
        <TouchableOpacity className="w-12 items-center justify-center p-2 z-10 rounded-full bg-black/40 backdrop-blur-md">
          <MoreHorizontal size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-end pb-8">
        {/* Local Video PIP */}
        <View className="absolute top-4 right-4 w-28 h-40 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#151922]">
          {!isCameraOff && localStream ? (
            <VideoView stream={localStream} isLocal style={{ width: '100%', height: '100%' }} />
          ) : (
            <View className="flex-1 items-center justify-center bg-[#151922]">
              <CameraOff size={24} color="#fff" opacity={0.5} />
            </View>
          )}
        </View>

        {/* Floating Controls */}
        <View className="px-6 flex-row justify-between items-end">
          <View className="flex-row items-center gap-4 bg-[#151922]/80 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            
            <TouchableOpacity onPress={toggleMute} className={`w-12 h-12 rounded-full ${isMuted ? 'bg-[#FF0080]/90' : 'bg-white/10'} items-center justify-center`}>
              <MicOff size={22} color={isMuted ? "#fff" : "#fff"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleCamera} className={`w-12 h-12 rounded-full ${isCameraOff ? 'bg-[#FF0080]/90' : 'bg-white/10'} items-center justify-center`}>
              <CameraOff size={22} color={isCameraOff ? "#fff" : "#fff"} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={toggleSpeaker} className={`w-12 h-12 rounded-full ${isSpeaker ? 'bg-white/30' : 'bg-white/10'} items-center justify-center`}>
              <Volume2 size={22} color="#fff" />
            </TouchableOpacity>
            
            <View className="w-px h-8 bg-white/20 mx-1" />

            <TouchableOpacity onPress={handleEnd} className="w-14 h-14 rounded-full bg-[#FF0080] items-center justify-center shadow-[0_0_20px_rgba(255,0,128,0.4)]">
              <PhoneOff size={24} color="#fff" />
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </View>
  );
}
