import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

const useCurrentLocation = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [curLocation, setLocation] = useState<any | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout; // Declare timeoutId here, outside of the effect's async function
    console.log("Attempting to get current location");

    const getCurrentLocation = async () => {
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      console.log("Location permission granted.");

      // Use last known position as a fallback if available
      const lastKnownPosition = await Location.getLastKnownPositionAsync();
      if (lastKnownPosition) {
        const { latitude, longitude } = lastKnownPosition.coords;
        setLat(latitude);
        setLon(longitude);
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        setLocation(reverseGeocode[0]);
        console.log("Using last known location:", latitude, longitude, reverseGeocode);
      } else {
        console.log("No last known position available, requesting current location...");
      }

      // Set a timeout for the `getCurrentPositionAsync` call to prevent hanging forever
      timeoutId = setTimeout(() => {
        setErrMsg('Location request timed out.');
        setLoading(false);
      }, 10000); // Set a 10-second timeout for the location request

      try {
        // Fetch the current location with a balanced accuracy setting
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced, // Adjust accuracy as needed
        });
        clearTimeout(timeoutId); // Clear timeout if we get the position
        const { latitude, longitude } = location.coords;
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        setLat(latitude);
        setLon(longitude);
        setLocation(reverseGeocode[0]);
        setLoading(false);
        console.log("Location fetched:", latitude, longitude, reverseGeocode);
      } catch (error) {
        setErrMsg('Failed to fetch current location');
        setLoading(false);
        console.error(error);
      }
    };

    getCurrentLocation();

    // Cleanup timeout in case the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  console.log("Location Result:", lat, lon, curLocation);

  return { lat, lon, curLocation, errMsg, loading };
};

export default useCurrentLocation;
