import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';


import { 
  Home, 
  Heart, 
  Search, 
  ShoppingBag, 
} from 'lucide-react-native';

export default function TabLayout() {
  const activeColor = '#F8810B';
  const inactiveColor = '#000000';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: -0.1,
          fontFamily: 'OnestMedium',
          paddingBottom: Platform.OS === 'ios' ? 0 : 4,
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingTop: 8,
        },

        
      }}>
      <Tabs.Screen
        name="index"
        
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home size={27} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
          headerShown:false
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          title: 'Favourite',
          tabBarIcon: ({ color, focused }) => (
            <Heart size={27} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Search size={27} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Order',
          tabBarIcon: ({ color, focused }) => (
            <ShoppingBag size={27} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}