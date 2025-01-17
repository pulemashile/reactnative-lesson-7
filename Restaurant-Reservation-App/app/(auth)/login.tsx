import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const Login = () => {
  // State variables for managing form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailLogin, setIsEmailLogin] = useState(true); // Toggling email login or password login

  return (
    <View className="flex-1 justify-between px-5 py-10 bg-gray-50">
      {/* Login Text */}
      <View>
        <Text className="text-3xl font-bold text-center text-black mb-4">Login</Text>
        <Text className="text-sm text-center text-gray-600 mb-8">Sign in to your account to get access to various features</Text>

        {/* Input fields */}
        <View className="space-y-5">
          {/* Email Input */}
          {isEmailLogin && (
            <View className="relative">
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                className="block rounded-full w-full px-10 py-4 text-gray-400
                 bg-white border border-gray-400 shadow-"
              />
              <MaterialIcons
                name="email"
                size={24}
                color="gray"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 "
              />
            </View>
          )}

          {/* Password Input */}
          <View className="relative">
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

          {/* Login Button */}
          <Pressable className="bg-[#FE0000] rounded-full h-[3rem] w-full pt-2 mt-10 align-self-center">
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
          <Pressable>
            <Text className="font-medium text-blue-300 text-arial">Sign up here</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
};

export default Login;
