import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const Booking = () => {
  const [guestCount, setGuestCount] = useState(1); // Guest count state
  const [date, setDate] = useState(''); // Date state
  const [time, setTime] = useState('2:00 PM'); // Preferred time state
  const [mealType, setMealType] = useState('lunch'); // Meal type state

  return (
    <View style={styles.container}>
      {/* Guest count input */}
      <View style={styles.inputContainer}>
        <Text style={styles.poppinsSemiBold}className='text-[#14213d]'>Guest Count</Text>
        <TextInput className='bg-white rounded-md w-full px-10 py-4 text-gray-400 bg-white border border-gray-400 shadow-md'
          style={styles.poppinsRegular}
          placeholder="Enter guest count"
          value={String(guestCount)}
          keyboardType="numeric"
          onChangeText={(text) => setGuestCount(Number(text))}
        />
      </View>

      {/* Date input */}
      <View style={styles.inputContainer}>
        <Text style={styles.poppinsSemiBold}className='text-[#14213d]'>Date</Text>
        <TextInput className='bg-white rounded-md w-full px-10 py-4 text-gray-400 bg-white border border-gray-400 shadow-md'
          style={styles.poppinsRegular}
          placeholder="Enter date (MM/DD/YYYY)"
          value={date}
          onChangeText={setDate}
        />
      </View>

      {/* Preferred Time input */}
      <View style={styles.inputContainer}>
        <Text style={styles.poppinsSemiBold}className='text-[#14213d]'>Preferred Time</Text>
        <TextInput className='bg-white rounded-md w-full px-10 py-4 text-gray-400 bg-white border border-gray-400 shadow-md'
          style={styles.poppinsRegular}
          placeholder="Enter time (e.g., 2:00 PM)"
          value={time}
          onChangeText={setTime}
        />
      </View>

      {/* Meal Type input */}
      <View style={styles.inputContainer}>
        <Text style={styles.poppinsSemiBold} className='text-[#14213d]'>Meal Type</Text>
        <TextInput className='bg-white rounded-md w-full px-10 py-4 text-gray-400 bg-white border border-gray-400 shadow-md'
          style={styles.poppinsRegular}
          placeholder="Enter meal type (e.g., lunch, dinner)"
          value={mealType}
          onChangeText={setMealType}
        />
      </View>

      {/* Proceed Button */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.proceedButton} onPress={() => {}}>
          <Text style={styles.poppinsRegular} className='text-white'>Proceed</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  proceedButton: {
    backgroundColor: '#890620',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  poppinsRegular: {
    fontFamily: 'poppinsRegular',

},
poppinsBold: {
    fontFamily: 'poppinsBold',
},
poppinsMedium: {
    fontFamily: 'poppinsMedium',
},
poppinsSemiBold: {
    fontFamily: ' poppinsSemiBold',
},
poppinsExtraBold: {
    fontFamily: 'poppinsExtraBold',
},
});

export default Booking;
