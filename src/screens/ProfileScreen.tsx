import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const ProfileScreen = () => {
  return (
    <View>
      <View className='flex-row items-center justify-between'>
        <View className='flex-row gap-3 items-center '>
          <Ionicons name='settings-outline' size={24} color='black' />
          <Text>Settings</Text>
        </View>
        <View>
          <Ionicons name='chevron-forward-outline' size={24} color='black' />
        </View>
      </View>
    </View>
  )
}

export default ProfileScreen