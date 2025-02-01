import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Image, FlatList, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import Icons from '@/utils/Icons'; 
import useLocation from '@/hooks/useLocation';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import MapScreen from '../../component/MapLibreMap';
import Booktable from '../(app)/booktable';

const Index = () => {    
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState('restaurants');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Track which restaurant is selected
  const [query, setQuery] = useState<string>('');  // Search query (location or restaurant)
  const [searchQuery, setSearchQuery] = useState<string>('');  // User input query
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [useCoordinates, setUseCoordinates] = useState<boolean>(false);  // Flag to use coordinates or query
  const [nearbyPlaces, setNearbyPlaces] = useState([]);  // Nearby places results
  const [restaurants, setRestaurants] = useState([]);  // Restaurant search results

  const { lat: currentLat, lon: currentLon, curLocation, errMsg, loading } = useCurrentLocation();  
  const { searchedLat, searchedLon, searchedLocation, errMsg: locationErrMsg, loading: locationLoading } = useLocation(debouncedQuery);  // Location hook for city search

  const [loadingRestaurants, setLoadingRestaurants] = useState('');
  const formatDate = (dt_txt) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Debounced query change handler
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // Adjust debounce time as needed
    return () => clearTimeout(timer);  // Cleanup timer
  }, [searchQuery]);

  // Handle search query when debounced query is updated
  useEffect(() => {
    if (debouncedQuery.trim()) 
    {
      handleSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  // When current location changes, fetch nearby places and restaurants
  useEffect(() => {
    if (currentLat && currentLon) 
    {
      setQuery(`${currentLat},${currentLon}`);
      setUseCoordinates(true);
      fetchNearbyPlaces(currentLat, currentLon);
      fetchRestaurants({ currentLat, currentLon });
    }
  }, [currentLat, currentLon]);

  // When searched city (latitude, longitude) changes, fetch results for that location
  useEffect(() => {
    if (searchedLat && searchedLon) 
    {
      setQuery(`${searchedLat},${searchedLon}`);
      fetchNearbyPlaces(searchedLat, searchedLon);
      fetchRestaurants(searchedLat, searchedLon); 
    }
  }, [searchedLat, searchedLon]);

  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant);  // Set the restaurant data for the modal
    setModalVisible(true);  // Open the modal
  };

  const closeModal = () => {
    setModalVisible(false);  // Close the modal
    setSelectedRestaurant(null);  // Reset the selected restaurant
  };

  // Determine whether the query is a location or restaurant search
  const handleSearch = async (query) => {
    if (!query.trim()) return;

    // Check if the query resolved to a valid location
    if (searchedLat && searchedLon) 
    {
      // It's a location search (city, town, etc.)
      // setQuery({`${searchedLat} ,${searchedLon}`});
      setUseCoordinates(false);  // Set to use location (city) based search
      fetchNearbyPlaces(searchedLat, searchedLon);  // Fetch places around the searched location
      fetchRestaurants({ lat: searchedLat, lon: searchedLon });  // Fetch restaurants near the searched location
    }
    else 
    {
      // If no valid location found, treat it as a restaurant search query
      setQuery(query);
      setUseCoordinates(false);  // Set to use search query (for restaurants)
      fetchRestaurants({ query: query });  // Fetch restaurants based on the search query (restaurant name, etc.)
    }
  };

  // Function to fetch nearby places based on latitude and longitude
  const fetchNearbyPlaces = async (lat, lon) => {
    try {
      const response = await fetch(`https://map-server-1-l0ef.onrender.com/api/nearbyplaces?lat=${lat}&lon=${lon}`);
      const data = await response.json();
      if (Array.isArray(data.results)) {
        setNearbyPlaces(data.results);
      } else {
        console.error('No nearby places found');
      }
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    }
  };

  // Function to fetch restaurants based on latitude and longitude or query
  const fetchRestaurants = async (searchQuery) => {
    console.log(searchQuery);
    
    try 
    {
      const { lat, lon, query } = searchQuery;
  
      let url = `https://map-server-1-l0ef.onrender.com/api/restaurants?currentLat=${currentLat}&currentLon=${currentLon}`;
  
      // If lat and lon are available, use them for the request
      if (lat && lon) 
      {
        url += `&lat=${lat}&lon=${lon}`;
        // setQuery{}
      }
      
      // If it's a restaurant name or type, append it to the request
      if (query) 
      {
        url += `&query=${encodeURIComponent(query)}`;
      }

      console.log(url);
      
  
      const response = await fetch(url);
      const data = await response.json();
      console.log("restaurants: query", query ,data.results);
      
      
      if (Array.isArray(data.results)) 
      {
        setRestaurants(data.results);
        setLoadingRestaurants(false);
        // setSearchQuery("")
      } 
      else 
      { 
        setLoadingRestaurants(true);
        // console.error('No restaurants found'); 
      }
    } 
    catch (error) { console.error('Error fetching restaurants:', error); }
  };

  

  return (
    <View className="flex-1 bg-[#edf2fb]">
      {
        (currentLat && currentLon) ? (        
          <MapScreen 
            currentLat={currentLat}
            currentLon={currentLon}    
            searchedLat={searchedLat}    
            searchedLon={searchedLon}   
          />
        ):( <ActivityIndicator /> )
      }   
      
      
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
            onPress={() => handleSearch(searchQuery)}
          >
            <Icons name="search" color="black" size={20} />
          </Pressable>
        </View>
      </View> 

      { searchedLocation &&
        <View>
          <Text className="text-sm text-gray-800">
            {`${searchedLocation.country}, ${searchedLocation.city}, ${searchedLocation.district} `}
          </Text>
        </View>
      }
      

      <View className="flex-1 p-4 bg-white">
        {/* Tab Navigation */}
        <View className="flex-row mb-4">        
          <TouchableOpacity
            onPress={() => setSelectedTab('restaurants')}
            className={`flex-1 p-2 text-center rounded-tl-lg rounded-tr-lg ${selectedTab === 'restaurants' ? 'bg-gray-200' : 'bg-[#b6465f] mr-1'}`}
          >
            <Text className="text-lg font-bold">Restaurants</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedTab('places')}
            className={`flex-1 p-2 text-center rounded-tl-lg rounded-tr-lg ${selectedTab === 'places' ? 'bg-gray-200' : 'bg-[#b6465f] mr-1'}`}
          >
            <Text className="text-lg font-bold">Nearby Places</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {selectedTab === 'restaurants' ? 
        (
          <>
            {
              (loadingRestaurants && restaurants.length < 0) ? 
              ( <View> <Text> Loading Restaurants </Text></View>): (
                <FlatList
                  data={restaurants}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Pressable
                      className="mb-4 p-4 bg-gray-100 rounded-lg shadow-lg"
                      onPress={() => openModal(item)}
                    >
                      <View className="flex-row mb-2 gap-2">
                        <Image style={{width:32, height:32, backgroundColor:"grey", borderRadius: 8}}
                          src={`${item.categories[0].icon.prefix}64${item.categories[0].icon.suffix || "🍽"}`}
                          alt="Category Icon"
                        />
                        <Text className="text-lg font-medium">
                          {item ? item.name || "Unnamed Restaurant" : "No Name"}
                        </Text>
                      </View>
                      

                      <Text className="text-sm ">
                        {item ? `${item.location.formatted_address || "◼"}, ${item.location.region ||  "◼"},  ${item.location.country ||  "◼"}` || "Unnamed Restaurant" : "No Name"}                          
                      </Text>
                    </Pressable>
                )}
              />)
            }              
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


