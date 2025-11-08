import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import HeaderBar from '../components/HeaderBar'

const AddProductScreen = () => {
  return (
    <View className='flex-1 bg-gray-50'>
      <HeaderBar title='Add Product'/>
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

      </ScrollView>
    </View>
  )
}

export default AddProductScreen

// {
//   // Basic Info
//   id: "prod_001",
//   name: "Wireless Bluetooth Headphones",
//   description: "High-quality wireless headphones with noise cancellation",
//   price: 59.99,
//   originalPrice: 99.99,
//   category: "electronics",
  
//   // Media
//   images: [
//     "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
//     "https://images.unsplash.com/photo-1484704849700-f032a568e944"
//   ],
  
//   // Inventory
//   stock: 25,
//   colors: ["Black", "White", "Blue"],
//   sizes: ["One Size"],
  
//   // Additional
//   brand: "SoundMax",
//   features: ["Noise Cancellation", "30hr Battery", "Fast Charge"],
//   tags: ["bestseller", "wireless", "audio"]
// }