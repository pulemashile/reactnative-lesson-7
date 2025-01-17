import "@/global.css"
import { Stack } from "expo-router";
import { Provider } from 'react-redux';

import store from '@/redux/store';
import { SessionProvider } from "@/context/AuthContext";


export default function RootLayout() 
{
  return (
    // <Provider store={store} children={undefined}>
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

          <Stack.Screen name="(app)" />
          <Stack.Screen name="(app)/activities/:id" />
          <Stack.Screen name="(app)/accommodations/:id" />
          <Stack.Screen name="(app)/restaurants/:id" />
          <Stack.Screen name="(app)/places/:id" />

          {/* <Stack.Screen name="(app)/" /> */}
        </Stack>  
      </SessionProvider>    
    // </Provider>
  
  )
}