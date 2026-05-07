import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, MoreHorizontal, Phone, Video, MessageSquare, MoreVertical, ArrowUpRight, ArrowDownLeft, Video as VideoIcon, PhoneOff } from 'lucide-react-native';

export default function CallDetailsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#0D0F14]">
      {/* Header */}
      <View className="px-4 py-3 flex-row justify-between items-center z-10 pt-10">
        <TouchableOpacity onPress={() => router.back()} className="p-2 w-12 rounded-full">
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Sarah King</Text>
        <TouchableOpacity className="p-2 w-12 items-end rounded-full">
           <MoreHorizontal size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 mt-6">
        
        {/* Profile */}
        <View className="items-center mb-10">
          <View className="relative w-36 h-36 items-center justify-center">
            <View className="absolute inset-0 bg-[#D900FF] rounded-full opacity-20 transform scale-110" />
            <View className="absolute inset-0 bg-[#D900FF] rounded-full opacity-40 transform scale-105" />
            <View className="w-full h-full rounded-full border-[3px] border-[#D900FF] overflow-hidden">
               <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' }} 
                className="w-full h-full"
               />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-center gap-6 mb-10">
          <View className="items-center">
            <TouchableOpacity onPress={() => router.push('/call/1')} className="w-14 h-14 rounded-full bg-white/5 border border-white/10 items-center justify-center mb-2">
              <Phone size={24} color="#D900FF" fill="#D900FF" />
            </TouchableOpacity>
            <Text className="text-white text-xs font-medium">Call</Text>
          </View>
          <View className="items-center">
            <TouchableOpacity onPress={() => router.push('/call/2')} className="w-14 h-14 rounded-full bg-white/5 border border-white/10 items-center justify-center mb-2">
              <Video size={24} color="#D900FF" fill="#D900FF" />
            </TouchableOpacity>
            <Text className="text-white text-xs font-medium">Video Call</Text>
          </View>
          <View className="items-center">
            <TouchableOpacity onPress={() => router.push('/chat/1')} className="w-14 h-14 rounded-full bg-white/5 border border-white/10 items-center justify-center mb-2">
              <MessageSquare size={24} color="#00D1FF" fill="#00D1FF" />
            </TouchableOpacity>
            <Text className="text-white text-xs font-medium">Message</Text>
          </View>
          <View className="items-center">
            <TouchableOpacity className="w-14 h-14 rounded-full bg-white/5 border border-white/10 items-center justify-center mb-2">
              <MoreHorizontal size={24} color="#8e8e93" />
            </TouchableOpacity>
            <Text className="text-white text-xs font-medium">More</Text>
          </View>
        </View>

        <Text className="text-[#8e8e93] text-[11px] font-bold uppercase tracking-widest mb-6">Call History</Text>

        {/* Missed Call Notification Card Mock */}
        <View className="mb-8 bg-[#0c0c0e] rounded-[28px] p-5 border border-[#FF0080]/50 shadow-[0_0_20px_rgba(255,0,85,0.25)]">
           <View className="flex-row justify-between mb-3">
              <PhoneOff size={24} color="#FF0080" />
              <Text className="text-white/50 text-xs font-medium mt-1">now</Text>
           </View>
           <Text className="text-white font-bold text-2xl mb-1">Missed Call</Text>
           <Text className="text-[#a1a1aa] text-base mb-6 font-medium">from Sarah King</Text>
           <View className="flex-row gap-3">
              <TouchableOpacity className="flex-[1.2] bg-[#D900FF]/20 py-3.5 rounded-xl items-center border border-[#D900FF]/40">
                 <Text className="text-white font-semibold text-base">Call Back</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-white/5 py-3.5 rounded-xl items-center border border-white/10">
                 <Text className="text-white font-semibold text-base">Message</Text>
              </TouchableOpacity>
           </View>
        </View>

        {/* History List */}
        <View className="gap-6 mb-8">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <Phone size={18} color="#D900FF" fill="#D900FF" />
              <View>
                <Text className="text-white font-bold text-sm mb-0.5">Today, 07:57</Text>
                <Text className="text-[#8e8e93] text-[13px]">Outgoing Voice Call</Text>
              </View>
            </View>
            <Text className="text-[#8e8e93] text-sm">02:13</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <VideoIcon size={20} color="#D900FF" fill="#D900FF" />
              <View>
                <Text className="text-white font-bold text-sm mb-0.5">Today, 07:45</Text>
                <Text className="text-[#8e8e93] text-[13px]">Incoming Video Call</Text>
              </View>
            </View>
            <Text className="text-[#8e8e93] text-sm">05:42</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <Phone size={18} color="#D900FF" fill="#D900FF" />
              <View>
                <Text className="text-white font-bold text-sm mb-0.5">Yesterday, 22:10</Text>
                <Text className="text-[#8e8e93] text-[13px]">Outgoing Voice Call</Text>
              </View>
            </View>
            <Text className="text-[#8e8e93] text-sm">01:08</Text>
          </View>
        </View>

        <TouchableOpacity className="py-4">
          <Text className="text-[#D900FF] font-bold text-center">View All</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
