import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Modal, FlatList, Button, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import WebView from 'react-native-webview';
import BookingSummaryModal from '../bookingSummaryModal';
import rsaRestaurants from '@/utils/data';
import { useSession } from '@/context/AuthContext';

const ServerURL = "https://reactnative-lesson-7.onrender.com";


const Booking = () => {   

  const { session, SignOut } = useSession();    
    
  const { restaurantName } = useLocalSearchParams(); 
  console.log("param ", restaurantName);    

  // Guest and booking details
  const [restaurant, setRestaurant] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mealType, setMealType] = useState('lunch');
  const [notes, setNotes] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  // Picker and modal states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [checkoutTime, setCheckoutTime] = useState(null);
  const [hoursIn, setHoursIn] = useState('2'); 
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showWebViewModal, setShowWebViewModal] = useState(false);

  // Payment and booking data
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const [bookingData, setBookingData] = useState({
    restaurantName: restaurantName,
    guestCount: 1,
    date: new Date(),
    time: new Date(),
    hoursIn: 1,
    slots: '',
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

  // Available time slots for the selected date
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);

  useEffect(() => {
    if (restaurantName) 
    {
      console.log("find res");
    
      let selectedRestaurant = null;
      for (let i = 0; i < rsaRestaurants.length; i++) 
      {
        if (rsaRestaurants[i].name.toLowerCase() === restaurantName.toLowerCase()) 
        {
          console.log("rest... found!!");
          
          selectedRestaurant = rsaRestaurants[i];
          break; // Exit loop once the match is found
        }
      }
      setRestaurant(selectedRestaurant);
    }


  }, [restaurantName]);

  useEffect(()=> {

    if (restaurant && date && time) 
    {
        // Normalize the time and date format
      const selectedDate = new Date(date); // Assuming `date` is in "YYYY-MM-DD" format
      const selectedTime = new Date(`${selectedDate.toISOString().split("T")[0]}T${time}:00Z`); // Normalize to ISO string time

      // Extract the formatted date and time to match against available slots
      const formattedDate = date.toISOString().split("T")[0]; // "2025-02-12"
      const formattedTime = time.toISOString().split("T")[1].split(":")[0] + ":" + time.toISOString().split("T")[1].split(":")[1]; // "10:00"

      const availableSlot = restaurant.availableSlots[formattedDate] || [];

      console.log("available slots", availableSlot, " -> ", formattedDate, " | ", formattedTime);
      
      if (availableSlot) 
      {
        const availableAtTime = availableSlot[formattedTime] || [];
        console.log("Available tables:", availableAtTime);

        setAvailableTables(availableAtTime);
      }
      else
      {
        console.log("No available slots for the given date:", formattedDate);
        setAvailableTables([]); // If no slots for the date, set an empty array
      }
    }
  }, [restaurant, date, time]);

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
    if (currentDate < minTime) 
    {
      setDate(minTime);
    } else { setDate(currentDate);  }
  };

  // Handle time changes
  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    let currentTime = selectedTime || time;
  
    // Restrict time to be within restaurant open hours (9 AM to 9 PM)
    const selectedHour = currentTime.getHours();
    if (selectedHour < openHour) {
      currentTime.setHours(openHour, 0, 0); // Set to opening hour if user selects before open time
    } else if (selectedHour >= closeHour) {
      currentTime.setHours(closeHour - 1, 0, 0); // Set to one hour before closing if user selects after close time
    }
  
    // Calculate the latest possible time for booking (1 hour before close time)
    const latestBookingTime = new Date();
    latestBookingTime.setHours(closeHour - 1, 0, 0); // 1 hour before restaurant closes
  
    // Make sure the selected time is at least 1 hour ahead from current time
    if (currentTime < minTime) 
    {
      currentTime.setTime(minTime.getTime());
    }
  
    // Ensure the selected time is no later than 1 hour before closing
    if (currentTime > latestBookingTime) {
      Alert.alert(
        'Time Selection Error',
        `You can only book reservations up to 1 hour before closing time. Please select a time earlier than ${formatTime(latestBookingTime)}.`,
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return; // Exit the function and prevent setting the invalid time
    }
  
    // Round time to the nearest hour (round to next hour if 30 minutes or more)
    const minutes = currentTime.getMinutes();
    if (minutes >= 30) {
      currentTime.setHours(currentTime.getHours() + 1, 0, 0); // Round up to the next hour
    } else {
      currentTime.setMinutes(0, 0, 0); // Round down to the current hour
    }
  
    setTime(currentTime);
  
    // Calculate checkout time by adding reservation duration (hours-in)
    const checkout = new Date(currentTime);
    checkout.setHours(checkout.getHours() + parseInt(hoursIn));
    setCheckoutTime(checkout);
  };  

  // Format the time for display
  const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString([], options);
  };

  // Calculate the time range to display
  const getTimeRange = () => {
    const formattedStartTime = formatTime(time);
    const formattedEndTime = formatTime(checkoutTime);
    return `${formattedStartTime} - ${formattedEndTime}`;
  };

  // Handle value change smoothly for guest count
  const handleValueChange = (value) => {
    setGuestCount(Math.floor(value)); // Round to the nearest integer
  };

  // Handle the completion of the sliding action
  const handleSlidingComplete = (value) => {
    setGuestCount(Math.floor(value)); // Finalize value after sliding
  };

  // Handle table selection
  const handleTableSelection = (table) => {
    // Handle table selection (you can allow up to 3 table selection here)
    console.log(`Selected table: ${table}`);
    setSelectedSlot(table);
  }

  // Handle Submit - Show booking summary modal
  const handleSubmit = () => {
     // Create the object that will be passed to the modal
    const bookingData = {
      restaurantName: restaurantName,
      guestCount: guestCount,
      date: date,
      time: time,
      hoursIn: hoursIn,
      slots: selectedSlot,
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
    
    const updateResponse = await fetch(`${ServerURL}/api/booking/update`, {
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
      const bookingResponse = await fetch(`${ServerURL}/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestName: session.username, 
          email: session.user, 
          phone: 'N/A', 
          restaurantName: restaurantName,
          guestCount: bookingData.guestCount,
          mealType: bookingData.mealType,
          date: bookingData.date,
          time: bookingData.time,
          hoursIn: bookingData.hoursIn,
          slots: bookingData.slots,
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
      const paymentResponse = await fetch(`${ServerURL}/api/payment`, {
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

  console.log("paymentURL", paymentUrl)
  // console.log("restaurant: ", restaurant)
  console.log("Available: ", availableTables)
  

  return (
    <ScrollView className="flex-1 p-5">
      {/* <Text>Booking at {`${restaurantName}`}</Text> */}
      {/* Guest Information */}
      <View className="mb-5">
        <View className="bg-white shadow-lg rounded-lg p-5">
          <Text className="font-bold text-xl text-center mb-4 border">Guest Information</Text>
          {
            session.isGuest ? ( 
              <Text className="font-semibold text-[#14213d] mb-2">Full Name: {`${session.username}`}</Text>
            ) : (
              <>
                <Text className="font-semibold text-[#14213d] mb-2">Guest Name: {`${session.username}`}</Text>
                <Text className="font-semibold text-[#14213d] mb-2">Email: {`${session.user}`}</Text>
                <Text className="font-semibold text-[#14213d] mb-2">Phone: +27 *** *** ***</Text>
              </>
            )
          }         
        </View>
      </View>

      {/* Guest Count */}
      <View className="flex-row bg-white shadow-lg rounded-lg p-2 mb-5">
        <View>
          <Text className="font-semibold text-[#14213d] mb-2">Guest Count</Text>
          <TextInput 
            className="bg-white border border-gray-300 w-[86px] h-[45px] p-4 rounded-md"
            placeholder="Enter guest count"
            value={guestCount.toString()} 
            onChangeText={handleValueChange}
          />
        </View>
        
        <Slider
          style={{ width: '75%', height: 40, alignSelf:"flex-end" }}
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

      <View className='flex-row w-full justify-around gap-2 bg-white shadow-lg rounded-lg p-2 pb-4 mb-4'>
        {/* Date Input */}
        <View >
          <Text className="font-semibold text-[#14213d] mb-2">Date</Text>
          <Pressable onPress={() => setShowDatePicker(true)} 
            className="bg-white border border-gray-300 p-3 rounded-md max-w-[120px]">
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
        <View >
          <Text className="font-semibold text-[#14213d] mb-2">Preferred Time</Text>
          <Pressable onPress={() => setShowTimePicker(true)} 
            className="bg-white border border-gray-300 p-3 rounded-md max-w-[120px]">
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

        <View >   
          {time && (
            <>
              <Text className="font-semibold text-[#14213d] mb-2">Hours-In</Text>
              <TextInput
                className="h-[42px] w-[80px] p-2 border border-gray-300 rounded-md"
                placeholder="2 hours"
                value={hoursIn}
                onChangeText={(text) => setHoursIn(text)}
                keyboardType="numeric"
              />
            </>
          )}
        </View>
      </View>

      
      {/* Show available tables based on the selected time */}
      {time && date && checkoutTime && (
        <>
          <Text className="mb-3 font-semibold text-[#14213d]">
            Available Tables for {date.toLocaleDateString()}, {getTimeRange()}
          </Text>
          {availableTables.length > 0 ? (
            <Picker
              selectedValue={selectedSlot} // Value for the selected table
              onValueChange={(itemValue) => handleTableSelection(itemValue)} // Handle the table selection
            >
              {/* Map the available tables into Picker items */}
              {availableTables.map((table) => (
                <Picker.Item key={table} label={table} value={table} />
              ))}
            </Picker>
          ) : (
            <Text>No available tables for the selected time and date.</Text>
          )}
        </>
      )}
      

      {/* Meal Type Input */}
      <View className="bg-white border border-gray-300 mb-5 p-3 rounded-md">
        <Text className="font-semibold text-[#14213d] mb-2">Meal Type</Text>
        <Picker selectedValue={mealType} onValueChange={setMealType} >
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
      <View className="bg-white border border-gray-300 mb-5 p-3 rounded-md">
        <Text className="font-semibold text-[#14213d] mb-2">Special Request</Text>
        <Picker selectedValue={specialRequest} onValueChange={setSpecialRequest} 
          className="bg-white border border-gray-300 p-3 rounded-md">
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
                    const path = urlParts[0]; // ${ServerURL}/success/bookingId=679b7de71a8544a5f7caa5f6

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
