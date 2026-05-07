import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, Platform } from 'react-native';
import { ChevronLeft, Pin, Lock } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function PinnedMessagesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#0D0F14]" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between z-10 w-full mb-6 mt-4">
        <TouchableOpacity onPress={() => router.back()} className="p-1 -ml-1 flex-row items-center">
          <ChevronLeft size={28} color="#fff" />
          <Text className="text-white font-semibold text-lg ml-2">Pinned Messages</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
         
         <View className="mb-4">
            <View className="flex-row items-start mb-4 bg-[#1c1c1e] p-4 rounded-3xl border border-white/5 relative">
               <Image source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }} className="w-10 h-10 rounded-full mr-3" />
               <View className="flex-1">
                  <Text className="text-white font-bold text-sm mb-1">Sarah King</Text>
                  <Text className="text-white text-sm leading-5 pr-4">Yesss! Can't wait 😍</Text>
               </View>
               <Text className="text-[#8e8e93] text-[10px] absolute right-4 top-4">07:46</Text>
               <View className="absolute right-4 bottom-4">
                  <Pin size={16} color="#8e8e93" />
               </View>
            </View>

            <View className="flex-row items-start mb-4 bg-[#1c1c1e] p-4 rounded-3xl border border-white/5 relative">
               <View className="w-10 h-10 rounded-full mr-3 bg-[#D900FF]/20 items-center justify-center border border-[#D900FF]/30">
                  <Text className="text-[#D900FF] font-bold text-xs">You</Text>
               </View>
               <View className="flex-1">
                  <Text className="text-white font-bold text-sm mb-1">You</Text>
                  <Text className="text-white text-sm leading-5 pr-4">8 PM at the usual place?</Text>
               </View>
               <Text className="text-[#8e8e93] text-[10px] absolute right-4 top-4">07:46</Text>
               <View className="absolute right-4 bottom-4">
                  <Pin size={16} color="#8e8e93" />
               </View>
            </View>
         </View>

         <View className="flex-row justify-center items-center mt-10 gap-2 opacity-50">
            <Lock size={14} color="#8e8e93" />
            <Text className="text-[#8e8e93] text-xs">Only you can see pinned messages</Text>
         </View>

      </ScrollView>
    </SafeAreaView>
  );
}
