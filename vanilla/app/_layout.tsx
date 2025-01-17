import { View, Text } from 'react-native'
import React from 'react'
// import { Stack } from 'expo-router'
import { Stack } from 'expo-router/stack';

const AppLayout = () => {   

    return (
        <Stack>
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
        </Stack>
    );
  
}

export default AppLayout

