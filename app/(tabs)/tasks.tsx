import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useUser } from '../../contexts/UserContext';
import { useTasks } from '../../hooks/useTasks';

const TaskCard = ({ item }: { item: any }) => (
  <View className="bg-white rounded-2xl p-4 shadow-md mx-4 my-2">
    <Text className="text-sm text-gray-400 mb-4">{item.status}</Text>
    <View className="flex-row justify-between items-start">
      <View>
        <View className="flex-row items-center mb-2">
          <Ionicons name="calendar-outline" size={24} color="#6B7280" />
          <Text className="ml-3 text-base text-gray-700">{item.date}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={24} color="#6B7280" />
          <Text className="ml-3 text-base text-gray-700">{item.time}</Text>
        </View>
      </View>
      <View className="items-center">
        <Image source={{ uri: item.user.avatar }} className="w-12 h-12 rounded-full mb-1" />
        <Text className="text-sm text-gray-600">{item.user.name}</Text>
      </View>
    </View>
    <View className="flex-row border-t border-gray-200 mt-4 pt-3">
      <TouchableOpacity className="flex-1 items-center" onPress={() => router.push('/messages/ChatScreen')}>
        <Text className="text-base text-cyan-500 font-semibold">Chat</Text>
      </TouchableOpacity>
      <View className="w-px h-full bg-gray-200" />
      <TouchableOpacity className="flex-1 items-center">
        <Text className="text-base text-cyan-500 font-semibold">Reservar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const EmptyState = ({ tab }: { tab: string }) => (
  <View className="flex-1 justify-center items-center mt-24">
    <Image
      source={require('../../assets/images/partial-react-logo.png')}
      style={{ width: 100, height: 100, marginBottom: 24 }}
      resizeMode="contain"
    />
    <Text className="text-xl font-bold text-gray-700 mb-2 text-center">
      {tab === 'Scheduled' ? 'No hay tareas agendadas' : 'No hay tareas completadas'}
    </Text>
    <Text className="text-base text-gray-500 text-center px-8">
      {tab === 'Scheduled'
        ? 'Reserva una tarea y aparecerá aquí.'
        : 'Aquí verás tus tareas completadas.'}
    </Text>
  </View>
);

const TasksScreen = () => {
  const { id, userType } = useUser();
  const [activeTab, setActiveTab] = useState('Scheduled');
  const pagerRef = useRef<PagerView>(null);

  const { scheduledTasks, completedTasks, loading, error } = useTasks(id);

  const handleTabPress = (tab: 'Scheduled' | 'Completed', page: number) => {
    setActiveTab(tab);
    pagerRef.current?.setPage(page);
  };

  return (
    <View className="flex-1 bg-[#FFFEF7]">
      {/* Tabs */}
      <View className="flex-row pt-12 justify-around bg-white py-1">
        <TouchableOpacity
          className={`flex-1 items-center py-3 border-b-4 ${activeTab === 'Scheduled' ? 'border-yellow-400' : 'border-transparent'}`}
          onPress={() => handleTabPress('Scheduled', 0)}
        >
          <Text className={`text-lg font-semibold ${activeTab === 'Scheduled' ? 'text-yellow-400' : 'text-gray-400'}`}>Agendadas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 items-center py-3 border-b-4 ${activeTab === 'Completed' ? 'border-yellow-400' : 'border-transparent'}`}
          onPress={() => handleTabPress('Completed', 1)}
        >
          <Text className={`text-lg font-semibold ${activeTab === 'Completed' ? 'text-yellow-400' : 'text-gray-400'}`}>Completadas</Text>
        </TouchableOpacity>
      </View>

      {/* Task List with PagerView */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-500">Cargando tareas...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-red-500">{error || ''}</Text>
        </View>
      ) : (
        <PagerView 
          style={{ flex: 1 }} 
          initialPage={0} 
          ref={pagerRef}
          onPageSelected={(e) => {
            setActiveTab(e.nativeEvent.position === 0 ? 'Scheduled' : 'Completed');
          }}
        >
          <View key="1">
            {scheduledTasks.length === 0 ? (
              <EmptyState tab="Scheduled" />
            ) : (
              <FlatList
                data={scheduledTasks}
                renderItem={({ item }) => <TaskCard item={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingTop: 16 }}
              />
            )}
          </View>
          <View key="2">
            {completedTasks.length === 0 ? (
              <EmptyState tab="Completed" />
            ) : (
              <FlatList
                data={completedTasks}
                renderItem={({ item }) => <TaskCard item={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingTop: 16 }}
              />
            )}
          </View>
        </PagerView>
      )}
    </View>
  );
};

export default TasksScreen; 