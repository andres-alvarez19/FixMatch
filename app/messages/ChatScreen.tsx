import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from "../../api";

interface Message {
  id: string;
  text?: string;
  time: string;
  fromMe: boolean;
  avatar?: string;
  type: 'text' | 'file';
  file?: {
    name: string;
    size: string;
    type: string;
  };
}

interface ChatUser {
  name: string;
  avatar: string;
  online: boolean;
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<ChatUser | null>(null);
  const flatListRef = useRef<FlatList>(null);

  // Obtén el chatId de los params
  const { userId: chatId } = useLocalSearchParams<{ userId: string }>();
  const pageSize = 20;

  useEffect(() => {
    setMessages([]);
    setPage(0);
    setHasMore(true);
    fetchMessages(0);
    fetchUser();
    // eslint-disable-next-line
  }, [chatId]);

  const fetchUser = async () => {
    try {
      const res = await api.get(`/api/chats/${chatId}`);
      const data = await res.data;
      setUser(data);
    } catch (error) {
      setUser(null);
    }
  };

  const fetchMessages = async (pageToLoad: number) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await api.get(`/api/messages?chatId=${chatId}&page=${pageToLoad}&size=${pageSize}`);
      const data = await res.data;
      if (data.length < pageSize) setHasMore(false);
      setMessages(prev => [...data.reverse(), ...prev]);
      setPage(pageToLoad + 1);
    } catch (error) {
      // Manejo de error
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (input.trim() === '') return;
    try {
      const res = await api.post('/api/messages', { chatId, text: input }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newMsg = await res.data;
      setMessages(prev => [...prev, newMsg]);
      setInput('');
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    } catch (error) {
      // Manejo de error
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchMessages(page);
    }
  };

  // TODO: Aquí puedes agregar WebSocket/SSE para tiempo real si Spring Boot lo soporta

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
          {user && <Image source={{ uri: user.avatar }} className="w-14 h-14 rounded-full mr-4" />}
          <View>
            <Text className="font-bold text-lg text-[#1A2341]">{user ? user.name : '...'}</Text>
            <View className="flex-row items-center mt-1">
              <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              <Text className="text-green-500 text-xs">{user && user.online ? 'En línea' : 'Desconectado'}</Text>
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
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