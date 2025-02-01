import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "@/utils/Icons";

const Splash = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSessionAndOnboardingStatus = async () => {
      // First, check if a valid session exists
      const savedSession = await AsyncStorage.getItem("session");
      if (savedSession) {
        const { timestamp } = JSON.parse(savedSession);
        const currentTime = new Date().getTime();

        // Check if session is still valid (not expired)
        if (currentTime - timestamp < 2 * 24 * 60 * 60 * 1000) {
          // Session is valid, navigate to profile
          router.replace("/(tabs)/profile");
          return;
        } else {
          // Session expired, clear it from AsyncStorage
          await AsyncStorage.removeItem("session");
        }
      }

      // If session is invalid or doesn't exist, check onboarding status
      const hasCompletedOnboarding = await AsyncStorage.getItem("onboardingComplete");
      if (hasCompletedOnboarding) {
        router.replace("/(auth)/login"); // Navigate to login if onboarding complete
      } else {
        router.replace("/(onboarding)/onboarding"); // Show onboarding if not complete
      }
    };

    // Simulate splash screen duration
    setTimeout(checkSessionAndOnboardingStatus, 3000);
  }, [router]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="p-4">
        <Icons name="logo" color="black" size={86} />
      </View>
      <Text className="text-2xl font-bold text-black mb-4">DineElite</Text>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default Splash;
