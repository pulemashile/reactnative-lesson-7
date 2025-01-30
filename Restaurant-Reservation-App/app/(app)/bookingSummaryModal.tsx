import { View, Text, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import WebView from 'react-native-webview';

const BookingSummaryModal = ({ 
    showSummaryModal, 
    setShowSummaryModal, 
    bookingData,
    handleConfirmBooking }) => {    

    if (!bookingData) return null;
   
    return (
      <Modal
          visible={showSummaryModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowSummaryModal(false)} // Handle the back button
      >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Booking Summary</Text>
              <Text>Guest Count: {bookingData.guestCount}</Text>
              <Text>Date: {bookingData.date.toLocaleDateString()}</Text>
              <Text>Time: {bookingData.time.toLocaleTimeString()}</Text>
              <Text>Meal Type: {bookingData.mealType}</Text>
              <Text>Notes: {bookingData.notes || 'N/A'}</Text>
              <Text>Special Request: {bookingData.specialRequest || 'None'}</Text>
              <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
                Total Price: ${bookingData.totalPrice.toFixed(2)}
              </Text>

            <View className="mb-5">
                <Text className="font-semibold text-[#14213d] mb-2">Payment Method</Text>
                {/* <Picker selectedValue={paymentMethod} onValueChange={setPaymentMethod} className="bg-white border border-gray-300 p-3 rounded-md">
                    <Picker.Item label="PayPal Account" value="paypal" />
                </Picker> */}
            </View>
  
              {/* Confirm Button */}
            <Pressable onPress={handleConfirmBooking} style={{ backgroundColor: '#4CAF50', paddingVertical: 10, marginTop: 20, borderRadius: 8, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>Proceed Payment</Text>
            </Pressable>
  
            {/* Cancel Button */}
            <Pressable onPress={() => setShowSummaryModal(false)} style={{ marginTop: 10 }}>
                <Text style={{ color: '#FF6347' }}>Cancel</Text>
            </Pressable>
            </View>
          </View>
      </Modal>
    );
  };
  

export default BookingSummaryModal