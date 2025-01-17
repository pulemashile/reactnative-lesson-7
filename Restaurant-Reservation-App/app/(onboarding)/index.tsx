import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function OnBoarding() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setIsLoggedIn(true);
    router.push('/explore'); // Navigate to drawer after login
  };

  if (!isLoggedIn) {
    return (
      <View>
        <Text>Welcome to the Restaurant Reservation App</Text>
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  }

  return OnBoarding; // Handle routing to the main app screen after login
}
