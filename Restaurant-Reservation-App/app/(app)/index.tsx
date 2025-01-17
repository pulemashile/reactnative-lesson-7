import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, Pressable, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';

import Icons from '@/utils/Icons'; 

import useLocation from '@/hooks/useLocation';
import useWeather from '@/hooks/useWeather';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import useForecast from '@/hooks/useForecast';
import { accommodations, activities, places, restaurants } from '@/utils/data';
import { getSuggestedActivities } from '@/utils/getSuggestedActivities';
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
  const [curLocationWeather, setCurLocationWeather] = useState<any>(null);  
  const { weatherData, weatherLoading } = useWeather(query, useCoordinates);
  const { hourly, daily, forecastsLoading } = useForecast(query, useCoordinates);
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

  useEffect(() => {
    if (weatherData && !searchQuery) 
    {
      setCurLocationWeather(weatherData);      
    }  

    if (weatherData) 
    {
      const activities = getSuggestedActivities(weatherData);
      setSuggestedActivities(activities);
    }
    
  }, [weatherData]);

  useEffect(() => {
    if (weatherData) 
    {
      const activities = getSuggestedActivities(weatherData);
      setSuggestedActivities(activities);
    }
  }, [weatherData]);


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
    <View style={styles.container}>    

      <MapScreen 
        currentLat={currentLat}
        currentLon={currentLon}            
      />

      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.searchInput}
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

      
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    backgroundColor: '#edf2fb',
    fontFamily: 'Poppins',
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#E5E5E5',
    justifyContent: 'flex-start',
    fontFamily: 'serif',
    padding: 0,
  },
  mapText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginTop: 8,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#B0B0B0',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'OpenSans',
  },
  card: {
    backgroundColor: '#BCF2F6',
    padding: 16,
    marginRight: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 112,
    height: 64,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    height:32,
    backgroundColor: '#F4F4F4',
    width:"100%",
    height:32,
    
  },
  tab: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  activeTab: {
    alignSelf:"flex-start",
    borderBottomWidth: 3,
    borderBottomColor: '#333',
    backgroundColor: '#edf2fb',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  tabContent: {
    padding: 15,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    marginTop: 10,
  },
  tabContentText: {
    fontSize: 16,
    color: '#666',
  },
  activeCardContainer:{
    height:"35%",
    backgroundColor: '#F4F4F4',
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

