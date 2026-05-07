import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, Platform } from 'react-native';
import { ChevronLeft, Phone, Video, Search, UserPlus, Image as ImageIcon, Star, Settings, Bell, Clock, Ban } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function GroupInfoScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#0D0F14]" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between z-10 w-full mb-6">
        <TouchableOpacity onPress={() => router.back()} className="p-1 -ml-1 flex-row items-center">
          <ChevronLeft size={28} color="#fff" />
          <Text className="text-white font-semibold text-lg ml-2">Group Info</Text>
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
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=200&h=200&fit=crop' }} className="w-full h-full" />
               </View>
            </View>
            <Text className="text-white text-2xl font-bold mb-1">Trip to Switzerland</Text>
            <Text className="text-[#8e8e93] text-sm">6 members, 3 online</Text>
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
            <TouchableOpacity className="items-center">
               <View className="w-12 h-12 rounded-full bg-white/5 items-center justify-center mb-2">
                  <UserPlus size={22} color="#fff" />
               </View>
               <Text className="text-[#8e8e93] text-xs font-medium">Add</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center" onPress={() => router.push(`/chat/search/${id}`)}>
               <View className="w-12 h-12 rounded-full bg-white/5 items-center justify-center mb-2">
                  <Search size={22} color="#fff" />
               </View>
               <Text className="text-[#8e8e93] text-xs font-medium">Search</Text>
            </TouchableOpacity>
         </View>

         {/* Options List */}
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

            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-white/5">
               <View className="flex-row items-center gap-4">
                  <View className="w-8 h-8 rounded-lg bg-[#D900FF]/20 items-center justify-center">
                     <ImageIcon size={18} color="#D900FF" />
                  </View>
                  <Text className="text-white font-semibold text-base">Media, Links & Files</Text>
               </View>
               <View className="flex-row items-center gap-2">
                  <Text className="text-[#8e8e93] text-sm">189</Text>
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
                  <Text className="text-[#8e8e93] text-sm">8</Text>
                  <ChevronLeft size={16} color="#8e8e93" className="rotate-180" />
               </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-white/5">
               <View className="flex-row items-center gap-4">
                  <View className="w-8 h-8 rounded-lg bg-[#00FF66]/20 items-center justify-center">
                     <Settings size={18} color="#00FF66" />
                  </View>
                  <Text className="text-white font-semibold text-base">Chat Wallpaper</Text>
               </View>
               <ChevronLeft size={16} color="#8e8e93" className="rotate-180" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
               <View className="flex-row items-center gap-4">
                  <View className="w-8 h-8 rounded-lg bg-[#00E5FF]/20 items-center justify-center">
                     <Clock size={18} color="#00E5FF" />
                  </View>
                  <Text className="text-white font-semibold text-base">Disappearing Messages</Text>
               </View>
               <View className="flex-row items-center gap-2">
                  <Text className="text-[#8e8e93] text-sm">Off</Text>
                  <ChevronLeft size={16} color="#8e8e93" className="rotate-180" />
               </View>
            </TouchableOpacity>
         </View>

         {/* Members List */}
         <View className="flex-row justify-between items-center mb-4 px-2 mt-4">
            <Text className="text-white font-bold text-base">Members</Text>
            <TouchableOpacity><Text className="text-[#D900FF] font-bold text-xs">View All</Text></TouchableOpacity>
         </View>
         
         <View className="bg-[#1c1c1e] rounded-3xl overflow-hidden mb-8">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-white/5">
               <View className="flex-row items-center gap-4">
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }} className="w-10 h-10 rounded-full" />
                  <View>
                     <Text className="text-white font-semibold text-base">Mike</Text>
                     <Text className="text-[#8e8e93] text-xs">Online</Text>
                  </View>
               </View>
               <View className="bg-[#D900FF]/20 px-2 py-1 rounded">
                  <Text className="text-[#D900FF] text-[10px] font-bold">Admin</Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-white/5">
               <View className="flex-row items-center gap-4">
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop' }} className="w-10 h-10 rounded-full" />
                  <View>
                     <Text className="text-white font-semibold text-base">Olivia</Text>
                     <Text className="text-[#8e8e93] text-xs">Offline</Text>
                  </View>
               </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between p-4">
               <View className="flex-row items-center gap-4">
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' }} className="w-10 h-10 rounded-full" />
                  <View>
                     <Text className="text-white font-semibold text-base">James Lee</Text>
                     <Text className="text-[#8e8e93] text-xs">Online</Text>
                  </View>
               </View>
            </TouchableOpacity>
         </View>

      </ScrollView>

    </SafeAreaView>
  );
}
