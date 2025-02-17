
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, Pressable, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useBooking } from '@/context/BookingContext';
import { SafeAreaView } from 'react-native-safe-area-context';


const screenWidth = Dimensions.get('window').width;

const messages = [
  { id: 1, name: 'Mapula mashile', position: 'Owner & Chef', image: require('../../assets/images/red.jpg'), message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod.', additionalInfo: 'More info about Mapula: She is the owner and chef with over 10 years of experience.' },
  { id: 2, name: 'Jane Smith', position: 'Manager', image: require('../../assets/images/girl56.jpg'), message: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', additionalInfo: 'More info about Jane: She is the manager who has been with the company for 5 years.' },
  { id: 3, name: 'Emily Clark', position: 'Waitress', image: require('../../assets/images/granny.jpg'), message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.', additionalInfo: 'More info about Emily: She is an experienced waitress who loves interacting with customers.' },
  { id: 4, name: 'Alex Johnson', position: 'Host', image: require('../../assets/images/man.jpg'), message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', additionalInfo: 'More info about Alex: He is the host who ensures all guests are welcomed with a smile.' },
];

const AdminDashboard = () => {
  const { bookings, loading, error, fetchBookings } = useBooking();
  const { width } = useWindowDimensions();
  const [activeMessageId, setActiveMessageId] = useState(null);

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
    { name: 'Dine-in', population: 40, color: '#56021F', legendFontColor: '#FFF', legendFontSize: 14 },
    { name: 'Desserts', population: 25, color: '#7D1C4A', legendFontColor: '#FFF', legendFontSize: 14 },
    { name: 'Dinner', population: 20, color: '#D17D98', legendFontColor: '#FFF', legendFontSize: 14 },
    { name: 'Lunch', population: 10, color: '#D91656', legendFontColor: '#FFF', legendFontSize: 14 },
    { name: 'breakfast', population: 5, color: '#F4CCE9F', legendFontColor: '#FFF', legendFontSize: 14 },
  ];

  console.log("bookings: ", bookings);
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Top Bar with Icons */}
      <View style={styles.topBar}>
        <Pressable style={styles.iconContainer}>
          {/* Moon SVG */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
            <path d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg> */}
        </Pressable>
        <Pressable style={styles.iconContainer}>
          {/* Search SVG */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
            <path d="M5.14286 14C4.41735 12.8082 4 11.4118 4 9.91886C4 5.54539 7.58172 2 12 2C16.4183 2 20 5.54539 20 9.91886C20 11.4118 19.5827 12.8082 18.8571 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7.38287 17.0982C7.291 16.8216 7.24507 16.6833 7.25042 16.5713C7.26174 16.3343 7.41114 16.1262 7.63157 16.0405C7.73579 16 7.88105 16 8.17157 16H15.8284C16.119 16 16.2642 16 16.3684 16.0405C16.5889 16.1262 16.7383 16.3343 16.7496 16.5713C16.7549 16.6833 16.709 16.8216 16.6171 17.0982C16.4473 17.6094 16.3624 17.8651 16.2315 18.072C15.9572 18.5056 15.5272 18.8167 15.0306 18.9408C14.7935 19 14.525 19 13.9881 19H10.0119C9.47495 19 9.2065 19 8.96944 18.9408C8.47283 18.8167 8.04281 18.5056 7.7685 18.072C7.63755 17.8651 7.55266 17.6094 7.38287 17.0982Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M15 19L14.8707 19.6466C14.7293 20.3537 14.6586 20.7072 14.5001 20.9866C14.2552 21.4185 13.8582 21.7439 13.3866 21.8994C13.0816 22 12.7211 22 12 22C11.2789 22 10.9184 22 10.6134 21.8994C10.1418 21.7439 9.74484 21.4185 9.49987 20.9866C9.34144 20.7072 9.27073 20.3537 9.12932 19.6466L9 19" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 16V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg> */}
        </Pressable>
        <Pressable style={styles.iconContainer}>
          {/* Bulb SVG */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
            <path d="M14 14L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M16.4333 18.5252C15.8556 17.9475 15.8556 17.0109 16.4333 16.4333C17.0109 15.8556 17.9475 15.8556 18.5252 16.4333L21.5667 19.4748C22.1444 20.0525 22.1444 20.9891 21.5667 21.5667C20.9891 22.1444 20.0525 22.1444 19.4748 21.5667L16.4333 18.5252Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg> */}
        </Pressable>
        <Pressable style={styles.iconContainer}>
          <Image source={messages[0].image} style={styles.imageIcon} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
        {/* Sales Report with Line Chart */}
        <View style={styles.card}> {/* use dimensions width */}
          <View className='w-full flex-row justify-between items-center '>
            <Text style={styles.cardTitle} className='text-gray-600'>Reservations Report</Text>
            <Text style={styles.poppinsRegular}> Monthly ▾ </Text>
          </View>
          {/* 
          const { width } = useWindowDimensions(); */}

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
            width={width - 40} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "black",
              backgroundGradientTo: "gray",
              decimalPlaces: 2, // optional, defaults to 2dp
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
              marginVertical: 8,
              borderRadius: 16
            }}
          />

        </View>

        <View style={styles.hBar}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Pressable style={styles.iconSummery}>
              <Text className='text-lg font-bold' style={styles.poppinsRegular}>5</Text>
              <Text className='text-[10px]' style={styles.poppinsRegular}>Available</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text className='text-lg font-bold' style={styles.poppinsRegular}>6</Text>
              <Text className='text-[10px]' style={styles.poppinsRegular}>Reserved</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text className='text-lg font-bold' style={styles.poppinsRegular}>8</Text>
              <Text className='text-[10px]' style={styles.poppinsRegular}>Occupied</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text className='text-lg font-bold' style={styles.poppinsRegular}>2</Text>
              <Text className='text-[10px]' style={styles.poppinsRegular}>Waiting</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text className='text-lg font-bold' style={styles.poppinsRegular}>12</Text>
              <Text className='text-[10px]' style={styles.poppinsRegular}>Total Tables</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text className='text-lg font-bold' style={styles.poppinsRegular}>4</Text>
              <Text className='text-[10px]' style={styles.poppinsRegular}>VIP Tables</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text className='text-lg font-bold' style={styles.poppinsRegular}>1</Text>
              <Text className='text-[10px]' style={styles.poppinsRegular}>Cancelled</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text className='text-lg font-bold' style={styles.poppinsRegular}>3</Text>
              <Text className='text-[10px]' style={styles.poppinsRegular}>Upcoming Reservations</Text>
            </Pressable>

            <Pressable style={styles.iconSummery}>
              <Text className='text-lg font-bold' style={styles.poppinsRegular}>0</Text>
              <Text className='text-[10px]' style={styles.poppinsRegular}>Overdue Reservations</Text>
            </Pressable>
          </ScrollView>
        </View>


        {/* Messages Section with Accordion Behavior */}
        <View className="bg-white rounded-lg shadow-md p-4 mt-4 h-[350px]">
          <Text className="text-lg font-semibold text-gray-600 mb-4  "
            style={styles.poppinsSemiBold}>
            Notifications
          </Text>

          {
            messages.slice(1).map((message) => (
              <View key={message.id} className="border-b border-gray-300 py-4">
                <View className="flex-row items-center justify-between">
                  <Image source={message.image} alt='1' className="w-12 h-12 rounded-full mr-4 bg-red-600" style={styles.imageIcon} />
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-800" style={styles.poppinsRegular}>{message.name}</Text>
                    <Text className="text-sm text-gray-600" style={styles.poppinsRegular}>{message.position}</Text>
                  </View>
                  <Pressable
                    className="ml-4"
                    onPress={() => handleAccordionToggle(message.id)}
                  >
                    <Ionicons name="chatbubble-outline" size={24} color="black" />
                  </Pressable>
                  <Pressable
                    className="ml-4"
                    onPress={() => alert('Calling...')}
                  >
                    <Ionicons name="call-outline" size={24} color="black" />
                  </Pressable>
                </View>

                {/* Accordion: Show message if it's the active message */}
                {activeMessageId === message.id && (
                  <>
                    <View className="mt-3 px-4">
                      <Text className="text-gray-800" style={styles.poppinsRegular}>{message.message}</Text>
                    </View>

                    {/* This is the "dropdown" card with more info */}
                    <View className="bg-gray-200 p-3 mt-3 rounded-lg">
                      <Text className="text-gray-600" style={styles.poppinsRegular}>
                        {message.additionalInfo}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => {
                        alert("try manage user");
                        router.push(`/(app)/user/${message.id}`)
                      }}
                    >
                      <Text>Manage</Text>
                    </Pressable>
                  </>
                )}
              </View>
            ))
          }

          <Text
            className="text-lg font-semibold text-gray-600 mt-2 text-center w-full"
            style={styles.poppinsSemiBold}>More
          </Text>
        </View>

        <View style={styles.card} className=' mt-4 text-gray-600'>
          <Text style={styles.cardTitle} className=' font-bold text-gray-600 mb-3'>Customer Demographics</Text>
          <PieChart
            data={pieData}
            width={width - 40}
            height={220}
            chartConfig={{ color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, }}
              accessor="population"
              backgroundColor="#808080"
              paddingLeft="10"
              style={{ borderRadius: 16, fontFamily: 'poppinsRegular' }}
              absolute
          />
        </View>

      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  topBar: {
    flexDirection: 'row',
    // right: "50%",
    justifyContent: "flex-end",
    padding: 8,
    gap: 8
  },
  hBar: {
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 8,
    gap: 8
  },
  dropdownCard: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#e8f4f8',
    borderRadius: 10,
  },
  dropdownCardText: {
    fontSize: 14,
    color: '#444',
  },
  iconContainer: {
    width:54,
    justifyContent: "center",
    padding: 8,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#ddd',
  },
  iconSummery: {
    justifyContent: "center",
    alignItems: "center",
    width: 86,
    padding: 2,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#ddd',
  },
  icon: {
    color: '#333',
  },
  imageIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
  },
  card: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'poppinsBold',
    // color: '#A5BFCC',
  },

  chartConfig: {
    backgroundColor: 'black',
    backgroundGradientFrom: 'black',
    backgroundGradientTo: 'black',
    decimalPlaces: 0,
    color: () => 'rgba(255, 255, 255, 1)', // White line color
    labelColor: () => 'rgba(255, 255, 255, 1)', // White label color
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
    fontFamily: 'poppinsBold',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    fontFamily: 'poppinsRegular',
  },
  messageContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 10, // Add a slight curve to the corners
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: '#FFFFFF', // Set a white background to make the shadow visible
    shadowColor: '#000000', // Set the shadow color to black
    shadowOffset: { width: 0, height: 2 }, // Set the shadow offset
    shadowOpacity: 0.25, // Set the shadow opacity
    shadowRadius: 3.84, // Set the shadow radius
    elevation: 5, // Add elevation for Android devices
    alignItems: 'center',
  },
  messageImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  messageTextContainer: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    gap: 6,
    fontFamily: 'poppinsRegular',
  },
  messageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'poppinsRegular',
  },
  messagePosition: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'poppinsRegular',
  },
  messageActions: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  actionButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 50,
    marginLeft: 5,
  },
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

export default AdminDashboard;
