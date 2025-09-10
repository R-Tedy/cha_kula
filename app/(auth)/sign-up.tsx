import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const signUp = () => {
  return (
    <View>
      <Text>signUp</Text>
      <Button title='Sign In' onPress={() => router.push("/(auth)/sign-in")} />
    </View>
  )
}

export default signUp