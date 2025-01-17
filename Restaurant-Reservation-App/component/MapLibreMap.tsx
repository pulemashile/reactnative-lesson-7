import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MapScreen = ({ currentLat, currentLon, curLocation }) => {
  const mapUrl = `https://map-server-anmu.onrender.com/map?lat=${currentLat}&lon=${currentLon}`;

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
