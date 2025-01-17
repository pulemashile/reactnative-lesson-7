import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
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
      title: "Welcome to ClimaVoyage", 
      description: "Plan your trips based on real-time weather data. Find the best activities for any weather conditions!" 
    },
    { 
      id: 2, 
      title: "Personalized Travel", 
      description: "Get weather forecasts and suggestions for activities based on your preferences and destination." 
    },
    { 
      id: 3, 
      title: "Start Your Journey", 
      description: "Select your destination and let ClimaVoyage guide you to a perfect trip tailored to the weather!" 
    }
  ];

  const handleScroll = (event) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(page);
  };

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("onboardingComplete", "true");
    router.replace("/(auth)/login"); // Navigate to login after completing onboarding
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      >
        {pages.map((page) => (
          <View key={page.id} style={[styles.page, { width }]}>
            <View style={styles.iconLogo }>
              <Icons name="logo" color="black" size={86}/>
              <Text style={styles.title}>ClimaVoyage</Text>
            </View>           
            
            <Text style={styles.title}>{page.title}</Text>
            <Text style={styles.description}>{page.description}</Text>
          </View>
        ))}
      </ScrollView>
      <Button
        title={currentPage === pages.length - 1 ? "Get Started" : "Next"}
        onPress={() =>
          currentPage === pages.length - 1
            ? completeOnboarding()
            : setCurrentPage((prev) => prev + 1)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconLogo:
  {
    padding: 16,
    justifyContent:"center",
    alignItems:"center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // color: "#6200ea",
    color:"black",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    color:"black",
    // color: "#333",
  },
});
