import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { useSession } from '@/context/AuthContext';
import { useBooking } from '@/context/BookingContext';

const UserProfileScreen = () => {

  const { session, SignOut } = useSession();  
  const { bookings, loading, error, fetchBookingsByEmail } = useBooking();

  useEffect(() => {
    if (session?.user) 
    {
      console.log(session);      
      fetchBookingsByEmail(session.user);  // Fetch bookings using the email directly
    }
  }, [session?.user]);  // Dependency array ensures fetch is called when user changes or the component mounts

  // Handle logout logic
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => SignOut() },  // Ensure signOut function is called correctly
    ]);
  };

  // Handle updating user details
  const handleUpdateDetails = () => {
    if (session?.user) 
    {
      console.log(session);      
      fetchBookingsByEmail(session.user);  // Fetch bookings using the email directly
    }
    Alert.alert('Update Details', 'Implement functionality to update user details.');
  };

  // Handle notifications
  const handleViewNotifications = () => {
    Alert.alert('Notifications', 'Show recent notifications related to reservations.');
  };

  // Get today's date and the next two days
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const nextTwoDays = new Date(today);
  nextTwoDays.setDate(today.getDate() + 2);

  // Function to filter upcoming reservations
  const getUpcomingReservations = () => {
    return bookings.filter((res) => {
      const reservationDate = new Date(res.date);
      return reservationDate >= today && reservationDate <= nextTwoDays && res.status === 'Paid';
    });
  };

  // Function to filter current reservations
  const getCurrentReservation = () => {
    return bookings.find((res) => res.status === 'Paid' && new Date(res.date) >= today);
  };

  // Function to filter past reservations
  const getPastReservations = () => {
    return bookings.filter((res) => res.status === 'Completed');
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      <View className="items-center pb-4 border-b border-gray-300">
        <View className="bg-gray-300 rounded-full p-4 w-[128px] h-[128px]">
          <Ionicons name="person-circle-outline" size={80} color="#888" />
        </View>
        <Text className="mt-4 text-xl font-bold">{session.username}</Text>  {/* Display email as the username */}
        <Text className="text-gray-600">{session.user}</Text>
        <Pressable onPress={handleUpdateDetails} className="mt-5 bg-blue-500 py-2 px-6 rounded-full">
          <Text className="text-white text-center">Update Details</Text>
        </Pressable>
      </View>

      {/* Current Reservation Section */}
      <View className="mt-6">
        <Text className="text-lg font-semibold mb-3">Current Reservation</Text>
        {getCurrentReservation() ? (
          <View className="bg-white p-4 rounded-lg shadow-md mb-3">
            <Text className="text-lg font-bold">Restaurant: {getCurrentReservation().restaurantName}</Text>
            <Text className="text-gray-600">Date: {new Date(getCurrentReservation().date).toLocaleDateString()}</Text>
            <Text className="text-gray-600">Status: {getCurrentReservation().status}</Text>
          </View>
        ) : (
          <Text>No upcoming reservations.</Text>
        )}
      </View>

      {/* Upcoming Reservations Section */}
      <View className="mt-6">
        <Text className="text-lg font-semibold mb-3">Upcoming Reservations (Tomorrow or Next Two Days)</Text>
        {getUpcomingReservations().length > 0 ? (
          getUpcomingReservations().map((res) => (
            <View key={res._id} className="bg-white p-4 rounded-lg shadow-md mb-3">
              <Text className="text-lg font-bold">Restaurant: {res.restaurantName}</Text>
              <Text className="text-gray-600">Date: {new Date(res.date).toLocaleDateString()}</Text>
              <Text className="text-gray-600">Status: {res.status}</Text>
            </View>
          ))
        ) : (
          <Text>No upcoming reservations for the next two days.</Text>
        )}
      </View>

      {/* Past Reservations Section */}
      <View className="mt-6">
        <Text className="text-lg font-semibold mb-3">Past Reservations</Text>
        {getPastReservations().length > 0 ? (
          getPastReservations().map((res) => (
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

      {/* Notifications Section */}
      <View className="mt-6">
        <Text className="text-lg font-semibold mb-3">Notifications</Text>
        <Pressable onPress={handleViewNotifications} className="bg-blue-500 py-2 px-6 rounded-full">
          <Text className="text-white text-center">View Notifications</Text>
        </Pressable>
      </View>

      {/* Logout Section */}
      <View className="mt-6">
        <Pressable onPress={handleLogout} className="bg-red-500 py-2 px-6 rounded-full flex-row items-center justify-center">
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text className="text-white ml-2">Logout</Text>
        </Pressable>
      </View>

      {/* Suggestions Section */}
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
