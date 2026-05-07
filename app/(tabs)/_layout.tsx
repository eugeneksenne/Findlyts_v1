import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Platform } from 'react-native';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { Home, Compass, MapPin as MapIcon, MessageCircle, Camera } from 'lucide-react-native';

const PRIMARY = '#7C3AED';
const ACCENT = '#22D3EE';
const BG = '#07090F';
const SUBTLE = '#94A3B8';

export default function TabsLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => pathname.includes(route);

  return (
    <View className="flex-1 flex-row" style={{ backgroundColor: BG }}>
      {isDesktop && (
        <View className="w-[92px] h-full border-r border-white/10 items-center py-8" style={{ backgroundColor: 'rgba(13,16,24,0.92)' }}>
          <View className="w-14 h-14 rounded-2xl items-center justify-center mb-10" style={{ backgroundColor: PRIMARY }}>
            <Text className="font-black text-xl text-white">F</Text>
          </View>

          <View className="flex flex-col gap-5 flex-1">
            {[
              { key: 'discover', icon: Compass, route: '/(tabs)/discover' },
              { key: 'feed', icon: Home, route: '/(tabs)/feed' },
              { key: 'camera', icon: Camera, route: '/(tabs)/camera' },
              { key: 'map', icon: MapIcon, route: '/(tabs)/map' },
              { key: 'chats', icon: MessageCircle, route: '/(tabs)/chats' },
            ].map((item) => {
              const active = isActive(item.key);
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => router.push(item.route as any)}
                  className="w-12 h-12 rounded-xl items-center justify-center"
                  style={{ backgroundColor: active ? 'rgba(124,58,237,0.2)' : 'transparent', borderWidth: active ? 1 : 0, borderColor: 'rgba(124,58,237,0.45)' }}
                >
                  <Icon size={22} color={active ? '#EDE9FE' : SUBTLE} />
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="w-11 h-11 rounded-full items-center justify-center mt-auto mb-2" style={{ borderWidth: 1.5, borderColor: ACCENT }}>
            <Text className="text-white text-[11px] font-bold">ME</Text>
          </View>
        </View>
      )}

      <View className="flex-1 relative">
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle:
              isDesktop || pathname.includes('/camera')
                ? { display: 'none' }
                : {
                    position: 'absolute',
                    bottom: Platform.OS === 'ios' ? 24 : 14,
                    left: 16,
                    right: 16,
                    backgroundColor: 'rgba(10,14,24,0.9)',
                    borderTopWidth: 0,
                    height: 68,
                    borderRadius: 22,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.09)',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.35,
                    shadowRadius: 20,
                    elevation: 14,
                  },
            tabBarActiveTintColor: '#EDE9FE',
            tabBarInactiveTintColor: SUBTLE,
            tabBarShowLabel: false,
          }}
        >
          <Tabs.Screen name="discover" options={{ tabBarIcon: ({ color }) => <Compass size={22} color={color} /> }} />
          <Tabs.Screen name="feed" options={{ tabBarIcon: ({ color }) => <Home size={22} color={color} /> }} />
          <Tabs.Screen
            name="camera"
            options={{
              tabBarIcon: () => (
                <View className="absolute -bottom-1 w-16 h-16 rounded-full items-center justify-center" style={{ backgroundColor: PRIMARY, borderWidth: 4, borderColor: BG }}>
                  <Camera size={24} color="#FFF" />
                </View>
              ),
            }}
          />
          <Tabs.Screen name="map" options={{ tabBarIcon: ({ color }) => <MapIcon size={22} color={color} /> }} />
          <Tabs.Screen
            name="chats"
            options={{
              tabBarIcon: ({ color }) => (
                <View className="relative">
                  <MessageCircle size={22} color={color} />
                  <View className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                </View>
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}
