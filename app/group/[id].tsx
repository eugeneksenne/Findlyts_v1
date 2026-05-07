import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView, ImageBackground, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Phone, Video, Plus, Smile, Mic, CheckCheck, MoreHorizontal } from 'lucide-react-native';

export default function GroupChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('');

  const navigateToInfo = () => router.push(`/group/info/${id}`);

  return (
    <SafeAreaView className="flex-1 bg-[#0D0F14]" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between z-10 bg-[#0D0F14]">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()} className="p-1 -ml-1">
            <ChevronLeft size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-row items-center gap-3"
            onPress={navigateToInfo}
          >
            <View className="relative">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=100&h=100&fit=crop' }} 
                className="w-10 h-10 rounded-full"
              />
            </View>
            <View>
              <Text className="text-white text-base font-bold">Trip to Switzerland</Text>
              <Text className="text-[#8e8e93] text-xs">6 members, 3 online</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.push(`/call/${id}?role=caller&type=voice&isGroup=true`)}>
            <Phone size={20} color="#D900FF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/call/${id}?role=caller&type=video&isGroup=true`)}>
            <Video size={24} color="#D900FF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingVertical: 20 }}>
        
        {/* Mike Message */}
        <View className="flex-row items-start mb-6 w-full">
          <Image source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }} className="w-8 h-8 rounded-full mr-2 mt-1" />
          <View className="items-start items-start">
             <Text className="text-[#8e8e93] text-xs font-semibold mb-1 ml-1">Mike</Text>
             <View className="bg-[#1c1c1e] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] border border-white/5">
                <Text className="text-white text-[15px] leading-5">Guys! Here's the plan for our trip next month. Let me know your thoughts.</Text>
                <Text className="text-[#8e8e93] text-[10px] mt-1 self-end">08:30</Text>
             </View>
             
             {/* File Attachment */}
             <View className="bg-[#1c1c1e] rounded-2xl p-3 border border-white/5 mt-2 flex-row items-center w-64">
                <View className="w-10 h-10 bg-red-500/20 rounded-xl items-center justify-center mr-3 border border-red-500/30">
                   <Text className="text-red-500 font-bold text-xs">PDF</Text>
                </View>
                <View className="flex-1">
                   <Text className="text-white font-semibold text-xs mb-0.5" numberOfLines={1}>Switzerland_Trip_Plan.pdf</Text>
                   <Text className="text-[#8e8e93] text-[10px]">2.4 MB • PDF</Text>
                </View>
             </View>
             <Text className="text-[#8e8e93] text-[10px] mt-1 self-end right-2">08:31</Text>
          </View>
        </View>

        {/* Olivia Message */}
        <View className="flex-row items-start mb-6 w-full">
          <Image source={{ uri: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop' }} className="w-8 h-8 rounded-full mr-2 mt-1" />
          <View className="items-start max-w-[85%]">
             <Text className="text-[#D900FF] text-xs font-semibold mb-1 ml-1">Olivia</Text>
             <View className="bg-[#1c1c1e] rounded-2xl rounded-tl-sm px-4 py-3 border border-white/5 flex-row items-center justify-between">
                <Text className="text-white text-[15px] leading-5 mr-3">Looks amazing! 😍</Text>
                <Text className="text-[#8e8e93] text-[10px] mt-1 self-end">08:32</Text>
             </View>
          </View>
        </View>

        {/* James Lee Message */}
        <View className="flex-row items-start mb-6 w-full">
          <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' }} className="w-8 h-8 rounded-full mr-2 mt-1" />
          <View className="items-start max-w-[85%]">
             <Text className="text-[#00FF66] text-xs font-semibold mb-1 ml-1">James Lee</Text>
             <View className="bg-[#1c1c1e] rounded-2xl rounded-tl-sm px-4 py-3 border border-white/5 flex-row items-center justify-between">
                <Text className="text-white text-[15px] leading-5 mr-3">Count me in! 🙌</Text>
                <Text className="text-[#8e8e93] text-[10px] mt-1 self-end">08:33</Text>
             </View>
          </View>
        </View>

        {/* Sent Message */}
        <View className="items-start mb-6 w-full relative">
          <View className="bg-[#D900FF] rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%] self-end shadow-[0_0_15px_rgba(217,0,255,0.2)]">
             <Text className="text-white text-[15px] leading-5 font-medium">This is going to be epic 🔥</Text>
          </View>
          <View className="self-end flex-row items-center gap-1 mt-1 pr-1">
            <Text className="text-[#D900FF] font-semibold text-[10px]">08:34</Text>
            <CheckCheck size={14} color="#D900FF" />
          </View>
        </View>

      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
         <View className="px-4 py-3 flex-row items-center gap-3 bg-[#0D0F14]">
            <TouchableOpacity className="w-10 h-10 rounded-full bg-white/5 items-center justify-center border border-white/10">
               <Plus size={24} color="#8e8e93" />
            </TouchableOpacity>
            
            <View className="flex-1 flex-row items-center bg-[#1c1c1e] rounded-full px-4 py-2 border border-white/5">
               <TextInput
                  placeholder="Type a message..."
                  placeholderTextColor="#8e8e93"
                  className="flex-1 text-white text-base max-h-32 min-h-[32px] py-1"
                  value={message}
                  onChangeText={setMessage}
                  multiline
               />
               <TouchableOpacity className="ml-2">
                  <Smile size={20} color="#8e8e93" />
               </TouchableOpacity>
            </View>

            <TouchableOpacity className="w-10 h-10 rounded-full bg-[#D900FF] items-center justify-center shadow-[0_0_15px_rgba(217,0,255,0.4)]">
               <Mic size={20} color="#fff" />
            </TouchableOpacity>
         </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}
