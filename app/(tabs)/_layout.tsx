import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Platform, Image } from 'react-native';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { Home, Compass, MapPin as MapIcon, Calendar, MessageCircle, PhoneOff, Camera } from 'lucide-react-native';

export default function TabsLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View className="flex-1 flex-row bg-[#0D0F14]">
      {/* Sidebar for Desktop */}
      {isDesktop && (
        <View className="w-[80px] h-full bg-[#0D0F14] border-r border-white/10 flex-col items-center py-8">
          <View className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#D400FF] to-[#D900FF] flex items-center justify-center shadow-lg shadow-[#D400FF]/40 mb-10 overflow-hidden">
            <Text className="font-bold text-xl text-white">N</Text>
          </View>
          <View className="flex flex-col gap-8 flex-1">
            <TouchableOpacity onPress={() => router.push('/(tabs)/discover')} className="p-2">
              <Compass size={24} color={pathname === '/discover' ? "#D900FF" : "#94a3b8"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(tabs)/feed')} className="p-2">
              <Home size={24} color={pathname === '/feed' ? "#D900FF" : "#94a3b8"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(tabs)/camera')} className="p-2">
              <Camera size={24} color={pathname === '/camera' ? "#D900FF" : "#94a3b8"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(tabs)/map')} className="p-2">
              <MapIcon size={24} color={pathname === '/map' ? "#D900FF" : "#94a3b8"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(tabs)/chats')} className="p-2">
              <MessageCircle size={24} color={pathname === '/chats' ? "#D900FF" : "#94a3b8"} />
            </TouchableOpacity>
          </View>
          <View className="mt-auto mb-4">
            <View className="w-10 h-10 rounded-full border-2 border-[#D400FF] p-0.5 overflow-hidden">
              <View className="w-full h-full bg-slate-700 rounded-full items-center justify-center">
                <Text className="text-[10px] text-white font-bold">ME</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Main Content Area */}
      <View className="flex-1 relative">
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: isDesktop || pathname === '/camera'
              ? { display: 'none' } 
              : { 
                  position: 'absolute', 
                  bottom: Platform.OS === 'ios' ? 25 : 15, 
                  left: 20, 
                  right: 20, 
                  backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                  borderTopWidth: 0, 
                  height: 70, 
                  paddingBottom: 0, 
                  paddingTop: 0, 
                  borderRadius: 40, 
                  borderWidth: 1,
                  borderColor: 'rgba(138,43,226,0.3)',
                  shadowColor: '#D900FF',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.3,
                  shadowRadius: 15,
                  elevation: 10,
                },
            tabBarActiveTintColor: '#D900FF',
            tabBarInactiveTintColor: '#94a3b8',
            tabBarShowLabel: false,
          }}
        >
          <Tabs.Screen
            name="discover"
            options={{
              title: "Discover",
              tabBarIcon: ({ color }) => <Compass size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="feed"
            options={{
              title: "Feed",
              tabBarIcon: ({ color }) => <Home size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="camera"
            options={{
              title: "Camera",
              tabBarIcon: ({ color }) => (
                <View className="absolute bottom-1.5 w-16 h-16 rounded-full bg-[#D900FF] items-center justify-center shadow-lg shadow-[#D900FF]/40 border-4 border-[#0D0F14]">
                  <Camera size={26} color="#000" />
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="map"
            options={{
              title: "Map",
              tabBarIcon: ({ color }) => <MapIcon size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="chats"
            options={{
              title: "Chats",
              tabBarIcon: ({ color }) => (
                <View className="relative">
                  <MessageCircle size={24} color={color} />
                  {/* Chat Notification Dot */}
                  <View className="absolute -top-1 -right-1 w-3 h-3 bg-[#D900FF] rounded-full border border-[#0D0F14] items-center justify-center">
                     <Text className="text-[#0D0F14] text-[8px] font-bold leading-[8px]">1</Text>
                  </View>
                </View>
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}
