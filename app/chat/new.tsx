import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView, Platform } from 'react-native';
import { ChevronLeft, Search, Plus, CheckCircle2, Users, Edit } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const contactsData = [
  { id: '1', name: 'Sarah King', handle: '@sarahking', selected: true, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
  { id: '2', name: 'Mike', handle: '@mike_w', selected: false, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { id: '3', name: 'Olivia', handle: '@olivia.wilson', selected: false, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop' },
  { id: '4', name: 'James Lee', handle: '@jameslee', selected: false, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  { id: '5', name: 'Emma Wilson', handle: '@emma.wilson', selected: false, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
  { id: '6', name: 'Noah', handle: '@noah.j', selected: false, image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=100&h=100&fit=crop' },
  { id: '7', name: 'Sophia', handle: '@sophia_98', selected: false, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop' },
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function NewChatScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState(contactsData);

  const toggleSelect = (id: string) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, selected: !c.selected } : c));
  };

  const selectedCount = contacts.filter(c => c.selected).length;

  return (
    <SafeAreaView className="flex-1 bg-[#0D0F14]" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between z-10 w-full mb-2">
        <TouchableOpacity onPress={() => router.back()} className="p-1 -ml-1">
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">New Chat</Text>
        <TouchableOpacity className="p-1">
          <Edit size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="px-4 mb-6">
        <View className="bg-[#1c1c1e] rounded-full flex-row items-center px-4 h-12">
          <Search size={18} color="#8e8e93" className="mr-3" />
          <TextInput 
            placeholder="Search friends..."
            placeholderTextColor="#8e8e93"
            className="flex-1 text-white font-medium text-sm h-full"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Create Group Button */}
      <TouchableOpacity className="px-4 flex-row items-center mb-6">
        <View className="w-12 h-12 rounded-full bg-[#D900FF]/20 items-center justify-center mr-4">
          <Users size={20} color="#D900FF" />
        </View>
        <Text className="text-white font-bold text-base">Create Group</Text>
      </TouchableOpacity>

      {/* Contacts List */}
      <View className="flex-1 flex-row relative">
         <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 100 }}>
            {contacts.map((contact, idx) => (
               <TouchableOpacity 
                  key={contact.id} 
                  onPress={() => toggleSelect(contact.id)}
                  className="flex-row justify-between items-center mb-6"
               >
                  <View className="flex-row items-center flex-1">
                     <Image source={{ uri: contact.image }} className="w-12 h-12 rounded-full mr-4" />
                     <View>
                        <Text className="text-white font-bold text-base">{contact.name}</Text>
                        <Text className="text-[#8e8e93] text-sm">{contact.handle}</Text>
                     </View>
                  </View>
                  <View className={`w-6 h-6 rounded-full border ${contact.selected ? 'bg-[#D900FF] border-[#D900FF]' : 'border-[#8e8e93]'} items-center justify-center`}>
                     {contact.selected && <CheckCircle2 size={16} color="#fff" />}
                  </View>
               </TouchableOpacity>
            ))}
         </ScrollView>

         {/* Alphabet Index */}
         <View className="w-8 justify-center items-center py-4 absolute right-0 top-0 bottom-0 pr-2">
            {alphabet.map((letter) => (
               <Text key={letter} className="text-[#8e8e93] text-[10px] font-bold my-[1px]">{letter}</Text>
            ))}
         </View>
      </View>

      {/* Floating Chat Button */}
      {selectedCount > 0 && (
         <View className="absolute bottom-10 left-4 right-4">
            <TouchableOpacity onPress={() => router.push('/chat/1')} className="bg-[#D900FF] p-4 rounded-full items-center shadow-lg shadow-[#D900FF]/50">
               <Text className="text-white font-bold text-lg">Chat ({selectedCount})</Text>
            </TouchableOpacity>
         </View>
      )}

    </SafeAreaView>
  );
}
