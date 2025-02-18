import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';

const BookingManager = () => {
  const [bookings, setBookings] = useState([
    { id: '1', name: 'John Doe', status: 'Paid' },
    { id: '2', name: 'Jane Smith', status: 'Paid' },
    { id: '3', name: 'Mike Johnson', status: 'Admin Notified' },
  ]);

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

  // Render each booking in the list
  const renderItem = ({ item }) => (
    <View style={styles.bookingContainer}>
      <Text style={styles.bookingText}>{item.name}</Text>
      <Text style={styles.statusText}>Status: {item.status}</Text>
      <View style={styles.buttonContainer}>
        {item.status === 'Paid' && (
          <Button title="Admin Review" onPress={() => adminReviewBooking(item.id)} />
        )}
        {item.status === 'Approved' && (
          <Button title="Check Out" onPress={() => checkOutGuest(item.id)} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        {item.status === 'Paid' && (
          <>
            <Button title="Approve (Check-In)" onPress={() => approveBooking(item.id)} />
            <Button title="Confirm Booking" onPress={() => confirmBooking(item.id)} />
          </>
        )}
        
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Management</Text>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default BookingManager;
