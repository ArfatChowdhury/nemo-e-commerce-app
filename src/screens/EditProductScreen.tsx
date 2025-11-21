import { View, Text, VirtualizedList, Alert } from 'react-native'
import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import HeaderBar from '../components/HeaderBar'
import EditProductCard from '../components/EditProductCard'
import { fetchProducts } from '../Store/slices/productFormSlice'
import ProductGridSkeleton from '../components/ProductGridSkeleton'

const ITEMS_PER_PAGE = 10
const NUM_COLUMNS = 2

const EditProductScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const allProducts = useSelector(state => state.productForm.products)
    const loading = useSelector(state => state.productForm.loading)
    const error = useSelector(state => state.productForm.error)

    const [displayedProducts, setDisplayedProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    // Load initial data
    useEffect(() => {
        if (allProducts.length === 0) {
            dispatch(fetchProducts())
        }
    }, [dispatch, allProducts.length])

    // Update displayed products
    useEffect(() => {
        if (allProducts.length > 0) {
            const initialProducts = allProducts.slice(0, ITEMS_PER_PAGE)
            setDisplayedProducts(initialProducts)
            setHasMore(allProducts.length > ITEMS_PER_PAGE)
            setCurrentPage(1)
        }
    }, [allProducts])

    // Load more function
    const loadMore = useCallback(() => {
        if (loadingMore || !hasMore) return

        setLoadingMore(true)
        
        setTimeout(() => {
            const nextPage = currentPage + 1
            const endIndex = nextPage * ITEMS_PER_PAGE
            const newProducts = allProducts.slice(0, endIndex)
            
            setDisplayedProducts(newProducts)
            setCurrentPage(nextPage)
            setHasMore(endIndex < allProducts.length)
            setLoadingMore(false)
        }, 500)
    }, [currentPage, loadingMore, hasMore, allProducts])

    const handleProductPress = useCallback((product) => {
        navigation.navigate("productDetails", { productId: product._id })
    }, [navigation])

    const handleEditProduct = useCallback((product) => {
       navigation.navigate('EditForm', { productId: product._id })
    }, [navigation])

    const handleDeleteProduct = useCallback((productId) => {
        Alert.alert('Success', 'Product deleted successfully!')
    }, [])

    // VirtualizedList methods
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

    // Render each row with 2 products
    const renderItem = useCallback(({ item, index }) => {
        return (
            <View className="flex-row justify-between px-2 mb-4">
                {/* First Product */}
                <View className="w-[48%]">
                    {item.firstProduct && (
                        <EditProductCard 
                            item={item.firstProduct}
                            onPress={handleProductPress}
                            onEdit={handleEditProduct}
                            onDelete={handleDeleteProduct}
                        />
                    )}
                </View>
                
                {/* Second Product */}
                <View className="w-[48%]">
                    {item.secondProduct && (
                        <EditProductCard 
                            item={item.secondProduct}
                            onPress={handleProductPress}
                            onEdit={handleEditProduct}
                            onDelete={handleDeleteProduct}
                        />
                    )}
                </View>
            </View>
        )
    }, [handleProductPress, handleEditProduct, handleDeleteProduct])

    // Render loading more skeleton
    const renderFooter = useCallback(() => {
        if (!loadingMore) return null
        
        return (
            <View className="py-4">
                <ProductGridSkeleton itemsCount={2} columns={2} />
            </View>
        )
    }, [loadingMore])

    // Render empty state or loading skeleton
    const renderEmptyComponent = useCallback(() => {
        if (loading) {
            return <ProductGridSkeleton itemsCount={6} columns={2} />
        }
        
        return (
            <View className="flex-1 justify-center items-center mt-20">
                <Text className="text-gray-500 text-lg">No products found</Text>
                <Text className="text-gray-400 mt-2">Add some products to edit</Text>
            </View>
        )
    }, [loading])

    const handleEndReached = useCallback(() => {
        if (!loadingMore && hasMore) {
            loadMore()
        }
    }, [loadingMore, hasMore, loadMore])

    return (
        <View className="flex-1 bg-gray-50">
            <HeaderBar iconName='arrow-back' title='Edit Product' />
            
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
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.3}
                refreshing={loading}
                onRefresh={() => dispatch(fetchProducts())}
                contentContainerStyle={{
                    paddingVertical: 8,
                    paddingBottom: 20
                }}
            />
        </View>
    )
}

export default React.memo(EditProductScreen)