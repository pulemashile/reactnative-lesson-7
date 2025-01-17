// app/search.tsx
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Search() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search restaurants..."
            style={styles.searchInput}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['Italian', 'Japanese', 'Mexican', 'Indian'].map((cuisine) => (
              <View key={cuisine} style={styles.cuisineTag}>
                <Text>{cuisine}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Search Results */}
        {[1, 2, 3].map((i) => (
          <Link href={`/restaurant/${i}`} key={i} asChild>
            <TouchableOpacity>
              <View style={styles.restaurantCard}>
                <View style={styles.imagePlaceholder} />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>Restaurant {i}</Text>
                  <Text style={styles.restaurantDetails}>Italian • $$$ • 2.5mi</Text>
                  <View style={styles.timeContainer}>
                    {['5:30 PM', '7:00 PM'].map((time) => (
                      <View key={time} style={styles.timeTag}>
                        <Text style={styles.timeText}>{time}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
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
  searchContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
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
  restaurantCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
  },
  imagePlaceholder: {
    width: 96,
    height: 96,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    marginRight: 16,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontWeight: '600',
  },
  restaurantDetails: {
    color: '#4B5563',
  },
  timeContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  timeTag: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  timeText: {
    color: '#FFF',
  },
});
