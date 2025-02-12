import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import BookingSummaryModal from './bookingSummaryModal';
import { router, useRouter } from 'expo-router';
import WebView from 'react-native-webview';

const Booking = () => {
  const { query } = useRouter();
  console.log("query",query);
  
  // const { restaurantName } = query;

  // Guest and booking details
  const [guestCount, setGuestCount] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mealType, setMealType] = useState('lunch');
  const [notes, setNotes] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  // Picker and modal states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showWebViewModal, setShowWebViewModal] = useState(false);

  // Payment and booking data
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const [bookingData, setBookingData] = useState({
    // restaurantName: "",
    guestCount: 1,
    date: new Date(),
    time: new Date(),
    mealType: 'lunch',
    notes: '',
    specialRequest: '',
    totalPrice: 0,
  });   

  // Pricing constants
  const basePricePerGuest = 20;
  const mealPrices = {
    lunch: 10,
    dinner: 15,
    breakfast: 5
  };

  const specialRequestPrices = {
    birthday: 10,
    anniversary: 12,
    other: 8
  };

  // Open and close hours for the restaurant
  const openHour = 9; // 9 AM
  const closeHour = 21; // 9 PM

  // Minimum 1 hour ahead for booking time
  const currentDate = new Date();
  const minTime = new Date(currentDate.getTime() + 60 * 60 * 1000); // 1 hour from now

  // Calculate total price
  const calculateTotalPrice = () => {
    const baseCost = guestCount * basePricePerGuest;
    const mealCost = mealPrices[mealType] || 0;
    const specialRequestCost = specialRequestPrices[specialRequest] || 0;

    return (baseCost + mealCost + specialRequestCost) / 15;
  };

  // Handle date changes
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || date;

    // Restrict users from selecting a past date
    if (currentDate < minTime) {
      setDate(minTime);
    } else {
      setDate(currentDate);
    }
  };

  // Handle time changes
  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    const currentTime = selectedTime || time;

    // Restrict time to be within restaurant open hours (9 AM to 9 PM)
    const selectedHour = currentTime.getHours();
    if (selectedHour < openHour) {
      currentTime.setHours(openHour, 0, 0); // Set to opening hour if user selects before open time
    } else if (selectedHour >= closeHour) {
      currentTime.setHours(closeHour - 1, 0, 0); // Set to one hour before closing if user selects after close time
    }
    
    // Make sure the selected time is at least 1 hour ahead from current time
    if (currentTime < minTime) {
      currentTime.setTime(minTime.getTime());
    }
    setTime(currentTime);
  };

  // Handle value change smoothly for guest count
  const handleValueChange = (value) => {
    setGuestCount(Math.floor(value)); // Round to the nearest integer
  };

  // Handle the completion of the sliding action
  const handleSlidingComplete = (value) => {
    setGuestCount(Math.floor(value)); // Finalize value after sliding
  };

  // Handle Submit - Show booking summary modal
  const handleSubmit = () => {
     // Create the object that will be passed to the modal
    const bookingData = {
      // restaurantName: restaurantName,
      guestCount: guestCount,
      date: date,
      time: time,
      mealType: mealType,
      notes: notes,
      specialRequest: specialRequest,
      totalPrice: calculateTotalPrice() // Calculating the total price
    };

    console.log(bookingData);    
    
    setShowSummaryModal(true); // Show summary modal
    setBookingData(bookingData); // Set the data to be passed to the modal
  };

  const handlePaymentSuccess = async (data: any) => {
    setPaymentSuccess(true);
    console.log("handlePSuccess:", data);
    
    const updateResponse = await fetch('http://10.196.0.124:5000/api/booking/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        bookingId: data.bookingId,
        paymentId: data.paymentId,  
        status: "Paid", 
      }),
    });

    console.log("updateResponse", updateResponse)

    if (!updateResponse.ok) 
    {
      throw new Error('Booking update failed');
    }

    const updatedBookingData = await updateResponse.json();
    console.log('Booking confirmed:', updatedBookingData); 

    // Close the summary modal after booking is confirmed
    setShowSummaryModal(false);

    // Optional: Show a success message or navigate to a success screen
    alert('Booking confirmed successfully!');
    router.push("/(tabs)/profile");
    // Alert.alert('Payment Successful!', `Transaction ID: ${data.transactionId}`);
  };

  const handlePaymentError = (error: any) => {
    setPaymentError('Payment failed. Please try again.');
    console.log('Payment error:', error);
  };

  // Handle modal confirmation
  const handleConfirmBooking = async () => {
    try {
      // Step 1: Create the booking with 'Pending' status
      const bookingResponse = await fetch('http://10.196.0.124:5000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestName: 'Guest Name', // Use the actual guest name
          email: 'guest@example.com', // Use the actual email
          phone: '987654321', // Use the actual phone number
          guestCount: bookingData.guestCount,
          mealType: bookingData.mealType,
          date: bookingData.date,
          time: bookingData.time,
          notes: bookingData.notes,
          specialRequest: bookingData.specialRequest,
          totalPrice: bookingData.totalPrice,
        }),
      });
  
      if (!bookingResponse.ok) 
      {
        throw new Error('Booking creation failed');
      }
  
      const bookingDataFromBackend = await bookingResponse.json();
      const bookingId = bookingDataFromBackend.booking._id; // Assuming the backend returns the created booking with the ID
  
      // Step 2: Call the backend to initiate payment (this could be PayPal or another service)
      const paymentResponse = await fetch('http://10.196.0.124:5000/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          totalPrice: bookingData.totalPrice, 
          bookingId: bookingId,
          description: "Payment for Reservation"
         }),
      });
  
      if (!paymentResponse.ok)
      {
        throw new Error('Payment initiation failed');
      }
  
      const paymentData = await paymentResponse.json(); // Payment details from backend (e.g., PayPal approval URL)
  
      console.log("PaymentData", paymentData); 

      if (paymentData && paymentData.links) 
      {
        const approvalUrl = paymentData.links.find((link: any) => link.rel === 'approval_url');
        if (approvalUrl) 
        {
          setPaymentUrl(approvalUrl.href);
          setShowSummaryModal(false);
          setShowWebViewModal(true);
        }
      }

    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('There was an error confirming your booking. Please try again.');
    }
  };

  const handleWebViewClose = () => {
    // Optionally allow the user to close the WebView modal
    setShowWebViewModal(false);
  };

{console.log("paymentURL", paymentUrl)}
  

  return (
    <ScrollView className="flex-1 p-5">
      {/* <Text>Booking at {`${restaurantName}`}</Text> */}
      {/* Guest Information */}
      <View className="mb-5">
        <View className="bg-white shadow-lg rounded-lg p-5">
          <Text className="font-bold text-xl text-center mb-4 border">Guest Information</Text>
          <Text className="font-semibold text-[#14213d] mb-2">Full Name: Guest User</Text>
          <Text className="font-semibold text-[#14213d] mb-2">Email: guest@example.com</Text>
          <Text className="font-semibold text-[#14213d] mb-2">Phone: (+27) 987 654 321</Text>
        </View>
      </View>

      {/* Guest Count */}
      <View className="mb-5">
        <Text className="font-semibold text-[#14213d] mb-2">Guest Count</Text>
        <TextInput 
          className="bg-white border border-gray-300 p-4 rounded-md"
          placeholder="Enter guest count"
          value={guestCount.toString()} 
          onChangeText={handleValueChange}
        />
        <Slider
          style={{ width: '75%', height: 40 }}
          minimumValue={1}
          maximumValue={50}
          step={1}
          value={guestCount}
          onValueChange={handleValueChange}
          onSlidingComplete={handleSlidingComplete}
          minimumTrackTintColor="#FF6347"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#FF6347"
        />
      </View>

      <View style={{flexDirection:"row", backgroundColor:"red"}}>
        {/* Date Input */}
        <View className="mb-5">
          <Text className="font-semibold text-[#14213d] mb-2">Date:</Text>
          <Pressable className="bg-white border border-gray-300 p-3 rounded-md w-[200px]"
            onPress={() => setShowDatePicker(true)}>
            <Text className="text-gray-600">{date.toLocaleDateString()}</Text>
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={minTime} // Restrict to current date or later
            />
          )}
        </View>

        {/* Time Input */}
        <View className="mb-5">
          <Text className="font-semibold text-[#14213d] mb-2">Preferred Time:</Text>
          <Pressable onPress={() => setShowTimePicker(true)} className="bg-white border border-gray-300 p-3 rounded-md">
            <Text className="text-gray-600">{time.toLocaleTimeString()}</Text>
          </Pressable>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={handleTimeChange}
              minimumDate={minTime} // Restrict time selection to be at least 1 hour in advance
            />
          )}
        </View>
      </View>

      {/* Meal Type Input */}
      <View className="mb-5">
        <Text className="font-semibold text-[#14213d] mb-2">Meal Type</Text>
        <Picker selectedValue={mealType} onValueChange={setMealType} className="bg-white border border-gray-300 p-3 rounded-md">
          <Picker.Item label="Lunch" value="lunch" />
          <Picker.Item label="Dinner" value="dinner" />
          <Picker.Item label="Breakfast" value="breakfast" />
        </Picker>
      </View>

      {/* Notes Input */}
      <View className="mb-5">
        <Text className="font-semibold text-[#14213d] mb-2">Additional Notes</Text>
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-md shadow-sm h-24 text-gray-600"
          placeholder="Enter any additional notes"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>

      {/* Special Request Input */}
      <View className="mb-5">
        <Text className="font-semibold text-[#14213d] mb-2">Special Request</Text>
        <Picker selectedValue={specialRequest} onValueChange={setSpecialRequest} className="bg-white border border-gray-300 p-3 rounded-md">
          <Picker.Item label="None" value="" />
          <Picker.Item label="Birthday" value="birthday" />
          <Picker.Item label="Anniversary" value="anniversary" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      {/* Proceed Button */}
      <View className="m-4 flex items-center translate-y-[-16px]">
        <Pressable onPress={handleSubmit} style={{ backgroundColor: '#890620', paddingVertical: 12, paddingHorizontal: 48, borderRadius: 8, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 }}>
          <Text className="text-white text-lg font-semibold">Proceed</Text>
        </Pressable>
      </View>

      {/* Booking Summary Modal */}
      <BookingSummaryModal 
        showSummaryModal={showSummaryModal} 
        setShowSummaryModal={setShowSummaryModal} 
        bookingData={bookingData}
        handleConfirmBooking={handleConfirmBooking}
      />
      
      <Modal
        visible={showWebViewModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleWebViewClose} // Handle the back button or close modal
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: '100%',
              borderRadius: 10,
              padding: 20,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Payment</Text>
            {paymentUrl && (
              <WebView
                source={{ uri: paymentUrl }}
                style={{ width: 400, height: 400 }}
                onNavigationStateChange={(event) => {
                  console.log("event", event);
                  
                  if (event.url.includes('success')) 
                  {
                    console.log("eventurl", event.url);
                    // Split the URL at the "?" to separate the path and query string
                    const urlParts = event.url.split('?');

                    // Extract the path before "?" where bookingId is located
                    const path = urlParts[0]; // This is http://10.196.0.124:5000/success/bookingId=679b7de71a8544a5f7caa5f6

                    // Use regex or string manipulation to get the bookingId from the path
                    const bookingIdMatch = path.match(/bookingId=([^/]+)/);
                    const bookingId = bookingIdMatch ? bookingIdMatch[1] : null; // Extract the bookingId

                    // Extract the query parameters part (after "?")
                    const queryString = urlParts[1]; // This is "paymentId=PAYID-M6NX32Q8MS81327FL323613N&token=EC-8EP84048BE899034P&PayerID=SBE5HLHJ84L7N"
                    const urlParams = new URLSearchParams(queryString);

                    // Extract paymentId and other query params
                    const paymentId = urlParams.get('paymentId');
                    const token = urlParams.get('token');

                    if (paymentId && bookingId) 
                    {
                      // Handle success logic
                      handlePaymentSuccess({ paymentId, bookingId });
                    }

                    setShowWebViewModal(false); 
                  } 
                  else if (event.url.includes('cancel')) 
                  {
                    handlePaymentError('Payment was cancelled');
                    setShowWebViewModal(false);
                    router.push("/(app)")
                  }
                }}
              />
            )}

            {/* Close Button */}
            <Pressable onPress={handleWebViewClose} style={{ marginTop: 20 }}>
              <Text style={{ color: '#FF6347' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
    </ScrollView>

    
  );
};

export default Booking;
