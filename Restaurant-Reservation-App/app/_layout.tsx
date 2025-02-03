import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router/stack'; 
import "@/global.css"; // Global styles
import { SessionProvider } from "@/context/AuthContext"; // Authentication context

export default function RootLayout() {
  return (

      <SessionProvider>
        <Stack 
          screenOptions={{
            headerStyle: { backgroundColor: "#6200ea" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)/onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/register" />

          <Stack.Screen name="(tabs)" />  
          <Stack.Screen name="(tabs)/profile" />

          <Stack.Screen name="(app)" />     
          <Stack.Screen name="(app)/booktable" /> 
          <Stack.Screen name="(app)/reservation/:restaurantName" />
          <Stack.Screen name="(app)/booking" />
        </Stack>  
      </SessionProvider>

  );
}
