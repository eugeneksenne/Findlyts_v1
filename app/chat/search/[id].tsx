import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, Platform, TextInput } from 'react-native';
import { ChevronLeft, Search, X } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ChatSearchScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-[#0D0F14]" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between z-10 w-full mb-2">
        <TouchableOpacity onPress={() => router.back()} className="p-1 -ml-1 flex-row items-center">
          <ChevronLeft size={28} color="#fff" />
          <Text className="text-white font-semibold text-lg ml-2">Search in Chat</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View className="px-4 mb-6 flex-row items-center">
        <View className="bg-[#1c1c1e] rounded-full flex-row items-center px-4 h-12 flex-1 border border-white/5">
          <Search size={18} color="#8e8e93" className="mr-3" />
          <TextInput 
            placeholder="Search in chat..."
            placeholderTextColor="#8e8e93"
            className="flex-1 text-white font-medium text-sm h-full"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
        <TouchableOpacity className="ml-4" onPress={() => router.back()}>
           <Text className="text-[#D900FF] font-semibold text-base">Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
         
         <Text className="text-white/40 font-black text-xs uppercase tracking-widest mb-4">Recent Searches</Text>
         <View className="mb-8">
            <View className="flex-row items-center justify-between py-3 border-b border-white/5">
               <View className="flex-row items-center gap-3">
                  <ClockIcon size={16} color="#8e8e93" />
                  <Text className="text-white font-medium text-base">ticket</Text>
               </View>
               <X size={16} color="#8e8e93" />
            </View>
            <View className="flex-row items-center justify-between py-3">
               <View className="flex-row items-center gap-3">
                  <ClockIcon size={16} color="#8e8e93" />
                  <Text className="text-white font-medium text-base">photo</Text>
               </View>
               <X size={16} color="#8e8e93" />
            </View>
         </View>

         <Text className="text-white/40 font-black text-xs uppercase tracking-widest mb-4">Messages</Text>
         <View className="mb-4">
            <View className="flex-row mb-4 bg-[#1c1c1e] p-3 rounded-2xl border border-white/5">
               <Image source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }} className="w-10 h-10 rounded-full mr-3" />
               <View className="flex-1">
                  <View className="flex-row justify-between mb-1">
                     <Text className="text-white font-bold text-sm">Sarah King</Text>
                     <Text className="text-[#8e8e93] text-[10px]">Yesterday</Text>
                  </View>
                  <Text className="text-[#8e8e93] text-sm">Are you coming for the concert <Text className="text-[#D900FF] font-bold">ticket</Text> tomorrow?</Text>
               </View>
            </View>

            <View className="flex-row mb-4 bg-[#1c1c1e] p-3 rounded-2xl border border-white/5">
               <View className="w-10 h-10 rounded-full mr-3 bg-[#D900FF]/20 items-center justify-center border border-[#D900FF]/30">
                  <Text className="text-[#D900FF] font-bold">You</Text>
               </View>
               <View className="flex-1">
                  <View className="flex-row justify-between mb-1">
                     <Text className="text-white font-bold text-sm">You</Text>
                     <Text className="text-[#8e8e93] text-[10px]">3 days ago</Text>
                  </View>
                  <Text className="text-[#8e8e93] text-sm">I have the <Text className="text-[#D900FF] font-bold">ticket</Text>s!</Text>
               </View>
            </View>

            <View className="flex-row mb-4 bg-[#1c1c1e] p-3 rounded-2xl border border-white/5">
               <Image source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }} className="w-10 h-10 rounded-full mr-3" />
               <View className="flex-1">
                  <View className="flex-row justify-between mb-1">
                     <Text className="text-white font-bold text-sm">Sarah King</Text>
                     <Text className="text-[#8e8e93] text-[10px]">10/05/24</Text>
                  </View>
                  <Text className="text-[#8e8e93] text-sm">Look at this <Text className="text-[#D900FF] font-bold">photo</Text> 😍</Text>
               </View>
            </View>
         </View>

         <TouchableOpacity className="items-center py-4 bg-[#D900FF]/10 rounded-full border border-[#D900FF]/30 mb-8">
            <Text className="text-[#D900FF] font-bold">See More Messages</Text>
         </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// Custom simple clock icon to avoid adding missing dependencies
function ClockIcon({ size, color }: { size: number, color: string }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size/2, borderWidth: 1.5, borderColor: color, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: size*0.4, height: size*0.4, borderLeftWidth: 1.5, borderBottomWidth: 1.5, borderColor: color, marginLeft: size*0.1, marginBottom: size*0.1 }} />
    </View>
  );
}
