import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Image, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';

import Icons from '@/utils/Icons'; 
import useLocation from '@/hooks/useLocation';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import MapScreen from '../../component/MapLibreMap';
import Booktable from './booktable';

const Index = () => {    
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('restaurants');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Track which restaurant is selected

  const [query, setQuery] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const { 
    lat: currentLat, 
    lon: currentLon, 
    curLocation,
    errMsg: currentLocationError, 
    loading: currentLocationLoading } = useCurrentLocation();

  const { 
    searchedLat, 
    searchedLon, 
    searchedLocation, 
    errMsg: searchedLocationError, 
    loading: searchedLocationLoading } = useLocation(searchQuery);

  const [useCoordinates, setUseCoordinates] = useState<boolean>(false); 
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantPhotos, setRestaurantPhotos] = useState([]);  

  const formatDate = (dt_txt) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  useEffect(() => {
    if (currentLat && currentLon) 
    {
      setQuery(`${currentLat},${currentLon}`);
      setUseCoordinates(true);
      fetchNearbyPlaces(currentLat, currentLon); 
      fetchRestaurants(currentLat, currentLon);
    }
  }, [currentLat, currentLon]);

  useEffect(() => {
    if (searchedLat && searchedLon) {
      fetchNearbyPlaces(searchedLat, searchedLon);
      fetchRestaurants(searchedLat, searchedLon); 
    }
  }, [searchedLat, searchedLon]);  

  // Debounce logic - delay the search until typing has stopped for 500ms
  useEffect(() => {
    const timer = setTimeout(() => 
    {
      setDebouncedQuery(searchQuery);
    }, 500); // Adjust debounce time as needed

    // Cleanup timer on component unmount or query change
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.trim()) 
    {
      // Fetch results based on debouncedQuery
      handleSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant); // Set the restaurant data for the modal
    setModalVisible(true); // Open the modal
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
    setSelectedRestaurant(null); // Reset the selected restaurant
  };

  const handleSearch = (query) => {   
    if (query.trim()) 
    {
      setQuery(query);
      setUseCoordinates(false);
    } 
    else if(searchedLat && searchedLon) 
    {
      setQuery(`${searchedLat},${searchedLon}`);
      setUseCoordinates(true);
    } 
    else 
    {
      setQuery(`${currentLat},${currentLon}`);
      setUseCoordinates(true);
    }
  };

  // Function to fetch nearby places
  const fetchNearbyPlaces = async (lat, lon) => {
    try {
      const response = await fetch(`https://map-server-1-l0ef.onrender.com/api/nearbyplaces?lat=${lat}&lon=${lon}`);
      const data = await response.json();

      // console.log("nearbyPlaces", data.results);
      if (Array.isArray(data.results)) 
      {
        // console.log("nearbyPlaces", data.results);        
        setNearbyPlaces(data.results);
      } 
      else { console.error('No nearby places found');  }
    } 
    catch (error) { console.error('Error fetching nearby places:', error); }
  };

  // Function to fetch restaurants
  const fetchRestaurants = async (lat, lon) => {
    try {
      const response = await fetch(`https://map-server-1-l0ef.onrender.com/api/restaurants?lat=${lat}&lon=${lon}`);
      const data = await response.json();
      // console.log("restaurants: ", data.results);
      
      if (Array.isArray(data.results)) 
      {
        setRestaurants(data.results);
      } 
      else { console.error('No restaurants found'); }
    } 
    catch (error) { console.error('Error fetching restaurants:', error); }
  };

  // Function to fetch photos for a specific restaurant
  const fetchRestaurantPhotos = async (fsq_id) => {
    try {
      const response = await fetch(`http://10.196.0.124:3000/api/restaurant-photos?fsq_id=${fsq_id}`);
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        setRestaurantPhotos(data.photos);
      } else {
        console.error('No photos found for this restaurant');
      }
    } catch (error) {
      console.error('Error fetching restaurant photos:', error);
    }
  };

  // console.log("Restaurents",restaurants);  

  return (
    <View className="flex-1 bg-[#edf2fb]">
      {/* Map Screen */}
      <MapScreen 
        currentLat={currentLat}
        currentLon={currentLon}    
        searchedLat={searchedLat}    
        searchedLon={searchedLon}   
      />
      
      {/* Search Container */}
      <View className="px-4 my-2">
        <View className="flex-row items-center relative">
        <TextInput
            className="bg-white rounded-md w-full px-10 py-4 text-gray-400 bg-white border border-gray-400 shadow-md"
            style={styles.poppinsRegular}
            placeholder="Enter Location or Restaurant Name"
            placeholderTextColor="#B0B0B0"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={()=> handleSearch(searchQuery)}
          />
          <Pressable style={{ position: 'absolute', right: 10, padding: 10 }}
            onPress={handleSearch}
          >
            <Icons name="search" color="black" size={20} />
          </Pressable>
        </View>
      </View> 

      { searchedLocation &&
        <View>
          <Text className="text-sm text-gray-800">{`${searchedLocation.country}, ${searchedLocation.city}, ${searchedLocation.district} `}</Text>
        </View>
      }
      

      <View className="flex-1 p-4 bg-white">
        {/* Tab Navigation */}
        <View className="flex-row mb-4">        
          <TouchableOpacity
            onPress={() => setSelectedTab('restaurants')}
            className={`flex-1 p-2 text-center rounded-tl-lg rounded-tr-lg ${selectedTab === 'restaurants' ? 'bg-[#b6465f] shadow-[#dda15e] m-1' : 'bg-gray-200'}`}
          >
            <Text className="text-lg font-bold">Restaurants</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedTab('places')}
            className={`flex-1 p-2 text-center rounded-tl-lg rounded-tr-lg ${selectedTab === 'places' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            <Text className="text-lg font-bold">Nearby Places</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {selectedTab === 'restaurants' ? 
        (
          <>
            {/* <Text className="text-2xl font-bold mb-4">Restaurants</Text> */}
            <FlatList
              data={restaurants}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Pressable
                  className="mb-4 p-4 bg-gray-100 rounded-lg shadow-lg"
                  onPress={() => openModal(item)}
                >
                  <Image style={{width:32, height:32, backgroundColor:"grey", borderRadius: 8}}
                    src={`${item.categories[0].icon.prefix}64${item.categories[0].icon.suffix}`}
                    alt="Category Icon"
                  />
                  <Text className="text-lg font-medium">
                    {item ? item.name || "Unnamed Restaurant" : "No Name"}
                  </Text>
                </Pressable>
              )}
            />
          </>
        ):(
          <>
            <Text className="text-2xl font-bold mb-4">Nearby Places</Text>
            <FlatList
              data={nearbyPlaces}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View className="mb-2 p-4 bg-gray-100 rounded-lg shadow-md">  
                  <Text className="text-lg font-medium">
                    {item ? item.name || "Unnamed Place" : "No Name"}
                  </Text>
                </View>
              )}
            />
          </>
        ) }
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

export default Index;

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


