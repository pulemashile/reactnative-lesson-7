import React, { useState } from "react";
import {ActivityIndicator, View, Text, TextInput, Button, StyleSheet, Pressable, Image } from "react-native";
import { useSession } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import Icons from "@/utils/Icons";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailLogin, setIsEmailLogin] = useState(true); // Toggling email login or password login
  
  const { SignIn, isLoading } = useSession();
  const router = useRouter();

  const handleGuestLogin = () => {
    SignIn("Guest", undefined, true).then(() => router.push("/(app)"))
  };

  const handleLogin = () => {
    SignIn(email, password).then(() => router.push("/(app)"));
  };

  return (
    <View className="flex-1 justify-between px-5 py-10 bg-gray-50">
      <Text className="text-3xl font-bold text-center text-black mb-4">Login</Text>

       <Pressable className="absolute right-0 top-0"
        onPress={handleGuestLogin}
       >
        <Text className="text-3 font-semibold text-right text-blue-900 m-4">Skip</Text>
       </Pressable>

      <View>       
        <Text className="text-sm text-center text-gray-600 mb-8">Sign in to your account to get access to various features</Text>

        {/* Input fields */}
        <View className="space-y-5">
          {/* Email Input */}
          {isEmailLogin && (
            <View className="relative">
              <MaterialIcons
                name="email"
                size={24}
                color="gray"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 "
              />
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                className="block rounded-full w-full px-10 py-4 text-gray-400
                 bg-white border border-gray-400 shadow-"
              />              
            </View>
          )}

          {/* Password Input */}
          <View className="relative">
            <MaterialIcons
              name="lock"
              size={24}
              color="gray"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            /> 
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="block rounded-full w-full shadow-sm px-10 py-4 text-gray-400 bg-white border border-gray-400"
            />
            

          </View>

          <Pressable className="right-0 top-0">
            <Text className="text-3 font-semibold text-right text-blue-900 m-4">Forgot Password?</Text>
          </Pressable>

          {/* Login Button */}
          <Pressable className="bg-[#FE0000] rounded-full h-[3rem] w-full pt-2 mt-2 align-self-center"
            onPress={handleLogin}
          >
            <Text className="text-white text-center text-lg font-semibold">Login</Text>
          </Pressable>          

          {/* Line Break with Text */}
          <View className="flex-row items-center justify-center mt-8 mb-4">
            {/* Left Line */}
            <View style={{ flex: 1, borderBottomWidth: 1, borderColor: '#ccc' }} />
            
            {/* Text */}
            <Text className="mx-4 text-sm text-gray-600">Login with</Text>
            
            {/* Right Line */}
            <View style={{ flex: 1, borderBottomWidth: 1, borderColor: '#ccc' }} />
          </View>

          {/* Social Login Buttons (Facebook and Google) */}
          <View className="flex-row justify-between space-x-4">
            <Pressable style={{ flex: 1, backgroundColor: 'white', paddingVertical: 12, borderRadius: 999, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderBlockColor: '#ccc', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 }}>
              <Image 
                source={require('@/assets/images/facebook.png')} 
                style={{ width: 22, height: 20 }} 
              />
              <Text className="text-gray-600 text-center">Facebook</Text>  
            </Pressable>
            <Pressable style={{ flex: 1, backgroundColor: 'white', paddingVertical: 12, borderRadius: 999, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderWidth: 1, borderColor: '#ccc', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 }}>
              <Image 
                source={require('@/assets/images/google.png')} 
                style={{ width: 20, height: 20 }} 
              />
              <Text className="text-gray-600 text-center">Google</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Signup Link - Aligned to the Bottom */}
      <View className="mb-5">
        <Text className="text-sm text-gray-600 text-center ">
          Don't have an account?{' '}
          <Pressable onPress={() => { router.push("/(auth)/register") }}>
            <Text className="font-medium text-blue-300 text-arial mt-0 translate-y-1">Sign up here</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  )
}


