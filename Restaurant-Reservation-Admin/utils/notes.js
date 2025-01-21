//Reset the AsyncStorage value using the following snippet:

import AsyncStorage from "@react-native-async-storage/async-storage";

const resetOnboarding = async () => {
  await AsyncStorage.removeItem("onboardingComplete");
  console.log("Onboarding reset!");
};

//////////////////////////////////////////////////////////////////////

// import React from "react";
// import MapView, { Marker } from "react-native-maps";
// import { View, StyleSheet } from "react-native";

// export default function Map() {
//   const markers = [
//     // Replace with actual data from SQLite
//     { latitude: -31.78825, longitude: 18.3570000, title: "Photo 1" },
//   ];

//   return (
//     <View>
//       <MapView initialRegion={{
//         latitude: -31.78825,
//         longitude: 18.3570000,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       }}>
//         {markers.map((marker, index) => (
//           <Marker key={index} coordinate={marker} title={marker.title} />
//         ))}
//       </MapView>
//     </View>
//   );
// }

//////////////////////////////////////////////////////////////////////

