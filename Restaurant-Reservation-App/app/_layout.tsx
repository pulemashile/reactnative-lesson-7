
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";


export default function RootLayout() 
{  
  return (
    <Stack>
      <Stack.Screen name="(onboarding)" options={{headerShown: false}}/>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    </Stack>
  );
}


