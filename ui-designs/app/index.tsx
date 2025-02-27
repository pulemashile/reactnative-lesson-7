import { router } from 'expo-router';
import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';

// SVG component
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#9AA6B2"} fill={"none"}>
    <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.5 8H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LandingPage = () => {
  return (
    <View className="flex-1 justify-center items-center">
      {/* Skip Button */}
      <Pressable className="absolute top-5 right-5" onPress={() => router.push('/(app)')}>
        <Text className="text-sm text-[#9AA6B2]">Skip</Text>
      </Pressable>

      {/* Welcome Text and Icon */}
      <View className="flex-row items-center mb-5">
        <Text className="text-4xl font-extrabold text-grey">Welcome</Text>
        <CalendarIcon /> {/* SVG Icon next to the welcome text */}
      </View>
      
      <Text className='text-center text-[#9AA6B2] text-sm mb-5'>
        Book your next meal and enjoy a delicious meal at your own time
      </Text>

      {/* Image */}
      <Image 
        source={require('../assets/images/chef.png')} 
        style={{ width: 300, height: 300 , marginBottom: 20}} 
      />
      
      {/* Get Started Button */}
      <Pressable
        className="bg-[#FE0000] rounded-lg h-[3rem] w-[20rem] pt-2 mt-10"
        onPress={() => router.push('/(auth)/login')}
      >
        <Text className="text-white text-center text-lg">Get Started</Text>
      </Pressable>
    </View>
  );
};

export default LandingPage;
