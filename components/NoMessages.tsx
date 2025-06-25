import React from 'react';
import { Image, Text, View } from 'react-native';

const NoMessages = () => {
  return (
    <View className="flex-1 justify-center items-center bg-[#FFFEF7]">
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/561/561127.png' }}
        className="w-40 h-40 mb-8"
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold text-[#1A2341] mb-2">No Message</Text>
      <Text className="text-center text-gray-400 text-base px-8">
        You currently have no incoming messages{"\n"}thank you
      </Text>
    </View>
  );
};

export default NoMessages; 