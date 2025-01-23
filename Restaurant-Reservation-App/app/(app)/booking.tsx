import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const Booking = () => {
  const [guestCount, setGuestCount] = useState(1); 
  const [name, setName] = useState(''); // User name
  const [date, setDate] = useState(new Date()); // Date state
  const [time, setTime] = useState(new Date()); // Preferred time
  const [mealType, setMealType] = useState('lunch'); // Meal type
  const [notes, setNotes] = useState(''); // Notes
  const [specialRequest, setSpecialRequest] = useState(''); // Special requirements

  const [showDatePicker, setShowDatePicker] = useState(false); // Show date picker
  const [showTimePicker, setShowTimePicker] = useState(false); // Show time picker

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

   // Handle value change smoothly
   const handleValueChange = (value) => {
    setGuestCount(Math.floor(value)); // Round to the nearest integer (if needed)
  };

  // Handle the completion of the sliding action
  const handleSlidingComplete = (value) => {
    setGuestCount(Math.floor(value)); // Finalize value after sliding
  };

  const handleSubmit = () => {
    console.log({
      name,
      guestCount,
      date: date.toLocaleDateString(),
      time: time.toLocaleTimeString(),
      mealType,
      notes,
      specialRequest,
    });
    // Handle submission (navigate or make API call)
  };

  return (
    <View className="flex-1 p-5">
      {/* Name input */}
      <View className="mb-5">
        <Text className="font-semibold text-[#14213d] mb-2">Your Name</Text>
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-md shadow-sm"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Guest count input */}
      <View className="mb-5">
        <Text className="font-semibold text-[#14213d] mb-2">Guest Count</Text>
        <View className='flex-row align-center gap-2'>
          <TextInput 
            className="bg-white border border-gray-300 p-3 rounded-md shadow-sm"
            placeholder="Enter guest count"
            value={guestCount.toString()} // Convert to string for display
            onChangeText={handleValueChange}
          />
          <Text className="text-lg mt-3 text-[#14213d]">Guests</Text>

          <Slider
            style={{ width: '75%', height: 40 }}
            minimumValue={1}
            maximumValue={50}
            step={1}
            value={guestCount} // Sync slider value with state
            onValueChange={handleValueChange} // Continuous value change
            onSlidingComplete={handleSlidingComplete} // Final value on slide complete
            minimumTrackTintColor="#FF6347" // You can customize these colors
            maximumTrackTintColor="#ddd"
            thumbTintColor="#FF6347" // Customize thumb color
          /> 
        </View>
             
        
        {/* <TextInput
          className="bg-white border border-gray-300 p-3 rounded-md shadow-sm"
          placeholder="Enter guest count"
          value={String(guestCount)}
          keyboardType="numeric"
          onChangeText={(text) => setGuestCount(Number(text))}
        /> */}
      </View>

      {/* Date input */}
      <View className="mb-5">
        <Text className="font-semibold text-[#14213d] mb-2">Date</Text>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          className="bg-white border border-gray-300 p-3 rounded-md shadow-sm"
        >
          <Text className="text-gray-600">{date.toLocaleDateString()}</Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      {/* Time input */}
      <View className="mb-5">
        <Text className="font-semibold text-[#14213d] mb-2">Preferred Time</Text>
        <Pressable
          onPress={() => setShowTimePicker(true)}
          className="bg-white border border-gray-300 p-3 rounded-md shadow-sm"
        >
          <Text className="text-gray-600">{time.toLocaleTimeString()}</Text>
        </Pressable>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>

      {/* Meal Type input (Dropdown) */}
      <View className="mb-5">
        <Text className="font-semibold text-[#14213d] mb-2">Meal Type</Text>
        <Picker
          selectedValue={mealType}
          onValueChange={(itemValue) => setMealType(itemValue)}
          className="bg-white border border-gray-300 p-3 rounded-md shadow-sm"
        >
          <Picker.Item label="Lunch" value="lunch" />
          <Picker.Item label="Dinner" value="dinner" />
          <Picker.Item label="Breakfast" value="breakfast" />
        </Picker>
      </View>

      {/* Notes input (Textarea) */}
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

      {/* Special Request input (Dropdown) */}
      <View className="mb-5">
        <Text className="font-semibold text-[#14213d] mb-2">Special Request</Text>
        <Picker
          selectedValue={specialRequest}
          onValueChange={(itemValue) => setSpecialRequest(itemValue)}
          className="bg-white border border-gray-300 p-3 rounded-md shadow-sm"
        >
          <Picker.Item label="None" value="" />
          <Picker.Item label="Birthday" value="birthday" />
          <Picker.Item label="Anniversary" value="anniversary" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      {/* Proceed Button */}
      <View className="mt-8 flex items-center">
        <Pressable
          onPress={handleSubmit}
          style={{ backgroundColor: '#890620', paddingVertical: 12, paddingHorizontal: 48, borderRadius: 8, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 }}
        >
          <Text className="text-white text-lg font-semibold">Proceed</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Booking;
