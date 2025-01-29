import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MapScreen = ({ currentLat, currentLon, searchedLat, searchedLon }) => {

  const webviewRef = useRef(null);  // Reference to WebView
  const [mapLoaded, setMapLoaded] = useState(false);  // Track when the map is loaded
  
  // Use searched location if available, otherwise fallback to current location
  const lat = searchedLat || currentLat;
  const lon = searchedLon || currentLon;

  const containerHeight = searchedLat && searchedLon ? 300 : 128;

  
  const mapUrl = `https://map-server-1-l0ef.onrender.com/map?currentLat=${currentLat}&currentLon=${currentLon}&lat=${searchedLat}&lon=${searchedLon}`;

  // This function will be called when the map is loaded
  const onMapLoaded = () => {
    setMapLoaded(true);
  };

  // This function will center the map at the new location when it's loaded
  const centerMap = () => {
    if (webviewRef.current && mapLoaded) {
      const script = `
        var map = window.L.map('map');
        map.setView([${lat}, ${lon}], 13);  // Center the map at the new coordinates
      `;
      webviewRef.current.injectJavaScript(script);  // Inject the script to recenter the map
    }
  };

  // Whenever the map is loaded and new coordinates are available, center the map
  useEffect(() => {
    if (mapLoaded) {
      centerMap();
    }
  }, [mapLoaded, lat, lon]);

  return (
    <View style={[styles.container, {height: containerHeight}]}>
      <WebView
        ref={webviewRef}  // Attach WebView reference
        originWhitelist={['*']}
        source={{ uri: mapUrl }} 
        style={styles.map}
        onLoad={onMapLoaded}  // Trigger mapLoaded when WebView content is loaded
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 128,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
