import React, { useState } from "react";
import { View, Text, TextInput, ActivityIndicator, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";

export default function Register() {
  // Icons in SVG format
  const personIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
      <path d="M12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8C16 10.2091 14.2091 12 12 12Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 20C4 16.6863 7.68629 14 12 14C16.3137 14 20 16.6863 20 20" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  `;
  
  const emailIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
      <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  `;
  
  const lockIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
      <path d="M12 16.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97626 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97626 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  `;

  const backArrow = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
    <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>`;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isEmailReg, setIsEmailReg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const { Register, isLoading } = useSession();
  const router = useRouter();

  // Form validation
  const validateForm = () => {
    if (!username || !email || !password || !passwordConfirm) {
      setErrorMessage("Please fill all fields.");
      return false;
    }
    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    setErrorMessage("");
    await Register(email, password, username);
    router.replace("/(auth)/login");
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View className="flex-1 justify-between px-5 py-10 bg-gray-50">
      {/* Header with Back Button */}
      <View className="flex-row items-center mb-4">
        <Pressable onPress={() => router.replace("/(auth)/login")}>
          <SvgXml xml={backArrow} width={32} height={32} style={{ position: 'absolute', color:'#890620', left: 0, top: 0, transform: [{ translateY: -16 }] }} />           
        </Pressable>
        <Text className="flex-1 text-3xl font-bold text-center text-black">Sign Up</Text>
      </View>

      {/* Registration Form */}
      <View>
        <Text className="text-sm text-center text-gray-600 mb-8" style={styles.poppinsRegular}>
          Create an account to get access to various features
        </Text>

        {/* Error Message */}
        {errorMessage ? (
          <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
        ) : null}

        {/* Input fields */}
        <View className="space-y-5">
          {/* Username Input */}
          <View className="relative mb-4">
          <TextInput
              style={styles.poppinsRegular}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              className="block rounded-full w-full px-12 py-4 text-gray-400 bg-white border border-gray-400 shadow-"
            />
            <SvgXml xml={personIcon} width={24} height={24} style={{ position: 'absolute', color:'#890620', left: 12, top: '49%', transform: [{ translateY: -12 }] }} />
          </View>

          {/* Email Input */}
          <View className="relative mb-4">
          <TextInput
              style={styles.poppinsRegular}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              className="block rounded-full w-full px-12 py-4 text-gray-400 bg-white border border-gray-400 shadow-"
            />
            <SvgXml xml={emailIcon} width={24} height={24} style={{ position: 'absolute', color:'#890620',left: 12, top: '49%', transform: [{ translateY: -12 }] }} />
          </View>

          {/* Password Input */}
          <View className="relative mb-4">
            <TextInput
              style={styles.poppinsRegular}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="block rounded-full w-full px-12 py-4 text-gray-400 bg-white border border-gray-400 shadow-"
            />
            <SvgXml xml={lockIcon} width={24} height={24} style={{ position: 'absolute', left: 12, color:'#890620', top: '45%', transform: [{ translateY: -12 }] }} />
          </View>

          {/* Confirm Password Input */}
          <View className="relative">
          <TextInput
              style={styles.poppinsRegular}
              placeholder="Confirm your password"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry
              className="block rounded-full w-full px-12 py-4 text-gray-400 bg-white border border-gray-400 shadow-"
            />
            <SvgXml xml={lockIcon} width={24} height={24} style={{ position: 'absolute', color:'#890620', left: 12, top: '45%', transform: [{ translateY: -12 }] }} />
          </View>

          {/* Register Button */}
          <Pressable
            onPress={handleRegister}
            className="bg-[#FE0000] rounded-full h-[3rem] w-full pt-2 mt-10 align-self-center"
          >
            <Text className="text-white text-center text-lg font-semibold">Register</Text>
          </Pressable>

          {/* Line Break with Text */}
          <View className="flex-row items-center justify-center mt-8 mb-4">
            <View style={{ flex: 1, borderBottomWidth: 1, borderColor: "#ccc" }} />
            <Text className="mx-4 text-sm text-gray-600">Login with</Text>
            <View style={{ flex: 1, borderBottomWidth: 1, borderColor: "#ccc" }} />
          </View>

          {/* Social Login Buttons (Facebook and Google) */}
          <View className="flex-row justify-between">
            <Pressable
              style={{
                width: 148,
                paddingHorizontal:8,
                backgroundColor: "white",
                paddingVertical: 12,
                borderRadius: 999,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              }}
            >
              <Image
                source={require("@/assets/images/facebook.png")}
                style={{ width: 22, height: 20 }}
              />
              <Text className="text-gray-600 text-center">Facebook</Text>
            </Pressable>

            <Pressable
              style={{
                width:148,
                backgroundColor: "white",
                paddingVertical: 12,
                borderRadius: 999,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              }}
            >
              <Image
                source={require("@/assets/images/google.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text className="text-gray-600 text-center">Google</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Bottom Links */}
      <View className="mb-5">
        {/* <Text className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Pressable onPress={() => router.replace("/(auth)/login")}>
            <Text className="font-medium text-blue-300">Login here</Text>
          </Pressable>
        </Text> */}

        {/* Terms and Conditions & Privacy Policy Links */}
        <Text className="w-full text-center text-gray-800">By registering to DineElite Restaurant Reservation App, you agree to </Text>
        <View className="flex-row justify-center mt-4">
          <Pressable onPress={() => router.push("/terms-and-conditions")}>
            <Text className="text-sm text-gray-600">Terms & Conditions</Text>
          </Pressable>
          <Text className="text-sm text-gray-600 mx-2">|</Text>
          <Pressable onPress={() => router.push("/privacy-policy")}>
            <Text className="text-sm text-gray-600">Privacy Policy</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  socialButton: {
    width: "47%",
    backgroundColor: "#f7f7f7",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    

  }
});
