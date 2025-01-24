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
    const getCurrentLocation = async () => {
      console.log("getcurrent");
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') 
      {
        setErrMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      console.log("location",location);
      
      const { latitude, longitude } = location.coords;
      console.log(latitude, longitude);

      setLat(latitude);
      setLon(longitude);      

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      console.log("reverseGeocode", reverseGeocode);      
      setLocation(reverseGeocode[0]);
      setLoading(false);
    };

    getCurrentLocation();
  }, []);

  console.log("cl_res", lat, lon, curLocation);

  return { lat, lon, curLocation, errMsg, loading };
};

export default useCurrentLocation;
