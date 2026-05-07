import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Platform, Animated } from 'react-native';
import { Search, Plus, Phone, Video, Users, PhoneCall, Pin, BellOff, Archive, Trash2, CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Swipeable } from 'react-native-gesture-handler';

// Dummy data aligned with the nightlife FOMO use case
const recentChatsData = [
  { id: 1, name: 'Sarah King', message: 'Are we still going out tonight?', time: '07:57', unread: 0, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
  { id: 2, name: 'Mike', message: 'That was amazing 🔥', time: '07:45', unread: 2, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', isReplied: true },
  { id: 3, name: 'James Lee', message: 'I\'ll call you in a bit.', time: 'Yesterday', unread: 0, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', isMissedCall: true },
  { id: 4, name: 'Olivia', message: 'See you tomorrow!', time: 'Yesterday', unread: 1, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop' },
  { id: 5, name: 'Noah', message: 'Photo', time: 'Yesterday', unread: 0, image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=100&h=100&fit=crop', isPhoto: true },
];

export default function ChatsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'friends' | 'groups' | 'calls'>('friends');
  const [activeCallTab, setActiveCallTab] = useState<'all' | 'outgoing' | 'incoming' | 'missed'>('all');

  const callsData = [
    { id: 1, name: 'Sarah King', type: 'audio', direction: 'missed', time: '10:30 AM', duration: null, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
    { id: 2, name: 'Mike', type: 'video', direction: 'outgoing', time: 'Yesterday', duration: '5:42', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { id: 3, name: 'Olivia', type: 'audio', direction: 'incoming', time: 'Yesterday', duration: '12:05', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop' },
    { id: 4, name: 'Trip to Switzerland', type: 'video', direction: 'missed', time: 'Monday', duration: null, image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=100&h=100&fit=crop', isGroup: true },
    { id: 5, name: 'James Lee', type: 'audio', direction: 'outgoing', time: 'Sunday', duration: '2:15', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  ];

  const filteredCalls = callsData.filter(call => {
    if (activeCallTab === 'all') return true;
    if (activeCallTab === 'outgoing') return call.direction === 'outgoing';
    if (activeCallTab === 'incoming') return call.direction === 'incoming';
    if (activeCallTab === 'missed') return call.direction === 'missed';
    return true;
  });

  const renderLeftActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
    return (
      <View className="flex-row items-center h-full mr-2">
        <TouchableOpacity className="bg-[#FF9500]/20 min-w-[60px] h-[80%] my-auto justify-center items-center rounded-l-2xl border border-[#FF9500]/30 ml-2">
          <BellOff size={20} color="#FF9500" />
          <Text className="text-[#FF9500] text-[10px] mt-1 font-semibold">Mute</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#00E5FF]/20 min-w-[60px] h-[80%] my-auto justify-center items-center border-y border-[#00E5FF]/30">
          <Archive size={20} color="#00E5FF" />
          <Text className="text-[#00E5FF] text-[10px] mt-1 font-semibold">Archive</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#ff3b30]/20 min-w-[60px] h-[80%] my-auto justify-center items-center rounded-r-2xl border border-[#ff3b30]/30 mr-2">
          <Trash2 size={20} color="#ff3b30" />
          <Text className="text-[#ff3b30] text-[10px] mt-1 font-semibold">Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
    return (
      <View className="flex-row items-center h-full ml-2">
        <TouchableOpacity className="bg-[#00FF66]/20 min-w-[60px] h-[80%] my-auto justify-center items-center rounded-l-2xl border border-[#00FF66]/30 ml-2">
          <CheckCircle size={20} color="#00FF66" />
          <Text className="text-[#00FF66] text-[10px] mt-1 font-semibold">Read</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#FFD700]/20 min-w-[60px] h-[80%] my-auto justify-center items-center rounded-r-2xl border border-[#FFD700]/30 mr-2">
          <Pin size={20} color="#FFD700" />
          <Text className="text-[#FFD700] text-[10px] mt-1 font-semibold">Pin</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#0D0F14]" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      {/* Top Bar */}
      <View className="px-4 flex-row justify-between items-center mb-4 mt-4 pt-4 z-10">
        <Text className="text-white text-3xl font-black tracking-tight">Chats</Text>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="w-10 h-10 rounded-full bg-[#151922] items-center justify-center border border-white/10">
            <Phone size={18} color="#D900FF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/chat/new')} className="w-10 h-10 rounded-full bg-[#00E5FF] items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <Plus size={20} color="#0D0F14" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View className="px-4 mb-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            onPress={() => setActiveTab('friends')}
            className={`mr-4 pb-1 ${activeTab === 'friends' ? 'border-b-2 border-[#D900FF]' : ''}`}
          >
            <Text className={`font-bold ${activeTab === 'friends' ? 'text-white' : 'text-[#8e8e93]'}`}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('groups')}
            className={`mr-4 pb-1 ${activeTab === 'groups' ? 'border-b-2 border-[#D900FF]' : ''}`}
          >
            <Text className={`font-bold ${activeTab === 'groups' ? 'text-white' : 'text-[#8e8e93]'}`}>Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('calls')}
            className={`mr-4 pb-1 ${activeTab === 'calls' ? 'border-b-2 border-[#D900FF]' : ''}`}
          >
            <Text className={`font-bold ${activeTab === 'calls' ? 'text-white' : 'text-[#8e8e93]'}`}>Calls</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Search Bar */}
      <View className="px-4 mb-6">
        <View className="bg-[#1c1c1e] rounded-full flex-row items-center px-4 h-12">
          <Search size={18} color="#8e8e93" className="mr-3" />
          <TextInput 
            placeholder="Search messages..."
            placeholderTextColor="#8e8e93"
            className="flex-1 text-white font-medium text-sm h-full"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {activeTab === 'friends' && (
           <>
            {/* RECENT CHATS */}
            <Text className="text-[#8e8e93] text-[10px] font-bold uppercase tracking-widest mb-3">RECENT</Text>
            <View className="mb-6">
               {recentChatsData.map((chat, idx) => (
                  <Swipeable
                     key={chat.id}
                     renderLeftActions={renderLeftActions}
                     renderRightActions={renderRightActions}
                     friction={2}
                     leftThreshold={40}
                     rightThreshold={40}
                  >
                     <TouchableOpacity 
                        onPress={() => router.push(`/chat/${chat.id}`)}
                        className="flex-row items-center py-3 bg-[#0D0F14]"
                     >
                        <View className="relative mr-4">
                           <Image source={{ uri: chat.image }} className="w-12 h-12 rounded-full" />
                        </View>
                        
                        <View className="flex-1 pr-2">
                           <View className="flex-row justify-between items-center mb-0.5">
                              <Text className="text-white text-base font-bold">{chat.name}</Text>
                              <Text className={`text-xs font-medium ${chat.unread > 0 ? 'text-white' : 'text-[#8e8e93]'}`}>{chat.time}</Text>
                           </View>
                           <View className="flex-row items-center">
                              {chat.isReplied && <View className="mr-1"><Plus size={12} color="#D900FF" /></View>}
                              {chat.isMissedCall && <View className="mr-1"><Phone size={12} color="#ef4444" /></View>}
                              <Text className={`text-sm flex-1 ${chat.unread > 0 ? 'text-white font-medium' : 'text-[#8e8e93]'}`} numberOfLines={1}>
                                 {chat.message}
                              </Text>
                           </View>
                        </View>
                        
                        {chat.unread > 0 && (
                           <View className="min-w-[20px] h-5 rounded-full bg-[#D900FF] items-center justify-center px-1.5 ml-2">
                              <Text className="text-white text-[11px] font-bold">{chat.unread}</Text>
                           </View>
                        )}
                     </TouchableOpacity>
                  </Swipeable>
               ))}
            </View>
           </>
        )}

        {activeTab === 'groups' && (
           <View className="mb-6 mt-2">
              {[
                 { id: 20, name: 'Trip to Switzerland', message: 'This is going to be epic 🔥', time: '08:34', unread: 0, image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=100&h=100&fit=crop' },
                 { id: 21, name: 'Friday Crew', message: 'We are outside!', time: 'Yesterday', unread: 8, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop' }
              ].map((group) => (
                 <TouchableOpacity 
                    key={group.id}
                    onPress={() => router.push(`/group/${group.id}`)}
                    className="flex-row items-center py-3"
                 >
                    <View className="relative mr-4">
                       <View className="w-12 h-12 rounded-full border border-white/10 overflow-hidden">
                          <Image source={{ uri: group.image }} className="w-full h-full" />
                       </View>
                    </View>
                    <View className="flex-1 pr-2">
                       <View className="flex-row justify-between items-center mb-0.5">
                          <Text className="text-white text-base font-bold">{group.name}</Text>
                          <Text className={`text-xs font-medium ${group.unread > 0 ? 'text-white' : 'text-[#8e8e93]'}`}>{group.time}</Text>
                       </View>
                       <Text className={`text-sm flex-1 ${group.unread > 0 ? 'text-white font-medium' : 'text-[#8e8e93]'}`} numberOfLines={1}>
                          {group.message}
                       </Text>
                    </View>
                    {group.unread > 0 && (
                       <View className="min-w-[20px] h-5 rounded-full bg-[#D900FF] items-center justify-center px-1.5 ml-2">
                          <Text className="text-white text-[11px] font-bold">{group.unread}</Text>
                       </View>
                    )}
                 </TouchableOpacity>
              ))}
           </View>
        )}

        {activeTab === 'calls' && (
           <View className="mb-6 mt-2">
              {/* Call subtabs */}
              <View className="flex-row items-center justify-between bg-[#1c1c1e] rounded-full p-1 mb-6 border border-white/5 mx-2">
                 {['all', 'outgoing', 'incoming', 'missed'].map((tab) => (
                    <TouchableOpacity 
                       key={tab}
                       onPress={() => setActiveCallTab(tab as any)}
                       className={`flex-1 items-center justify-center py-2 rounded-full ${activeCallTab === tab ? 'bg-[#0D0F14] border border-white/10' : ''}`}
                    >
                       <Text className={`text-xs font-bold capitalize ${activeCallTab === tab ? 'text-white' : 'text-[#8e8e93]'}`}>{tab}</Text>
                    </TouchableOpacity>
                 ))}
              </View>

              {filteredCalls.map((call) => (
                 <TouchableOpacity 
                    key={call.id}
                    onPress={() => router.push(`/call/${call.id}`)}
                    className="flex-row items-center py-3"
                 >
                    <View className="relative mr-4">
                       <View className="w-12 h-12 rounded-full overflow-hidden">
                          <Image source={{ uri: call.image }} className="w-full h-full" />
                       </View>
                    </View>
                    <View className="flex-1 pr-2">
                       <View className="flex-row justify-between items-center mb-0.5">
                          <Text className={`text-base font-bold ${call.direction === 'missed' ? 'text-red-500' : 'text-white'}`}>{call.name}</Text>
                          <Text className="text-xs font-medium text-[#8e8e93]">{call.time}</Text>
                       </View>
                       <View className="flex-row items-center gap-1.5 mt-0.5">
                          {call.direction === 'outgoing' && <Phone size={12} color="#8e8e93" className="rotate-45" />}
                          {call.direction === 'incoming' && <Phone size={12} color="#8e8e93" className="rotate-[225deg]" />}
                          {call.direction === 'missed' && <Phone size={12} color="#ef4444" className="rotate-[225deg]" />}
                          <Text className="text-sm text-[#8e8e93]">
                             {call.direction === 'missed' ? 'Missed Call' : call.duration}
                          </Text>
                       </View>
                    </View>
                    <TouchableOpacity onPress={() => router.push(`/call/${call.id}?role=caller&type=${call.type}${call.isGroup ? '&isGroup=true' : ''}`)} className="w-10 h-10 rounded-full bg-white/5 items-center justify-center ml-2 border border-white/5">
                       {call.type === 'video' ? <Video size={18} color="#D900FF" /> : <Phone size={18} color="#D900FF" />}
                    </TouchableOpacity>
                 </TouchableOpacity>
              ))}
           </View>
        )}

      </ScrollView>
    </View>
  );
}
