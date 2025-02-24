import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Logout = () => {
  const router = useRouter()

  const handleLogout = () => {
    // Add your logout logic here
    // For example: clear auth tokens, reset state, etc.
    router.replace('/(auth)/login')
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <View className="flex-1 bg-white p-4 justify-center items-center">
      {/* Logout Icon */}
      <View className="w-24 h-24 bg-red-50 rounded-full items-center justify-center mb-8">
        <Text className="text-4xl">👋</Text>
      </View>

      {/* Logout Text */}
      <Text style={styles.heading}>Log Out</Text>
      <Text style={styles.description}>
        Are you sure you want to log out? You'll need to login again to access your account.
      </Text>

      {/* Buttons */}
      <View className="w-full mt-8 space-y-4">
        {/* Logout Button */}
        <TouchableOpacity 
          onPress={handleLogout}
          className="bg-red-500 py-4 rounded-xl w-full"
        >
          <Text style={styles.buttonText} className="text-white text-center">
            Yes, Log me out
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity 
          onPress={handleCancel}
          className="bg-gray-100 py-4 rounded-xl w-full"
        >
          <Text style={styles.buttonText} className="text-gray-700 text-center">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>

      {/* Store Info */}
      <View className="absolute bottom-8 w-full px-4">
        <View className="flex-row items-center justify-center">
          <Text style={styles.storeText} className="text-gray-500 text-center">
            Logged in as Coffeestories
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'poppinsSemiBold',
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'poppinsRegular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 24,
  },
  buttonText: {
    fontFamily: 'poppinsMedium',
    fontSize: 16,
  },
  storeText: {
    fontFamily: 'poppinsRegular',
    fontSize: 14,
  }
});

export default Logout