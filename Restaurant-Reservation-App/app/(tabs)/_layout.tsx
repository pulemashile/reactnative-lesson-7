import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function Tab_Layout() {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{title:" Home"}} />
        <Tabs.Screen name="search" options={{title:"Search"}} />
        <Tabs.Screen name="explore" options={{title:"Explore"}} />
    </Tabs>
  )
}