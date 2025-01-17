// import MapView, { Marker } from 'react-native-maps';
// import { useEffect, useRef, useState } from 'react';
// import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
// import Icons from '@/utils/Icons';

// const Map = ({
//   currentLat, currentLon,
//   searchedLat, searchedLon,
//   curLocation, searchedLocation,
//   curLocationWeather, weatherData,
//   nearbyPlaces
// }) => {

//   const mapRef = useRef(null);

//   const centerLat = searchedLat || currentLat;
//   const centerLon = searchedLon || currentLon;

//   // Use useEffect to animate the map to searched location when the coordinates change
//   useEffect(() => {
//     if (searchedLat && searchedLon && mapRef.current) {
//       mapRef.current.animateToRegion(
//         {
//           latitude: Number(searchedLat),
//           longitude: Number(searchedLon),
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         },
//         1000 // Animate to the searched location with a duration of 1000ms
//       );
//     }
//   }, [searchedLat, searchedLon]);

// //   console.log(nearbyPlaces);
  

//   return (
//     <View style={styles.mapContainer}>
//       {(centerLat && centerLon) ? (
//         <MapView
//           ref={mapRef}
//           style={styles.map}
//           region={{
//             latitude: Number(centerLat),
//             longitude: Number(centerLon),
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }} // Use region instead of initialRegion
//           onRegionChangeComplete={(region) => {
//             // Optionally, track changes in region if needed
//             console.log('Region changed to', region);
//           }}
//         >
//           {/* Display current location marker */}
//           {currentLat && currentLon && curLocation && curLocationWeather && (
//             <Marker
//               coordinate={{
//                 latitude: Number(currentLat),
//                 longitude: Number(currentLon),
//               }}
//               title={`${curLocation.city} 🌡${curLocationWeather.main.temp}°C`}
//             />
//           )}

//           {/* Display searched location marker */}
//           {searchedLat && searchedLon && searchedLocation && (
//             <Marker
//               coordinate={{
//                 latitude: Number(searchedLat),
//                 longitude: Number(searchedLon),
//               }}
//               title={`${searchedLocation.city}`}
//             />
//           )}

//           {/* Display nearby places markers */}
//           {nearbyPlaces.map((place, index) => (
//             <Marker
//               key={index}
//               coordinate={{
//                 latitude: place.lat,
//                 longitude: place.lon,
//               }}
//               title={place.tags.name || 'Unnamed Place'}
//               description={place.tags['amenity'] || place.tags['tourism'] || place.tags['leisure']}
//             />
//           ))}

//         </MapView>
//       ) : (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute' }} />
//           <Icons name="loc-dot" color="black" />
//           <Text style={styles.mapText}>Loading your location...</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// export default Map;

// const styles = StyleSheet.create({
//   mapContainer: {
//     height: 300,
//     backgroundColor: '#E5E5E5',
//     justifyContent: 'flex-start',
//     fontFamily: 'serif',
//     padding: 0,
//   },
//   mapText: {
//     color: '#333',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   map: {
//     flex: 1,
//   },
// });
