import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Shield, ArrowLeft, Users, Clock, MapPin, AlertTriangle, ChevronRight, Plus, CheckCircle2, Battery } from 'lucide-react-native';

const BUDDIES = [
  { id: 1, name: 'Sarah', status: 'Active', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop' },
  { id: 2, name: 'Mike', status: 'Offline', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&fit=crop' },
];

export default function NightGuardScreen() {
  const router = useRouter();
  const [isNightGuardActive, setIsNightGuardActive] = useState(false);
  const [selectedTime, setSelectedTime] = useState('30 min');

  return (
    <SafeAreaView className="flex-1 bg-[#0D0F14]">
      {/* Header */}
      <View className="px-4 py-4 flex-row items-center justify-between border-b border-white/5">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-white/10">
          <ArrowLeft size={20} color="#fff" />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <Shield size={20} color="#00FF66" className="mr-2" />
          <Text className="text-white text-xl font-black tracking-tight">NightGuard</Text>
        </View>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Main Toggle */}
        <View className="bg-[#151922] border border-white/5 rounded-3xl p-5 mb-6 flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-white font-black text-xl mb-1">NightGuard Status</Text>
            <Text className="text-[#8e8e93] text-sm font-medium">
              {isNightGuardActive ? 'Quietly watching out for you.' : 'Activate safety systems for the night.'}
            </Text>
          </View>
          <Switch 
            value={isNightGuardActive}
            onValueChange={setIsNightGuardActive}
            trackColor={{ false: '#333', true: '#00FF66' }}
            thumbColor={isNightGuardActive ? '#000' : '#fff'}
          />
        </View>

        {isNightGuardActive && (
          <View className="bg-[#00FF66]/10 border border-[#00FF66]/30 rounded-2xl p-4 mb-6 flex-row items-center">
             <Shield size={20} color="#00FF66" className="mr-3" />
             <Text className="text-[#00FF66] font-bold text-sm tracking-wide">Monitoring active. Location sharing is permission-based.</Text>
          </View>
        )}

        {/* 1. Walk With Me */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <MapPin size={20} color="#fff" className="mr-2" />
            <Text className="text-white font-black text-xl tracking-tight">Walk With Me</Text>
          </View>
          
          <TouchableOpacity className="bg-[#151922] border border-white/5 rounded-3xl p-5 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 pr-4">
              <View className="w-12 h-12 rounded-full bg-white/5 items-center justify-center border border-white/10 mr-4">
                <MapPin size={24} color="#fff" />
              </View>
              <View>
                <Text className="text-white font-bold text-lg mb-1">Start Session</Text>
                <Text className="text-[#8e8e93] text-xs font-medium">Share live route & ETA with a buddy</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#8e8e93" />
          </TouchableOpacity>
        </View>

        {/* 2. Safety Check */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Clock size={20} color="#fff" className="mr-2" />
              <Text className="text-white font-black text-xl tracking-tight">Safety Check</Text>
            </View>
          </View>
          
          <View className="bg-[#151922] border border-white/5 rounded-3xl p-5">
            <View className="flex-row items-center justify-between mb-4 border-b border-white/5 pb-4">
               <Text className="text-white/80 font-medium">Check on me in:</Text>
               <View className="flex-row bg-white/5 rounded-lg p-1">
                 {['15 min', '30 min', '1 hr'].map(time => (
                   <TouchableOpacity 
                     key={time}
                     onPress={() => setSelectedTime(time)}
                     className={`px-3 py-1.5 rounded-md ${selectedTime === time ? 'bg-[#333]' : ''}`}
                   >
                     <Text className={`font-bold text-xs ${selectedTime === time ? 'text-white' : 'text-[#8e8e93]'}`}>{time}</Text>
                   </TouchableOpacity>
                 ))}
               </View>
            </View>
            
            <TouchableOpacity className="bg-white/10 border border-white/20 rounded-xl py-3 items-center justify-center flex-row">
               <Clock size={16} color="#fff" className="mr-2" />
               <Text className="text-white font-bold text-sm uppercase tracking-wider">Start Countdown</Text>
            </TouchableOpacity>
            <Text className="text-[#8e8e93] text-[10px] text-center mt-3">If ignored, buddies will be notified.</Text>
          </View>
        </View>

        {/* 3. Buddy Pair System */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Users size={20} color="#fff" className="mr-2" />
              <Text className="text-white font-black text-xl tracking-tight">Trusted Buddies</Text>
            </View>
            <TouchableOpacity>
               <Text className="text-[#D900FF] font-bold text-sm tracking-wide">Manage</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row mb-2">
            <TouchableOpacity className="items-center mr-6">
               <View className="w-14 h-14 rounded-full bg-white/5 border border-dashed border-white/30 items-center justify-center mb-2">
                 <Plus size={24} color="#fff" />
               </View>
               <Text className="text-white/80 font-bold text-[10px]">Add Buddy</Text>
            </TouchableOpacity>
            
            {BUDDIES.map(buddy => (
               <View key={buddy.id} className="items-center mr-6">
                 <View className="relative">
                   <Image source={{ uri: buddy.image }} className="w-14 h-14 rounded-full mb-2" />
                   {buddy.status === 'Active' && (
                     <View className="absolute bottom-2 right-0 w-3.5 h-3.5 rounded-full bg-[#D900FF] border-2 border-black" />
                   )}
                 </View>
                 <Text className="text-white font-bold text-[11px] mb-0.5">{buddy.name}</Text>
                 <Text className="text-[#8e8e93] text-[9px] font-semibold">{buddy.status}</Text>
               </View>
            ))}
          </View>
        </View>

        {/* 4. Emergency Trigger */}
        <View className="mb-6 mt-4">
          <TouchableOpacity className="bg-[#FF0080]/10 border border-[#FF0080]/50 rounded-3xl p-6 flex-row items-center justify-center active:scale-95 duration-200">
             <AlertTriangle size={24} color="#FF0080" className="mr-3" />
             <Text className="text-[#FF0080] font-black text-xl tracking-wider uppercase">Emergency Help</Text>
          </TouchableOpacity>
          <Text className="text-[#8e8e93] text-xs text-center mt-3 mb-6 px-4">Shares live location, battery (14%), and alerts buddies instantly.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
