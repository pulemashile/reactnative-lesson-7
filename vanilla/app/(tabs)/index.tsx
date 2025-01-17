// app/index.tsx
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { MapPin } from 'lucide-react';

export default function Home() {
  
  return (
    <ScrollView style={styles.container}>

      <View style={styles.mapViewContainer}>
        <View>
          <Text style={styles.mapViewText}>
            <MapPin />
            Polokwane
          </Text>
        </View>
        
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search restaurants..."
          style={styles.searchInput}
        />
        <Text style={{ width: "100%", textAlign:"right", color: "blue", fontWeight: 700 }}>See All</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>          
          {['Italian', 'Japanese', 'Mexican', 'Indian'].map((cuisine) => (
            <View key={cuisine} style={styles.cuisineTag}>
              <Text>{cuisine}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.content}>
        {/* Featured Restaurants */}
        {/* <View style={styles.featuredContainer}>
          <Text style={styles.sectionTitle}>Popular Restaurants</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((i) => (
              <Link href={`/restaurant/${i}`} key={i} asChild>
                <TouchableOpacity style={styles.restaurantCard}>
                  <View style={styles.restaurantBox}>
                    <View style={styles.imagePlaceholder} />
                    <Text style={styles.restaurantName}>Restaurant {i}</Text>
                    <Text style={styles.restaurantDetails}>Italian • $$$ • 2.5mi</Text>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </ScrollView>
        </View> */}

        {/* Available Time Slots */}
        <View style={styles.availabilityContainer}>
          <Text style={styles.sectionTitle}>Today's Availability</Text>
          <View style={styles.timeSlotsContainer}>
            {['5:30 PM', '6:00 PM', '7:30 PM'].map((time) => (
              <View key={time} style={styles.timeSlot}>
                <Text style={styles.timeText}>{time}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  mapViewContainer:{
    height:128,
  },
  mapViewText:{
    padding: 8,
    display: "flex",
    alignItems:"center"
  },

  searchContainer: {
    backgroundColor: '#FFF',
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginBottom: 16,
  },
  cuisineTag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  
  content: {
    padding: 0,
  },
  featuredContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  restaurantCard: {
    marginRight: 16,
  },
  restaurantBox: {
    width: 256,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
  },
  imagePlaceholder: {
    height: 128,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 8,
  },
  restaurantName: {
    fontWeight: '600',
  },
  restaurantDetails: {
    color: '#4B5563',
  },
  availabilityContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 16,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlot: {
    backgroundColor: '#BFDBFE',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  timeText: {
    color: '#1D4ED8',
  },
});
