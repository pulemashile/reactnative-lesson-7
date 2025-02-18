import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, Pressable, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useBooking } from '@/context/BookingContext';
import { SafeAreaView } from 'react-native-safe-area-context';


// const screenWidth = Dimensions.get('window').width;

const messages = [
  { id: 1, name: 'Mapula mashile', position: 'Owner & Chef', image: require('../../assets/images/red.jpg'), message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod.', additionalInfo: 'More info about Mapula: She is the owner and chef with over 10 years of experience.' },
  { id: 2, name: 'Jane Smith', position: 'Manager', image: require('../../assets/images/girl56.jpg'), message: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', additionalInfo: 'More info about Jane: She is the manager who has been with the company for 5 years.' },
  { id: 3, name: 'Emily Clark', position: 'Waitress', image: require('../../assets/images/granny.jpg'), message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.', additionalInfo: 'More info about Emily: She is an experienced waitress who loves interacting with customers.' },
  { id: 4, name: 'Alex Johnson', position: 'Host', image: require('../../assets/images/man.jpg'), message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', additionalInfo: 'More info about Alex: He is the host who ensures all guests are welcomed with a smile.' },
];

const AdminDashboard = () => {
  const { bookings, loading, error, fetchBookings } = useBooking();
  const [activeMessageId, setActiveMessageId] = useState(null);

  const { width } = useWindowDimensions();

  useEffect(() => {    
      fetchBookings();      
  }, []);

  const handleAccordionToggle = (id) => {
    setActiveMessageId(activeMessageId === id ? null : id); // Toggle visibility
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [15, 40, 10, 30, 20, 50, 25, 60, 15, 40, 10, 30],
        strokeWidth: 2,
      },
    ],
  };

  const pieData = [
    { name: 'Dine-in', population: 40, color: '#56021F', legendFontColor: '#56021F', legendFontSize: 14 },
    { name: 'Desserts', population: 25, color: '#7D1C4A', legendFontColor: '#7D1C4A', legendFontSize: 14 },
    { name: 'Dinner', population: 20, color: '#D17D98', legendFontColor: '#D17D98', legendFontSize: 14 },
    { name: 'Lunch', population: 10, color: '#D91656', legendFontColor: '#D91656', legendFontSize: 14 },
    { name: 'breakfast', population: 5, color: '#F4CCE9', legendFontColor: '#F4CCE9', legendFontSize: 14 },
    
  ];

  console.log("bookings: ", bookings);  
  // {console.log(width)  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Top Bar with Icons */}
      <View style={styles.topBar}>
        <Pressable style={styles.iconContainer}>
          <Ionicons name="reload" size={24} color="black" />
          {/* <Text> 🌘 </Text> */}
          {/* <Text> 🌔 </Text> */}
        </Pressable>

        <Pressable style={styles.iconContainer}>
          <Ionicons name="notifications" size={24} color="black" />
          {/* <Text> 🔔 </Text> */}
        </Pressable>

        <Pressable style={styles.iconContainer}>
          <Ionicons name="settings" size={24} color="black" />
          {/* <Text> 🔄 </Text> */}
        </Pressable>
        <Pressable style={styles.iconContainer}>
          <Image source={messages[0].image} style={styles.imageIcon} />
        </Pressable>
      </View>
      
      <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
        {/* Sales Report with Line Chart */}
        <View style={styles.card}>
          <View className='w-full flex-row justify-between items-center '>
            <Text style={styles.cardTitle}>Reservations Report</Text>
            <Text style={styles.poppinsRegular}> Monthly ▾ </Text>
          </View>

          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }
              ]
            }}
            width={width - 48} 
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} 
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "black",
              backgroundGradientTo: "gray",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16, fontFamily: "poppinsBold"
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "white"
              }
            }}
            bezier
            style={{
              marginVertical: 2,
              borderRadius: 8,             
            }}
          />
        </View>

        <View style={styles.hBar}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.revenueDetails}>
              <Text style={styles.revenueLabel}>Total Revenue:</Text>
              <Text style={styles.revenueAmount}>$5,320.00</Text>
            </View>

            <Pressable style={styles.iconSummery}>
              <Text style={styles.poppinsRegular}>5</Text>
              <Text style={styles.poppinsRegular}>Available</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text style={styles.poppinsRegular}>6</Text>
              <Text style={styles.poppinsRegular}>Reserved</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text style={styles.poppinsRegular}>8</Text>
              <Text style={styles.poppinsRegular}>Occupied</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text style={styles.poppinsRegular}>2</Text>
              <Text style={styles.poppinsRegular}>Waiting</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text style={styles.poppinsRegular}>12</Text>
              <Text style={styles.poppinsRegular}>Total Tables</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text style={styles.poppinsRegular}>4</Text>
              <Text style={styles.poppinsRegular}>VIP Tables</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text style={styles.poppinsRegular}>1</Text>
              <Text style={styles.poppinsRegular}>Cancelled</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text style={styles.poppinsRegular}>3</Text>
              <Text style={styles.poppinsRegular}>Upcoming Reservations</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text style={styles.poppinsRegular}>0</Text>
              <Text style={styles.poppinsRegular}>Overdue Reservations</Text>
            </Pressable>
          </ScrollView>
        </View>


        {/* Messages Section with Accordion Behavior */}
        <View style={styles.messageContainer}>
          <Text style={styles.poppinsSemiBold}>Notifications</Text>

          {messages.slice(1).map((message) => (
            <View key={message.id} style={styles.messageContainer}>
              <View style={styles.messageTextContainer}>
                <Image source={message.image} style={styles.imageIcon} />

                <View style={{}}>
                  <Text style={styles.messageName}>{message.name}</Text>
                  <Text style={styles.messagePosition}>{message.position}</Text>
                </View>

                <Pressable onPress={() => handleAccordionToggle(message.id)}>
                  <Ionicons name="chatbubble-outline" size={24} color="black" />
                </Pressable>
                <Pressable onPress={() => alert('Calling...')}>
                  <Ionicons name="call-outline" size={24} color="black" />
                </Pressable>
              </View>

              {/* Accordion: Show message if it's the active message */}
              {activeMessageId === message.id && (
                <>
                  <View style={{ marginTop: 3 }}>
                    <Text>{message.message}</Text>
                  </View>
                  <View style={styles.dropdownCard}>
                    <Text>{message.additionalInfo}</Text>
                  </View>

                  <Pressable
                    onPress={() => {
                      router.push("/(app)/bookingManager/manage")
                    }}>
                    <Text style={styles.manageUser}>Manage User</Text>
                  </Pressable>
                </>
              )}
            </View>
          ))}
        </View>
        
         {/* Customer Demographics (Pie Chart) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Customer Demographics</Text>
          <PieChart
            data={pieData}
            width={width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>
      </ScrollView>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent:`flex-end`,
    margin: 8,
    gap: 2
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    // borderColor: "grey",
    // borderWidth: 1,
    width: 48,
    height: 48
  },
  imageIcon: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  hBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  revenueDetails: {
    justifyContent: 'space-around',
    marginRight: 8,
  },
  revenueLabel: {
    fontSize: 14,
    color: '#666',
  },
  revenueAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconSummery: {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginRight: 12,
    flex: 1,
  },
  messageContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
  },
  messageTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageName: {
    fontWeight: '600',
    fontSize: 16,
  },
  messagePosition: {
    fontSize: 14,
    color: '#777',
  },
  manageUser: {
    color: '#007bff',
    fontWeight: '600',
  },
  poppinsSemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 10,
  },
  poppinsRegular: {
    fontFamily: 'Poppins-Regular',
  },
  dropdownCard: {
    padding: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default AdminDashboard;
