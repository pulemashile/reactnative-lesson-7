// app/index.tsx
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <ScrollView style={styles.container}>

      {/* <View style={styles.mapViewContainer}>
      </View> */}

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
    height:300
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
