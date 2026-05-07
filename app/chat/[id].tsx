import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView, ImageBackground, Image, Modal, Pressable, Platform, KeyboardAvoidingView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Phone, Video, MoreVertical, Plus, Smile, Mic, CheckCheck, Play, MoreHorizontal, MapPin, MessageSquare, Phone as PhoneIcon, User, Users, BellOff, Ban, AlertTriangle, Image as ImageIcon, Camera, MapPin as LocationIcon, Contact, BarChart2, Edit, Pin } from 'lucide-react-native';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [showMessageOptions, setShowMessageOptions] = useState(false);

  const navigateToInfo = () => router.push(`/chat/info/${id}`);

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
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }} 
                className="w-10 h-10 rounded-full"
              />
            </View>
            <View>
              <View className="flex-row items-center gap-1">
                <Text className="text-white text-base font-bold">Sarah King</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                 <View className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" />
                 <Text className="text-[#00FF66] text-xs font-semibold">Online</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.push(`/call/${id}?role=caller&type=voice`)}>
            <Phone size={20} color="#D900FF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/call/${id}?role=caller&type=video`)}>
            <Video size={24} color="#D900FF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MoreVertical size={20} color="#8e8e93" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingVertical: 20 }}>
        <View className="items-center mb-6">
          <View className="bg-[#1c1c1e] px-3 py-1 rounded-full border border-white/5">
             <Text className="text-[#8e8e93] text-[10px] font-bold">Today</Text>
          </View>
        </View>

        {/* Received Message with profile pic */}
        <View className="flex-row items-end mb-6 w-full">
          <Image source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }} className="w-8 h-8 rounded-full mr-2" />
          <View className="items-start items-start">
             <TouchableOpacity onLongPress={() => setShowMessageOptions(true)} className="bg-[#1c1c1e] rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%] border border-white/5">
                <Text className="text-white text-[15px] leading-5">Hey! Are we still going out tonight?</Text>
             </TouchableOpacity>
          </View>
        </View>

        {/* Sent Message */}
        <View className="items-start mb-6 w-full relative xl:pb-0">
          <TouchableOpacity onLongPress={() => setShowMessageOptions(true)} className="bg-[#D900FF] rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%] self-end shadow-[0_0_15px_rgba(217,0,255,0.2)]">
             <Text className="text-white text-[15px] leading-5 font-medium">Yep! 8 PM at the usual place?</Text>
          </TouchableOpacity>
          <View className="self-end flex-row items-center gap-1 mt-1 pr-1">
            <Text className="text-[#D900FF] font-semibold text-[10px]">07:46</Text>
            <CheckCheck size={14} color="#D900FF" />
          </View>
        </View>

        {/* Received Message with emoji */}
        <View className="flex-row items-end mb-6 w-full">
          <Image source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }} className="w-8 h-8 rounded-full mr-2" />
          <View className="items-start w-[85%]">
             <TouchableOpacity onLongPress={() => setShowMessageOptions(true)} className="bg-[#1c1c1e] rounded-2xl rounded-bl-sm px-4 py-3 border border-white/5 flex-row items-center justify-between">
                <Text className="text-white text-[15px] leading-5 mr-3">Yesss! Can't wait 😍</Text>
                <Text className="text-[#8e8e93] text-[10px] mt-1 self-end">07:46</Text>
             </TouchableOpacity>
          </View>
        </View>

        {/* Sent Message */}
        <View className="items-start mb-6 w-full relative">
          <TouchableOpacity onLongPress={() => setShowMessageOptions(true)} className="bg-[#D900FF] rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%] self-end shadow-[0_0_15px_rgba(217,0,255,0.2)]">
             <Text className="text-white text-[15px] leading-5 font-medium">Great! See you soon ✨</Text>
          </TouchableOpacity>
          <View className="self-end flex-row items-center gap-1 mt-1 pr-1">
            <Text className="text-[#D900FF] font-semibold text-[10px]">07:47</Text>
            <CheckCheck size={14} color="#D900FF" />
          </View>
        </View>

        {/* Sent Image */}
        <View className="items-start mb-6 w-full relative">
           <TouchableOpacity onLongPress={() => setShowMessageOptions(true)} className="self-end overflow-hidden border border-white/10 rounded-2xl p-1 bg-[#1c1c1e]">
              <ImageBackground 
                 source={{ uri: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&fit=crop' }} 
                 className="w-64 h-40 justify-end p-2 rounded-xl overflow-hidden"
                 imageStyle={{ borderRadius: 12 }}
              >
                 <View className="flex-row justify-end items-center mt-auto">
                    <Text className="text-white text-[10px] font-bold drop-shadow-md bg-black/40 px-1.5 py-0.5 rounded mr-1">07:48</Text>
                    <CheckCheck size={14} color="#00FF66" />
                 </View>
              </ImageBackground>
           </TouchableOpacity>
        </View>

        {/* Received Emojis */}
        <View className="flex-row items-end mb-6 w-full">
          <Image source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }} className="w-8 h-8 rounded-full mr-2" />
          <View className="items-start w-[85%]">
             <TouchableOpacity onLongPress={() => setShowMessageOptions(true)} className="bg-[#1c1c1e] rounded-2xl rounded-bl-sm px-4 py-3 border border-white/5 flex-row items-center justify-between">
                <Text className="text-white text-[20px] leading-6 mr-3">😍 😍 😍</Text>
                <Text className="text-[#8e8e93] text-[10px] mt-1 self-end">07:48</Text>
             </TouchableOpacity>
          </View>
        </View>

        {/* Sent Voice Message */}
        <View className="items-start mb-6 w-full relative">
          <TouchableOpacity onLongPress={() => setShowMessageOptions(true)} className="bg-[#1c1c1e] border border-white/5 rounded-2xl rounded-br-sm px-4 py-3 w-[70%] self-end">
             <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-[#D900FF] items-center justify-center pl-1">
                   <Play size={16} fill="#fff" color="#fff" />
                </View>
                <View className="flex-1">
                   {/* Dummy waveform */}
                   <View className="flex-row items-center h-6 gap-0.5 w-full overflow-hidden">
                      {[1,3,2,5,8,4,9,3,2,6,10,7,4,8,5,2,4,3,1,5,7,4,6].map((h, i) => (
                         <View key={i} className="w-1 bg-[#D900FF] rounded-full" style={{ height: Math.max(h * 2, 4) }} />
                      ))}
                   </View>
                   <View className="flex-row items-center justify-between mt-1">
                      <Text className="text-[#8e8e93] text-[10px] font-medium">0:12</Text>
                      <View className="flex-row items-center">
                         <Text className="text-[#8e8e93] text-[10px] font-semibold tracking-tighter mr-1">07:49</Text>
                         <CheckCheck size={14} color="#D900FF" />
                      </View>
                   </View>
                </View>
             </View>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
         <View className="px-4 py-3 flex-row items-center gap-3 bg-[#0D0F14]">
            <TouchableOpacity onPress={() => setShowMediaPicker(true)} className="w-10 h-10 rounded-full bg-white/5 items-center justify-center border border-white/10">
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

      {/* Media Picker Modal */}
      <Modal transparent visible={showMediaPicker} animationType="slide" onRequestClose={() => setShowMediaPicker(false)}>
        <View className="flex-1 justify-end bg-black/60">
           <Pressable className="absolute top-0 bottom-0 left-0 right-0 w-full h-full" onPress={() => setShowMediaPicker(false)} />
           <View className="bg-[#151922] rounded-t-[40px] px-6 pt-3 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
              <View className="w-12 h-1 bg-white/20 rounded-full self-center mb-6" />
              
              {/* Media Options */}
              <View className="flex-row justify-between mb-8">
                 <View className="items-center">
                    <TouchableOpacity className="w-14 h-14 bg-white/5 rounded-2xl items-center justify-center mb-2 border border-white/5">
                       <ImageIcon size={24} color="#D900FF" />
                    </TouchableOpacity>
                    <Text className="text-white text-xs font-semibold">Gallery</Text>
                 </View>
                 <View className="items-center">
                    <TouchableOpacity className="w-14 h-14 bg-white/5 rounded-2xl items-center justify-center mb-2 border border-white/5">
                       <Camera size={24} color="#FF0080" />
                    </TouchableOpacity>
                    <Text className="text-white text-xs font-semibold">Camera</Text>
                 </View>
                 <View className="items-center">
                    <TouchableOpacity className="w-14 h-14 bg-white/5 rounded-2xl items-center justify-center mb-2 border border-white/5">
                       <LocationIcon size={24} color="#00FF66" />
                    </TouchableOpacity>
                    <Text className="text-white text-xs font-semibold">Location</Text>
                 </View>
                 <View className="items-center">
                    <TouchableOpacity className="w-14 h-14 bg-white/5 rounded-2xl items-center justify-center mb-2 border border-white/5">
                       <Contact size={24} color="#00E5FF" />
                    </TouchableOpacity>
                    <Text className="text-white text-xs font-semibold">Contact</Text>
                 </View>
                 <View className="items-center">
                    <TouchableOpacity className="w-14 h-14 bg-white/5 rounded-2xl items-center justify-center mb-2 border border-white/5">
                       <BarChart2 size={24} color="#FFA500" />
                    </TouchableOpacity>
                    <Text className="text-white text-xs font-semibold">Poll</Text>
                 </View>
              </View>

              <View className="flex-row justify-between items-center mb-4">
                 <Text className="text-white font-bold text-base">Recents</Text>
                 <TouchableOpacity><Text className="text-[#D900FF] font-bold text-xs">See All</Text></TouchableOpacity>
              </View>

              <View className="flex-row flex-wrap justify-between gap-y-2">
                 {[ 
                    `https://images.unsplash.com/photo-1470225620880-dba8ba36b745?w=200&fit=crop`,
                    `https://images.unsplash.com/photo-1545128485-c400e7702796?w=200&fit=crop`,
                    `https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&fit=crop`,
                    `https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=200&fit=crop`,
                    `https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&fit=crop`,
                    `https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&fit=crop`
                 ].map((img, i) => (
                    <TouchableOpacity key={i} className="w-[32%] aspect-square rounded-xl overflow-hidden relative">
                       <Image source={{ uri: img }} className="w-full h-full" />
                       <View className="absolute bottom-1 right-1 bg-black/50 px-1 rounded">
                          <Text className="text-white text-[9px] font-bold">0:16</Text>
                       </View>
                    </TouchableOpacity>
                 ))}
              </View>
           </View>
        </View>
      </Modal>

      {/* Message Options Modal */}
      <Modal transparent visible={showMessageOptions} animationType="fade" onRequestClose={() => setShowMessageOptions(false)}>
        <View className="flex-1 bg-black/60 justify-center items-center">
           <Pressable className="absolute top-0 bottom-0 left-0 right-0 w-full h-full" onPress={() => setShowMessageOptions(false)} />
           <View className="w-[80%] bg-[#1c1c1e] rounded-3xl p-2 border border-white/10 shadow-xl z-20">
              {/* Reactions */}
              <View className="flex-row justify-between bg-[#0D0F14] p-3 rounded-2xl mb-4 border border-white/5">
                 {['❤️', '👍', '😂', '😮', '😢', '🔥'].map((emoji, idx) => (
                    <TouchableOpacity key={idx} className="w-10 h-10 rounded-full bg-white/5 items-center justify-center pt-2" onPress={() => setShowMessageOptions(false)}>
                       <Text className="text-xl align-middle leading-tight">{emoji}</Text>
                    </TouchableOpacity>
                 ))}
              </View>

              {/* Options */}
              <View className="bg-[#0D0F14] rounded-2xl border border-white/5 overflow-hidden">
                 <TouchableOpacity onPress={() => setShowMessageOptions(false)} className="flex-row items-center justify-between p-4 border-b border-white/5">
                    <View className="flex-row items-center gap-3">
                       <ChevronLeft size={20} color="#fff" className="rotate-180" />
                       <Text className="text-white font-semibold text-base">Reply</Text>
                    </View>
                    <ChevronLeft size={16} color="#8e8e93" className="rotate-180" />
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => setShowMessageOptions(false)} className="flex-row items-center justify-between p-4 border-b border-white/5">
                    <View className="flex-row items-center gap-3">
                       <MoreHorizontal size={20} color="#fff" />
                       <Text className="text-white font-semibold text-base">Forward</Text>
                    </View>
                    <ChevronLeft size={16} color="#8e8e93" className="rotate-180" />
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => setShowMessageOptions(false)} className="flex-row items-center justify-between p-4 border-b border-white/5">
                    <View className="flex-row items-center gap-3">
                       <Text className="text-white font-bold ml-1">📄</Text>
                       <Text className="text-white font-semibold text-base ml-1">Copy</Text>
                    </View>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => setShowMessageOptions(false)} className="flex-row items-center justify-between p-4 border-b border-white/5">
                    <View className="flex-row items-center gap-3">
                       <Edit size={20} color="#fff" />
                       <Text className="text-white font-semibold text-base">Edit</Text>
                    </View>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => setShowMessageOptions(false)} className="flex-row items-center justify-between p-4 border-b border-white/5">
                    <View className="flex-row items-center gap-3">
                       <Pin size={20} color="#fff" />
                       <Text className="text-white font-semibold text-base">Pin Message</Text>
                    </View>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => setShowMessageOptions(false)} className="flex-row items-center justify-between p-4 border-b border-white/5">
                    <View className="flex-row items-center gap-3">
                       <Ban size={20} color="#ef4444" />
                       <Text className="text-red-500 font-semibold text-base">Delete</Text>
                    </View>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => setShowMessageOptions(false)} className="flex-row items-center justify-between p-4">
                    <View className="flex-row items-center gap-3">
                       <MoreHorizontal size={20} color="#fff" />
                       <Text className="text-white font-semibold text-base">More...</Text>
                    </View>
                 </TouchableOpacity>
              </View>
           </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
