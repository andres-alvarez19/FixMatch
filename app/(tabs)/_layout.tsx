import { Tabs } from 'expo-router';
import React from 'react';
import BottomNavbar from '../../components/BottomNavbar';
import { UserProvider } from '../../contexts/UserContext';

export default function TabsLayout() {
  return (
    <UserProvider>
      <Tabs
        tabBar={props => <BottomNavbar {...props} />}
      >
        <Tabs.Screen name="home" options={{ headerShown: false }} />
        <Tabs.Screen name="tasks" options={{ headerShown: false }} />
        <Tabs.Screen name="plus" options={{ headerShown: false }} />
        <Tabs.Screen name="messages" options={{ headerShown: false }} />
        <Tabs.Screen name="profile" options={{ headerShown: false }} />
      </Tabs>
    </UserProvider>
  );
} 