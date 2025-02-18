import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, useWindowDimensions, StyleSheet } from 'react-native';

const BookingTimeline = () => {
  // Get screen dimensions and update on rotation/resize
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  
  // Constants for layout calculations
  const TABLE_COLUMN_WIDTH = 80;
  const HOUR_COLUMN_WIDTH = screenWidth * 0.2; // 20% of screen width
  const TIME_SLOTS_START = 12; // 12pm
  const TIME_SLOTS_END = 18; // 6pm
  
  const tables = Array.from({ length: 20 }, (_, i) => ({
    id: `T${i + 1}`,
    capacity: '2-3'
  }));

  const timeSlots = Array.from(
    { length: TIME_SLOTS_END - TIME_SLOTS_START + 1 }, 
    (_, i) => {
      const hour = i + TIME_SLOTS_START;
      return hour === 12 ? '12pm' : `${hour % 12}pm`;
    }
  );

  const bookings = [
    {
      id: 1,
      table: 'T1',
      name: 'Gloria Anieves',
      guests: '2 Adults',
      startTime: '12pm',
      duration: 2,
      type: 'walkin',
      color: '#3B82F6'
    },
    {
      id: 2,
      table: 'T2',
      name: 'Alberto',
      guests: '2 Adults',
      startTime: '1pm',
      duration: 1,
      type: 'reservation',
      color: '#F97316'
    },
    {
      id: 3,
      table: 'T3',
      name: 'Ben',
      guests: '~2covers (group)',
      startTime: '2pm',
      duration: 2,
      type: 'reservation',
      color: '#A855F7'
    },
    {
      id: 4,
      table: 'T4',
      name: 'Gloria Anieves',
      guests: '~2covers (group)',
      startTime: '5pm',
      duration: 1,
      type: 'walkin',
      color: '#3B82F6'
    }
  ];

  const calculatePosition = (startTime) => {
    const hour = parseInt(startTime.replace('pm', ''));
    const position = (hour === 12 ? 0 : hour - TIME_SLOTS_START) * HOUR_COLUMN_WIDTH;
    return position;
  };

  const calculateWidth = (duration) => {
    return duration * HOUR_COLUMN_WIDTH;
  };

  const getStatusColor = (type) => {
    switch (type) {
      case 'walkin':
        return 'bg-blue-600';
      case 'reservation':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-4 py-3 bg-white border-b border-gray-200">
        <Text className="text-lg font-semibold" style={styles.poppinsRegular}>Monday, 14 August 2023</Text>
        
        {/* Action buttons */}
        <View className="flex-row mt-3">
          <TouchableOpacity className="px-3 py-1 bg-navy-600 rounded-md mr-2">
            <Text className="text-white text-sm" style={styles.poppinsRegular} >Map</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-3 py-1 bg-navy-600 rounded-md mr-2">
            <Text className="text-white text-sm" style={styles.poppinsRegular}>Day View</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-3 py-1 bg-navy-600 rounded-md mr-2">
            <Text className="text-white text-sm" style={styles.poppinsRegular}>Legend</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
        <View>
          {/* Time header */}
          <View className="flex-row border-b border-gray-200" 
                style={{ paddingLeft: TABLE_COLUMN_WIDTH }}>
            {timeSlots.map((time) => (
              <View 
                key={time} 
                style={{ width: HOUR_COLUMN_WIDTH }}
                className="px-2 py-3"
              >
                <Text className="text-sm text-gray-600" style={styles.poppinsRegular}>{time}</Text>
              </View>
            ))}
          </View>

          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {/* Tables and bookings */}
            {tables.map((table) => (
              <View key={table.id} className="flex-row border-b border-gray-100">
                {/* Table info */}
                <View 
                  style={{ width: TABLE_COLUMN_WIDTH }}
                  className="px-2 py-3 border-r border-gray-200 bg-white"
                >
                  <Text className="text-sm font-semibold"style={styles.poppinsRegular}>{table.id}</Text>
                  <Text className="text-xs text-gray-600"style={styles.poppinsRegular}>{table.capacity}</Text>
                </View>

                {/* Timeline */}
                <View 
                  className="h-16 relative bg-white"
                  style={{ width: HOUR_COLUMN_WIDTH * timeSlots.length }}
                >
                  {/* Time grid lines */}
                  {timeSlots.map((_, index) => (
                    <View
                      key={index}
                      className="absolute h-full border-l border-gray-100"
                      style={{ left: index * HOUR_COLUMN_WIDTH }}
                    />
                  ))}

                  {/* Bookings */}
                  {bookings
                    .filter(booking => booking.table === table.id)
                    .map((booking) => (
                      <TouchableOpacity
                        key={booking.id}
                        activeOpacity={0.8}
                        className="absolute top-2 rounded-md p-2"
                        style={{
                          left: calculatePosition(booking.startTime),
                          width: calculateWidth(booking.duration),
                          backgroundColor: booking.color
                        }}
                      >
                        <Text className="text-white text-xs font-semibold" style={styles.poppinsRegular}>{booking.name}</Text>
                        <Text className="text-white text-xs"style={styles.poppinsRegular}>{booking.guests}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 12,
  // },
  // topBar: {
  //   flexDirection: 'row',
  //   // right: "50%",
  //   justifyContent:"flex-end",
  //   padding: 8,
  //   gap: 8
  // },
  // hBar: {
  //   flexDirection: 'row',
  //   justifyContent:"space-between",
  //   padding: 8,
  //   gap: 8
  // },
  // dropdownCard: {
  //   marginTop: 10,
  //   padding: 15,
  //   backgroundColor: '#e8f4f8',
  //   borderRadius: 10,
  // },
  // dropdownCardText: {
  //   fontSize: 14,
  //   color: '#444',
  // },
  // iconContainer: {
    
  //   justifyContent:"center",
  //   padding: 8,
  //   borderWidth: 1,
  //   borderRadius: 12,
  //   borderColor: '#ddd',
  // },
  // iconSummery: {    
  //   justifyContent:"center",
  //   alignItems:"center",
  //   width:86,
  //   padding: 2,
  //   borderWidth: 1,
  //   borderRadius: 12,
  //   borderColor: '#ddd',
  // },
  // icon: {
  //   color: '#333',
  // },
  // imageIcon: {
  //   width: 38,
  //   height: 38,
  //   borderRadius: 12,
  // },
  // card: {
  //   backgroundColor: 'white',
  //   padding: 8,
  //   borderRadius: 10,
  //   shadowColor: '#000',
  //   shadowOpacity: 0.2,
  //   shadowRadius: 5,
  //   marginBottom: 16,
  // },
  // cardTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  //   fontFamily: 'poppinsBold',
  //   // color: '#A5BFCC',
  // },
  // chartConfig: {
  //   backgroundColor: 'black',
  //   backgroundGradientFrom: 'black',
  //   backgroundGradientTo: 'black',
  //   decimalPlaces: 0,
  //   color: () => 'rgba(255, 255, 255, 1)', // White line color
  //   labelColor: () => 'rgba(255, 255, 255, 1)', // White label color
  //   style: {
  //     borderRadius: 16,
  //   },
  //   propsForDots: {
  //     r: '6',
  //     strokeWidth: '2',
  //     stroke: '#ffa726',
  //   },
  //   fontFamily: 'poppinsBold',
  // },
  // chart: {
  //   marginVertical: 8,
  //   borderRadius: 16,
  //   fontFamily: 'poppinsRegular',
  // },
  // messageContainer: {
  //   flexDirection: 'row',
  //   paddingVertical: 10,
  //   borderRadius: 10, // Add a slight curve to the corners
  //   borderWidth: 1,
  //   borderColor: 'lightgray',
  //   backgroundColor: '#FFFFFF', // Set a white background to make the shadow visible
  //   shadowColor: '#000000', // Set the shadow color to black
  //   shadowOffset: { width: 0, height: 2 }, // Set the shadow offset
  //   shadowOpacity: 0.25, // Set the shadow opacity
  //   shadowRadius: 3.84, // Set the shadow radius
  //   elevation: 5, // Add elevation for Android devices
  //   alignItems: 'center',
  // },
  // messageImage: {
  //   width: 60,
  //   height: 60,
  //   borderRadius: 30,
  // },
  // messageTextContainer: {
  //   marginLeft: 10,
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: "space-between",
  //   gap: 6,
  //   fontFamily: 'poppinsRegular',
  // },
  // messageName: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: '#333',
  //   fontFamily: 'poppinsRegular',
  // },
  // messagePosition: {
  //   fontSize: 14,
  //   color: '#666',
  //   fontFamily: 'poppinsRegular',
  // },
  // messageActions: {
  //   flexDirection: 'row',
  //   marginTop: 5,
  //   justifyContent: 'flex-end',
  //   alignSelf: 'flex-end',
  // },
  // actionButton: {
  //   backgroundColor: '#f0f0f0',
  //   padding: 8,
  //   borderRadius: 50,
  //   marginLeft: 5,
  // },
  poppinsRegular: {
    fontFamily: 'poppinsRegular',
  },
  poppinsBold: {
    fontFamily: 'poppinsBold',
    fontSize: 20,
  },
  poppinsMedium: {
    fontFamily: 'poppinsMedium',
  },
  poppinsSemiBold: {
    fontFamily: 'poppinsSemiBold',
  },
  poppinsExtraBold: {
    fontFamily: 'poppinsExtraBold',
  },
});

export default BookingTimeline;