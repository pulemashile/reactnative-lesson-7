import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';

import Icons from '@/utils/Icons'; 

import useLocation from '@/hooks/useLocation';
import useCurrentLocation from '@/hooks/useCurrentLocation';

import MapScreen from '../../component/MapLibreMap';

const Index = () => {
  const [activeTab, setActiveTab] = useState('activities');
  const router = useRouter();

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
  const [suggestedActivities, setSuggestedActivities] = useState([]);

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

  const fetchNearbyPlaces = async (lat, lon) => {
    const radius = 1000; // 1 km radius
    const overpassURL = `https://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"](around:${radius},${lat},${lon}););out;`;
    try 
    {
      const response = await fetch(overpassURL);
      const data = await response.json();
      setNearbyPlaces(data.elements); // Set the fetched places into state
    } 
    catch (error) { console.error('Error fetching nearby places:', error); }
  };

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
  
      {/* Example Red Section */}
      <View className="bg-red-500 h-[300px] flex items-center justify-center">
        <Text className="text-white text-lg">Hy</Text>
      </View>
    </View>
  );
  
};

export default Index;


