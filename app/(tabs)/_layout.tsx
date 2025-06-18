import React from 'react';
import { Slot, Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';

export default function TabsLayout() {
  if (Platform.OS === 'web') {
    return <Slot />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 },
        sceneStyle: { backgroundColor: Colors.white },
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: Colors.placeholder,
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{ 
            title: 'Feed',
            tabBarIcon: ({ focused }) => (
                <Ionicons 
                    name={focused ? "home-sharp" : "home-outline"}
                    size={24}
                    color={focused ? Colors.black : Colors.placeholder}
                />
            ), 
        }} 
      />
      <Tabs.Screen 
        name="search"
        options={{ 
            title: 'Search',
            tabBarIcon: ({ focused }) => (
                <Ionicons 
                    name="search"
                    size={24}
                    color={focused ? Colors.black : Colors.placeholder}
                />
            ), 
        }}
      />
    </Tabs>
  );
}
