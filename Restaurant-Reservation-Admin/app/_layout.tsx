import "@/global.css"
import { SplashScreen, Stack } from "expo-router";
import { Provider } from 'react-redux';

import { SessionProvider } from "@/context/AuthContext";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { BookingProvider } from "@/context/BookingContext";


export default function RootLayout() {
  const [loaded, error] = useFonts({
    poppinsRegular: require("@/assets/fonts/Poppins/Poppins-Regular.ttf"),
    poppinsMedium: require("@/assets/fonts/Poppins/Poppins-Medium.ttf"),
    poppinsSemiBold: require("@/assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    poppinsBold: require("@/assets/fonts/Poppins/Poppins-Bold.ttf"),
    poppinsExtraBold: require("@/assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    poppinsBlack: require("@/assets/fonts/Poppins/Poppins-Black.ttf"),
    poppinsExtraLight: require("@/assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    poppinsitalic: require("@/assets/fonts/Poppins/Poppins-Italic.ttf"),
    poppinsBoldItalic: require("@/assets/fonts/Poppins/Poppins-BoldItalic.ttf"),

  })

  useEffect(() => {
    if (!loaded || error) {
      SplashScreen.hideAsync()
    }

  }, [loaded, error])

  if (!loaded && !error) { return null }

  return (

    <SessionProvider>
      <BookingProvider>
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
          <Stack.Screen name="(app)/Dashboard" />
          <Stack.Screen name="(app)/bookingManager/manage" />
          <Stack.Screen name="(app)/Calender" />
          <Stack.Screen name="(app)/Contacts" />
          <Stack.Screen name="(app)/Mail" />
          <Stack.Screen name="(app)/Settings" />
          <Stack.Screen name="(app)/Logout" />

          {/* <Stack.Screen name="(app)/" /> */}
        </Stack>
      </BookingProvider>
    </SessionProvider>

  )
}