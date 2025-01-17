// app/_layout.tsx
import { Tabs } from 'expo-router';
import { Home, Search, Calendar, User, Map } from 'lucide-react';

export default function TabLayout() {
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
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Search color={color} size={24} />,
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
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
  );
}

