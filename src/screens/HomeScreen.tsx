import { View, Text, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import ProductCard from '../components/ProductCard'
import { API_BASE_URL } from '../constants/apiConfig'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../Store/slices/productFormSlice'
import { Ionicons } from '@expo/vector-icons'

// Memoize the component
const HomeScreen = React.memo(() => {
  const loading = useSelector(state => state.productForm.loading)
  const products = useSelector(state => state.productForm.products)
  const error = useSelector(state => state.productForm.error)
  const dispatch = useDispatch()
  
  // Memoize categories computation
  const { categories, uniqueCategories } = useMemo(() => {
    const categoryList = products ? products.map(cat => cat.category) : []
    const uniqueCats = [...new Set(categoryList)]
    return { categories: categoryList, uniqueCategories: uniqueCats }
  }, [products]) // Only recompute when products change

  const [selectedCategory, setSelectedCategory] = useState('All')

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    if (!products) return []
    if (selectedCategory === 'All') return products
    return products.filter(product => product.category === selectedCategory)
  }, [selectedCategory, products])

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  console.log('🔄 HomeScreen re-render')

  // Memoize callbacks
  const handleCategoryPress = useCallback((category: string) => {
    setSelectedCategory(category)
  }, [])

  const handleProductPress = useCallback((product: any) => {
    console.log('Product pressed:', product)
    // navigation.navigate('ProductDetails', { product })
  }, [])

  // Memoize render items
  const renderCategoryItem = useCallback(({ item }) => (
    <View className='mr-3 p-4 bg-white rounded-lg shadow-sm'>
      <TouchableOpacity onPress={() => handleCategoryPress(item)}>
        <Text className='text-lg font-medium'>{item}</Text>
      </TouchableOpacity>
    </View>
  ), [handleCategoryPress])

  const renderProductItem = useCallback(({ item }) => (
    <ProductCard 
      item={item}
      onPress={handleProductPress}
    />
  ), [handleProductPress])

  const keyCategoryExtractor = useCallback((item, index) => index.toString(), [])
  const keyProductExtractor = useCallback((item, index) => item._id || item.id || index.toString(), [])

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
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Search Bar */}
      <View className='flex flex-row items-center bg-white border border-gray-300 rounded-full px-4 py-3 mx-4 my-4 shadow-sm'>
        <Ionicons name='search' size={24} color='#6B7280' />
        <TextInput
          placeholder='Search desire product'
          className='flex-1 text-base ml-2'
        />
      </View>

      {/* Categories */}
      <View className="h-20">
        <FlatList
          data={['All', ...uniqueCategories]}
          keyExtractor={keyCategoryExtractor}
          renderItem={renderCategoryItem}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
        />
      </View>

      {/* Products */}
      <View className="flex-1 px-4">
        <Text className="text-lg font-bold mb-3">Products in {selectedCategory}</Text>
        
        <FlatList
          data={filteredProducts}
          keyExtractor={keyProductExtractor}
          renderItem={renderProductItem}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center mt-20">
              <Text className="text-gray-500 text-lg">No products found</Text>
            </View>
          }
        />
      </View>
    </View>
  )
})

export default HomeScreen