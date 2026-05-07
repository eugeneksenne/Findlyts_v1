import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';
import { Search, MapPin, Users, ChevronRight, Bell, Zap, Flame, Shield, Map as MapIcon, Compass } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Dummy data aligned with the FOMO spec
const FLASH_DROPS = [
  {
    id: 'f1',
    title: 'Free Entry Before 11PM',
    club: 'The Vault',
    distance: '1.2km',
    vibe: 'High Vibe',
    timeLeft: '27 min left',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'f2',
    title: '2-for-1 Drinks',
    club: 'Taboo',
    distance: '3.4km',
    vibe: 'Trending',
    timeLeft: '1h 5m left',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
  }
];

const TRENDING_CLUBS = [
  {
    id: 'c1',
    name: 'The Vault',
    distance: '1.2km away',
    vibeScore: '98%',
    isLive: true,
    viewers: 124,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1080&auto=format&fit=crop',
    tags: ['Techno', 'Underground']
  },
  {
    id: 'c2',
    name: 'Konka',
    distance: '5.6km away',
    vibeScore: '92%',
    isLive: false,
    moments: 45,
    image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1080&auto=format&fit=crop',
    tags: ['Amapiano', 'Premium']
  },
  {
    id: 'c3',
    name: 'Onyx Club',
    distance: '2.1km away',
    vibeScore: '85%',
    isLive: true,
    viewers: 89,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    tags: ['Hip Hop', 'Urban']
  }
];

const PEOPLE_SUGGESTIONS = [
  { id: 'p1', name: 'Zinhle', mutuals: 12, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&fit=crop' },
  { id: 'p2', name: 'Mike D', mutuals: 8, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&fit=crop' },
  { id: 'p3', name: 'Lebo K', mutuals: 5, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop' }
];

const CATEGORIES = [
  { id: 'cat1', name: 'Rooftops', image: 'https://images.unsplash.com/photo-1572535091724-69974cdeb98f?q=80&w=400&fit=crop' },
  { id: 'cat2', name: 'Amapiano Hotspots', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&fit=crop' },
  { id: 'cat3', name: 'Lounges', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&fit=crop' },
];

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#0D0F14]">
      {/* Top Header */}
      <View className="pt-14 pb-4 px-4 bg-[#0D0F14] z-10 border-b border-white/5">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.push('/user/1')} className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden bg-[#0D0F14]">
               <Image source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }} className="w-full h-full" />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-3xl font-black tracking-tight">Discover</Text>
              <View className="flex-row items-center mt-1">
                <MapPin size={12} color="#8e8e93" className="mr-1" />
                <Text className="text-[#8e8e93] font-bold text-sm uppercase tracking-wide">Johannesburg Tonight</Text>
              </View>
            </View>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity className="w-10 h-10 rounded-full bg-[#151922] items-center justify-center border border-white/10 relative">
              <Shield size={18} color="#D900FF" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-[#151922] items-center justify-center border border-white/10 relative">
              <Bell size={18} color="#fff" />
              <View className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#FF0080]" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View className="flex-row items-center bg-[#151922] rounded-2xl px-4 py-3">
          <Search size={20} color="#8e8e93" />
          <TextInput 
            className="flex-1 text-white ml-3 text-base font-medium"
            placeholder="Search clubs, people, flash drops..."
            placeholderTextColor="#8e8e93"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Flash Drops Section */}
        <View className="pt-6 pb-2">
          <View className="px-4 flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Zap size={20} color="#D900FF" className="mr-2" />
              <Text className="text-white text-xl font-black tracking-tight">Flash Drops</Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4" contentContainerStyle={{ paddingRight: 32 }}>
            {FLASH_DROPS.map(drop => (
              <TouchableOpacity key={drop.id} className="w-[280px] h-[160px] mr-4 rounded-3xl overflow-hidden border border-white/10 relative">
                <ImageBackground source={{ uri: drop.image }} className="w-full h-full">
                  <View className="absolute inset-0 bg-[#0D0F14]/50" />
                  <View className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <View className="p-4 flex-1 justify-between">
                    <View className="flex-row items-center justify-between">
                      <View className="bg-[#D900FF] px-2 py-1 rounded border border-[#D900FF]/50">
                        <Text className="text-black text-[10px] font-black uppercase tracking-widest">{drop.timeLeft}</Text>
                      </View>
                      <View className="bg-[#0D0F14]/60 px-2 py-1 rounded backdrop-blur border border-white/10">
                         <Text className="text-white text-[10px] font-bold">🔥 {drop.vibe}</Text>
                      </View>
                    </View>
                    
                    <View>
                      <Text className="text-[#D900FF] font-black text-xl mb-0.5 tracking-tight">{drop.title}</Text>
                      <View className="flex-row items-center">
                        <Text className="text-white font-bold text-sm mr-2">{drop.club}</Text>
                        <Text className="text-white/60 font-semibold text-xs">• {drop.distance}</Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending / Live Clubs Section */}
        <View className="pt-8">
          <View className="px-4 flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Flame size={20} color="#FF0080" className="mr-2" />
              <Text className="text-white text-xl font-black tracking-tight">Live & Trending</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-[#8e8e93] font-bold text-sm">See map</Text>
            </TouchableOpacity>
          </View>

          <View className="px-4">
            {TRENDING_CLUBS.map(club => (
              <TouchableOpacity key={club.id} className="w-full h-[220px] mb-4 rounded-3xl overflow-hidden border border-white/10 relative">
                <ImageBackground source={{ uri: club.image }} className="w-full h-full">
                  <View className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
                  
                  <View className="absolute top-4 left-4 right-4 flex-row justify-between items-start">
                    {club.isLive ? (
                      <View className="bg-[#FF0080] px-2 py-1 rounded-sm flex-row items-center border border-red-400 shadow-lg shadow-red-500/50">
                        <View className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
                        <Text className="text-white text-[10px] font-black tracking-widest">LIVE NOW</Text>
                      </View>
                    ) : (
                      <View className="bg-[#0D0F14]/60 px-2 py-1 rounded backdrop-blur border border-white/20">
                        <Text className="text-white text-[10px] font-bold tracking-widest uppercase">High Activity</Text>
                      </View>
                    )}
                    
                    <View className="bg-[#0D0F14]/60 px-2.5 py-1 rounded-full backdrop-blur border border-white/20">
                       <Text className="text-[#D900FF] font-black text-xs">Vibe {club.vibeScore}</Text>
                    </View>
                  </View>

                  <View className="absolute bottom-4 left-4 right-4 row items-center justify-between">
                    <View className="flex-row justify-between items-end">
                      <View>
                        <Text className="text-white text-2xl font-black mb-1 drop-shadow-md">{club.name}</Text>
                        <View className="flex-row items-center gap-2 mb-2">
                           <Text className="text-white/80 font-bold text-xs">{club.distance}</Text>
                           <Text className="text-white/40 font-bold text-xs">•</Text>
                           {club.isLive ? (
                             <Text className="text-white font-bold text-xs">{club.viewers} watching live</Text>
                           ) : (
                             <Text className="text-white font-bold text-xs">{club.moments} moments nearby</Text>
                           )}
                        </View>
                        <View className="flex-row gap-2">
                          {club.tags.map(tag => (
                            <View key={tag} className="bg-white/10 px-2 py-0.5 rounded border border-white/10">
                              <Text className="text-white/70 text-[10px] font-bold uppercase">{tag}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                      
                      <TouchableOpacity className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-lg">
                        <ChevronRight size={20} color="#000" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* People You May Know */}
        <View className="pt-8 pb-4">
          <View className="px-4 flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Users size={20} color="#fff" className="mr-2" />
              <Text className="text-white text-xl font-black tracking-tight">People You May Know</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/people')}>
              <Text className="text-[#D900FF] font-bold text-sm">See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4" contentContainerStyle={{ paddingRight: 32 }}>
            <TouchableOpacity className="w-[120px] h-[160px] mr-3 rounded-2xl bg-[#151922] border border-white/5 items-center justify-center px-4">
                <View className="w-14 h-14 rounded-full bg-[#333] mb-3 items-center justify-center border-2 border-dashed border-[#666]">
                   <Compass size={24} color="#8e8e93" />
                </View>
                <Text className="text-white font-bold text-center text-sm mb-1">Sync Contacts</Text>
                <Text className="text-[#8e8e93] text-[10px] text-center">Find friends instantly</Text>
            </TouchableOpacity>
            
            {PEOPLE_SUGGESTIONS.map(person => (
              <View key={person.id} className="w-[120px] h-[160px] mr-3 rounded-2xl bg-[#151922] border border-white/5 items-center justify-center p-3">
                 <Image source={{ uri: person.image }} className="w-16 h-16 rounded-full mb-2" />
                 <Text className="text-white font-bold text-base max-w-full text-center" numberOfLines={1}>{person.name}</Text>
                 <Text className="text-[#8e8e93] text-[10px] font-semibold mb-3 text-center">{person.mutuals} mutuals</Text>
                 <TouchableOpacity className="w-full py-1.5 rounded bg-white/10 items-center border border-white/10">
                   <Text className="text-white font-bold text-xs">Follow</Text>
                 </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Club Categories */}
        <View className="pt-6 pb-6">
          <View className="px-4 mb-4">
            <Text className="text-white text-xl font-black tracking-tight">Explore the City</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4" contentContainerStyle={{ paddingRight: 32 }}>
            {CATEGORIES.map(category => (
              <TouchableOpacity key={category.id} className="w-[140px] h-[80px] mr-3 rounded-2xl overflow-hidden border border-white/10">
                <ImageBackground source={{ uri: category.image }} className="w-full h-full justify-center px-4">
                  <View className="absolute inset-0 bg-[#0D0F14]/50" />
                  <Text className="text-white font-bold text-sm drop-shadow-md">{category.name}</Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* NightGuard Promo */}
        <View className="px-4 pb-8">
           <TouchableOpacity 
             onPress={() => router.push('/nightguard')}
             className="w-full rounded-3xl bg-gradient-to-r from-[#151922] to-[#222] border border-[#D900FF]/20 p-5 flex-row items-center overflow-hidden"
           >
             <View className="absolute -right-10 -top-10 opacity-10">
               <Shield size={120} color="#D900FF" />
             </View>
             <View className="w-12 h-12 bg-[#D900FF]/10 rounded-full border border-[#D900FF]/30 items-center justify-center mr-4">
               <Shield size={24} color="#D900FF" />
             </View>
             <View className="flex-1 pr-2">
               <Text className="text-white font-black text-lg mb-0.5">NightGuard</Text>
               <Text className="text-white/60 font-medium text-xs">Keep your circle safe tonight.</Text>
             </View>
             <ChevronRight size={20} color="#D900FF" />
           </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
