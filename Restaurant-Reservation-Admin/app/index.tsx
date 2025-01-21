import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "@/utils/Icons";

const Splash = () => {
  const router = useRouter();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // await AsyncStorage.removeItem("onboardingComplete"); // Debug: Remove onboardingComplete for testing

      const hasCompletedOnboarding = await AsyncStorage.getItem("onboardingComplete");
      if (hasCompletedOnboarding) {
        router.replace("/(auth)/login"); // Skip to login if onboarding is complete
      } else {
        router.replace("/(onboarding)/onboarding"); // Show onboarding
      }
    };

    setTimeout(checkOnboardingStatus, 3000); // Simulate splash screen duration
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
