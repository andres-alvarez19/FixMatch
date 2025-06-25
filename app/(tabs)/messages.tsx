import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Animated, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import NoMessages from '../../components/NoMessages';

const mockMessages = [
    { id: '1', name: 'Andy Robertson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', lastMessage: 'Oh sí, por favor envía tu CV/Res...', time: 'hace 5m', unread: 2 },
    { id: '2', name: 'Giorgio Chiellini', avatar: 'https://randomuser.me/api/portraits/men/33.jpg', lastMessage: 'Hola señor, buenos días', time: 'hace 30m', unread: 0 },
    { id: '3', name: 'Alex Morgan', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', lastMessage: 'Vi la vacante de UI/UX Designer...', time: '09:30 am', unread: 0 },
    { id: '4', name: 'Megan Rapinoe', avatar: 'https://randomuser.me/api/portraits/women/45.jpg', lastMessage: 'Vi la vacante de UI/UX Designer...', time: '01:00 pm', unread: 0 },
    { id: '5', name: 'Alessandro Bastoni', avatar: 'https://randomuser.me/api/portraits/men/46.jpg', lastMessage: 'Vi la vacante de UI/UX Designer...', time: '06:00 pm', unread: 0 },
    { id: '6', name: 'Ilkay Gundogan', avatar: 'https://randomuser.me/api/portraits/men/47.jpg', lastMessage: 'Vi la vacante de UI/UX Designer...', time: 'Ayer', unread: 0 },
];
  
type Message = typeof mockMessages[0];

const MessageItem = ({ item, onDelete }: { item: Message; onDelete: () => void }) => {
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
  const [messages, setMessages] = useState(mockMessages);
  const [search, setSearch] = useState('');

  const handleDelete = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const filteredMessages = messages.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

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
      {filteredMessages.length === 0 ? (
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