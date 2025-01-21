import React, { useState } from "react";
import { View, Text, TextInput, ActivityIndicator, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function Register() {
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
    router.replace("/(app)/home");
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View className="flex-1 justify-between px-5 py-10 bg-gray-50">
      {/* Header with Back Button */}
      <View className="flex-row items-center mb-4">
        <Pressable onPress={() => router.replace("/(auth)/login")}>
          {/* <MaterialIcons name="arrow-back" size={24} color="black" /> */}
          <Text>◀</Text>
        </Pressable>
        <Text className="flex-1 text-3xl font-bold text-center text-black ">Sign Up</Text>
      </View>

      {/* Registration Form */}
      <View>
        <Text className="text-sm text-center text-gray-600 mb-8">
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
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              className="block rounded-full w-full px-10 py-4 text-gray-400 bg-white border border-gray-400 shadow-"
            />
            <MaterialIcons
              name="person"
              size={24}
              color="gray"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
          </View>

          {/* Email Input */}
          <View className="relative mb-4">
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              className="block rounded-full w-full px-10 py-4 text-gray-400 bg-white border border-gray-400 shadow-"
            />
            <MaterialIcons
              name="email"
              size={24}
              color="gray"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
          </View>

          {/* Password Input */}
          <View className="relative mb-4">
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="block rounded-full w-full shadow-sm px-10 py-4 text-gray-400 bg-white border border-gray-400"
            />
            <MaterialIcons
              name="lock"
              size={24}
              color="gray"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
          </View>

          {/* Confirm Password Input */}
          <View className="relative">
            <TextInput
              placeholder="Confirm your password"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry
              className="block rounded-full w-full shadow-sm px-10 py-4 text-gray-400 bg-white border border-gray-400"
            />
            <MaterialIcons
              name="lock"
              size={24}
              color="gray"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
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
        <Text className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Pressable onPress={() => router.replace("/(auth)/login")}>
            <Text className="font-medium text-blue-300">Login here</Text>
          </Pressable>
        </Text>

        {/* Terms and Conditions & Privacy Policy Links */}
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
