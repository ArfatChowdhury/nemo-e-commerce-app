import { View, Text, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import HeaderBar from '../components/HeaderBar'

const AddProductScreen = () => {
  const [selectedColors, setSelectedColors] = React.useState([]);

  const commonColors = [
    { name: 'Red', value: '#FF0000' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Gray', value: '#808080' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Orange', value: '#FFA500' },
    { name: 'Purple', value: '#800080' },
    { name: 'Pink', value: '#FFC0CB' },
    { name: 'Brown', value: '#A52A2A' },
    { name: 'Navy', value: '#000080' },
  ];

  const toggleColor = (color) => {
    if (selectedColors.includes(color.name)) {
      setSelectedColors(selectedColors.filter(c => c !== color.name));
    } else {
      setSelectedColors([...selectedColors, color.name]);
    }
  };

  return (
    <View className='flex-1 bg-gray-50'>
      <HeaderBar title='Add Product' />
      <ScrollView className='px-4 py-4'>

        {/* Product Name */}
        <View className='mb-6'>
          <Text className='text-lg font-semibold mb-2 text-gray-800'>Product Name</Text>
          <TextInput
            placeholder='e.g., Wireless Bluetooth Headphones'
            className='bg-white border border-gray-300 rounded-lg px-4 py-3 text-base'
            placeholderTextColor={'#9CA3AF'}
          />
        </View>

        {/* Price */}
        <View className='mb-6'>
          <Text className='text-lg font-semibold mb-2 text-gray-800'>Price</Text>
          <View className='flex-row items-center'>
            <Text className='text-lg text-gray-600 mr-2'>$</Text>
            <TextInput
              placeholder='0.00'
              keyboardType='decimal-pad'
              className='bg-white border border-gray-300 rounded-lg px-4 py-3 text-base flex-1'
              placeholderTextColor={'#9CA3AF'}
            />
          </View>
        </View>

        {/* Description */}
        <View className='mb-6'>
          <Text className='text-lg font-semibold mb-2 text-gray-800'>Description</Text>
          <TextInput
            placeholder='Describe your product...'
            multiline
            numberOfLines={4}
            className='bg-white border border-gray-300 rounded-lg px-4 py-3 text-base h-32'
            placeholderTextColor={'#9CA3AF'}
            textAlignVertical='top'
          />
        </View>

        {/* Stock */}
        <View className='mb-6'>
          <Text className='text-lg font-semibold mb-2 text-gray-800'>Product Stock</Text>
          <TextInput
            placeholder='0'
            keyboardType='decimal-pad'
            className='bg-white border border-gray-300 rounded-lg px-4 py-3 text-base flex-1'
            placeholderTextColor={'#9CA3AF'}
          />
          <TouchableOpacity>
            <Text>Hello</Text>
          </TouchableOpacity>
        </View>

        {/* Colors */}
        <View className='mb-6'>
          <Text className='text-lg font-semibold mb-2 text-gray-800'>Colors</Text>
          <View className='flex-row flex-wrap'>
            {commonColors.map((color, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleColor(color)}
                activeOpacity={0.7}
                className={`flex-row items-center border-2 rounded-full px-3 py-2 mr-2 mb-2 ${
                  selectedColors.includes(color.name) 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 bg-white'
                }`}
              >
                <View 
                  style={{ backgroundColor: color.value }}
                  className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                />
                <Text className={
                  selectedColors.includes(color.name) 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-700'
                }>
                  {color.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  )
}

export default AddProductScreen