import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, FlatList, Dimensions, Platform } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark, MapPin, Search, ChevronRight, Eye, Users, Zap, Flame, Bell } from 'lucide-react-native';

const FEED_DATA = [
  {
    id: '1',
    type: 'LIVE',
    user: 'sarah_k',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1571182142278-651268ed5341?q=80&w=1080&auto=format&fit=crop',
    title: 'The Vault',
    distance: '2.1km away',
    viewers: '124 watching',
    liveComments: [
      { user: 'Mike', text: 'Vibe is crazy! 🔥' },
      { user: 'Taboo VIP', text: 'Come through 🍾' }
    ]
  },
  {
    id: '2',
    type: 'MOMENT',
    user: 'alfred_99',
    timeAgo: '20m ago',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1080&auto=format&fit=crop',
    title: 'Konka',
    status: '🔥 High Vibe',
  },
  {
    id: '3',
    type: 'FLASHDROP',
    title: 'Ladies Night @ Taboo',
    details: 'Free entry before 11PM. 150+ people just joined.',
    distance: '4.5km away',
    image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1080&auto=format&fit=crop',
  },
  {
    id: '4',
    type: 'SOCIAL',
    title: 'Friends Nearby',
    details: '3 friends are currently at Onyx Club',
    distance: '1.2km away',
    image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1080&q=80',
    friends: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&fit=crop'
    ]
  }
];

export default function FeedScreen() {
  const [activeTab, setActiveTab] = useState('Live Now');
  const windowHeight = Dimensions.get('window').height;
  const itemHeight = Platform.OS === 'web' ? windowHeight : windowHeight;

  const renderItem = ({ item }) => {
    return (
      <View style={{ height: itemHeight, width: '100%', backgroundColor: 'black' }}>
        <ImageBackground 
          source={{ uri: item.image }} 
          className="absolute inset-0 w-full h-full"
          resizeMode={item.type === 'FLASHDROP' ? "cover" : "cover"}
        />
        
        {/* Gradients */}
        <View className="absolute inset-x-0 bottom-0 top-[40%] bg-gradient-to-t from-black via-black/80 to-transparent" />
        <View className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />

        {/* Dynamic Overlay Content based on Type */}
        <View className="absolute bottom-28 left-4 right-16 z-20">
          
          {item.type === 'LIVE' && (
            <View>
              {/* Live Badge */}
              <View className="flex-row items-center mb-3">
                <View className="bg-[#FF0080] px-2 py-1 rounded-sm flex-row items-center mr-3 border border-red-400">
                  <View className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
                  <Text className="text-white text-[11px] font-black tracking-widest">LIVE NOW</Text>
                </View>
                <View className="bg-[#0D0F14]/50 backdrop-blur-md px-2 py-1 rounded-sm flex-row items-center border border-white/20">
                  <Eye size={12} color="#fff" strokeWidth={3} className="mr-1.5" />
                  <Text className="text-white font-bold text-[11px]">{item.viewers}</Text>
                </View>
              </View>

              {/* Title & Info */}
              <Text className="text-white text-3xl font-black mb-1 drop-shadow-lg tracking-tight">{item.title}</Text>
              <View className="flex-row items-center mb-4">
                <MapPin size={14} color="#D900FF" className="mr-1" />
                <Text className="text-[#D900FF] font-bold tracking-wide text-sm">{item.distance}</Text>
              </View>

              {/* Live Comments */}
              <View className="mb-4">
                {item.liveComments.map((c, i) => (
                  <View key={i} className="flex-row items-center mb-1">
                    <Text className="text-white/70 font-bold mr-2 text-sm">{c.user}:</Text>
                    <Text className="text-white font-medium text-sm drop-shadow-md">{c.text}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {item.type === 'MOMENT' && (
            <View>
              <View className="flex-row items-center mb-3">
                <View className="w-10 h-10 rounded-full border-2 border-[#D900FF] overflow-hidden mr-3">
                  <Image source={{ uri: item.avatar }} className="w-full h-full" />
                </View>
                <View>
                  <Text className="text-white font-black text-base">{item.user}</Text>
                  <Text className="text-white/60 font-bold text-xs">{item.timeAgo}</Text>
                </View>
              </View>
              
              <View className="flex-row items-center bg-[#0D0F14]/40 backdrop-blur-md self-start rounded-full px-3 py-1.5 mb-2 border border-white/10">
                <MapPin size={14} color="#D900FF" className="mr-1.5" />
                <Text className="text-white font-bold text-sm">{item.title}</Text>
              </View>
              <View className="flex-row items-center mb-4">
                <Flame size={14} color="#FF0080" className="mr-1" />
                <Text className="text-[#FF0080] font-black text-sm tracking-wide">{item.status}</Text>
              </View>
            </View>
          )}

          {item.type === 'FLASHDROP' && (
            <View>
              <View className="flex-row items-center mb-3 bg-[#D900FF]/10 border border-[#D900FF]/30 self-start px-2 py-1 rounded">
                <Zap size={14} color="#D900FF" className="mr-1.5" />
                <Text className="text-[#D900FF] font-black text-[12px] tracking-widest uppercase">Flash Drop</Text>
              </View>
              <Text className="text-white text-3xl font-black mb-2 drop-shadow-lg tracking-tight leading-tight">{item.title}</Text>
              <Text className="text-white/90 text-sm font-semibold mb-3 leading-5">{item.details}</Text>
              <View className="flex-row items-center mb-4">
                <MapPin size={14} color="#8e8e93" className="mr-1" />
                <Text className="text-[#8e8e93] font-bold text-xs">{item.distance}</Text>
              </View>
            </View>
          )}

          {item.type === 'SOCIAL' && (
            <View>
              <View className="flex-row items-center mb-3 bg-[#D900FF]/20 border border-[#D900FF]/50 self-start px-2 py-1 rounded">
                <Users size={14} color="#d8b4fe" className="mr-1.5" />
                <Text className="text-purple-300 font-black text-[12px] tracking-widest uppercase">Activity</Text>
              </View>
              <Text className="text-white text-2xl font-black mb-2 drop-shadow-lg">{item.title}</Text>
              <Text className="text-white/80 text-sm font-medium mb-4">{item.details}</Text>
              
              <View className="flex-row items-center mb-4">
                <View className="flex-row mr-3">
                  {item.friends.map((f, i) => (
                    <Image key={i} source={{ uri: f }} className={`w-8 h-8 rounded-full border-2 border-black ${i > 0 ? '-ml-3' : ''}`} />
                  ))}
                </View>
                <Text className="text-white/50 font-bold text-xs">{item.distance}</Text>
              </View>
            </View>
          )}

          {/* Core Action Button for all types */}
          <TouchableOpacity className={`self-start h-12 px-6 rounded-full flex-row items-center justify-center border ${item.type === 'LIVE' ? 'bg-[#FF0080] border-[#FF0080]' : 'bg-[#D900FF] border-[#D900FF]'}`}>
            <Text className={`font-black text-sm tracking-wide ${item.type === 'LIVE' ? 'text-white' : 'text-black'}`}>
              {item.type === 'LIVE' ? 'WATCH FULL SCREEN' : 'NAVIGATE THERE'}
            </Text>
            <ChevronRight size={18} color={item.type === 'LIVE' ? '#fff' : '#000'} className="ml-1" />
          </TouchableOpacity>
        </View>

        {/* Global Side Actions (Reactions, Shares) */}
        <View className="absolute bottom-32 right-4 flex-col items-center gap-6 z-20">
          <TouchableOpacity className="items-center">
            <View className="w-10 h-10 bg-[#0D0F14]/40 backdrop-blur-md rounded-full items-center justify-center border border-white/10">
              <Heart size={22} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <View className="w-10 h-10 bg-[#0D0F14]/40 backdrop-blur-md rounded-full items-center justify-center border border-white/10">
              <MessageCircle size={22} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <View className="w-10 h-10 bg-[#0D0F14]/40 backdrop-blur-md rounded-full items-center justify-center border border-white/10 relative">
              <Send size={20} color="#fff" className="-ml-0.5 mt-0.5" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#0D0F14] w-full h-full relative">
      <FlatList
        data={FEED_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        snapToAlignment="start"
        decelerationRate="fast"
      />

      {/* Top Navigation */}
      <View className="absolute top-12 left-0 right-0 px-4 flex-row items-center justify-between z-50 pointer-events-box-none">
        {/* Left: Brand/Location */}
        <View className="flex-row items-center">
          <Text className="text-white font-black text-xl tracking-tighter mr-2">FOMO</Text>
          <View className="bg-white/10 backdrop-blur-md px-2 py-1 rounded border border-white/5">
            <Text className="text-white/80 font-bold text-[10px] uppercase">Joburg</Text>
          </View>
        </View>
        
        {/* Center: Tabs */}
        <View className="flex-row items-center bg-[#0D0F14]/40 backdrop-blur-xl rounded-full p-1 border border-white/10 shadow-lg shadow-black">
          {['For You', 'Live Now', 'Nearby'].map(tab => (
            <TouchableOpacity 
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full ${activeTab === tab ? 'bg-white' : ''}`}
            >
              <Text className={`font-bold text-xs tracking-wide ${activeTab === tab ? 'text-black' : 'text-white/70'}`}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Right: Actions */}
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="w-9 h-9 rounded-full bg-[#0D0F14]/40 backdrop-blur-xl items-center justify-center border border-white/10 relative">
            <Bell size={18} color="#fff" />
            <View className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#FF0080]" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
