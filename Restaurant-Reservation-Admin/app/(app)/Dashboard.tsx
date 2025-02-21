import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, View, Image, Pressable, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-elements';
import Svg, { Circle, Path } from "react-native-svg";

import { useBooking } from '@/context/BookingContext';

// const screenWidth = Dimensions.get('window').width;

// const messages = [
//   { id: 1, name: 'Mapula mashile', position: 'Owner & Chef', image: require('../../assets/images/red.jpg'), message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod.', additionalInfo: 'More info about Mapula: She is the owner and chef with over 10 years of experience.' },
//   { id: 2, name: 'Jane Smith', position: 'Manager', image: require('../../assets/images/girl56.jpg'), message: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', additionalInfo: 'More info about Jane: She is the manager who has been with the company for 5 years.' },
//   { id: 3, name: 'Emily Clark', position: 'Waitress', image: require('../../assets/images/granny.jpg'), message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.', additionalInfo: 'More info about Emily: She is an experienced waitress who loves interacting with customers.' },
//   { id: 4, name: 'Alex Johnson', position: 'Host', image: require('../../assets/images/man.jpg'), message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', additionalInfo: 'More info about Alex: He is the host who ensures all guests are welcomed with a smile.' },
// ];

const AdminDashboard = () => {
  const { bookings, loading, error, fetchBookings, filteredBookings } = useBooking();
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
        {/* Moon Icon */}
        <Pressable style={styles.iconContainer}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>

        {/* Search Icon */}
        <Pressable style={styles.iconContainer}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M5.14286 14C4.41735 12.8082 4 11.4118 4 9.91886C4 5.54539 7.58172 2 12 2C16.4183 2 20 5.54539 20 9.91886C20 11.4118 19.5827 12.8082 18.8571 14"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path 
              d="M7.38287 17.0982C7.291 16.8216 7.24507 16.6833 7.25042 16.5713C7.26174 16.3343 7.41114 16.1262 7.63157 16.0405C7.73579 16 7.88105 16 8.17157 16H15.8284C16.119 16 16.2642 16 16.3684 16.0405C16.5889 16.1262 16.7383 16.3343 16.7496 16.5713C16.7549 16.6833 16.709 16.8216 16.6171 17.0982C16.4473 17.6094 16.3624 17.8651 16.2315 18.072C15.9572 18.5056 15.5272 18.8167 15.0306 18.9408C14.7935 19 14.525 19 13.9881 19H10.0119C9.47495 19 9.2065 19 8.96944 18.9408C8.47283 18.8167 8.04281 18.5056 7.7685 18.072C7.63755 17.8651 7.55266 17.6094 7.38287 17.0982Z" 
              stroke="black" 
              strokeWidth="1.5" 
            />
            <Path 
              d="M15 19L14.8707 19.6466C14.7293 20.3537 14.6586 20.7072 14.5001 20.9866C14.2552 21.4185 13.8582 21.7439 13.3866 21.8994C13.0816 22 12.7211 22 12 22C11.2789 22 10.9184 22 10.6134 21.8994C10.1418 21.7439 9.74484 21.4185 9.49987 20.9866C9.34144 20.7072 9.27073 20.3537 9.12932 19.6466L9 19" 
              stroke="black" 
              strokeWidth="1.5" />
            <Path 
              d="M12 16V11" 
              stroke="black" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" />
          </Svg>
        </Pressable>

        {/* Bulb Icon */}
        <Pressable style={styles.iconContainer}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M14 14L16.5 16.5"
              stroke="black"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <Path
              d="M16.4333 18.5252C15.8556 17.9475 15.8556 17.0109 16.4333 16.4333C17.0109 15.8556 17.9475 15.8556 18.5252 16.4333L21.5667 19.4748C22.1444 20.0525 22.1444 20.9891 21.5667 21.5667C20.9891 22.1444 20.0525 22.1444 19.4748 21.5667L16.4333 18.5252Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path 
              d="M16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9Z" 
              stroke="black" 
              strokeWidth="1.5" 
              strokeLinejoin="round" 
            />
          </Svg>
        </Pressable>

        <Pressable style={styles.iconContainer}>
          <Image  source={require('../../assets/images/red.jpg')} style={styles.imageIcon} />         
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
              <Text style={styles.revenueAmount}> * *** ***.**</Text>
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

          {bookings.slice(1).map((booking) => (
            <View key={booking._id} style={styles.messageContainer}>
              <View style={styles.messageTextContainer}>
                <Image source={require('../../assets/images/joy.jpeg')} style={styles.imageIcon} />

                <View style={{ width:'50%', }}>
                  <Text style={styles.messageName}>{booking.guestName}</Text>
                  <Text style={styles.messagePosition}>{booking.status}</Text>
                  <Text style={styles.messagePosition}>
                    { new Date(booking.date).toLocaleDateString() }
                  </Text>
                </View>

                <Pressable onPress={() => handleAccordionToggle(booking._id)}
                  style={{ }}
                >
                  {/* <Text>👁</Text>                   */}
                  {/* <Text>🗨</Text>                  
                  <Ionicons name="chatbubble-outline" size={24} color="black" /> */}
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 2C6.48 2 2 5.92 2 10.68c0 1.78.67 3.42 1.78 4.78l-1.28 3.85c-.17.5.33.98.83.77l3.92-1.62c1.38.62 2.93.96 4.55.96 5.52 0 10-3.92 10-8.68C22 5.92 17.52 2 12 2z"
                      stroke={"black"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </Pressable>

                <Pressable onPress={() => alert('Calling...')}
                  style={{ width:32, }}
                >
                  {/* <Text>📞</Text>                  
                  <Ionicons name="call-outline" size={24} color="black" /> */}
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    {/* Curved top connecting speaker & mic */}
                    <Path
                      d="M5 4C6.5 2.5 9 2 12 2C15 2 17.5 2.5 19 4"
                      stroke={"black"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    {/* Phone body */}
                    <Path
                      d="M6.71 3.71a1 1 0 00-1.42 1.42c.91 1.09 1.93 2.07 3.02 2.91.19.14.39.27.58.4a1 1 0 001.3-.12l2-2a1 1 0 011.41 0l2.54 2.54a1 1 0 010 1.41l-2 2a1 1 0 00-.12 1.3c.12.19.26.38.4.58.84 1.09 1.82 2.11 2.91 3.02a1 1 0 001.42-1.42 15.59 15.59 0 01-3.41-3.91 15.59 15.59 0 01-3.91-3.41L6.71 3.71z"
                      stroke={"black"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </Pressable>
              </View>

              {/* Accordion: Show message if it's the active message */}
              {activeMessageId === booking._id && (
                <>
                  <View style={{ marginTop: 3 }}>
                    <Text>📩 {booking.email} </Text>
                    <Text>{booking.restaurantName} 🛎{booking.slots} ▪ 👨‍👩‍👦‍👦 {booking.guestCount} </Text>
                  </View>
                  <View style={styles.dropdownCard}>
                    <Text>{booking.mealType}</Text>
                    <Text>{booking.notes}</Text>
                    <Text>{booking.specialRequest}</Text>
                  </View>

                  <Pressable className='bg-gray-200 p-4 flex justify-center'
                    onPress={() => { router.push("/(app)/bookingManager/manage") }}
                  >
                    <Text style={styles.manageUser}>Manage User</Text>
                  </Pressable>
                </>
              )}
            </View>
          ))}
          
          <Pressable>
            <Text>More</Text>
          </Pressable>      

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
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    // borderColor: "grey",
    // borderWidth: 1,
    width: 48,
    height: 48
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -18,
    borderRadius: 50,
    backgroundColor: 'red',
    zIndex: 9
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
    marginRight: 2,
    margin:8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flex: 1,
  },
  messageContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  messageTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
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
    textAlign:"center"
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
