import { router } from 'expo-router';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import BottomNavbar from '../components/BottomNavbar';

interface MainLayoutProps {
  children: ReactNode;
  activeIndex?: number;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, activeIndex = 0 }) => {
  return (
    <View className="flex-1 w-full bg-white">
      <View className="flex-1 w-full">
        {children}
      </View>
      <BottomNavbar
        activeIndex={activeIndex}
        onHomePress={() => router.push('/swipe/SpecialistSwipeScreen')}
        onJobsPress={() => router.push('/tasks/TaskScreen')}
        onPlusPress={() => router.push('/register/client/OptionalNewJob')}
        onChatPress={() => router.push('/messages/MessagesScreen')}
        onProfilePress={() => router.push('/register/UserTypeForm')}
      />
    </View>
  );
};

export default MainLayout; 