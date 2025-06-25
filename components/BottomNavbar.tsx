import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface BottomNavbarProps {
  state: {
    index: number;
    routes: { name: string; key: string }[];
  };
  navigation: {
    navigate: (name: string, params?: any) => void;
  };
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({ state, navigation }) => {
  const activeIndex = state.index;

  const navigateTo = (routeName: string) => {
    navigation.navigate(routeName);
  };

  return (
    <View className="flex-row justify-around items-center bg-white border-t border-gray-200 pb-14 pt-4">
      <TouchableOpacity onPress={() => navigateTo('home')} className="flex-1 items-center">
        <Ionicons name="home-outline" size={28} color={activeIndex === 0 ? '#00BFCB' : '#6B7280'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('tasks')} className="flex-1 items-center">
        <MaterialIcons name="work-outline" size={28} color={activeIndex === 1 ? '#00BFCB' : '#6B7280'} />
      </TouchableOpacity>
      <View className="flex-1 items-center">
        <TouchableOpacity onPress={() => navigateTo('plus')} className="w-14 h-14 rounded-full bg-[#00BFCB] items-center justify-center shadow-lg">
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigateTo('messages')} className="flex-1 items-center">
        <Ionicons name="chatbubble-ellipses-outline" size={28} color={activeIndex === 3 ? '#00BFCB' : '#6B7280'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('profile')} className="flex-1 items-center">
        <Feather name="user" size={28} color={activeIndex === 4 ? '#00BFCB' : '#6B7280'} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavbar; 