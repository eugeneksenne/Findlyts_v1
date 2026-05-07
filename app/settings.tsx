import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Switch, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Shield, Bell, Lock, Camera, Map, ChevronRight, LogOut, 
  Building, User, Eye, Layout, MapPin, ShieldAlert, HelpCircle, 
  Info, Flame, Settings2, Globe
} from 'lucide-react-native';

const SETTINGS_SECTIONS = [
  {
    title: 'Account',
    items: [
      { id: 'edit_profile', icon: User, label: 'Edit Profile', type: 'link', href: '/profile/1' },
      { id: 'account_info', icon: Settings2, label: 'Account Information', type: 'link', href: '/user/1' },
    ]
  },
  {
    title: 'Privacy & Visibility',
    items: [
      { id: 'location_vis', icon: MapPin, label: 'Location Visibility', type: 'link', value: 'OFF', href: '/settings-advanced/location-vis' },
      { id: 'profile_vis', icon: Eye, label: 'Profile Visibility', type: 'link', href: '/settings-advanced/profile-vis' },
      { id: 'discoverability', icon: Globe, label: 'Discoverability', type: 'link', href: '/settings-advanced/discoverability' },
    ]
  },
  {
    title: 'Safety',
    items: [
      { id: 'nightguard', icon: Shield, label: 'NightGuard Settings', type: 'link', href: '/nightguard' },
      { id: 'safety_blocking', icon: ShieldAlert, label: 'Safety & Blocking', type: 'link', href: '/settings-advanced/safety-blocking' },
    ]
  },
  {
    title: 'Preferences',
    items: [
      { id: 'notifications', icon: Bell, label: 'Notifications', type: 'link', href: '/settings-advanced/notifications' },
      { id: 'feed', icon: Layout, label: 'Feed & Content', type: 'link', href: '/settings-advanced/feed-content' },
      { id: 'camera', icon: Camera, label: 'Camera & Media', type: 'link', href: '/settings-advanced/camera-media' },
      { id: 'map_loc', icon: Map, label: 'Map & Location', type: 'link', href: '/settings-advanced/map-location' },
    ]
  },
  {
    title: 'Admin Access',
    items: [
      { id: 'club_admin', icon: Building, label: 'Club Admin', type: 'link', badge: 'Active', href: '/admin/club' },
      { id: 'app_admin', icon: Shield, label: 'App Admin', type: 'link', href: '/admin/app' },
    ]
  },
  {
    title: 'Support & About',
    items: [
      { id: 'support', icon: HelpCircle, label: 'Support & Help', type: 'link', href: '/settings-advanced/support' },
      { id: 'about', icon: Info, label: 'About FOMO', type: 'link', href: '/settings-advanced/about' },
    ]
  }
];

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#0D0F14]">
      {/* Header */}
      <View className="px-4 py-4 flex-row items-center justify-between border-b border-white/5 bg-[#0D0F14] z-10">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-white/5">
          <ArrowLeft size={20} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-black tracking-tight">Settings</Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Profile Header Card */}
        <View className="bg-[#151922] border border-white/5 rounded-3xl p-5 mb-6 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
               <View className="w-16 h-16 rounded-full border-2 border-black overflow-hidden mr-4">
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&fit=crop' }} className="w-full h-full" />
               </View>
               <View>
                  <Text className="text-white font-black text-xl mb-1">@sarah_k</Text>
                  <View className="bg-[#0D0F14]/40 border border-[#D900FF]/30 px-2 py-1 rounded-full flex-row items-center self-start">
                     <Flame size={12} color="#D900FF" className="mr-1" />
                     <Text className="text-[#D900FF] font-black text-xs">92 VIBE</Text>
                  </View>
               </View>
            </View>
            <TouchableOpacity className="bg-white/10 px-4 py-2 rounded-full border border-white/20">
               <Text className="text-white font-bold text-xs uppercase tracking-wider">Edit</Text>
            </TouchableOpacity>
        </View>

        {/* Workspace Switcher */}
        <View className="bg-[#151922] border border-[#D900FF]/20 rounded-3xl p-4 mb-8">
          <Text className="text-[#D900FF] font-black text-[10px] uppercase tracking-widest mb-3 px-2">Active Workspace</Text>
          <View className="flex-row items-center justify-between bg-[#0D0F14] rounded-2xl p-3 border border-[#D900FF]/10">
             <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-[#D900FF]/10 border border-[#D900FF]/30 items-center justify-center mr-3">
                   <User size={18} color="#D900FF" />
                </View>
                <View>
                   <Text className="text-white font-bold text-sm">Personal Mode</Text>
                   <Text className="text-[#8e8e93] text-[10px] font-semibold">@sarah_k</Text>
                </View>
             </View>
             <TouchableOpacity className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                <Text className="text-white text-xs font-bold">Switch</Text>
             </TouchableOpacity>
          </View>
        </View>

        {/* Settings Sections */}
        {SETTINGS_SECTIONS.map((section, idx) => (
          <View key={idx} className="mb-8">
             <Text className="text-white/60 font-bold text-xs uppercase tracking-wider mb-3 px-2">{section.title}</Text>
             <View className="bg-[#151922] rounded-3xl border border-white/5 overflow-hidden">
                {section.items.map((item, itemIdx) => (
                   <TouchableOpacity 
                     key={item.id}
                     onPress={() => router.push((item.href || `/settings-advanced/${item.id}`) as any)}
                     className={`flex-row items-center justify-between p-4 ${itemIdx < section.items.length - 1 ? 'border-b border-white/5' : ''}`}
                   >
                     <View className="flex-row items-center">
                        <View className="w-8 h-8 rounded-full bg-white/5 items-center justify-center mr-3">
                           <item.icon size={16} color="#fff" />
                        </View>
                        <Text className="text-white font-bold text-sm tracking-wide">{item.label}</Text>
                     </View>
                     
                     <View className="flex-row items-center gap-2">
                        {item.value && (
                           <Text className="text-[#8e8e93] font-bold text-xs mr-1">{item.value}</Text>
                        )}
                        {item.badge && (
                           <View className="bg-[#FF0080]/20 border border-[#FF0080]/30 px-2 py-0.5 rounded text-center">
                              <Text className="text-[#FF0080] font-black text-[9px] uppercase tracking-wider">{item.badge}</Text>
                           </View>
                        )}
                        <ChevronRight size={16} color="#8e8e93" />
                     </View>
                   </TouchableOpacity>
                ))}
             </View>
          </View>
        ))}

        {/* Logout Section */}
        <View className="mt-4 mb-10 items-center">
           <TouchableOpacity className="w-full flex-row items-center justify-center py-4 rounded-3xl border border-red-500/30 bg-red-500/10 active:bg-red-500/20">
              <LogOut size={20} color="#ff453a" className="mr-2" />
              <Text className="text-[#ff453a] font-black text-sm uppercase tracking-wider">Log Out</Text>
           </TouchableOpacity>
           <Text className="text-[#8e8e93] text-[10px] font-bold mt-6 tracking-widest uppercase">FOMO App v1.0.0 (Build 42)</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

