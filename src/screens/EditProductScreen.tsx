import { View, Text, VirtualizedList, Alert } from 'react-native'
import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'
import HeaderBar from '../components/HeaderBar'
import EditProductCard from '../components/EditProductCard'
import { fetchProducts, Product } from '../Store/slices/productFormSlice'
import ProductGridSkeleton from '../components/ProductGridSkeleton'
import { useAppDispatch, useAppSelector } from '../Store/hooks'

const ITEMS_PER_PAGE = 10
const NUM_COLUMNS = 2

const EditProductScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const dispatch = useAppDispatch()
    const allProducts = useAppSelector(state => state.productForm.products)
    const loading = useAppSelector(state => state.productForm.loading)
    const error = useAppSelector(state => state.productForm.error)

    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        if (allProducts.length === 0) {
            dispatch(fetchProducts())
        }
    }, [dispatch, allProducts.length])

    useEffect(() => {
        if (allProducts.length > 0) {
            const initialProducts = allProducts.slice(0, ITEMS_PER_PAGE)
            setDisplayedProducts(initialProducts)
            setHasMore(allProducts.length > ITEMS_PER_PAGE)
            setCurrentPage(1)
        }
    }, [allProducts])

    if (loading && displayedProducts.length === 0) {
        return (
            <View className="flex-1 bg-gray-50">
                <HeaderBar iconName='arrow-back' title='Edit Product' />
                <ProductGridSkeleton
                    itemsCount={8}
                    columns={2}
                    showSearchAndCategories={false}
                />
            </View>
        )
    }

    if (error) {
        return (
            <View className="flex-1 bg-gray-50">
                <HeaderBar iconName='arrow-back' title='Edit Product' />
                <View className="flex-1 justify-center items-center px-4">
                    <Text className="text-red-500 text-lg font-semibold text-center">
                        Error loading products
                    </Text>
                    <Text className="text-gray-600 mt-2 text-center">
                        {error}
                    </Text>
                </View>
            </View>
        )
    }

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

    const handleProductPress = useCallback((product: Product) => {
        navigation.navigate("productDetails", { productId: product._id })
    }, [navigation])

    const handleEditProduct = useCallback((product: Product) => {
        navigation.navigate('EditForm', { productId: product._id })
    }, [navigation])

    const handleDeleteProduct = useCallback((productId: string) => {
        Alert.alert('Success', 'Product deleted successfully!')
    }, [])

    const getItemCount = useCallback(() => {
        return Math.ceil(displayedProducts.length / NUM_COLUMNS)
    }, [displayedProducts.length])

    const getItem = useCallback((data: Product[], index: number) => {
        const rowIndex = index
        const firstProduct = displayedProducts[rowIndex * NUM_COLUMNS]
        const secondProduct = displayedProducts[rowIndex * NUM_COLUMNS + 1]

        return {
            firstProduct,
            secondProduct,
            rowIndex
        }
    }, [displayedProducts])

    const renderItem = useCallback(({ item, index }: { item: { firstProduct: Product, secondProduct: Product, rowIndex: number }, index: number }) => {
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
                <ProductGridSkeleton
                    itemsCount={2}
                    columns={2}
                    showSearchAndCategories={false}
                />
            </View>
        )
    }, [loadingMore])

    // Render empty state (only when not loading and no products)
    const renderEmptyComponent = useCallback(() => {
        return (
            <View className="flex-1 justify-center items-center mt-20">
                <Text className="text-gray-500 text-lg">No products found</Text>
                <Text className="text-gray-400 mt-2">Add some products to edit</Text>
            </View>
        )
    }, [])

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