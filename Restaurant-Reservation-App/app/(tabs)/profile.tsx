import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { useSession } from '@/context/AuthContext';
import { useBooking } from '@/context/BookingContext';

const UserProfileScreen = () => {

  const { session, signOut } = useSession();  
  const { bookings, loading, error, fetchBookingsByEmail } = useBooking();

  useEffect(() => {
    if (session?.user) {
      fetchBookingsByEmail(session.user);  // Fetch bookings using the email directly
    }
  }, [session?.user]);  // Dependency array ensures fetch is called when user changes or the component mounts

  // Handle logout logic
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => signOut() },  // Ensure signOut function is called correctly
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

  console.log("Reservations: ", bookings);

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      <View className="items-center pb-4 border-b border-gray-300">
        <View className="bg-gray-300 rounded-full p-4 w-[128px] h-[128px]">
          <Ionicons name="person-circle-outline" size={80} color="#888" />
        </View>
        <Text className="mt-4 text-xl font-bold">{session.user}</Text>  {/* Display email as the username */}
        <Text className="text-gray-600">{session.user}</Text>
        <TouchableOpacity onPress={handleUpdateDetails} className="mt-5 bg-blue-500 py-2 px-6 rounded-full">
          <Text className="text-white text-center">Update Details</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-6">
        <Text className="text-lg font-semibold mb-3">Current Reservation</Text>
        {bookings.filter((res) => res.status === 'Paid').length > 0 ? (
          <View className="bg-white p-4 rounded-lg shadow-md mb-3">
            <Text className="text-lg font-bold">Restaurant: {bookings[0].restaurantName}</Text>
            <Text className="text-gray-600">Date: {new Date(bookings[0].date).toLocaleDateString()}</Text>
            <Text className="text-gray-600">Status: {bookings[0].status}</Text>
          </View>
        ) : (
          <Text>No upcoming reservations.</Text>
        )}
      </View>

      <View className="mt-6">
        <Text className="text-lg font-semibold mb-3">Past Reservations</Text>
        {bookings.filter((res) => res.status === 'Completed').length > 0 ? (
          bookings
            .filter((res) => res.status === 'Completed')
            .map((res) => (
              <View key={res._id} className="bg-white p-4 rounded-lg shadow-md mb-3">
                <Text className="text-lg font-bold">Restaurant: {res.restaurantName}</Text>
                <Text className="text-gray-600">Date: {new Date(res.date).toLocaleDateString()}</Text>
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
