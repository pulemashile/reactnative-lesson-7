import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const Booking = () => {
  const [guestCount, setGuestCount] = useState(1);
  const [date, setDate] = useState(new Date()); // Date state
  const [time, setTime] = useState(new Date()); // Preferred time
  const [mealType, setMealType] = useState('lunch'); // Meal type
  const [notes, setNotes] = useState(''); // Notes
  const [specialRequest, setSpecialRequest] = useState(''); // Special requirements

  const [showDatePicker, setShowDatePicker] = useState(false); // Show date picker
  const [showTimePicker, setShowTimePicker] = useState(false); // Show time picker

  const [showSummaryModal, setShowSummaryModal] = useState(false); // Show modal state

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

  // Calculate total price
  const calculateTotalPrice = () => {
    const baseCost = guestCount * basePricePerGuest;
    const mealCost = mealPrices[mealType] || 0;
    const specialRequestCost = specialRequestPrices[specialRequest] || 0;

    return baseCost + mealCost + specialRequestCost;
  };

  // Handle date and time changes
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    const currentTime = selectedTime || time;
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
    setShowSummaryModal(true); // Show summary modal
  };

  // Handle modal confirmation
  const handleConfirmBooking = () => {
    // Handle booking logic here (API call, navigation, etc.)
    console.log("Booking confirmed");
    setShowSummaryModal(false); // Close modal
  };

  return (
    <ScrollView className="flex-1 p-5">
      {/* Guest Information */}
      <View className="mb-5">
        <View className="bg-white shadow-lg rounded-lg p-5">
          <Text className="font-bold text-xl text-center mb-4 border">Guest Information</Text>
          <Text className="font-semibold text-[#14213d] mb-2">Full Name: Guest User</Text>
          <Text className="font-semibold text-[#14213d] mb-2">Email: guest@example.com</Text>
          <Text className="font-semibold text-[#14213d] mb-2">Phone: +27 987 654 321</Text>
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

      {/* Date and Time Inputs */}
      <View className="mb-5">
        <Text className="font-semibold text-[#14213d] mb-2">Date</Text>
        <Pressable onPress={() => setShowDatePicker(true)} className="bg-white border border-gray-300 p-3 rounded-md">
          <Text className="text-gray-600">{date.toLocaleDateString()}</Text>
        </Pressable>
        {showDatePicker && <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />}
      </View>

      <View className="mb-5">
        <Text className="font-semibold text-[#14213d] mb-2">Preferred Time</Text>
        <Pressable onPress={() => setShowTimePicker(true)} className="bg-white border border-gray-300 p-3 rounded-md">
          <Text className="text-gray-600">{time.toLocaleTimeString()}</Text>
        </Pressable>
        {showTimePicker && <DateTimePicker value={time} mode="time" display="default" onChange={handleTimeChange} />}
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
      <Modal
        visible={showSummaryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSummaryModal(false)} // Handle the back button
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Booking Summary</Text>
            <Text>Guest Count: {guestCount}</Text>
            <Text>Date: {date.toLocaleDateString()}</Text>
            <Text>Time: {time.toLocaleTimeString()}</Text>
            <Text>Meal Type: {mealType}</Text>
            <Text>Notes: {notes || 'N/A'}</Text>
            <Text>Special Request: {specialRequest || 'None'}</Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
              Total Price: ${calculateTotalPrice().toFixed(2)}
            </Text>

            {/* Confirm Button */}
            <Pressable onPress={handleConfirmBooking} style={{ backgroundColor: '#4CAF50', paddingVertical: 10, marginTop: 20, borderRadius: 8, alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Confirm Booking</Text>
            </Pressable>

            {/* Cancel Button */}
            <Pressable onPress={() => setShowSummaryModal(false)} style={{ marginTop: 10 }}>
              <Text style={{ color: '#FF6347' }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Booking;
