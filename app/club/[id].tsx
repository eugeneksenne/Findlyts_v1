import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Platform, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Flame, Calendar, Tag, CheckCircle2, ChevronRight, Music, Share, Zap, Eye, Map, Bookmark, Users, Play, Video, Clock } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper to provide SQLite interface that doesn't crash on web, using AsyncStorage as fallback
const getDatabase = async (dbName: string) => {
  return {
    getAllAsync: async (query: string, params: any[]) => {
      try {
        const data = await AsyncStorage.getItem(`@WebDB_${dbName}`);
        if (data) {
          const parsed = JSON.parse(data);
          return parsed.filter((c: any) => c.id === params[0]);
        }
      } catch(e) {}
      return [];
    }
  };
};

const FLASH_DROPS = [
  { id: 1, title: 'Ladies Free Until 10PM', timeLeft: '32 min left' },
  { id: 2, title: '2-for-1 Signature Cocktails', timeLeft: '1h 15m left' },
];

const PEOPLE_THERE = [
  { id: '1', name: 'Sarah', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop' },
  { id: '2', name: 'Mike', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&fit=crop' },
  { id: '3', name: 'Nomsa', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&fit=crop' },
  { id: '4', name: 'Bongani', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop' },
];

const LIVE_MOMENTS = [
  { id: 1, type: 'live', user: 'The Vault', viewers: '124 watching', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&fit=crop' },
  { id: 2, type: 'video', user: 'Mike', time: '10m ago', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&fit=crop' },
  { id: 3, type: 'photo', user: 'Sarah', time: '15m ago', url: 'https://images.unsplash.com/photo-1571182142278-651268ed5341?w=400&fit=crop' },
  { id: 4, type: 'video', user: 'Nomsa', time: '22m ago', url: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&fit=crop' },
];

export default function ClubLobbyScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [club, setClub] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const dbsToTry = ['clubs_south_africa.db', 'clubs_Unknown.db']; // Fallbacks
        let foundClub = null;
        for (const dbName of dbsToTry) {
           const db = await getDatabase(dbName);
           const cachedClubs = await db.getAllAsync(`SELECT * FROM clubs WHERE id = ?`, [Array.isArray(id) ? id[0] : id]);
           if (cachedClubs.length > 0) {
             foundClub = cachedClubs[0];
             break;
           }
        }
        
        if (foundClub) {
           setClub(foundClub);
        } else {
           setClub({
             name: 'The Vault',
             city: 'Johannesburg',
             province: 'Gauteng',
             type: 'Premium Lounge',
             match: '98%',
             image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&fit=crop'
           });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  if (isLoading || !club) {
    return (
      <View className="flex-1 bg-[#0D0F14] justify-center items-center">
        <ActivityIndicator size="large" color="#D900FF" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#0D0F14]" contentContainerStyle={{ paddingBottom: 120 }} bounces={false} showsVerticalScrollIndicator={false}>
      {/* Hero Area */}
      <View className="h-[450px] w-full relative">
        <ImageBackground source={{ uri: club.image }} className="w-full h-full">
          <View className="absolute inset-0 bg-[#0D0F14]/40" />
          <View className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          {/* Top Controls */}
          <View className="absolute top-14 left-4 right-4 flex-row justify-between items-center z-20">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-[#0D0F14]/40 backdrop-blur-md items-center justify-center border border-white/10"
              onPress={() => router.back()}
            >
              <ArrowLeft size={20} color="#fff" />
            </TouchableOpacity>
            
            <View className="flex-row gap-2">
              <TouchableOpacity className="w-10 h-10 rounded-full bg-[#0D0F14]/40 backdrop-blur-md items-center justify-center border border-white/10">
                <Share size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 rounded-full bg-[#0D0F14]/40 backdrop-blur-md items-center justify-center border border-white/10">
                <Bookmark size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Hero Content */}
          <View className="absolute bottom-6 left-4 right-4 z-20">
            <View className="flex-row items-center gap-2 mb-3">
               <View className="bg-[#FF0080] px-2.5 py-1 rounded-sm flex-row items-center border border-red-400">
                  <View className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
                  <Text className="text-white text-[10px] font-black tracking-widest uppercase">LIVE NOW</Text>
               </View>
               <View className="bg-[#0D0F14]/60 px-2.5 py-1 rounded-sm backdrop-blur-sm border border-white/20 flex-row items-center gap-1">
                  <Flame size={12} color="#D900FF" />
                  <Text className="text-[#D900FF] text-[10px] font-bold tracking-widest uppercase">HIGH VIBE</Text>
               </View>
            </View>
            
            <Text className="text-white font-black text-5xl tracking-tight leading-none mb-2 drop-shadow-xl">{club.name}</Text>
            
            <View className="flex-row items-center opacity-90 gap-1.5">
               <MapPin size={14} color="#8e8e93" />
               <Text className="text-[#8e8e93] font-bold text-sm tracking-wide">1.2km away • {club.city || 'Johannesburg'}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Vibe Metrics & Info */}
      <View className="px-4 py-6 border-b border-white/5">
         <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-2">
               <View className="bg-[#151922] border border-[#D900FF]/30 px-4 py-2 rounded-xl flex-row items-center">
                  <Flame size={20} color="#D900FF" className="mr-2" />
                  <Text className="text-[#D900FF] font-black text-xl">94 VIBE</Text>
               </View>
            </View>
            <View className="flex-row items-center gap-2 opacity-80">
               <Clock size={16} color="#fff" />
               <Text className="text-white font-bold text-sm">Open until 4AM</Text>
            </View>
         </View>
         
         <View className="flex-row flex-wrap gap-2">
             <View className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md">
                <Text className="text-white/80 font-bold text-xs uppercase tracking-wider">Amapiano</Text>
             </View>
             <View className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md">
                <Text className="text-white/80 font-bold text-xs uppercase tracking-wider">{club.type || 'Rooftop'}</Text>
             </View>
             <View className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md">
                <Text className="text-white/80 font-bold text-xs uppercase tracking-wider">Premium Lounge</Text>
             </View>
         </View>
      </View>

      {/* Navigation & Actions */}
      <View className="px-4 py-6 flex-row gap-3">
         <TouchableOpacity className="flex-1 bg-[#D900FF] rounded-xl py-4 flex-row justify-center items-center">
            <Map size={18} color="#000" className="mr-2" />
            <Text className="text-black font-black text-sm uppercase tracking-wider">Navigate</Text>
         </TouchableOpacity>
         <TouchableOpacity className="flex-1 bg-[#FF0080] rounded-xl py-4 flex-row justify-center items-center shadow-lg shadow-[#FF0080]/20">
            <Eye size={18} color="#fff" className="mr-2" />
            <Text className="text-white font-black text-sm uppercase tracking-wider">View Live</Text>
         </TouchableOpacity>
      </View>

      {/* Flash Drops */}
      <View className="px-4 pb-6">
         <View className="flex-row items-center mb-4">
            <Zap size={20} color="#D900FF" className="mr-2" />
            <Text className="text-white text-xl font-black tracking-tight">Flash Drops</Text>
         </View>
         
         {FLASH_DROPS.map((drop) => (
           <View key={drop.id} className="bg-[#151922] border border-[#D900FF]/30 rounded-2xl p-4 flex-row items-center justify-between mb-3 relative overflow-hidden">
              <View className="absolute top-0 right-0 w-32 h-32 bg-[#D900FF]/10 rounded-bl-full" />
              <View className="flex-1 pr-4">
                 <Text className="text-white font-black text-lg mb-1">{drop.title}</Text>
                 <Text className="text-[#D900FF] font-bold text-sm">⏳ {drop.timeLeft}</Text>
              </View>
              <TouchableOpacity className="bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                 <Text className="text-white font-bold text-xs uppercase tracking-wider">Claim</Text>
              </TouchableOpacity>
           </View>
         ))}
      </View>

      {/* People There */}
      <View className="px-4 py-4 pb-6 border-b border-white/5">
         <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
               <Users size={20} color="#fff" className="mr-2" />
               <Text className="text-white text-xl font-black tracking-tight">People There</Text>
            </View>
            <Text className="text-[#8e8e93] font-bold text-sm">42 active</Text>
         </View>
         
         <View className="flex-row items-center">
            <View className="flex-row">
               {PEOPLE_THERE.map((person, i) => (
                  <View key={person.id} className={`w-14 h-14 rounded-full border-2 border-black overflow-hidden ${i > 0 ? '-ml-4' : ''}`}>
                     <Image source={{ uri: person.image }} className="w-full h-full" />
                  </View>
               ))}
            </View>
            <TouchableOpacity className="w-14 h-14 rounded-full border-2 border-dashed border-white/30 items-center justify-center ml-4 bg-white/5">
               <Text className="text-white text-xs font-bold">+38</Text>
            </TouchableOpacity>
         </View>
      </View>

      {/* Live Moments Feed */}
      <View className="pt-6">
         <View className="px-4 mb-4 flex-row items-center justify-between">
            <Text className="text-white text-xl font-black tracking-tight">Live Moments</Text>
            <TouchableOpacity>
               <Text className="text-[#FF0080] font-bold text-sm uppercase tracking-wider">See all</Text>
            </TouchableOpacity>
         </View>
         
         <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4" contentContainerStyle={{ paddingRight: 32 }}>
            {LIVE_MOMENTS.map((moment) => (
               <TouchableOpacity key={moment.id} className="w-[160px] h-[240px] mr-3 rounded-2xl overflow-hidden border border-white/10 relative">
                  <ImageBackground source={{ uri: moment.url }} className="w-full h-full">
                     <View className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                     
                     <View className="absolute top-2 left-2 right-2 flex-row justify-between">
                        {moment.type === 'live' ? (
                           <View className="bg-[#FF0080] px-1.5 py-0.5 rounded flex-row items-center border border-red-400">
                              <Text className="text-white text-[8px] font-black uppercase">LIVE</Text>
                           </View>
                        ) : (
                           <View className="bg-[#0D0F14]/60 px-1.5 py-0.5 rounded backdrop-blur border border-white/20">
                              <Text className="text-white text-[8px] font-bold uppercase">{moment.time}</Text>
                           </View>
                        )}
                        
                        {moment.type === 'video' && (
                           <View className="bg-[#0D0F14]/40 p-1 rounded-full backdrop-blur">
                              <Play size={10} color="#fff" fill="#fff" />
                           </View>
                        )}
                     </View>
                     
                     <View className="absolute bottom-2 left-2 right-2">
                        <Text className="text-white font-bold text-sm drop-shadow-md mb-0.5">{moment.user}</Text>
                        {moment.viewers && (
                           <View className="flex-row items-center">
                              <Eye size={10} color="#FF0080" className="mr-1" />
                              <Text className="text-[#FF0080] font-bold text-[10px] drop-shadow-md">{moment.viewers}</Text>
                           </View>
                        )}
                     </View>
                  </ImageBackground>
               </TouchableOpacity>
            ))}
         </ScrollView>
      </View>

      <View className="h-10" />

    </ScrollView>
  );
}

