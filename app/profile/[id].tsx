import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Share, MoreHorizontal, MapPin, Play, Send } from 'lucide-react-native';

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#0D0F14]">
      {/* Header */}
      <View className="px-4 pt-10 pb-2 flex-row items-center justify-between z-10">
        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-[#0D0F14]/40 rounded-full backdrop-blur-md">
          <ChevronLeft size={24} color="#fff" />
        </TouchableOpacity>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="p-2 bg-[#0D0F14]/40 rounded-full backdrop-blur-md">
            <Share size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-[#0D0F14]/40 rounded-full backdrop-blur-md">
            <MoreHorizontal size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Cover Photo / Header area pseudo */}
        <View className="relative w-full h-80 -mt-20">
          <ImageBackground 
            source={{ uri: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&fit=crop' }} 
            className="w-full h-full opacity-60"
          >
             <View className="absolute inset-0 bg-gradient-to-t from-[#0D0F14] to-transparent" />
          </ImageBackground>
        </View>

        {/* Profile Info */}
        <View className="px-6 -mt-16">
          <View className="flex-row items-end gap-4 mb-4">
            <View className="w-24 h-24 rounded-full border-4 border-[#0D0F14] overflow-hidden bg-slate-800 relative shadow-xl shadow-[#D900FF]/30">
               <View className="absolute inset-0 rounded-full border-[3px] border-[#D900FF] z-10" />
               <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop' }} 
                className="w-full h-full"
               />
            </View>
            <View className="pb-2">
              <View className="flex-row items-center gap-1">
                <Text className="text-white text-2xl font-bold">@SarahJenkins</Text>
                <View className="w-4 h-4 rounded-full bg-[#D900FF] items-center justify-center">
                   <Text className="text-[#0D0F14] text-[10px] font-bold leading-none">✓</Text>
                </View>
              </View>
              <View className="flex-row items-center gap-1 mt-1">
                <Text className="text-red-500 font-bold text-sm">🔥 92% Energy</Text>
              </View>
              <View className="flex-row items-center gap-1 mt-1">
                <MapPin size={12} color="#8e8e93" />
                <Text className="text-[#8e8e93] text-sm">The Vault, Sandton</Text>
              </View>
              <View className="flex-row items-center gap-1 mt-1">
                <View className="w-2 h-2 rounded-full bg-green-500" />
                <Text className="text-green-500 text-sm">Active now</Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row justify-between mb-6 px-4">
            <View className="items-center">
              <Text className="text-white font-bold text-lg">328</Text>
              <Text className="text-[#8e8e93] text-xs uppercase tracking-wider">Moments</Text>
            </View>
            <View className="w-[1px] h-full bg-white/10" />
            <View className="items-center">
              <Text className="text-white font-bold text-lg">1.2K</Text>
              <Text className="text-[#8e8e93] text-xs uppercase tracking-wider">Followers</Text>
            </View>
            <View className="w-[1px] h-full bg-white/10" />
            <View className="items-center">
              <Text className="text-white font-bold text-lg">980</Text>
              <Text className="text-[#8e8e93] text-xs uppercase tracking-wider">Following</Text>
            </View>
          </View>

          {/* Bio */}
          <Text className="text-white text-center text-sm font-medium mb-6 px-4 leading-5">
            Good vibes. Great people. Unforgettable nights. Here for the moments ✨
          </Text>

          {/* Action Buttons */}
          <View className="flex-row items-center gap-3 mb-8">
            <TouchableOpacity className="flex-1 bg-[#D900FF] py-3.5 rounded-2xl items-center justify-center">
              <Text className="text-white font-bold text-base">Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl items-center justify-center">
              <Send size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Profile Tabs */}
          <View className="flex-row justify-around border-b border-white/10 mb-6">
            <TouchableOpacity className="pb-3 border-b-2 border-[#D900FF] px-4">
              <Text className="text-white font-bold text-base">Moments</Text>
            </TouchableOpacity>
            <TouchableOpacity className="pb-3 px-4">
              <Text className="text-[#8e8e93] font-bold text-base">About</Text>
            </TouchableOpacity>
            <TouchableOpacity className="pb-3 px-4">
              <Text className="text-[#8e8e93] font-bold text-base">Friends</Text>
            </TouchableOpacity>
          </View>

          {/* Grid of Moments */}
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TouchableOpacity key={i} className="w-[32%] aspect-[3/4] relative rounded-xl overflow-hidden mb-1">
                <ImageBackground 
                  source={{ uri: `https://images.unsplash.com/photo-${1516450000000 + i * 100}?auto=format&fit=crop&w=300&q=80` }}
                  className="w-full h-full justify-center items-center opacity-80"
                >
                   <View className="w-8 h-8 rounded-full bg-[#0D0F14]/40 backdrop-blur-md items-center justify-center border border-white/20">
                     <Play size={14} color="#fff" fill="#fff" className="ml-0.5" />
                   </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
