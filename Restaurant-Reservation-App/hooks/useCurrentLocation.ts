//useCurrentLocation
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

const useCurrentLocation = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [curLocation, setLocation] = useState<number | null>(null);

  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Attemping to get current location");
    
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') 
      {
        setErrMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      console.log("Seems like we got location permission.");
      console.log("Please wait while trying to get your current locationData.");
      
      const location = await Location.getCurrentPositionAsync({});
      
      const { latitude, longitude } = location.coords;
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      setLat(latitude);
      setLon(longitude);
      setLocation(reverseGeocode[0]);
      setLoading(false);
    };

    getCurrentLocation();
  }, []);

  console.log("cl_res", lat, lon, curLocation);

  return { lat, lon, curLocation, errMsg, loading };
};

export default useCurrentLocation;
