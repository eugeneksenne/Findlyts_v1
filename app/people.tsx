import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Search, Users, Activity, ChevronRight, 
  MapPin, UserPlus, Flame, BookOpen
} from 'lucide-react-native';

const PEOPLE_SUGGESTIONS = [
  { id: '1', name: 'Kayla M.', username: '@kayla_m', mutuals: 12, seenAt: 'Altitude Rooftop', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&fit=crop', vibe: 89 },
  { id: '2', name: 'Jordan T.', username: '@jordan_t', mutuals: 8, seenAt: 'The Vault', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&fit=crop', vibe: 76 },
  { id: '3', name: 'Sophia R.', username: '@sophia_r', mutuals: 5, seenAt: 'Madison', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop', vibe: 92 },
];

const CONTACTS_ON_FOMO = [
  { id: '4', name: 'Alex (Work)', username: '@alex_w', image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=100&fit=crop' },
  { id: '5', name: 'Sammy', username: '@sammy_d', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop' },
];

export default function FindPeopleScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredSuggestions = useMemo(() => PEOPLE_SUGGESTIONS.filter((p) => normalizedQuery === '' || `${p.name} ${p.username} ${p.seenAt}`.toLowerCase().includes(normalizedQuery)), [normalizedQuery]);

  return (
    <SafeAreaView className="flex-1 bg-[#0D0F14]">
      {/* Header */}
      <View className="px-4 py-4 flex-row items-center justify-between border-b border-white/5 bg-[#0D0F14] z-10">
        <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-white/5 mr-3">
              <ArrowLeft size={20} color="#fff" />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-xl font-black tracking-tight">Find People</Text>
            </View>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Search Bar */}
        <View className="px-4 pt-4 pb-6">
           <View className="bg-[#151922] border border-white/10 rounded-2xl flex-row items-center px-4 h-12">
              <Search size={18} color="#8e8e93" className="mr-3" />
              <TextInput 
                placeholder="Search username, contacts, mutuals..."
                placeholderTextColor="#8e8e93"
                className="flex-1 text-white font-medium text-sm h-full"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
              />
           </View>
        </View>

        {/* Contacts Connection */}
        <View className="px-4 mb-8">
           <TouchableOpacity onPress={() => router.push('/settings-advanced/discoverability')} className="bg-[#D900FF]/10 border border-[#D900FF]/20 rounded-3xl p-4 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                 <View className="w-12 h-12 rounded-full bg-[#D900FF]/20 items-center justify-center mr-4">
                    <BookOpen size={20} color="#D900FF" />
                 </View>
                 <View className="flex-1">
                    <Text className="text-white font-bold text-sm mb-0.5">Find Your Contacts</Text>
                    <Text className="text-[#8e8e93] font-medium text-xs">Connect with friends already on FOMO securely.</Text>
                 </View>
              </View>
              <ChevronRight size={20} color="#D900FF" />
           </TouchableOpacity>
        </View>

        {/* People You May Know */}
        <View className="mb-8">
           <View className="px-4 flex-row items-center justify-between mb-4">
              <Text className="text-white/60 font-black text-[10px] uppercase tracking-widest">People You May Know</Text>
           </View>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4" contentContainerStyle={{ paddingRight: 32 }}>
              {filteredSuggestions.map(person => (
                 <TouchableOpacity key={person.id} onPress={() => router.push(`/user/${person.id}`)} className="w-[200px] h-[240px] mr-3 rounded-3xl bg-[#151922] border border-white/5 overflow-hidden">
                    <Image source={{ uri: person.image }} className="w-full h-[120px] bg-[#0D0F14]" />
                    
                    <View className="p-3 bg-[#151922] flex-1 justify-between">
                       <View>
                          <View className="flex-row items-center justify-between mb-1">
                             <Text className="text-white font-bold text-sm max-w-[70%]" numberOfLines={1}>{person.name}</Text>
                             <View className="bg-[#0D0F14]/60 border border-[#D900FF]/30 px-1.5 py-0.5 rounded flex-row items-center shadow-lg">
                               <Flame size={10} color="#D900FF" className="mr-1" />
                               <Text className="text-[#D900FF] font-black text-[9px]">{person.vibe}</Text>
                             </View>
                          </View>
                          <Text className="text-[#8e8e93] text-xs font-semibold mb-2">{person.username}</Text>
                          <View className="flex-row items-center mb-1">
                             <Users size={10} color="#8e8e93" className="mr-1.5" />
                             <Text className="text-[#8e8e93] text-[10px] font-medium">{person.mutuals} mutuals</Text>
                          </View>
                          <View className="flex-row items-center">
                             <MapPin size={10} color="#8e8e93" className="mr-1.5" />
                             <Text className="text-[#8e8e93] text-[10px] font-medium" numberOfLines={1}>Seen at {person.seenAt}</Text>
                          </View>
                       </View>
                       
                       <TouchableOpacity onPress={() => router.push(`/user/${person.id}`)} className="w-full py-2 mt-2 rounded-xl bg-white items-center">
                          <Text className="text-black font-black text-xs uppercase tracking-wider">Follow</Text>
                       </TouchableOpacity>
                    </View>
                 </TouchableOpacity>
              ))}
           </ScrollView>
        </View>

        {/* Mutual Connections */}
        <View className="mb-8 px-4">
           <Text className="text-white/60 font-black text-[10px] uppercase tracking-widest mb-4">Mutual Connections</Text>
           <View className="bg-[#151922] border border-white/5 rounded-3xl overflow-hidden">
              {[
                 { id: '10', username: '@neo', desc: 'Followed by @thato and 8 others', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&fit=crop' },
                 { id: '11', username: '@zara', desc: 'Followed by @kayla and 3 others', img: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=100&fit=crop' },
              ].map((user, idx) => (
                 <View key={user.id} className={`flex-row items-center justify-between p-4 ${idx === 0 ? 'border-b border-white/5' : ''}`}>
                    <View className="flex-row items-center flex-1">
                       <Image source={{ uri: user.img }} className="w-10 h-10 rounded-full mr-3 border border-white/10" />
                       <View className="flex-1 pr-2">
                          <Text className="text-white font-bold text-sm mb-0.5">{user.username}</Text>
                          <Text className="text-[#8e8e93] font-medium text-[10px]">{user.desc}</Text>
                       </View>
                    </View>
                    <TouchableOpacity onPress={() => router.push(`/user/${user.id}`)} className="w-8 h-8 rounded-full bg-white/10 border border-white/20 items-center justify-center">
                       <UserPlus size={14} color="#fff" />
                    </TouchableOpacity>
                 </TouchableOpacity>
              ))}
           </View>
        </View>

        {/* Nearby Social Overlap */}
        <View className="mb-8 px-4">
           <Text className="text-white/60 font-black text-[10px] uppercase tracking-widest mb-4">Nearby Social Overlap</Text>
           <View className="bg-[#151922] border border-white/5 rounded-3xl overflow-hidden">
              {[
                 { id: '12', username: '@liam', desc: 'Often seen at The Vault', img: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100&fit=crop' },
                 { id: '13', username: '@amara', desc: 'Often seen at Altitude Rooftop', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop' },
              ].map((user, idx) => (
                 <View key={user.id} className={`flex-row items-center p-4 ${idx === 0 ? 'border-b border-white/5' : ''}`}>
                    <Image source={{ uri: user.img }} className="w-12 h-12 rounded-xl mr-4 border border-white/10" />
                    <View className="flex-1">
                       <Text className="text-white font-bold text-sm mb-0.5">{user.username}</Text>
                       <Text className="text-[#8e8e93] font-medium text-[10px]">{user.desc}</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push(`/user/${user.id}`)} className="px-3 py-1.5 rounded-full bg-white border border-white/20">
                       <Text className="text-black font-black text-xs">Follow</Text>
                    </TouchableOpacity>
                 </TouchableOpacity>
              ))}
           </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
