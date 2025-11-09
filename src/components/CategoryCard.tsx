import { View, Text, Pressable } from 'react-native'
import React from 'react'

const CategoryCard = ({ item, handleCategory }) => {
    return (
        <Pressable 
            onPress={() => handleCategory(item)} 
            className='flex-1 items-center justify-center p-6 m-2 bg-white border border-gray-200 rounded-xl shadow-sm'
        >
            <Text className='text-center text-base font-medium text-gray-800'>{item}</Text>
        </Pressable>
    )
}

export default CategoryCard