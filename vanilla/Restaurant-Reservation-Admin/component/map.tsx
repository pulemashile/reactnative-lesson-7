// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';  // To access location data

// const SimpleMap = () => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
//         console.log("Attempt to get location");
        
//       // Request for location permissions
//         let { status } = await Location.requestPermissionsAsync();
//         if (status !== 'granted') 
//         {
//             setErrorMsg('Permission to access location was denied');
//             return;
//         }

//         // Get current location
//         let currentLocation = await Location.getCurrentPositionAsync({});
//         console.log(currentLocation);
        
//         setLocation(currentLocation.coords);
//     })();
//   }, []);

//   if (errorMsg) {
//     return (
//       <View style={styles.container}>
//         <Text>{errorMsg}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {!location ? (
//         <MapView
//           style={styles.map}
//           region={{
//             latitude: -23.9168298,
//             longitude: 29.4578348,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           {/* Marker for current location */}
//           <Marker coordinate={{ latitude: -23.9168298, longitude: 29.4578348 }} />
//         </MapView>
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default SimpleMap;
