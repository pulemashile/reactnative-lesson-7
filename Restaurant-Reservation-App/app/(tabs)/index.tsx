import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { Picker } from '@react-native-picker/picker'; // for dropdown (if needed)
// import { Icon } from 'react-native-elements';

const ReservationScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleReservation = () => {
    // Handle reservation logic
    console.log('Reservation made for:', name, phone, partySize, date, time);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Restaurant Reservation</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Party Size</Text>
        {/* <Picker
          selectedValue={partySize}
          style={styles.picker}
          onValueChange={(itemValue) => setPartySize(itemValue)}
        >
          <Picker.Item label="2 people" value={2} />
          <Picker.Item label="4 people" value={4} />
          <Picker.Item label="6 people" value={6} />
          <Picker.Item label="8+ people" value={8} />
        </Picker> */}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Select Date"
          value={date}
          onChangeText={setDate}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Time</Text>
        <TextInput
          style={styles.input}
          placeholder="Select Time"
          value={time}
          onChangeText={setTime}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleReservation}>
        <Text style={styles.buttonText}>Book Reservation</Text>
        {/* <Icon name="check" type="font-awesome" color="#fff" size={20} /> */}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008CBA',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default ReservationScreen;
