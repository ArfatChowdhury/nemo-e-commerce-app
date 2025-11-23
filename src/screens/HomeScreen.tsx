import { View, Text, TextInput, VirtualizedList, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../Store/slices/productFormSlice'
import { Ionicons } from '@expo/vector-icons'
import ProductGridSkeleton from '../components/ProductGridSkeleton'

const ITEMS_PER_PAGE = 10
const NUM_COLUMNS = 2

const HomeScreen = React.memo(() => {
  const loading = useSelector(state => state.productForm.loading)
  const products = useSelector(state => state.productForm.products)
  const error = useSelector(state => state.productForm.error)
  const dispatch = useDispatch()

  const [selectedCategory, setSelectedCategory] = useState('Trending')
  const [searchQuery, setSearchQuery] = useState('')


  const [displayedProducts, setDisplayedProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const { categories, uniqueCategories } = useMemo(() => {
    const categoryList = products ? products.map(cat => cat.category) : []
    const uniqueCats = [...new Set(categoryList)]
    return { categories: categoryList, uniqueCategories: uniqueCats }
  }, [products])

  const filteredProducts = useMemo(() => {
    if (!products) return []
    if (selectedCategory === 'Trending') return products
    return products.filter(product => product.category === selectedCategory)
  }, [selectedCategory, products])

  const searchedProducts = useMemo(() => {
    if (!products) return []
    if (!searchQuery) return []
    const query = searchQuery.toLowerCase()
    return products.filter(product =>
      product.productName?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    )
  }, [products, searchQuery])


  const finalProducts = useMemo(() => {
    return searchQuery ? searchedProducts : filteredProducts
  }, [searchQuery, searchedProducts, filteredProducts])

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])


  useEffect(() => {
    if (finalProducts.length > 0) {
      const initialProducts = finalProducts.slice(0, ITEMS_PER_PAGE)
      setDisplayedProducts(initialProducts)
      setHasMore(finalProducts.length > ITEMS_PER_PAGE)
      setCurrentPage(1)
    } else {
      setDisplayedProducts([])
      setHasMore(false)
    }
  }, [finalProducts])

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return

    setLoadingMore(true)

    setTimeout(() => {
      const nextPage = currentPage + 1
      const endIndex = nextPage * ITEMS_PER_PAGE
      const newProducts = finalProducts.slice(0, endIndex)

      setDisplayedProducts(newProducts)
      setCurrentPage(nextPage)
      setHasMore(endIndex < finalProducts.length)
      setLoadingMore(false)
    }, 500)
  }, [currentPage, loadingMore, hasMore, finalProducts])

  const handleCategoryPress = useCallback((category: string) => {
    setSelectedCategory(category)
  }, [])

  const handleProductPress = useCallback((product: any) => {
    console.log('Product pressed:', product)
    // navigation.navigate('ProductDetails', { product })
  }, [])

  const renderCategoryItem = useCallback(({ item }) => (
    <View className={`mr-3 rounded-lg shadow-sm ${selectedCategory === item ? 'bg-orange-500' : 'bg-white'
      }`}>
      <TouchableOpacity
        onPress={() => handleCategoryPress(item)}
        className="p-4"
      >
        <Text className={`text-base font-medium ${selectedCategory === item ? 'text-white' : 'text-gray-900'
          }`}>
          {item}
        </Text>
      </TouchableOpacity>
    </View>
  ), [handleCategoryPress, selectedCategory])

  const keyCategoryExtractor = useCallback((item, index) => index.toString(), [])


  const getItemCount = useCallback(() => {
    return Math.ceil(displayedProducts.length / NUM_COLUMNS)
  }, [displayedProducts.length])

  const getItem = useCallback((data, index) => {
    const rowIndex = index
    const firstProduct = displayedProducts[rowIndex * NUM_COLUMNS]
    const secondProduct = displayedProducts[rowIndex * NUM_COLUMNS + 1]

    return {
      firstProduct,
      secondProduct,
      rowIndex
    }
  }, [displayedProducts])

  const renderItem = useCallback(({ item }) => {
    return (
      <View className="flex-row justify-between px-2 mb-4">
        {/* First Product */}
        <View className="w-[48%]">
          {item.firstProduct && (
            <ProductCard
              item={item.firstProduct}
              onPress={handleProductPress}
            />
          )}
        </View>

        {/* Second Product */}
        <View className="w-[48%]">
          {item.secondProduct && (
            <ProductCard
              item={item.secondProduct}
              onPress={handleProductPress}
            />
          )}
        </View>
      </View>
    )
  }, [handleProductPress])

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null

    return (
      <View className="py-4">
        <ProductGridSkeleton
          itemsCount={2}
          columns={2}
          showSearchAndCategories={false}
        />
      </View>
    )
  }, [loadingMore])

  const renderEmptyComponent = useCallback(() => {
    return (
      <View className="flex-1 justify-center items-center mt-20">
        <Text className="text-gray-500 text-lg">No products found</Text>
      </View>
    )
  }, [])

  if (loading && displayedProducts.length === 0) {
    return (
      <ProductGridSkeleton itemsCount={6} />
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
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <View className="h-20">
        <FlatList
          data={['Trending', ...uniqueCategories]}
          keyExtractor={keyCategoryExtractor}
          renderItem={renderCategoryItem}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
        />
      </View>

      {/* Products */}
      <View className="flex-1 px-2">
        <Text className="text-lg font-bold mb-3 px-2">Products in {selectedCategory}</Text>
        <VirtualizedList
          data={displayedProducts}
          getItemCount={getItemCount}
          getItem={getItem}
          renderItem={renderItem}
          keyExtractor={(item, index) => `row-${index}`}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          removeClippedSubviews={true}
          ListEmptyComponent={renderEmptyComponent}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          contentContainerStyle={{
            paddingVertical: 8,
            paddingBottom: 20
          }}
        />
      </View>
    </View>
  )
})


export default HomeScreen




