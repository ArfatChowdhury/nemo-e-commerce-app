import { View, Text, TextInput } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons'

export default function HomeScreen() {
  return (
    <View className=' mt-2 flex-1'>
      <View className='flex flex-row items-center bg-white border border-gray-300 rounded-full px-4 py-3 mx-4  shadow-sm'>
      <Ionicons name='search' size={24}  color='#6B7280'/>
        <TextInput
          placeholder='Search desire product'
          className='flex-1 text-base'
        />
      </View>

    </View>
  )
}