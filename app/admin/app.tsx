import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Globe, Users, Building, ShieldAlert, Zap, 
  BarChart, Activity, Settings, Radio, Map, Flame,
  ServerCrash
} from 'lucide-react-native';

const ADMIN_MODULES = [
  { id: 'users', title: 'Users Management', icon: Users, color: '#00D1FF', desc: 'Global user operations' },
  { id: 'clubs', title: 'Club Management', icon: Building, color: '#00FF66', desc: 'Venue verification & approval' },
  { id: 'moderation', title: 'Content Moderation', icon: ShieldAlert, color: '#FF0080', desc: 'Trust & safety ops' },
  { id: 'drops', title: 'Flash Drop Oversight', icon: Zap, color: '#FFB800', desc: 'Global promotions check' },
  { id: 'analytics', title: 'Insights', icon: BarChart, color: '#A020F0', desc: 'Growth & engagement' },
  { id: 'infra', title: 'Infrastructure', icon: ServerCrash, color: '#8e8e93', desc: 'System health & uptime' },
];

export default function AppAdminScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#0D0F14]">
      {/* App Admin Top Nav */}
      <View className="px-4 py-4 flex-row items-center justify-between border-b border-white/5 bg-[#0D0F14] z-10">
        <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-white/5 mr-3">
              <ArrowLeft size={20} color="#00D1FF" />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-xl font-black tracking-tight">FOMO HQ</Text>
              <View className="flex-row items-center mt-0.5">
                  <View className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] mr-1.5 shadow-[0_0_8px_#00D1FF]" />
                  <Text className="text-[#00D1FF] font-black text-[10px] uppercase tracking-widest">Global Operations</Text>
              </View>
            </View>
        </View>
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/30">
          <Globe size={18} color="#00D1FF" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Workspace Pill */}
        <View className="self-center bg-[#00D1FF]/10 border border-[#00D1FF]/30 px-4 py-1.5 rounded-full mb-6 flex-row items-center shadow-[0_0_15px_rgba(0,209,255,0.15)]">
           <Activity size={12} color="#00D1FF" className="mr-2" />
           <Text className="text-[#00D1FF] font-black text-xs uppercase tracking-widest">App Admin Mode</Text>
        </View>

        {/* Global Dashboard */}
        <View className="mb-8">
           <Text className="text-white/40 font-black text-[10px] uppercase tracking-widest mb-3 px-2">Global Pulse</Text>
           <View className="flex-row flex-wrap gap-3">
              
              <View className="w-[48%] bg-[#11131A] border border-white/5 rounded-2xl p-4 relative overflow-hidden">
                 <View className="flex-row items-center gap-2 mb-2 z-10">
                    <Users size={14} color="#00D1FF" />
                    <Text className="text-white/60 font-bold text-[10px] uppercase tracking-widest">Active Users</Text>
                 </View>
                 <Text className="text-white font-black text-2xl z-10">124.5K</Text>
                 <View className="absolute -bottom-4 -right-4 opacity-5">
                    <Users size={80} color="#00D1FF" />
                 </View>
              </View>

              <View className="w-[48%] bg-[#11131A] border border-white/5 rounded-2xl p-4 relative overflow-hidden">
                 <View className="flex-row items-center gap-2 mb-2 z-10">
                    <Radio size={14} color="#FF0080" />
                    <Text className="text-white/60 font-bold text-[10px] uppercase tracking-widest">Live Broadcasts</Text>
                 </View>
                 <Text className="text-white font-black text-2xl z-10">3,492</Text>
                 <View className="absolute -bottom-4 -right-4 opacity-5">
                    <Radio size={80} color="#FF0080" />
                 </View>
              </View>

              <View className="w-[48%] bg-[#11131A] border border-white/5 rounded-2xl p-4 relative overflow-hidden">
                 <View className="flex-row items-center gap-2 mb-2 z-10">
                    <Building size={14} color="#00FF66" />
                    <Text className="text-white/60 font-bold text-[10px] uppercase tracking-widest">Active Clubs</Text>
                 </View>
                 <Text className="text-white font-black text-2xl z-10">1,840</Text>
                 <View className="absolute -bottom-4 -right-4 opacity-5">
                    <Building size={80} color="#00FF66" />
                 </View>
              </View>

              <View className="w-[48%] bg-[#11131A] border border-white/5 rounded-2xl p-4 relative overflow-hidden">
                 <View className="flex-row items-center gap-2 mb-2 z-10">
                    <Zap size={14} color="#FFB800" />
                    <Text className="text-white/60 font-bold text-[10px] uppercase tracking-widest">Flash Drops</Text>
                 </View>
                 <Text className="text-white font-black text-2xl z-10">420</Text>
                 <View className="absolute -bottom-4 -right-4 opacity-5">
                    <Zap size={80} color="#FFB800" />
                 </View>
              </View>

           </View>
        </View>

        {/* Global Live Heatmap Preview */}
        <View className="mb-8">
           <View className="flex-row items-center justify-between mb-3 px-2">
              <Text className="text-white/40 font-black text-[10px] uppercase tracking-widest">Live Heatmap</Text>
              <TouchableOpacity className="flex-row items-center">
                 <Text className="text-[#00D1FF] font-bold text-[10px] uppercase tracking-widest mr-1">Expand Map</Text>
                 <Map size={10} color="#00D1FF" />
              </TouchableOpacity>
           </View>
           <View className="w-full h-40 bg-[#11131A] border border-white/5 rounded-3xl overflow-hidden relative items-center justify-center">
              {/* Mock map visual */}
              <View className="absolute inset-0 opacity-20">
                 <View className="w-32 h-32 rounded-full bg-[#00D1FF] absolute top-4 left-10 blur-3xl opacity-30" />
                 <View className="w-40 h-40 rounded-full bg-[#FF0080] absolute bottom-0 right-10 blur-3xl opacity-20" />
                 <View className="w-24 h-24 rounded-full bg-[#00FF66] absolute top-10 right-20 blur-3xl opacity-20" />
              </View>
              
              <View className="bg-[#0D0F14]/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex-row items-center shadow-xl">
                 <Flame size={14} color="#00D1FF" className="mr-2" />
                 <Text className="text-white font-bold text-xs">Global Nightlife Movement Active</Text>
              </View>
           </View>
        </View>

        {/* Management Modules */}
        <View className="mb-10">
           <Text className="text-white/40 font-black text-[10px] uppercase tracking-widest mb-3 px-2">Control Modules</Text>
           <View className="gap-3">
              {ADMIN_MODULES.map(module => (
                 <TouchableOpacity key={module.id} className="bg-[#11131A] border border-white/5 rounded-2xl p-4 flex-row items-center">
                    <View className="w-12 h-12 rounded-xl items-center justify-center mr-4" style={{ backgroundColor: `${module.color}15`, borderColor: `${module.color}30`, borderWidth: 1 }}>
                       <module.icon size={20} color={module.color} />
                    </View>
                    <View className="flex-1">
                       <Text className="text-white font-bold text-base mb-0.5">{module.title}</Text>
                       <Text className="text-[#8e8e93] text-xs font-medium">{module.desc}</Text>
                    </View>
                 </TouchableOpacity>
              ))}
           </View>
        </View>

        {/* System Health */}
        <View className="mb-10">
           <View className="bg-[#00FF66]/10 border border-[#00FF66]/30 rounded-2xl p-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                 <View className="w-2 h-2 rounded-full bg-[#00FF66] mr-3 shadow-[0_0_8px_#00FF66]" />
                 <Text className="text-white font-bold text-sm tracking-wide">All Systems Operational</Text>
              </View>
              <Text className="text-[#00FF66] font-black text-[10px] uppercase tracking-widest">99.99% Uptime</Text>
           </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
