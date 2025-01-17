import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "@/utils/Icons";

 const Splash = () =>{
  const router = useRouter();

  useEffect(() => {   

    const checkOnboardingStatus = async () => {
      // await AsyncStorage.removeItem("onboardingComplete");
      
      const hasCompletedOnboarding = await AsyncStorage.getItem("onboardingComplete");
      if (hasCompletedOnboarding) 
      {
        router.replace("/(auth)/login"); // Skip to login if onboarding is complete
      }
      else 
      {
        router.replace("/(onboarding)/onboarding"); // Show onboarding
      }
    };

    setTimeout(checkOnboardingStatus, 3000); // Simulate splash screen duration
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.iconLogo }>
        <Icons name="logo" color="black" size={86}/>
      </View>
      <Text style={styles.title}>ClimateVoyage</Text>
      
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#c",
    marginBottom: 16
  },

  iconLogo:
  {
    padding: 16,
  }
});
