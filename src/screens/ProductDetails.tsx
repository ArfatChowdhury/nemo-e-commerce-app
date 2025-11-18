import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const ProductDetails = () => {
    const route = useRoute()
    const { productId } = route.params
    const loading = useSelector(state => state.productForm.loading)
    const error = useSelector(state => state.productForm.error)
    const products = useSelector(state => state.productForm.products)

    const product = products.find(p => p._id === productId)

    console.log(product, 'find from find method');
    

    console.log('Product ID:', productId)
    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="text-gray-500 mt-4">Loading product...</Text>
            </View>
        )
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center px-4">
                <Text className="text-red-500 text-lg font-semibold">Error loading product</Text>
                <Text className="text-gray-600 mt-2 text-center">{error}</Text>
            </View>
        )
    }

    if (!product) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-gray-500 text-lg">Product not found</Text>
            </View>
        )
    }

    return (
        <ScrollView className="flex-1 bg-white">
            {/* Product Image */}
            {product.images && product.images.length > 0 && (
                <Image 
                    source={{ uri: product.images[0] }}
                    className="w-full h-80"
                    resizeMode="cover"
                />
            )}
            
            {/* Product Details */}
            <View className="p-4">
                <Text className="text-2xl font-bold text-gray-800 mb-2">
                    {product.productName}
                </Text>
                
                <Text className="text-lg text-gray-600 mb-1">
                    Brand: {product.brandName}
                </Text>
                
                <Text className="text-2xl font-bold text-blue-500 mb-4">
                    ${product.price}
                </Text>
                
                <Text className="text-base text-gray-700 mb-4">
                    {product.description}
                </Text>
                
                <Text className={`text-lg font-medium ${
                    product.stock > 10 ? 'text-green-500' : 'text-red-500'
                }`}>
                    {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                </Text>

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                    <View className="mt-4">
                        <Text className="text-lg font-semibold mb-2">Available Colors:</Text>
                        <View className="flex-row flex-wrap">
                            {product.colors.map((color, index) => (
                                <View key={index} className="flex-row items-center mr-4 mb-2">
                                    <View 
                                        className="w-6 h-6 rounded-full mr-2 border border-gray-300"
                                        style={{ backgroundColor: color.value }}
                                    />
                                    <Text>{color.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Category */}
                <Text className="text-gray-600 mt-4">
                    Category: {product.category}
                </Text>
            </View>
        </ScrollView>
    )
}

export default ProductDetails