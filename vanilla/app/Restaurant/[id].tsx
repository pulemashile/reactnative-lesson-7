// app/restaurant/[id].tsx
import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function RestaurantDetails() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>      
      <Stack.Screen
        options={{
          title: `Restaurant ${id}`,
          headerShadowVisible: false,
        }}
      />

      <View style={styles.content}>
        <View style={styles.imagePlaceholder} />
        <Text style={styles.restaurantName}>Restaurant {id}</Text>
        <Text style={styles.restaurantDetails}>Italian • $$$ • 2.5mi</Text>
        
        {/* Available Time Slots */}
        <Text style={styles.sectionTitle}>Available Times</Text>
        <View style={styles.timeSlotsContainer}>
          {['5:30 PM', '6:00 PM', '7:30 PM'].map((time) => (
            <View key={time} style={styles.timeSlot}>
              <Text style={styles.timeText}>{time}</Text>
            </View>
          ))}
        </View>
        
        {/* Restaurant Info */}
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.restaurantDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  imagePlaceholder: {
    height: 192,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 16,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  restaurantDetails: {
    color: '#4B5563',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
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
  restaurantDescription: {
    color: '#4B5563',
    fontSize: 16,
  },
});
