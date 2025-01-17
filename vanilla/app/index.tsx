import { router } from 'expo-router';
import React from 'react';
import { View, Text, Button } from 'react-native';

const LandingPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 8 }}>Welcome to the ReserveIt</Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Restaurant Reservation App</Text>
      
      {/* Button to navigate to Login Page */}
      <Button
        title="Go to Login"
        onPress={() => router.push('/(auth)/login')}
      />
      
      {/* Button to skip login and go to Home Page */}
      <Button
        title="Continue Without Login"
        onPress={() => router.replace('/(tabs)')}        
      />
    </View>
  );
};

export default LandingPage;
