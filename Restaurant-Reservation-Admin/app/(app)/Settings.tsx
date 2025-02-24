import { View, Text, Image, TouchableOpacity, Switch, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const Settings = () => {
  const [pushEnabled, setPushEnabled] = useState(true)
  const [faceIdEnabled, setFaceIdEnabled] = useState(true)

  return (
    <View className="flex-1 bg-white p-4">
      {/* Profile Section */}
      <View className="items-center mb-8">
        <View className="w-16 h-16 rounded-full bg-green-100 mb-2 items-center justify-center">
          <Image 
            source={{ uri: '/api/placeholder/64/64' }}
            className="w-16 h-16 rounded-full"
          />
        </View>
        <Text style={styles.heading}>Coffeestories</Text>
        <Text style={styles.regularText}>mark.brocks@icloud.com</Text>
        <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-full">
          <Text style={styles.regularText}>Edit profile</Text>
        </TouchableOpacity>
      </View>

      {/* Inventories Section */}
      <View className="mb-6">
        <Text style={styles.sectionTitle}>Inventories</Text>
        <View className="bg-gray-50 rounded-xl">
          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-6 h-6 mr-3 items-center justify-center">
                <Text>🏪</Text>
              </View>
              <Text style={styles.regularText}>My stores</Text>
            </View>
            <View className="flex-row items-center">
              <View className="bg-green-500 w-5 h-5 rounded-full items-center justify-center mr-2">
                <Text className="text-white text-xs" style={styles.regularText}>2</Text>
              </View>
              <Text style={styles.regularText}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <View className="w-6 h-6 mr-3 items-center justify-center">
                <Text>💁</Text>
              </View>
              <Text style={styles.regularText}>Support</Text>
            </View>
            <Text style={styles.regularText}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Preferences Section */}
      <View>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View className="bg-gray-50 rounded-xl">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-6 h-6 mr-3 items-center justify-center">
                <Text>🔔</Text>
              </View>
              <Text style={styles.regularText}>Push notifications</Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: "#767577", true: "#34D399" }}
            />
          </View>

          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-6 h-6 mr-3 items-center justify-center">
                <Text>👤</Text>
              </View>
              <Text style={styles.regularText}>Face ID</Text>
            </View>
            <Switch
              value={faceIdEnabled}
              onValueChange={setFaceIdEnabled}
              trackColor={{ false: "#767577", true: "#34D399" }}
            />
          </View>

          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-6 h-6 mr-3 items-center justify-center">
                <Text>🔒</Text>
              </View>
              <Text style={styles.regularText}>PIN Code</Text>
            </View>
            <Text style={styles.regularText}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4">
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'poppinsSemiBold',
    fontSize: 18,
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: 'poppinsMedium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  regularText: {
    fontFamily: 'poppinsRegular',
    fontSize: 14,
  },
  logoutText: {
    fontFamily: 'poppinsMedium',
    fontSize: 14,
    color: '#EF4444',
  },
});

export default Settings