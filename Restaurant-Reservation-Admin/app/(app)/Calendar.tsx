import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Calendar = () => {
  
  const tables = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Table 8', 'Table 9', 'Table 10'];
  const times = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const reservations = [
    { table: 'Table 1', time: '8:00 AM', name: 'John Doe', meal: 'Breakfast' },
    { table: 'Table 2', time: '9:00 AM', name: 'Mai Mai', meal: 'Breakfast' },
    { table: 'Table 4', time: '9:00 AM', name: 'Sara G', meal: 'Lunch' },
    { table: 'Table 1', time: '10:00 AM', name: 'Michael Lee', meal: 'Lunch' },
  ];

  const getMealColor = (meal) => {
    switch (meal) {
      case 'Breakfast':
        return '#B8001F'; 
      case 'Lunch':
        return '#0D92F4'; 
      case 'Dinner':
        return '#ffcc80'; 
      default:
        return '#e0f7fa'; 
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header row with time slots */}
      {/* <ScrollView horizontal={true} style={styles.headerRow}>
        {times.map((time, index) => (
          <View key={index} style={styles.timeHeader}>
            <Text style={styles.timeHeaderText}>{time}</Text>
          </View>
        ))}
      </ScrollView> */}

      {/* Time slots and reserved tables */}
      <ScrollView>
        {times.map((time, rowIndex) => {
          // Find all reservations for the current time slot
          const reservedTables = reservations.filter(res => res.time === time);
          
          return (
            <View key={rowIndex} style={styles.timeRow}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeText}>{time}</Text>
              </View>
              <View style={styles.reservationColumn}>
                {reservedTables.length > 0 ? (
                  reservedTables.map((reservation, index) => (
                    <Text key={index} style={[styles.reservationText, { backgroundColor: getMealColor(reservation.meal) }]}>
                      {reservation.table} <br>
                      </br>{reservation.name}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.noReservationText}>No Reservations</Text>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  timeHeader: {
    width: 150,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  timeHeaderText: {
    fontWeight: 'bold',
    fontFamily: 'poppinsRegular',
    fontSize: 14,
  },
  timeRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  timeColumn: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'poppinsRegular',
    fontSize: 12,
    color: '#444',
  },
  reservationColumn: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  reservationText: {
    marginBottom: 5,
    padding: 5,
    fontSize: 12,
    color: '#333',
    borderRadius: 5,
    textAlign: 'center',
    width: 200,
    height: 50, 
    fontFamily: 'poppinsRegular', // Ensure the reserved table information fits
  },
  noReservationText: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'poppinsRegular',
    height: 50,

  },
});

export default Calendar;
