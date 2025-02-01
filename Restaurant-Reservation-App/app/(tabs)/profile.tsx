import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { useSession } from '@/context/AuthContext';

const UserProfileScreen = () => {

  const { session, SignOut } = useSession();

  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
  });

  const [reservations, setReservations] = useState([
    {
      id: 1,
      restaurant: 'The Italian Bistro',
      date: '2025-02-10 7:00 PM',
      status: 'Upcoming',
    },
    {
      id: 2,
      restaurant: 'Sushi House',
      date: '2025-01-25 6:30 PM',
      status: 'Completed',
    },
  ]);

  // Handle logout logic
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => SignOut },
    ]);
  };

  // Handle updating user details
  const handleUpdateDetails = () => {
    Alert.alert('Update Details', 'Implement functionality to update user details.');
  };

  // Handle notifications
  const handleViewNotifications = () => {
    Alert.alert('Notifications', 'Show recent notifications related to reservations.');
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      <View className="items-center pb-4 border-b border-gray-300">
        <View className="bg-gray-300 rounded-full p-4 w-[128px] h-[128px]">
          <Ionicons name="person-circle-outline" size={80} color="#888" />
        </View>
        <Text className="mt-4 text-xl font-bold">{session.username}</Text>
        <Text className="text-gray-600">{session.user}</Text>
        <TouchableOpacity onPress={handleUpdateDetails} className="mt-5 bg-blue-500 py-2 px-6 rounded-full">
          <Text className="text-white text-center">Update Details</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-6">
        <Text className="text-lg font-semibold mb-3">Current Reservation</Text>
        {reservations.filter((res) => res.status === 'Upcoming').length > 0 ? (
          <View className="bg-white p-4 rounded-lg shadow-md mb-3">
            <Text className="text-lg font-bold">Restaurant: {reservations[0].restaurant}</Text>
            <Text className="text-gray-600">Date: {reservations[0].date}</Text>
            <Text className="text-gray-600">Status: {reservations[0].status}</Text>
          </View>
        ) : (
          <Text>No upcoming reservations.</Text>
        )}
      </View>

      <View className="mt-6">
        <Text className="text-lg font-semibold mb-3">Past Reservations</Text>
        {reservations.filter((res) => res.status === 'Completed').length > 0 ? (
          reservations
            .filter((res) => res.status === 'Completed')
            .map((res) => (
              <View key={res.id} className="bg-white p-4 rounded-lg shadow-md mb-3">
                <Text className="text-lg font-bold">Restaurant: {res.restaurant}</Text>
                <Text className="text-gray-600">Date: {res.date}</Text>
                <Text className="text-gray-600">Status: {res.status}</Text>
              </View>
            ))
        ) : (
          <Text>No past reservations.</Text>
        )}
      </View>

      <View className="mt-6">
        <Text className="text-lg font-semibold mb-3">Notifications</Text>
        <TouchableOpacity onPress={handleViewNotifications} className="bg-blue-500 py-2 px-6 rounded-full">
          <Text className="text-white text-center">View Notifications</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-6">
        <TouchableOpacity onPress={handleLogout} className="bg-red-500 py-2 px-6 rounded-full flex-row items-center justify-center">
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text className="text-white ml-2">Logout</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-8 border-t border-gray-300 pt-6">
        <Text className="text-lg font-semibold">Suggestions:</Text>
        <Text className="text-gray-600 mt-2">- Rate your past reservations to help others!</Text>
        <Text className="text-gray-600 mt-2">- Set your favorite restaurants for quicker reservations.</Text>
        <Text className="text-gray-600 mt-2">- Enable notifications for reservation updates.</Text>
      </View>
    </ScrollView>
  );
};

export default UserProfileScreen;
