import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Building, Users, Flame, Zap, Activity, 
  Settings, Video, Edit3, Shield, BarChart3, Radio, Plus, Settings2, ShieldQuestion 
} from 'lucide-react-native';

const ADMIN_ACTIONS = [
  { id: 'profile', title: 'Profile', icon: Edit3, color: '#00D1FF' },
  { id: 'drops', title: 'Flash Drops', icon: Zap, color: '#FFB800' },
  { id: 'moments', title: 'Moderation', icon: ShieldQuestion, color: '#FF0080' },
  { id: 'insights', title: 'Insights', icon: BarChart3, color: '#A020F0' },
];

export default function ClubAdminScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#11131A]">
      {/* Admin Top Nav */}
      <View className="px-4 py-4 flex-row items-center justify-between border-b border-white/5 bg-[#11131A] z-10">
        <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-white/5 mr-3">
              <ArrowLeft size={20} color="#00D1FF" />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-xl font-black tracking-tight">The Vault</Text>
              <View className="flex-row items-center mt-0.5">
                  <View className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] mr-1.5 shadow-[0_0_8px_#00D1FF]" />
                  <Text className="text-[#00D1FF] font-black text-[10px] uppercase tracking-widest">Live Cockpit</Text>
              </View>
            </View>
        </View>
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/30">
          <Building size={18} color="#00D1FF" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Workspace Pill */}
        <View className="self-center bg-[#00D1FF]/10 border border-[#00D1FF]/30 px-4 py-1.5 rounded-full mb-6 flex-row items-center shadow-[0_0_15px_rgba(0,209,255,0.15)]">
           <Building size={12} color="#00D1FF" className="mr-2" />
           <Text className="text-[#00D1FF] font-black text-xs uppercase tracking-widest">Club Admin Mode</Text>
        </View>

        {/* Dashboard Overview */}
        <View className="mb-8 flex-row gap-3">
           <View className="bg-[#11131A] border border-white/5 rounded-3xl p-5 flex-1 relative overflow-hidden">
              <View className="flex-row items-center gap-2 mb-3 z-10">
                 <Flame size={18} color="#FF5A00" />
                 <Text className="text-white/60 font-bold text-xs uppercase tracking-widest">Vibe Score</Text>
              </View>
              <Text className="text-white font-black text-4xl mb-1 z-10">92</Text>
              <View className="flex-row items-center z-10">
                 <Activity size={12} color="#00FF66" className="mr-1" />
                 <Text className="text-[#00FF66] font-bold text-[10px] uppercase tracking-widest">Trending Up</Text>
              </View>
              <View className="absolute -bottom-8 -right-8 opacity-10">
                 <Flame size={120} color="#FF5A00" />
              </View>
           </View>

           <View className="bg-[#11131A] border border-white/5 rounded-3xl p-5 flex-1 relative overflow-hidden">
              <View className="flex-row items-center gap-2 mb-3 z-10">
                 <Users size={18} color="#00D1FF" />
                 <Text className="text-white/60 font-bold text-xs uppercase tracking-widest">Active Nearby</Text>
              </View>
              <Text className="text-white font-black text-4xl mb-1 z-10">420</Text>
              <View className="flex-row items-center z-10">
                 <Radio size={12} color="#00D1FF" className="mr-1" />
                 <Text className="text-[#00D1FF] font-bold text-[10px] uppercase tracking-widest">Scanning Radius</Text>
              </View>
              <View className="absolute -bottom-8 -right-8 opacity-10">
                 <Users size={120} color="#00D1FF" />
              </View>
           </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
           <Text className="text-white/40 font-black text-[10px] uppercase tracking-widest mb-3 px-2">Quick Actions</Text>
           <View className="flex-row flex-wrap gap-3">
              {ADMIN_ACTIONS.map(action => (
                 <TouchableOpacity key={action.id} className="w-[48%] bg-[#11131A] border border-white/5 rounded-2xl p-4 flex-row items-center">
                    <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: `${action.color}15`, borderColor: `${action.color}30`, borderWidth: 1 }}>
                       <action.icon size={18} color={action.color} />
                    </View>
                    <Text className="text-white font-bold text-sm">{action.title}</Text>
                 </TouchableOpacity>
              ))}
           </View>
        </View>

        {/* Live Broadcasts Insight */}
        <View className="mb-8">
           <View className="flex-row items-center justify-between mb-3 px-2">
              <Text className="text-white/40 font-black text-[10px] uppercase tracking-widest">Live Activity</Text>
              <Text className="text-[#FF0080] font-bold text-[10px] uppercase tracking-widest">3 Active</Text>
           </View>
           <TouchableOpacity className="bg-[#11131A] border border-white/5 rounded-3xl p-5 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                 <View className="w-12 h-12 rounded-lg bg-[#0D0F14] border border-white/10 overflow-hidden mr-4">
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=100&fit=crop' }} className="w-full h-full opacity-60" />
                    <View className="absolute inset-0 items-center justify-center">
                       <Video size={20} color="#fff" />
                    </View>
                 </View>
                 <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                       <View className="w-1.5 h-1.5 rounded-full bg-[#FF0080] mr-1.5" />
                       <Text className="text-white font-black text-sm">3 Live Broadcasts Inside</Text>
                    </View>
                    <Text className="text-[#8e8e93] font-bold text-[10px] uppercase tracking-widest">Total 1.2K Viewers</Text>
                 </View>
              </View>
              <View className="bg-white/5 px-4 py-2 rounded-full border border-white/10">
                 <Text className="text-white font-bold text-xs">Monitor</Text>
              </View>
           </TouchableOpacity>
        </View>

        {/* Flash Drops Control */}
        <View className="mb-8">
           <View className="flex-row items-center justify-between mb-3 px-2">
              <Text className="text-white/40 font-black text-[10px] uppercase tracking-widest">Active Flash Drops</Text>
              <TouchableOpacity>
                 <Text className="text-[#00D1FF] font-bold text-[10px] uppercase tracking-widest">New Drop</Text>
              </TouchableOpacity>
           </View>
           <View className="bg-[#11131A] border border-white/5 rounded-3xl overflow-hidden">
              <View className="p-5 border-b border-white/5 relative overflow-hidden">
                 <View className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800]/10 rounded-bl-[100px]" />
                 <View className="flex-row justify-between items-start mb-4 relative z-10">
                    <View>
                       <Text className="text-white font-black text-lg mb-0.5">Free Entry Before 11PM</Text>
                       <Text className="text-[#FFB800] font-bold text-xs">Ends in 2h 15m</Text>
                    </View>
                    <View className="bg-[#FFB800]/20 border border-[#FFB800]/40 px-2.5 py-1 rounded">
                       <Text className="text-[#FFB800] font-black text-[10px] uppercase tracking-widest">Live</Text>
                    </View>
                 </View>
                 <View className="flex-row items-center gap-4 relative z-10">
                    <View>
                       <Text className="text-white font-black text-lg">1,204</Text>
                       <Text className="text-white/40 font-bold text-[10px] uppercase tracking-widest">Views</Text>
                    </View>
                    <View className="w-px h-6 bg-white/10" />
                    <View>
                       <Text className="text-white font-black text-lg">84</Text>
                       <Text className="text-white/40 font-bold text-[10px] uppercase tracking-widest">Claims</Text>
                    </View>
                    <View className="w-px h-6 bg-white/10" />
                    <View>
                       <Text className="text-white font-black text-lg">42</Text>
                       <Text className="text-white/40 font-bold text-[10px] uppercase tracking-widest">Navigating</Text>
                    </View>
                 </View>
              </View>
              
              <TouchableOpacity className="p-4 flex-row justify-center items-center bg-[#151922]">
                 <Plus size={16} color="#00D1FF" className="mr-1.5" />
                 <Text className="text-[#00D1FF] font-bold text-sm uppercase tracking-widest">Launch Drop</Text>
              </TouchableOpacity>
           </View>
        </View>

        {/* Operational Settings */}
        <View className="mb-10">
           <Text className="text-white/40 font-black text-[10px] uppercase tracking-widest mb-3 px-2">Operations</Text>
           <View className="bg-[#11131A] rounded-3xl border border-white/5 overflow-hidden">
              {[
                 { title: 'Staff & Permissions', icon: Users },
                 { title: 'Safety Tools', icon: Shield },
                 { title: 'Venue Settings', icon: Settings },
              ].map((item, idx) => (
                 <TouchableOpacity key={idx} className={`p-4 flex-row items-center justify-between ${idx < 2 ? 'border-b border-white/5' : ''}`}>
                    <View className="flex-row items-center">
                       <View className="w-8 h-8 rounded-full bg-white/5 items-center justify-center mr-3">
                          <item.icon size={16} color="#8e8e93" />
                       </View>
                       <Text className="text-white font-bold text-sm">{item.title}</Text>
                    </View>
                 </TouchableOpacity>
              ))}
           </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
