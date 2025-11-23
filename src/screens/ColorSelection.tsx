// screens/ColorSelection.js
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import HeaderBar from '../components/HeaderBar'
import { useNavigation } from '@react-navigation/native'
import ColorCard from '../components/ColorCard'
import { setColors } from '../Store/slices/productFormSlice'
import { useAppDispatch } from '../Store/hooks'


const colors = [
    { name: 'Red', value: '#FF0000' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Orange', value: '#FFA500' },
    { name: 'Purple', value: '#800080' },
    { name: 'Pink', value: '#FFC0CB' },
    { name: 'Brown', value: '#A52A2A' },
    { name: 'Gray', value: '#808080' },
    { name: 'Navy', value: '#000080' },
]

const ColorSelection = () => {
    const navigation = useNavigation()

    const dispatch = useAppDispatch()

    const [selectedColors, setSelectedColors] = useState([])

    const handleColor = (color: any) => {
        setSelectedColors((prev: any) => {
            if (prev.some((c: any) => c.name === color.name)) {
                return prev.filter((c: any) => c.name !== color.name)
            } else {
                return [...prev, color]
            }
        })
    }

    const saveColors = () => {
        dispatch(setColors(selectedColors))
        navigation.goBack()
    }

    return (
        <View className='flex-1 bg-gray-50'>
            <View className='px-4'>
                <HeaderBar iconName='close' title='Colors' size={35} />
                <Text className='text-3xl font-bold mt-4'>Select colors</Text>
                <Text className='text-base mt-2 text-gray-500'>
                    Select available colors (Selected: {selectedColors.length})
                </Text>
            </View>

            <FlatList
                data={colors}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <ColorCard
                        color={item}
                        onPress={handleColor}
                        isSelected={selectedColors.some((c: any) => c.name === item.name)}
                    />
                )}
                numColumns={2}
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            />

            {/* Save Button */}
            <TouchableOpacity
                onPress={saveColors}
                disabled={selectedColors.length === 0}
                className={`mx-4 mb-4 p-4 rounded-xl ${selectedColors.length === 0
                    ? 'bg-gray-300'
                    : 'bg-blue-500'
                    }`}
            >
                <Text className='text-white text-center text-lg font-semibold'>
                    Save {selectedColors.length} Colors
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ColorSelection