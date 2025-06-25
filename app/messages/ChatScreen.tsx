import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

const mockUser = {
  name: 'Orlando Diggs',
  avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
  online: true,
};

const mockMessages = [
  {
    id: '1',
    text: 'Hola señor, buenos días',
    time: '09:30 am',
    fromMe: true,
    type: 'text',
  },
  {
    id: '2',
    text: 'Buenos días, ¿en qué puedo ayudarte?',
    time: '09:31 am',
    fromMe: false,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    type: 'text',
  },
  {
    id: '3',
    text: 'Vi la vacante de UI/UX Designer que publicaste en LinkedIn ayer y estoy interesado en unirme a tu empresa.',
    time: '09:33 am',
    fromMe: true,
    type: 'text',
  },
  {
    id: '4',
    text: '¡Claro! Por favor, envía tu CV aquí',
    time: '09:35 am',
    fromMe: false,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    type: 'text',
  },
  {
    id: '5',
    file: {
      name: 'Jamet– CV – UI/UX Designer.PDF',
      size: '867 Kb',
      type: 'PDF',
    },
    time: '09:33 am',
    fromMe: true,
    type: 'file',
  },
];

const ChatScreen = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages(prev => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        text: input,
        time: '09:40 am',
        fromMe: true,
        type: 'text',
      },
    ]);
    setInput('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item }: { item: any }) => {
    if (item.type === 'file') {
      return (
        <View className={`w-full flex-row mb-3 ${item.fromMe ? 'justify-end' : 'justify-start'}`}>
          <View className={`rounded-2xl bg-[#FFE082] px-4 py-3 max-w-[75%] flex-row items-center`}>
            <MaterialIcons name="picture-as-pdf" size={40} color="#F44336" />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-[#1A2341]" numberOfLines={1}>{item.file.name}</Text>
              <Text className="text-xs text-gray-500">{item.file.size} {item.file.type}</Text>
            </View>
            <TouchableOpacity className="ml-2">
              <Ionicons name="ellipsis-vertical" size={22} color="#1A2341" />
            </TouchableOpacity>
          </View>
          <Text className="text-xs text-gray-400 self-end ml-2 mb-1">{item.time} <Ionicons name="checkmark-done" size={14} color="#4CAF50" /></Text>
        </View>
      );
    }
    return (
      <View className={`w-full flex-row mb-3 ${item.fromMe ? 'justify-end' : 'justify-start'}`}>
        {!item.fromMe && item.avatar && (
          <Image source={{ uri: item.avatar }} className="w-8 h-8 rounded-full mr-2 self-end" />
        )}
        <View className={`${item.fromMe ? 'bg-[#FFE082]' : 'bg-white'} rounded-2xl px-4 py-3 max-w-[75%]`}>
          <Text className="text-[#1A2341] text-base" style={{ fontFamily: 'inherit' }}>{item.text}</Text>
        </View>
        <Text className="text-xs text-gray-400 self-end ml-2 mb-1">{item.time} {item.fromMe && <Ionicons name="checkmark-done" size={14} color="#4CAF50" />}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#FFFEF7]">
      {/* Header */}
      <View className="pt-12 pb-4 px-4 flex-row items-center justify-between bg-[#FFFEF7] rounded-b-3xl">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={28} color="#6B7280" />
        </TouchableOpacity>
        <View className="flex-row items-center flex-1 ml-4">
          <Image source={{ uri: mockUser.avatar }} className="w-14 h-14 rounded-full mr-4" />
          <View>
            <Text className="font-bold text-lg text-[#1A2341]">{mockUser.name}</Text>
            <View className="flex-row items-center mt-1">
              <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              <Text className="text-green-500 text-xs">En línea</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity className="mx-2">
          <Ionicons name="call-outline" size={26} color="#FFA500" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={26} color="#FFA500" />
        </TouchableOpacity>
        <TouchableOpacity className="ml-2">
          <Ionicons name="ellipsis-vertical" size={26} color="#1A2341" />
        </TouchableOpacity>
      </View>
      {/* Mensajes */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
        className="absolute bottom-0 left-0 right-0 bg-[#FFFEF7] px-4 pb-6 pt-2"
      >
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 shadow">
          <TouchableOpacity>
            <Ionicons name="attach" size={24} color="#B0B0B0" />
          </TouchableOpacity>
          <TextInput
            className="flex-1 ml-2 text-base text-gray-700"
            placeholder="Escribe tu mensaje"
            placeholderTextColor="#B0B0B0"
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity
            className="ml-2 bg-[#20C7C7] w-12 h-12 rounded-full items-center justify-center"
            onPress={handleSend}
          >
            <Ionicons name="send" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen; 