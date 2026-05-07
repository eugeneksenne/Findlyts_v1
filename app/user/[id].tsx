import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, Dimensions, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Share, Settings, MapPin, UserPlus, Send, MessageCircle, Shield, Flame, MoreHorizontal, Video, Play, Map, Plus } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const users: Record<string, any> = {
  1: { 
    id: 1, 
    username: 'sarah_k',
    name: 'Sarah Jenkins', 
    bio: 'Techno lover • Always out on Fridays', 
    location: 'Pretoria Nights 🌃', 
    followers: '2.4K', 
    following: '182', 
    momentsCount: '96',
    vibeScore: 92,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    headerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop',
    isLive: true,
    lastSeen: 'Live now at The Vault'
  },
  2: { 
    id: 2, 
    username: 'mike_dj',
    name: 'Mike Deejay', 
    bio: 'Resident DJ @ The Vault', 
    location: 'Johannesburg', 
    followers: '12K', 
    following: '300', 
    momentsCount: '142',
    vibeScore: 98,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    headerImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=400&fit=crop',
    isLive: false,
    lastSeen: 'Was live 20m ago at The Vault'
  },
};

const HIGHLIGHTS = [
  { id: 1, title: 'Durban Trip', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&fit=crop'},
  { id: 2, title: 'Amapiano', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&fit=crop'},
  { id: 3, title: 'Birthday', image: 'https://images.unsplash.com/photo-1533174000222-65fcc2450058?w=200&fit=crop'},
];

const MOMENTS = [
  { id: 1, type: 'photo', url: 'https://images.unsplash.com/photo-1571182142278-651268ed5341?w=400&fit=crop' },
  { id: 2, type: 'video', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&fit=crop' },
  { id: 3, type: 'photo', url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&fit=crop' },
  { id: 4, type: 'live_replay', url: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&fit=crop' },
  { id: 5, type: 'photo', url: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400&fit=crop' },
  { id: 6, type: 'video', url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&fit=crop' },
];

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  
  const user = users[id || ''] || users[1];
  
  return (
    <View className="flex-1 bg-[#0D0F14]">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }} bounces={false} showsVerticalScrollIndicator={false}>
        
        {/* Dynamic Header Background */}
        <View className="h-64 relative w-full">
          <ImageBackground source={{ uri: user.headerImage }} className="w-full h-full">
            <View className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            {/* Top Controls */}
            <SafeAreaView>
              <View className="px-4 py-4 flex-row justify-between items-center z-10 w-full mt-2">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-[#0D0F14]/40 backdrop-blur-md justify-center items-center border border-white/10">
                  <ArrowLeft size={20} color="#fff" />
                </TouchableOpacity>
                <View className="flex-row gap-2">
                  <TouchableOpacity onPress={() => router.push('/settings')} className="w-10 h-10 items-center justify-center rounded-full bg-[#0D0F14]/40 backdrop-blur-md justify-center items-center border border-white/10">
                    <Settings size={18} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-[#0D0F14]/40 backdrop-blur-md justify-center items-center border border-white/10">
                    <Share size={18} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-[#0D0F14]/40 backdrop-blur-md justify-center items-center border border-white/10">
                    <MoreHorizontal size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>
        </View>
        
        {/* Profile Identity */}
        <View className="-mt-16 px-4">
          <View className="flex-row justify-between items-end mb-3">
            <View className="relative">
              <View className={`w-28 h-28 rounded-full border-4 ${user.isLive ? 'border-[#FF0080]' : 'border-black'} overflow-hidden bg-[#0D0F14]`}>
                <Image source={{ uri: user.image }} className="w-full h-full" />
              </View>
              {user.isLive && (
                <View className="absolute -bottom-1 left-1/2 -ml-6 bg-[#FF0080] px-2 py-0.5 rounded-sm border border-red-400">
                  <Text className="text-white text-[10px] font-black tracking-widest uppercase">LIVE</Text>
                </View>
              )}
            </View>
            
            {/* Vibe Score */}
            <View className="bg-[#151922] border border-[#D900FF]/30 px-3 py-1.5 rounded-full flex-row items-center shadow-lg shadow-[#D900FF]/10 h-10 mb-2">
              <Flame size={16} color="#D900FF" className="mr-1.5" />
              <Text className="text-[#D900FF] font-black text-sm">{user.vibeScore} VIBE</Text>
            </View>
          </View>
          
          <View className="mb-4">
            <Text className="text-white text-2xl font-black tracking-tight">{user.name}</Text>
            <Text className="text-white/60 font-medium text-base mb-2">@{user.username}</Text>
            <Text className="text-white text-sm mb-2">{user.bio}</Text>
            <View className="flex-row items-center opacity-80">
              <MapPin size={12} color="#8e8e93" className="mr-1" />
              <Text className="text-[#8e8e93] font-bold text-xs">{user.location}</Text>
            </View>
          </View>
          
          {/* Social Stats */}
          <View className="flex-row items-center gap-6 mb-6">
            <View>
              <Text className="text-white text-lg font-bold">{user.followers}</Text>
              <Text className="text-[#8e8e93] text-[10px] uppercase font-bold tracking-wider">Followers</Text>
            </View>
            <View>
              <Text className="text-white text-lg font-bold">{user.following}</Text>
              <Text className="text-[#8e8e93] text-[10px] uppercase font-bold tracking-wider">Following</Text>
            </View>
            <View>
              <Text className="text-white text-lg font-bold">{user.momentsCount}</Text>
              <Text className="text-[#8e8e93] text-[10px] uppercase font-bold tracking-wider">Moments</Text>
            </View>
          </View>
          
          {/* Action Buttons */}
          <View className="flex-row gap-2 mb-6 w-full">
            <TouchableOpacity 
              className={`flex-1 flex-row items-center justify-center h-12 rounded-full ${isFollowing ? 'bg-[#151922] border border-white/10' : 'bg-white'}`}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              {!isFollowing && <UserPlus size={16} color="#000" className="mr-1.5" />}
              <Text className={`font-black tracking-wide ${isFollowing ? 'text-white' : 'text-black'}`}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="w-12 h-12 bg-[#151922] rounded-full items-center justify-center border border-white/10">
              <MessageCircle size={18} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity className="w-12 h-12 bg-[#D900FF]/10 rounded-full items-center justify-center border border-[#D900FF]/30">
              <Map size={18} color="#D900FF" />
            </TouchableOpacity>

            <TouchableOpacity className="w-12 h-12 bg-[#FF0080]/10 rounded-full items-center justify-center border border-[#FF0080]/30">
              <Shield size={18} color="#FF0080" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity Layer */}
        {user.lastSeen && (
          <View className="px-4 mb-6">
             <View className="bg-[#151922] border border-white/5 rounded-2xl p-3 flex-row items-center">
               <View className={`w-2 h-2 rounded-full ${user.isLive ? 'bg-[#FF0080]' : 'bg-[#D900FF]'} mr-3`} />
               <Text className="text-white/80 font-medium text-sm">{user.lastSeen}</Text>
             </View>
          </View>
        )}

        {/* Highlights */}
        <View className="mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4" contentContainerStyle={{ paddingRight: 32 }}>
            <View className="items-center mr-4">
              <TouchableOpacity className="w-16 h-16 rounded-full border border-dashed border-white/30 items-center justify-center mb-1 bg-[#151922]">
                <Plus size={24} color="#fff" />
              </TouchableOpacity>
              <Text className="text-white/80 text-[10px] font-bold">New</Text>
            </View>
            
            {HIGHLIGHTS.map(highlight => (
              <View key={highlight.id} className="items-center mr-4">
                <TouchableOpacity className="w-16 h-16 rounded-full border-2 border-white/10 p-0.5 mb-1 overflow-hidden">
                  <Image source={{ uri: highlight.image }} className="w-full h-full rounded-full" />
                </TouchableOpacity>
                <Text className="text-white/80 text-[10px] font-bold">{highlight.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Moments Grid */}
        <View className="px-1">
          <View className="flex-row flex-wrap w-full">
            {MOMENTS.map((moment, i) => (
              <TouchableOpacity key={moment.id} className="w-1/3 aspect-[3/4] p-0.5">
                <View className="w-full h-full bg-[#11131A] overflow-hidden rounded-md relative">
                  <Image source={{ uri: moment.url }} className="w-full h-full opacity-90" />
                  {moment.type === 'video' && (
                    <View className="absolute top-2 right-2">
                       <Play size={12} color="#fff" fill="#fff" />
                    </View>
                  )}
                  {moment.type === 'live_replay' && (
                    <View className="absolute bottom-2 left-2 bg-[#0D0F14]/60 px-1.5 py-0.5 rounded flex-row items-center">
                       <Video size={10} color="#fff" className="mr-1" />
                       <Text className="text-white text-[8px] font-bold">REPLAY</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

