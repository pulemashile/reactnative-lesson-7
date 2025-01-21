import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MapScreen = ({ currentLat, currentLon, searchedLat, searchedLon }) => {

  // Use searched location if available, otherwise fallback to current location
  const lat = searchedLat || currentLat;
  const lon = searchedLon || currentLon;
  
  const mapUrl = `https://map-server-1-l0ef.onrender.com/map?lat=${lat}&lon=${lon}&currentLat=${currentLat}&currentLon=${currentLon}`;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ uri: mapUrl }} 
        style={styles.map}
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
