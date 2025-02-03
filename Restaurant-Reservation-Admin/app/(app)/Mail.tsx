import { View, Text, Image, Pressable, Alert,StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const Mail = () => {
  const [activeMessageId, setActiveMessageId] = useState(null);

  // Dummy data for 10 messages
  const messages = [
    { id: 1, image: require('../../assets/images/red.jpg'), name: 'John Doe', position: 'Developer', message: 'Hey Admin, we need your approval on the latest project.', additionalInfo: 'Please review the code by EOD.' },
    { id: 2, image: require('../../assets/images/man.jpg'), name: 'Jane Smith', position: 'Manager', message: 'There is a meeting scheduled at 2 PM today.', additionalInfo: 'Don\'t forget to prepare the presentation.' },
    { id: 3,  image: require('../../assets/images/girl56.jpg'), name: 'James Brown', position: 'Designer', message: 'Can you review the latest mockups?', additionalInfo: 'Feedback needed by tomorrow morning.' },
    { id: 4, image: require('../../assets/images/granny.jpg'), name: 'Sarah Wilson', position: 'HR Manager', message: 'The new employee orientation is scheduled for next week.', additionalInfo: 'Please review the schedule and materials.' },
    { id: 5, image: require('../../assets/images/div.jpeg'), name: 'Michael Johnson', position: 'Lead Developer', message: 'We are facing a bug in the payment gateway. Can you help?', additionalInfo: 'I will send the detailed report shortly.' },
    { id: 6, image: require('../../assets/images/fav.jpeg'), name: 'Emily Davis', position: 'Product Manager', message: 'We need your feedback on the roadmap for Q2.', additionalInfo: 'The team is waiting for your approval.' },
    { id: 7, image: require('../../assets/images/holy.jpeg'), name: 'David Lee', position: 'Marketing Lead', message: 'Could you review the ad campaign before it goes live?', additionalInfo: 'We need your final sign-off by 5 PM today.' },
    { id: 8, image: require('../../assets/images/joy.jpeg'), name: 'Laura Martinez', position: 'UI/UX Designer', message: 'Can you take a look at the new wireframes?', additionalInfo: 'Let me know if any changes are needed.' },
    { id: 9, image: require('../../assets/images/blue.jpeg'), name: 'Tom Harris', position: 'System Administrator', message: 'There is a server outage. It needs your urgent attention.', additionalInfo: 'I’m currently working on restoring it.' },
    { id: 10, image: require('../../assets/images/crush.jpeg'), name: 'Linda Clark', position: 'Content Manager', message: 'The blog post is ready for review.', additionalInfo: 'Please let me know if any revisions are needed.' },
  ];

  const handleAccordionToggle = (messageId) => {
    setActiveMessageId(prevId => (prevId === messageId ? null : messageId));
  };

  const handlePhoneCall = () => {
    Alert.alert('Calling...', 'Initiating phone call...');
  };

  return (
    <View className="flex-1 p-4 bg-gray-100 ">
  <Text  className="text-lg font-semibold text-gray-600 mb-4" style={styles.poppinsRegular}>Good morning Admin, you have people waiting for you</Text>
  <Text  className="text-lg font-semibold text-gray-600 mb-4" style={styles.poppinsRegular}>Messages</Text>
  ...


      <View className="bg-white rounded-lg shadow-md p-4 mt-5">
        <Text className="text-lg font-semibold text-gray-600 mb-4" style={styles.poppinsRegular}>Notifications</Text>
        {messages.map((message) => (
          <View key={message.id} className="border-b border-gray-300 py-4">
            <View className="flex-row items-center justify-between">
              <Image source={  message.image }  alt="Profile" className="w-12 h-12 rounded-full mr-4 bg-red-300" style={{width: 24, height: 24}} />
              <View className="flex-1">
                <Text className="font-semibold text-gray-800" style={styles.poppinsRegular}>{message.name}</Text>
                <Text className="text-sm text-gray-600"   style={styles.poppinsRegular}>{message.position}</Text>
              </View>
              <Pressable
                className="ml-4"
                onPress={() => handleAccordionToggle(message.id)}
               >
                <Ionicons name="chatbubble-outline" size={24} color="black" />
              </Pressable>
              <Pressable
                className="ml-4"
                onPress={handlePhoneCall}
              >
                <Ionicons name="call-outline" size={24} color="black" />
              </Pressable>
            </View>

            {activeMessageId === message.id && (
              <View className="mt-3 px-4">
                <Text className="text-gray-800" style={styles.poppinsRegular}>{message.message}</Text>
                <View className="bg-gray-200 p-3 mt-3 rounded-lg">
                  <Text className="text-gray-600"   style={styles.poppinsRegular}>{message.additionalInfo}</Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};
 const styles = StyleSheet.create({ 
  poppinsRegular: {
  fontFamily: 'poppinsRegular',

},
poppinsBold: {
  fontFamily: 'poppinsBold',
},
poppinsMedium: {
  fontFamily: 'poppinsMedium',
},
poppinsSemiBold: {
  fontFamily: ' poppinsSemiBold',
},
poppinsExtraBold: {
  fontFamily: 'poppinsExtraBold'}
  ,
});

export default Mail;
