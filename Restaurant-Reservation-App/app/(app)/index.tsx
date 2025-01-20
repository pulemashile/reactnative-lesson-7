import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable, Image, Modal, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import Icons from '@/utils/Icons'; 

import useLocation from '@/hooks/useLocation';
import useCurrentLocation from '@/hooks/useCurrentLocation';

import MapScreen from '../../component/MapLibreMap';

const Index = () => {
  
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState('restaurant');

  const [query, setQuery] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
      fetchNearbyPlaces(searchedLat, searchedLon); // Fetch places based on searched location
    }
  }, [searchedLat, searchedLon]);  


  const handleSearch = () => {   
    if (searchQuery.trim()) 
    {
      setQuery(searchQuery);
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
      console.log("nearbyPlaces", data.results);
      if (Array.isArray(data.results)) 
      {
        console.log("nearbyPlaces", data.results);        
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
      // console.log(data.results);
      
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



  console.log("Restaurents",restaurants);
  

  return (
    <View className="flex-1 bg-[#edf2fb]">
      {/* Map Screen */}
      <MapScreen 
        currentLat={currentLat}
        currentLon={currentLon}            
      />
      
      {/* Search Container */}
      <View className="px-4 my-2">
        <View className="flex-row items-center border border-gray-400 rounded-lg h-12 px-2">
          <TextInput
            className="flex-1 text-base text-gray-800"
            placeholder="Enter Location"
            placeholderTextColor="#B0B0B0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable onPress={handleSearch}>
            <Icons name="search" color="black" size={20} />
          </Pressable>
        </View>
      </View> 

      <View className="flex-1 p-4 bg-white">
      {/* Tab Navigation */}
      <View className="flex-row mb-4">        
        <TouchableOpacity
          onPress={() => setSelectedTab('restaurants')}
          className={`flex-1 p-2 text-center rounded-tl-lg rounded-tr-lg ${selectedTab === 'restaurants' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
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
      {selectedTab === 'places' ? (
        <>
          <Text className="text-2xl font-bold mb-4">Nearby Places</Text>
          <FlatList
            data={nearbyPlaces}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="mb-2 p-4 bg-gray-100 rounded-lg shadow-md">
                {console.log(`${item.categories}`)}
                {/* <Image style={{width:32, height:32, backgroundColor:"grey", borderRadius: 8}}
                  src={`${item.categories[1].icon.prefix}64${item.categories[1].icon.suffix}`}
                  alt="Category Icon"
                /> */}
                <Text className="text-lg font-medium">
                  {item ? item.name || "Unnamed Place" : "No Name"}
                </Text>
              </View>
            )}
          />
        </>
      ) : (
        <>
          <Text className="text-2xl font-bold mb-4">Restaurants</Text>
          <FlatList
            data={restaurants}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="mb-2 p-4 bg-yellow-100 rounded-lg shadow-md">
                <Image style={{width:32, height:32, backgroundColor:"grey", borderRadius: 8}}
                  src={`${item.categories[0].icon.prefix}64${item.categories[0].icon.suffix}`}
                  alt="Category Icon"
                />
                <Text className="text-lg font-medium">
                  {item ? item.name || "Unnamed Restaurant" : "No Name"}
                </Text>
              </View>
            )}
          />
        </>
      )}
    </View>
      
    </View>
  );
  
};

export default Index;


