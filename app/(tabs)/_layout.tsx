import { Tabs } from 'expo-router';
import React from 'react';
import BottomNavbar from '../../components/BottomNavbar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={props => <BottomNavbar {...props} />}
    >
      <Tabs.Screen name="home" options={{ headerShown: false }} />
      <Tabs.Screen name="tasks" options={{ headerShown: false }} />
      <Tabs.Screen name="plus" options={{ headerShown: false }} />
      <Tabs.Screen name="messages" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  );
} 