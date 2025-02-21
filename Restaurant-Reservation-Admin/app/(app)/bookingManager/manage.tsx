import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';

const BookingManager = () => {
  // Sample data: List of all users and their reservations
  const allBookings = [
    { id: '1', userId: 'user1', name: 'John Doe', status: 'Paid', isCurrent: true },
    { id: '2', userId: 'user2', name: 'Jane Smith', status: 'Paid', isCurrent: true },
    { id: '3', userId: 'user1', name: 'John Doe', status: 'Confirmed', isCurrent: false },
    { id: '4', userId: 'user2', name: 'Jane Smith', status: 'Completed', isCurrent: false },
    { id: '5', userId: 'user3', name: 'Mike Johnson', status: 'Paid', isCurrent: true },
    { id: '6', userId: 'user1', name: 'John Doe', status: 'Admin Notified', isCurrent: true },
  ];

  // Selected user ID (you can replace this with the actual selected user)
  const selectedUserId = 'user1'; // Example user ID (this should be dynamic)

  // Filter bookings for the selected user
  const bookings = allBookings.filter(booking => booking.userId === selectedUserId);

  // Send notification to the user
  const sendNotification = (message) => {
    // You can replace this with your actual notification logic (e.g., push notifications)
    Alert.alert('Notification', message);
  };

  // Handle confirming a booking (final confirmation of the entire process)
  const confirmBooking = (id) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: 'Confirmed' } : booking
    ));
    sendNotification('Your booking is now confirmed! See you at the restaurant.');
  };

  // Handle approving a booking (guest checks in)
  const approveBooking = (id) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: 'Approved' } : booking
    ));
    sendNotification('Your booking has been approved. We are ready to seat you!');
  };

  // Handle notifying admin that the booking is seen (Admin Reviewed)
  const adminReviewBooking = (id) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: 'Admin Notified' } : booking
    ));
    sendNotification('Your booking has been reviewed by the admin. It will be confirmed shortly.');
  };

  // Separate current and past reservations for the selected user
  const currentReservations = bookings.filter(booking => booking.isCurrent);
  const pastReservations = bookings.filter(booking => !booking.isCurrent);

  // Render a booking item in the list
  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingContainer}>
      <Text style={styles.bookingText}>{item.name}</Text>
      <Text style={styles.statusText}>Status: {item.status}</Text>
      <View style={styles.buttonContainer}>
        {item.isCurrent && item.status === 'Paid' && (
          <>
            <Button title="Confirm Booking" onPress={() => confirmBooking(item.id)} />
            <Button title="Approve (Check-In)" onPress={() => approveBooking(item.id)} />            
          </>
        )}
        {item.isCurrent && item.status === 'Paid' && (
          <Button title="Admin Review" onPress={() => adminReviewBooking(item.id)} />
        )}
        {item.status === 'Approved' && (
          <Button title="Check Out" onPress={() => checkOutGuest(item.id)} />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage {selectedUserId}'s Bookings</Text>

      {/* Current Reservations - Requires Admin's Attention */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Current Reservations</Text>
        <FlatList
          data={currentReservations}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Reservation History */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Reservation History</Text>
        <FlatList
          data={pastReservations}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookingContainer: {    
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bookingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 4
  },
});

export default BookingManager;
