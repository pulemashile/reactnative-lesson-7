import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Tabs } from 'expo-router'
import Icons from '@/utils/Icons'
// import { Home, Search, Calendar, User, Map } from 'lucide-react';

const TabLayout = () => {
  return ( 
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: '#4F46E5',
      tabBarInactiveTintColor: '#6B7280',
    }}
  >
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <Icons name="home" color={color} size={24} />,
      }}
    />
    <Tabs.Screen
      name="search"
      options={{
        title: 'Search',
        tabBarIcon: ({ color }) => <Icons name="search" color={color} size={24} />,
      }}
    />
    
    <Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <Icons name="user" color={color} size={24} />,
      }}
    />

    {/* <Tabs.Screen
      name="explore"
      options={{
        title: 'Explore',
        tabBarIcon: ({ color }) => <Map color={color} size={24} />,
      }}
    /> */}
    {/* <Tabs.Screen
      name="Reservations"
      options={{
        title: 'Reservations',
        tabBarIcon: ({ color }) => <Calendar color={color} size={24} />,
      }}
    /> */}
    
  </Tabs>
 )
}

export default TabLayout

const styles = StyleSheet.create({})