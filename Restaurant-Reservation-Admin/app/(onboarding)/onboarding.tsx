import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "@/utils/Icons";

const { width } = Dimensions.get("window");

export default function Onboarding() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      id: 1,
      title: "Welcome to DineElite",
      description:
        "Discover top restaurants and reserve your table with ease. DineElite brings the best dining experiences to your fingertips!",
    },
    {
      id: 2,
      title: "Personalized Dining",
      description:
        "Enjoy tailored recommendations based on your cuisine preferences, location, and dining history.",
    },
    {
      id: 3,
      title: "Book Instantly",
      description:
        "Reserve your table effortlessly and enjoy a seamless dining experience. Dine smarter with DineElite!",
    },
  ];

  const handleScroll = (event) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(page);
  };

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("onboardingComplete", "true");
    router.replace("/(auth)/login"); // Navigate to login after onboarding
  };

  return (
    <View className="flex-1 bg-white">
      {/* Scrollable Pages */}
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      >
        {pages.map((page) => (
          <View key={page.id} style={{ width }} className="flex-1 items-center justify-center px-6">
            <View className="items-center justify-center mb-6">
              <Icons name="logo" color="black" size={86} />
              <Text className="text-3xl font-bold text-black mt-2">DineElite</Text>
            </View>
            <Text className="text-xl font-bold text-black mb-3">{page.title}</Text>
            <Text className="text-base text-center text-black">{page.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View className="flex-row justify-center my-4">
        {pages.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              currentPage === index ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </View>

      {/* Get Started Button */}
      {currentPage === pages.length - 1 ? (
        <TouchableOpacity
          onPress={completeOnboarding}
          className="bg-black py-3 mx-6 rounded-lg"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Get Started
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
