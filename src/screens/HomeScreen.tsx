import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Ionicons } from '@expo/vector-icons'
import ProductCard from '../components/ProductCard'
import { API_BASE_URL } from '../constants/apiConfig'

interface Product {
  _id?: string;
  id?: string;
  productName?: string;
  [key: string]: any;
}

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const url = `${API_BASE_URL}/products`
      console.log('🌐 Fetching products from:', url)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('📦 API Response:', data)
      
      // Handle the API response structure: { success: true, data: [...], count: ... }
      if (data.success && data.data) {
        setProducts(data.data)
      } else if (Array.isArray(data)) {
        // Fallback: if response is directly an array
        setProducts(data)
      } else {
        setProducts([])
      }
      
    } catch (err) {
      console.error('❌ Error fetching products:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products'
      console.error('❌ Error message:', errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }
  
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