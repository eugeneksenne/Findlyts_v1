import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function SettingsDetailScreen() {
  const router = useRouter();
  const { section } = useLocalSearchParams<{ section: string }>();

  return (
    <SafeAreaView className="flex-1 bg-[#0D0F14]">
      <View className="px-4 py-4 flex-row items-center border-b border-white/5">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-white/5 mr-3">
          <ArrowLeft size={20} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-black">Settings</Text>
      </View>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-white text-lg font-bold text-center mb-3 capitalize">{(section || 'setting').replace('-', ' ')}</Text>
        <Text className="text-[#8e8e93] text-center">This settings section is connected and ready for detailed implementation.</Text>
      </View>
    </SafeAreaView>
  );
}
