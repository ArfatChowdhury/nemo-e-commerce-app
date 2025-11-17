import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../constants/apiConfig'
import { useSelector } from 'react-redux'

const CartScreen = () => {

  const products = useSelector(state => state.productForm.products)

  // console.log(products, 'in cart');

  const category = products.map(cat => cat.category)

  // console.log(category);

  const [view, setView] = useState('0')

  return (
    <View>
      <FlatList
        data={category}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className='mr-3 p-4 bg-white rounded-lg shadow-sm'>
            <TouchableOpacity>
            <Text className='text-lg font-medium'>{item}</Text>
            </TouchableOpacity>
          </View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
      />
    </View>
  )
}

export default CartScreen

