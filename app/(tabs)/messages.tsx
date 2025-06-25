import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from "../../api";
import NoMessages from '../../components/NoMessages';
import { useUser } from '../../contexts/UserContext';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const MessageItem = ({ item, onDelete }: { item: Chat; onDelete: () => void }) => {
    const [translateX] = useState(new Animated.Value(0));
    const [showDelete, setShowDelete] = useState(false);
  
    const handleSwipe = (direction: 'left' | 'right') => {
      Animated.timing(translateX, {
        toValue: direction === 'left' ? -80 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowDelete(direction === 'left'));
    };
  
    const handlePress = () => {
      if (showDelete) {
        handleSwipe('right');
      } else {
        router.push({
          pathname: '/messages/ChatScreen',
          params: { userId: item.id }
        });
      }
    };
  
    return (
      <View className="w-full bg-transparent">
        <Animated.View
          style={{ transform: [{ translateX }] }}
          className="flex-row items-center px-4 py-3 bg-transparent"
        >
          <Image source={{ uri: item.avatar }} className="w-12 h-12 rounded-full mr-4" />
          <View className="flex-1 border-b border-b-gray-200 pb-3">
            <Text className="font-bold text-lg text-[#1A2341]">{item.name}</Text>
            <Text className="text-gray-400 -mt-1" numberOfLines={1}>{item.lastMessage}</Text>
          </View>
          <View className="items-end ml-2">
            <Text className="text-gray-400 text-xs mb-1">{item.time}</Text>
            {item.unread > 0 && (
              <View className="bg-[#FFD600] rounded-full w-6 h-6 items-center justify-center">
                <Text className="text-[#1A2341] font-bold text-xs">{item.unread}</Text>
              </View>
            )}
          </View>
        </Animated.View>
        {showDelete && (
          <TouchableOpacity
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-100 rounded-xl p-4"
            onPress={onDelete}
          >
            <Ionicons name="trash-outline" size={28} color="#FFA500" />
          </TouchableOpacity>
        )}
        <View className="absolute inset-0" style={{ zIndex: 10 }}>
          <TouchableOpacity
            className="flex-1"
            activeOpacity={0}
            onPress={handlePress}
            onLongPress={() => { if (!showDelete) handleSwipe('left'); }}
          />
        </View>
      </View>
    );
};

const MessagesScreen = () => {
  const { id, userType } = useUser();
  const [messages, setMessages] = useState<Chat[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Agrega autenticación si es necesario
    const fetchChats = async () => {
      try {
        const res = await api.get('/api/chats');
        const data = await res.data;
        setMessages(data);
      } catch (error) {
        // Manejo de error
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  const handleDelete = async (id: string) => {
    // Elimina el chat en la API
    try {
      await api.delete(`/api/chats/${id}`);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (error) {
      // Manejo de error
    }
  };

  const filteredMessages = messages.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View className="flex-1 w-full bg-[#FFFEF7]">
      <View className="mx-4 mb-4 mt-14">
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
          <Ionicons name="search" size={22} color="#B0B0B0" />
          <TextInput
            className="flex-1 ml-2 text-base text-gray-700"
            placeholder="Buscar mensaje"
            placeholderTextColor="#B0B0B0"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
      {loading ? (
        <Text className="text-center mt-10 text-gray-400">Cargando chats...</Text>
      ) : filteredMessages.length === 0 ? (
        <NoMessages />
      ) : (
        <FlatList
          data={filteredMessages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MessageItem item={item} onDelete={() => handleDelete(item.id)} />
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default MessagesScreen; 