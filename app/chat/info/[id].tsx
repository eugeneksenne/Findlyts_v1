import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, Platform, Modal, Pressable } from 'react-native';
import { ChevronLeft, Phone, Video, Search, MicOff, ImageIcon, Star, Settings, Bell, Clock, Ban } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ChatInfoScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [showDisappearing, setShowDisappearing] = useState(false);
  const [disappearSetting, setDisappearSetting] = useState('Off');
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#0D0F14]" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between z-10 w-full mb-6">
        <TouchableOpacity onPress={() => router.back()} className="p-1 -ml-1 flex-row items-center">
          <ChevronLeft size={28} color="#fff" />
          <Text className="text-white font-semibold text-lg ml-2">Chat Info</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-1">
          <Text className="text-[#D900FF] font-semibold text-base">Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
         {/* Profile */}
         <View className="items-center mb-8">
            <View className="relative mb-4">
               <View className="w-28 h-28 rounded-full border-2 border-[#D900FF] overflow-hidden">
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop' }} className="w-full h-full" />
               </View>
            </View>
            <Text className="text-white text-2xl font-bold mb-1">Sarah King</Text>
            <Text className="text-[#8e8e93] text-sm mb-1">@sarahking</Text>
            <View className="flex-row items-center gap-1.5">
               <View className="w-2 h-2 rounded-full bg-[#00FF66]" />
               <Text className="text-[#00FF66] text-xs font-semibold">Online</Text>
            </View>
         </View>

         {/* Action Buttons */}
         <View className="flex-row justify-between mb-8 px-6">
            <TouchableOpacity className="items-center">
               <View className="w-12 h-12 rounded-full bg-white/5 items-center justify-center mb-2">
                  <Phone size={22} color="#fff" />
               </View>
               <Text className="text-[#8e8e93] text-xs font-medium">Audio</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
               <View className="w-12 h-12 rounded-full bg-white/5 items-center justify-center mb-2">
                  <Video size={24} color="#fff" />
               </View>
               <Text className="text-[#8e8e93] text-xs font-medium">Video</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center" onPress={() => router.push(`/chat/search/${id}`)}>
               <View className="w-12 h-12 rounded-full bg-white/5 items-center justify-center mb-2">
                  <Search size={22} color="#fff" />
               </View>
               <Text className="text-[#8e8e93] text-xs font-medium">Search</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
               <View className="w-12 h-12 rounded-full bg-white/5 items-center justify-center mb-2">
                  <MicOff size={22} color="#fff" />
               </View>
               <Text className="text-[#8e8e93] text-xs font-medium">Mute</Text>
            </TouchableOpacity>
         </View>

         {/* Options List */}
         <View className="bg-[#1c1c1e] rounded-3xl overflow-hidden mb-6">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-white/5">
               <View className="flex-row items-center gap-4">
                  <View className="w-8 h-8 rounded-lg bg-[#D900FF]/20 items-center justify-center">
                     <ImageIcon size={18} color="#D900FF" />
                  </View>
                  <Text className="text-white font-semibold text-base">Media, Links & Files</Text>
               </View>
               <View className="flex-row items-center gap-2">
                  <Text className="text-[#8e8e93] text-sm">342</Text>
                  <ChevronLeft size={16} color="#8e8e93" className="rotate-180" />
               </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push(`/chat/pinned/${id}`)} className="flex-row items-center justify-between p-4 border-b border-white/5">
               <View className="flex-row items-center gap-4">
                  <View className="w-8 h-8 rounded-lg bg-[#FFD700]/20 items-center justify-center">
                     <Star size={18} color="#FFD700" />
                  </View>
                  <Text className="text-white font-semibold text-base">Starred Messages</Text>
               </View>
               <View className="flex-row items-center gap-2">
                  <Text className="text-[#8e8e93] text-sm">12</Text>
                  <ChevronLeft size={16} color="#8e8e93" className="rotate-180" />
               </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
               <View className="flex-row items-center gap-4">
                  <View className="w-8 h-8 rounded-lg bg-[#00FF66]/20 items-center justify-center">
                     <Settings size={18} color="#00FF66" />
                  </View>
                  <Text className="text-white font-semibold text-base">Chat Wallpaper</Text>
               </View>
               <ChevronLeft size={16} color="#8e8e93" className="rotate-180" />
            </TouchableOpacity>
         </View>

         <View className="bg-[#1c1c1e] rounded-3xl overflow-hidden mb-6">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-white/5">
               <View className="flex-row items-center gap-4">
                  <View className="w-8 h-8 rounded-lg bg-[#FF0080]/20 items-center justify-center">
                     <Bell size={18} color="#FF0080" />
                  </View>
                  <Text className="text-white font-semibold text-base">Notifications</Text>
               </View>
               <View className="flex-row items-center gap-2">
                  <Text className="text-[#8e8e93] text-sm">On</Text>
                  <ChevronLeft size={16} color="#8e8e93" className="rotate-180" />
               </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowDisappearing(true)} className="flex-row items-center justify-between p-4">
               <View className="flex-row items-center gap-4">
                  <View className="w-8 h-8 rounded-lg bg-[#00E5FF]/20 items-center justify-center">
                     <Clock size={18} color="#00E5FF" />
                  </View>
                  <Text className="text-white font-semibold text-base">Disappearing Messages</Text>
               </View>
               <View className="flex-row items-center gap-2">
                  <Text className="text-[#8e8e93] text-sm">{disappearSetting}</Text>
                  <ChevronLeft size={16} color="#8e8e93" className="rotate-180" />
               </View>
            </TouchableOpacity>
         </View>

         <View className="bg-[#1c1c1e] rounded-3xl overflow-hidden mb-8">
            <TouchableOpacity className="flex-row items-center gap-4 p-4">
               <View className="w-8 h-8 rounded-lg bg-red-500/20 items-center justify-center">
                  <Ban size={18} color="#ef4444" />
               </View>
               <Text className="text-red-500 font-semibold text-base">Block Contact</Text>
            </TouchableOpacity>
         </View>

      </ScrollView>

      {/* Disappearing Messages Modal */}
      <Modal transparent visible={showDisappearing} animationType="slide" onRequestClose={() => setShowDisappearing(false)}>
        <View className="flex-1 bg-[#0D0F14]">
           <View className="px-4 py-3 flex-row items-center justify-between z-10 w-full mb-6 mt-10">
              <TouchableOpacity onPress={() => setShowDisappearing(false)} className="p-1 -ml-1 flex-row items-center">
                 <ChevronLeft size={28} color="#fff" />
                 <Text className="text-white font-semibold text-lg ml-2">Disappearing Messages</Text>
              </TouchableOpacity>
           </View>

           <View className="items-center px-8 mb-10 mt-4">
              <View className="w-20 h-20 rounded-full border-[3px] border-[#D900FF] border-dashed items-center justify-center mb-6">
                 <Clock size={40} color="#D900FF" />
              </View>
              <Text className="text-white text-2xl font-bold mb-3 text-center">Disappearing Messages</Text>
              <Text className="text-[#8e8e93] text-sm text-center leading-5">
                 Messages in this chat will disappear for everyone after the selected time.
              </Text>
           </View>

           <View className="bg-[#1c1c1e] rounded-3xl mx-4 overflow-hidden mb-6 border border-white/5">
              {['Off', '24 Hours', '7 Days', '30 Days', 'Custom'].map((item, idx, arr) => (
                 <TouchableOpacity 
                    key={item} 
                    onPress={() => setDisappearSetting(item)}
                    className={`flex-row justify-between items-center p-5 ${idx !== arr.length - 1 ? 'border-b border-white/5' : ''}`}
                 >
                    <Text className="text-white text-base font-medium">{item}</Text>
                    <View className={`w-6 h-6 rounded-full border ${disappearSetting === item ? 'bg-[#D900FF] border-[#D900FF]' : 'border-white/20'} items-center justify-center`}>
                       {disappearSetting === item && <View className="w-2.5 h-2.5 bg-white rounded-full" />}
                    </View>
                 </TouchableOpacity>
              ))}
           </View>

           <View className="absolute bottom-10 left-4 right-4">
              <TouchableOpacity onPress={() => setShowDisappearing(false)} className="bg-[#D900FF] py-4 rounded-full items-center shadow-lg shadow-[#D900FF]/50">
                 <Text className="text-white font-bold text-lg">Done</Text>
              </TouchableOpacity>
           </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
