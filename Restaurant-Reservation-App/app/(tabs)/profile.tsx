import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const ExploreScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>Trending Now</Text>
      {/* Replace with dynamic content */}
      <View style={styles.card}><Text>Item 1</Text></View>
      <View style={styles.card}><Text>Item 2</Text></View>

      <Text style={styles.sectionHeader}>Categories</Text>
      {/* Replace with dynamic content */}
      <View style={styles.category}><Text>Category 1</Text></View>
      <View style={styles.category}><Text>Category 2</Text></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  card: { padding: 15, backgroundColor: '#f0f0f0', marginVertical: 5, borderRadius: 8 },
  category: { padding: 10, backgroundColor: '#e0e0e0', marginVertical: 5, borderRadius: 6 },
});

export default ExploreScreen;
