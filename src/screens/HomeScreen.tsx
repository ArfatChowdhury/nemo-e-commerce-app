import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Ionicons } from '@expo/vector-icons'
import ProductCard from '../components/ProductCard'
import { API_BASE_URL } from '../constants/apiConfig'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../Store/slices/productFormSlice'

interface Product {
  _id?: string;
  id?: string;
  productName?: string;
  [key: string]: any;
}

export default function HomeScreen() {
  const loading = useSelector(state => state.productForm.loading)
  const products = useSelector(state => state.productForm.products)
  const error = useSelector(state => state.productForm.error)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchProducts())
  }, [])



  console.log('📦 Products data:', products)

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-500 mt-4">Loading products...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
        <Text className="text-red-500 text-lg font-semibold mt-4 text-center">Error loading products</Text>
        <Text className="text-gray-600 mt-2 text-center">{error}</Text>
        <Text className="text-gray-500 mt-4 text-center text-sm">
          Make sure your backend server is running on {API_BASE_URL}
        </Text>
      </View>
    )
  }

  return (
    <View className=' mt-2 flex-1'>
      <View className='flex flex-row items-center bg-white border border-gray-300 rounded-full px-4 py-3 mx-4  shadow-sm'>
        <Ionicons name='search' size={24} color='#6B7280' />
        <TextInput
          placeholder='Search desire product'
          className='flex-1 text-base'
        />
      </View>
      {/* product card  */}
      <View className="flex-1 bg-gray-50">
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={(product: Product) => {
                // Handle product press
                console.log('Product pressed:', product.productName)
                // navigation.navigate('ProductDetail', { product })
              }}
            />
          )}
          keyExtractor={(item, index) => item._id || item.id || `product-${index}`}
          numColumns={2}
          contentContainerStyle={{
            padding: 8,
            paddingBottom: 20
          }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center mt-20">
              <Text className="text-gray-500 text-lg">No products found</Text>
              <Text className="text-gray-400 mt-2">Add some products to get started</Text>
            </View>
          }
        />
      </View>

    </View>
  )
}