import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable, Image, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg'; // Import SVG components
import Booktable from './booktable';

const Index = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('restaurants');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Track which restaurant is selected

  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant); // Set the restaurant data for the modal
    setModalVisible(true); // Open the modal
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
    setSelectedRestaurant(null); // Reset the selected restaurant
  };

  const restaurantsData = [
    {
      id: 1,
      name: "Pasta Palace",
      categories: [
        {
          icon: {
            prefix: "https://example.com/icons/food/",
            suffix: "_pasta.png",
          },
          name: "Italian",
        },
      ],
      address: "123 Pasta St, Flavor Town",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Burger Haven",
      categories: [
        {
          icon: {
            prefix: "https://example.com/icons/food/",
            suffix: "_burger.png",
          },
          name: "American",
        },
      ],
      address: "456 Burger Ave, Grill City",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Sushi Corner",
      categories: [
        {
          icon: {
            prefix: "https://example.com/icons/food/",
            suffix: "_sushi.png",
          },
          name: "Japanese",
        },
      ],
      address: "789 Sushi Rd, Tokyo Town",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Vegan Vibes",
      categories: [
        {
          icon: {
            prefix: "https://example.com/icons/food/",
            suffix: "_vegan.png",
          },
          name: "Vegan",
        },
      ],
      address: "101 Green Ln, Plant City",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Taco Fiesta",
      categories: [
        {
          icon: {
            prefix: "https://example.com/icons/food/",
            suffix: "_taco.png",
          },
          name: "Mexican",
        },
      ],
      address: "202 Taco Blvd, Spice Town",
      rating: 4.3,
    },
  ];

  const [useCoordinates, setUseCoordinates] = useState<boolean>(false);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [restaurants, setRestaurants] = useState(restaurantsData);
  const [restaurantPhotos, setRestaurantPhotos] = useState([]);

  const formatDate = (dt_txt) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleSearch = () => {
    // Implement your search functionality here
  };

  return (
    <View className="flex-1 bg-[#edf2fb]">
      {/* Search Container */}
      <View className="px-4 my-2">
        <View className="flex-row items-center relative">
          <TextInput
            className="bg-white rounded-md w-full px-10 py-4 text-gray-400 bg-white border border-gray-400 shadow-md"
            style={styles.poppinsRegular}
            placeholder="Enter Location or Restaurant Name"
            placeholderTextColor="#B0B0B0"
            onSubmitEditing={() => handleSearch()}
          />
          {/* Search Icon */}
          <Pressable
            style={{ position: 'absolute', right: 10, padding: 10 }}
            onPress={handleSearch}
          >
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none">
              <Path
                d="M17.5 17.5L22 22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>
        </View>
      </View>

      <View className="flex-1 p-4 bg-white">
        {/* Tab Navigation */}
        <View className="flex-row mb-4">
          <TouchableOpacity
            onPress={() => setSelectedTab('restaurants')}
            className={`flex-1 p-2 text-center rounded-tl-lg rounded-tr-lg ${selectedTab === 'restaurants' ? 'bg-[#b6465f] text-white' : 'bg-gray-200'}`}
          >
            <Text className="text-lg font-bold" style={styles.poppinsRegular}>
              Restaurants
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedTab('places')}
            className={`flex-1 p-2 text-center rounded-tl-lg rounded-tr-lg ${selectedTab === 'places' ? 'bg-[#b6465f] text-white' : 'bg-gray-200'}`}
          >
            <Text className="text-lg font-bold" style={styles.poppinsRegular}>
              Nearby Places
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {selectedTab === 'places' ? (
          <FlatList
            data={nearbyPlaces}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="mb-2 p-4 bg-gray-100 rounded-lg shadow-md">
                <Text className="text-lg font-medium">{item ? item.name || "Unnamed Place" : "No Name"}</Text>
              </View>
            )}
          />
        ) : (
          <FlatList
            data={restaurants}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <>
                <Pressable
                  className="mb-2 p-4 bg-gray-100 rounded-lg shadow-md"
                  onPress={() => openModal(item)}
                >
                  <Image
                    style={{ width: 32, height: 32, backgroundColor: "grey", borderRadius: 8 }}
                    source={{ uri: `${item.categories[0].icon.prefix}64${item.categories[0].icon.suffix}` }}
                    alt="Category Icon"
                  />
                  <Text className="text-lg font-medium" style={styles.poppinsRegular}>
                    {item ? item.name || "Unnamed Restaurant" : "No Name"}
                  </Text>
                </Pressable>
              </>
            )}
          />
        )}
      </View>

      {/* Modal for Book a Table */}
      <Modal
        // animationType="slide"

        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
        className='slide-in-right'
      >
        <Pressable
          onPress={closeModal}
          className="absolute top-5 left-5 bg-white p-2 rounded-full shadow-lg z-20"
        >
          <Text>X</Text>
        </Pressable>
        <Booktable restaurant={selectedRestaurant} />
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
    fontFamily: 'poppinsSemiBold',
  },
  poppinsExtraBold: {
    fontFamily: 'poppinsExtraBold',
  },
  poppinsitalic: {
    fontFamily: 'poppinsitalic',
  },
  poppinsBoldItalic: {
    fontFamily: 'poppinsBoldItalic',
  },
});

export default Index;
