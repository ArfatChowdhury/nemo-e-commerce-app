import { View, Text, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import HeaderBar from '../components/HeaderBar'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddProductScreen = () => {

  const route = useRoute()
  const navigation = useNavigation()
  const selectedCategory = route.params?.selectedCategory
  const selectedColors = route.params?.selectedColors
  // console.log(selectedColors);
  const [productData, setProductData] = React.useState({
    name: '',
    price: '',
    description: '',
    colors: selectedColors || [], 
    categories: [],
    
  })

  useEffect(() => {
    if (selectedColors) {
      setProductData(prev => ({
        ...prev,
        colors: selectedColors
      }))
    }
  }, [selectedColors])


  
  const handleCategoryInput = () => {
    navigation.navigate('category')
  }

  const handleColorSelection = () => {
    navigation.navigate('colorSelection')
  }

  return (
    <View className='flex-1 bg-gray-50 '>
      <HeaderBar iconName='arrow-back' title='Add Product' size={24} />
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

        </View>

        {/* Colors Section - UPDATED */}
        <View className='mb-6'>
                    <Text className='text-lg font-semibold mb-2 text-gray-800'>Colors</Text>
                    
                    {/* Selected Colors Preview */}
                    {productData.colors.length > 0 && (
                        <View className='mb-3'>
                            <Text className='text-gray-600 mb-2'>Selected colors:</Text>
                            <View className='flex-row flex-wrap'>
                                {productData.colors.map((color, index) => (
                                    <View 
                                        key={index}
                                        className='flex-row items-center bg-blue-100 rounded-full px-3 py-2 mr-2 mb-2'
                                    >
                                        <View 
                                            style={{ backgroundColor: color.value }}
                                            className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                                        />
                                        <Text className='text-blue-800 text-sm'>{color.name}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                    
                    {/* Color Selection Button */}
                    <TouchableOpacity
                        onPress={handleColorSelection}
                        className='border border-gray-400 p-4 rounded-xl flex-row items-center justify-between w-full bg-white'
                    >
                        <Text className='text-gray-700 flex-1'>
                            {productData.colors.length > 0 
                                ? `${productData.colors.length} color(s) selected`
                                : 'Select product colors'
                            }
                        </Text>
                        <Ionicons name='chevron-forward-outline' size={24} color='gray' />
                    </TouchableOpacity>
                </View>

        {/* category */}
        <View>
          <Text className='text-lg font-semibold mb-2 text-gray-800'>Select Category</Text>
          <TouchableOpacity
            onPress={handleCategoryInput}
            className='border border-gray-400 p-4 rounded-xl flex-row items-center justify-between w-full'>
            <Text className='text-gray-700 flex-1'>{selectedCategory || 'Select product category'}</Text>
            <Ionicons name='chevron-forward-outline' size={24} color='gray' />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  )
}

export default AddProductScreen