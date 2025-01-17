import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const accommodations = [
  {
    id: 1,
    name: 'Grand Hotel',
    description: 'A luxurious hotel in the heart of the city.',
    image: 'https://example.com/grandhotel.jpg',
  },
  {
    id: 2,
    name: 'Mountain Resort',
    description: 'A peaceful retreat surrounded by mountains.',
    image: 'https://example.com/mountainresort.jpg',
  },
  {
    id: 3,
    name: 'Beachfront Villa',
    description: 'A stunning villa located on the beach.',
    image: 'https://example.com/beachfrontvilla.jpg',
  },
];

const AccommodationPage = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Top Accommodations</Text>

      {accommodations.map((accommodation) => (
        <View key={accommodation.id} style={styles.card}>
          <Image source={{ uri: accommodation.image }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.name}>{accommodation.name}</Text>
            <Text style={styles.description}>{accommodation.description}</Text>
            <TouchableOpacity style={styles.button} onPress={() => alert(`View details for ${accommodation.name}`)}>
              <Text style={styles.buttonText}>View More</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    marginVertical: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AccommodationPage;
