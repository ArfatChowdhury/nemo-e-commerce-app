// components/ColorCard.js
import { View, Text, Pressable } from 'react-native'
import React from 'react'

// interface ColorCardProps {
//     color: string,
//     onPress: (color: string) => void,
//     isSelected: boolean
// }

interface ColorCardProps {
    color: string,
    onPress: (color: string) => void,
    isSelected: boolean
}

const ColorCard = ({ color, onPress, isSelected }: ColorCardProps) => {
    return (
        <Pressable
            onPress={() => onPress(color)}
            className={`flex-1 items-center justify-center p-6 m-2 border-2 rounded-xl ${isSelected
                ? 'bg-blue-50 border-blue-500'
                : 'bg-white border-gray-200'
                }`}
        >
            {/* Color Swatch */}
            <View
                style={{ backgroundColor: color.value }}
                className="w-12 h-12 rounded-full mb-2 border border-gray-300"
            />

            <Text className={`text-center text-base font-medium ${isSelected ? 'text-blue-600' : 'text-gray-800'
                }`}>
                {color.name}
            </Text>

            {isSelected && (
                <View className='absolute top-2 right-2 bg-blue-500 rounded-full w-5 h-5 items-center justify-center'>
                    <Text className='text-white text-xs'>✓</Text>
                </View>
            )}
        </Pressable>
    )
}

export default ColorCard