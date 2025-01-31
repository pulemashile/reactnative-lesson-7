import React, { useState } from 'react';
import { View, Text, Pressable, Image, Modal, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // For the icons
import { useNavigation } from '@react-navigation/native';  // For navigation
import { Link, router } from 'expo-router';
import rsaRestaurants from '@/utils/data';


const Booktable = ({restaurant}) => {

    const selectedRestaurant = rsaRestaurants.filter(_restaurant => {
        // Get the keyword for comparison (e.g., "Spur" from "Amarillo Spur")
        const keyword = restaurant.name.split(' ')[1]?.toLowerCase() || restaurant.name.toLowerCase();
        
        // Check if any part of the restaurant name includes the keyword
        return _restaurant.name.toLowerCase().includes(keyword);
      });
      
      // Parse the selectedRestaurant data before use
      const parseRestaurantData = (restaurant) => {
        // Ensure gallery exists and is an array
        if (!restaurant || !Array.isArray(restaurant.gallery) || restaurant.gallery.length === 0) {
          // Provide a default image or handle the case when gallery is empty
          restaurant.gallery = ['https://example.com/default-image.jpg'];
        }
      
        // Ensure other properties like menu and reviews are correctly formatted
        if (!restaurant.menu || !Array.isArray(restaurant.menu)) {
          restaurant.menu = [];
        }
      
        if (!restaurant.reviews || !Array.isArray(restaurant.reviews)) {
          restaurant.reviews = [];
        }
      
        return restaurant;
      };
      
      // Now parse the first restaurant in the filtered list
      const parsedRestaurant = selectedRestaurant.map(parseRestaurantData);
      
      console.log("Parsed Selected Restaurant: ", parsedRestaurant[0]);
      
    
    
    // State to track the selected tab
    const [selectedTab, setSelectedTab] = useState('Menu'); // Default to 'Menu'

    // State for Modal (for gallery images)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    // Function to handle tab navigation
    const handleTabPress = (tab) => {
        setSelectedTab(tab); // Update the selected tab
    };

    // Function to open the modal with a specific image
    const openModal = (image) => {
        setModalImage(image);
        setIsModalVisible(true);        
    };
    
    const [showFullText, setShowFullText] = useState(false);

    const toggleText = () => {
        setShowFullText(!showFullText);
    };

    console.log("selectedRestaurant: ", restaurant.name);
    

    return (
        <View className="flex-1 bg-white fixed inset-0 z-10">
            {/* Image on top */}
            <View className="relative">
                <Image
                    // source={require('../../assets/images/set.jpeg')}
                    source={{uri: parsedRestaurant[0].gallery[0] }}
                    style={{ width: '100%', height: 300, borderRadius: 10 }}
                />

                {/* Share and Love Icons */}
                <View className="absolute top-5 right-5 flex-row gap-3">
                    <Pressable className="bg-white p-2 rounded-full shadow-lg">
                        <Ionicons name="share-social-outline" size={24} color="black" />
                        <Text>🤝</Text>
                    </Pressable>
                    <Pressable className="bg-white p-2 rounded-full shadow-lg">
                        {/* <Ionicons name="heart-outline" size={24} color="black" />  */}
                        <Text>❤</Text>
                    </Pressable>
                </View>
            </View>

            {/* Tabs (Menu, About, Gallery, Review) */}
            <View className="flex-row justify-around mt-5 space-x-4">
                <Pressable 
                    onPress={() => handleTabPress('Menu')} 
                    className={`py-2 px-4 text-[#14213d] ${selectedTab === 'Menu' ? 'border-b-2 border-[#890620] text-white' : 'bg-transparent text-gray-600'}`}
                >
                    <Text className="text-lg text-[#14213d]" style={styles.poppinsRegular}>Menu</Text>
                </Pressable>

                <Pressable 
                    onPress={() => handleTabPress('About')} 
                    className={`py-2 px-4 text-[#14213d] ${selectedTab === 'About' ? 'border-b-2 border-[#890620] text-white' : 'bg-transparent text-gray-600'}`}
                >
                    <Text className="text-lg text-[#14213d]" style={styles.poppinsRegular}>About</Text>
                </Pressable>

                <Pressable 
                    onPress={() => handleTabPress('Gallery')} 
                    className={`py-2 px-4 text-[#14213d] ${selectedTab === 'Gallery' ? 'border-b-2 border-[#890620] text-white' : 'bg-transparent text-gray-600'}`}
                >
                    <Text className="text-lg text-[#14213d]" style={styles.poppinsRegular}>Gallery</Text>
                </Pressable>

                <Pressable 
                    onPress={() => handleTabPress('Review')} 
                    className={`py-2 px-4 text-[#14213d] ${selectedTab === 'Review' ? 'border-b-2 border-[#890620] text-white' : 'bg-transparent text-gray-600'}`}
                >
                    <Text className="text-lg text-[#14213d]" style={styles.poppinsRegular}>Review</Text>
                </Pressable>
            </View>


            {/* Tab Content */}
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {selectedTab === 'Menu' && (
                    <View className="mt-5 px-5">
                        <Text className="text-2xl font-bold text-gray-700 mb-3">Our Menu</Text>
                        <Text className="text-lg text-gray-700">Discover our delicious dishes prepared with fresh ingredients and passion!</Text>

                        <View className="mt-5 space-y-3">
                            {/* Menu Items as Cards */}
                            { parsedRestaurant.map((restaurant) =>
                                restaurant.menu.map((item, index) => (
                                //   <MenuItemCard key={index} item={item} />
                                <View className="bg-white p-5 rounded-xl shadow-lg">
                                    <Text className="text-lg font-semibold text-gray-800"style={styles.poppinsRegular}>{item.name}</Text>
                                    <Text className="text-gray-600"style={styles.poppinsRegular}>{item.description}</Text>
                                    <Pressable className="mt-4 bg-[#890620] py-3 px-6 rounded-full 
                                        shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                        <Text className="text-white text-lg font-semibold">R{item.price}</Text>  
                                    </Pressable>
                                </View>
                                ))
                            )}   
                        </View>
                    </View>
                )}
                
                {/* About Tab */}
                {selectedTab === 'About' && (
                    <View className="mt-5 px-5">
                        <Text className="text-2xl font-bold text-gray-700 mb-3"style={styles.poppinsRegular}>About Us</Text>
                        <Text className="text-lg text-gray-700"style={styles.poppinsRegular}>
                            {/* Welcome to our restaurant! We are a family-owned business dedicated to
                             providing a memorable dining experience with the finest ingredients and a variety of mouth-watering dishes. */}
                             { `${parsedRestaurant[0].description}` }
                        </Text>
                        {/* <Text className="text-lg text-gray-700 mt-3">
                            Our chefs specialize in creating authentic flavors from around the world, 
                            bringing you the best of both local and international cuisine. We pride ourselves on exceptional service and a welcoming atmosphere.
                        </Text> */}
                        <Text className="text-lg text-gray-700 mt-3"style={styles.poppinsRegular}>
                            { `${parsedRestaurant[0].contactUs}` }
                        </Text>

                        {/* Read More/Read Less */}
                        {showFullText && (
                            <Text className="text-lg text-gray-700 mt-3"style={styles.poppinsRegular}>
                                { `${parsedRestaurant[0].readMore}` }                               
                            </Text>
                        )}

                        <Pressable onPress={toggleText}>
                            <Text className="text-[#890620] font-semibold mt-3"style={styles.poppinsRegular}>
                                {showFullText ? "Read Less" : "Read More"}
                            </Text>
                        </Pressable>

                        {/* Contact Card */}
                        <View className="mt-7 bg-white rounded-lg shadow-md p-5 flex-row items-center">
                            <Image
                                source={{ uri:  parsedRestaurant[0].owner.profileImg }}  
                                style={{ width: 60, height: 60, borderRadius: 30 }}
                            />
                            <View className="ml-4 flex-1">
                                <Text className="text-lg font-semibold text-gray-800"style={styles.poppinsRegular}>{ `${parsedRestaurant[0].owner.name}` }</Text>
                                <Text className="text-gray-600"style={styles.poppinsRegular}>{ `${parsedRestaurant[0].owner.position}` }</Text>

                                <View className="flex-row justify-between mt-2">
                                    <Pressable className="p-2 bg-gray-200 rounded-full">
                                        <Ionicons name="chatbubble-outline" size={20} color="black" />
                                    </Pressable>
                                    <Pressable className="p-2 bg-gray-200 rounded-full">
                                        <Ionicons name="call-outline" size={20} color="black" />
                                    </Pressable>
                                </View>
                            </View>
                        </View>

                        {/* Opening Hours */}
                        <View className="mt-7">
                            <Text className="text-2xl font-bold text-gray-700 mb-3"style={styles.poppinsRegular}>Opening Hours</Text>
                            <View className="text-lg text-gray-700">
                                <Text className='mb-2 text-gray-700 font-thin ' style={styles.poppinsRegular}> Monday - Friday: {`${parsedRestaurant[0].openingHours.mondayToFriday}`}</Text>
                                <Text style={styles.poppinsRegular}>
                                    Saturday: {`${parsedRestaurant[0].openingHours.saturday}`}
                                </Text>
                                <Text style={styles.poppinsRegular}>
                                    Sunday: {`${parsedRestaurant[0].openingHours.sunday}`}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Gallery Tab */}
                {selectedTab === 'Gallery' && (
                    <View className="mt-5 px-5">
                        <Text className="text-2xl font-bold text-gray-700 mb-3"style={styles.poppinsRegular}>Gallery</Text>
                        <View className="grid grid-cols-2 gap-4">
                            <Pressable onPress={() => openModal(require('../../assets/images/chef.png'))}>
                                <Image
                                    source={require('../../assets/images/chef.png')}
                                    style={{ width: '100%', height: 200, borderRadius: 15 }}
                                />
                                <Text className="text-sm text-center text-gray-600 mt-2"style={styles.poppinsRegular}>Delicious Dish 1</Text>
                            </Pressable>

                            <Pressable onPress={() => openModal(require('../../assets/images/chef.png'))}>
                                <Image
                                    source={require('../../assets/images/chef.png')}
                                    style={{ width: '100%', height: 200, borderRadius: 15 }}
                                />
                                <Text className="text-sm text-center text-gray-600 mt-2"style={styles.poppinsRegular}>Delicious Dish 2</Text>
                            </Pressable>

                            <Pressable onPress={() => openModal(require('../../assets/images/chef.png'))}>
                                <Image
                                    source={require('../../assets/images/chef.png')}
                                    style={{ width: '100%', height: 200, borderRadius: 15 }}
                                />
                                <Text className="text-sm text-center text-gray-600 mt-2"style={styles.poppinsRegular}>Dining Area</Text>
                            </Pressable>

                            <Pressable onPress={() => openModal(require('../../assets/images/chef.png'))}>
                                <Image
                                    source={require('../../assets/images/chef.png')}
                                    style={{ width: '100%', height: 200, borderRadius: 15 }}
                                />
                                <Text className="text-sm text-center text-gray-600 mt-2"style={styles.poppinsRegular}>Interior Ambiance</Text>
                            </Pressable>
                        </View>
                    </View>
                )}

                {/* Review Tab */}
                {selectedTab === 'Review' && (
                    <View className="mt-5 px-5">
                        <Text className="text-2xl font-bold text-gray-700 mb-3"style={styles.poppinsRegular}>Customer Reviews</Text>
                        <View className="space-y-5">
                            <View>
                                <Text className="font-semibold text-gray-800"style={styles.poppinsRegular}>
                                    John Doe
                                </Text>
                                <Text className="text-gray-600"style={styles.poppinsRegular}>
                                    "An amazing experience! The food was outstanding, 
                                    and the service was top-notch. Definitely coming back."
                                </Text>
                                <Text className="text-yellow-500 mt-2"style={styles.poppinsRegular}>
                                    ⭐⭐⭐⭐⭐
                                </Text>
                            </View>

                            <View>
                                <Text className="font-semibold text-gray-800"style={styles.poppinsRegular}>
                                    Jane Smith
                                </Text>
                                <Text className="text-gray-600"style={styles.poppinsRegular}>
                                    "I loved the vegetarian pizza! A must-try dish. 
                                    The atmosphere is very cozy and inviting."
                                </Text>
                                <Text className="text-yellow-500 mt-2"style={styles.poppinsRegular}>
                                    ⭐⭐⭐⭐⭐
                                </Text>
                            </View>

                            <View>
                                <Text className="font-semibold text-gray-800"style={styles.poppinsRegular}>Michael Brown</Text>
                                <Text className="text-gray-600"style={styles.poppinsRegular}>"The grilled salmon was cooked to perfection! Excellent portion size and flavor."</Text>
                                <Text className="text-yellow-500 mt-2"style={styles.poppinsRegular}>⭐⭐⭐⭐⭐</Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Book a Table Button */}
            <Link href ={{pathname:"/(app)/reservation/[restaurantName]", params: {restaurantName: restaurant.name}}}
                className="bg-[#890620] mt-7 py-3 mx-5 rounded-md items-center z-30"
            >
                <Text className="text-white text-lg font-bold"style={styles.poppinsRegular}>Book a Table</Text>
                {/* <Pressable className="bg-[#890620] mt-7 py-3 mx-5 rounded-md items-center z-30" 
                    // onPress={() => { router.push(`/(app)/reservation/${restaurant.name}`); }}
                >                    
                </Pressable> */}
            </Link>
            

            {/* Modal for larger image */}
            <Modal visible={isModalVisible} transparent={true} animationType="fade">
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                    <Pressable onPress={() => setIsModalVisible(false)} 
                        className="absolute top-0 right-0 p-5"
                    >
                        <Text className="text-white text-2xl" style={styles.poppinsRegular}>X</Text>
                    </Pressable>
                    {/* <Image
                        source={modalImage}
                        style={{ width: 300, height: 300, borderRadius: 15 }}
                    /> */}
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
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

export default Booktable;
