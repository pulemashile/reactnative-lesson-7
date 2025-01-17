import { useSearchParams } from 'expo-router/build/hooks';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Activities = () => {
  const { id } = useSearchParams(); 

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Activities Page</Text>
      <Text style={styles.text}>Here you can explore different activities!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default Activities;
