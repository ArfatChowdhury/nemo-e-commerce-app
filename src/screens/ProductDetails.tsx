import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import HeaderBar from '../components/HeaderBar'
import { addToCart } from '../Store/slices/productFormSlice'
import { Ionicons } from '@expo/vector-icons'
import ProductCard from '../components/ProductCard'

const ProductDetails = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const { productId } = route.params
    const loading = useSelector(state => state.productForm.loading)
    const error = useSelector(state => state.productForm.error)
    const products = useSelector(state => state.productForm.products)
    const cartItem = useSelector(state => state.productForm.cartItems)
    const dispatch = useDispatch()

    const product = products.find(p => p._id === productId)
    const [showFullDescription, setShowFullDescription] = useState(false)
    const [selectedColor, setSelectedColor] = useState(null)

    const similarProducts = products.filter(p => p._id !== productId).slice(0, 4)

    const handleAddToCart = (product) => {
  
        if (product.colors && product.colors.length > 0 && !selectedColor) {
            Alert.alert(
                "Select Color",
                "Please select a color before adding to cart",
                [{ text: "OK" }]
            )
            return
        }

        
        const cartItem = {
            ...product,
            selectedColor: selectedColor || null,
            cartItemId: `${product._id}-${selectedColor ? selectedColor.name : 'no-color'}-${Date.now()}` // Unique ID for cart item
        }

        dispatch(addToCart(cartItem))
        
        
        Alert.alert(
            "Added to Cart",
            `${product.productName}${selectedColor ? ` (${selectedColor.name})` : ''} has been added to your cart`,
            [{ text: "OK" }]
        )
    }

    const handleColorSelect = (color) => {
        setSelectedColor(color)
    }

    const handleProductPress = (product) => {
        navigation.navigate("productDetails", {
            productId: product._id
        })
    }

    // Truncate description
    const truncateDescription = (text, length = 120) => {
        if (!text) return '';
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    }

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="text-gray-500 mt-4">Loading product...</Text>
            </View>
        )
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center px-4 bg-white">
                <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
                <Text className="text-red-500 text-lg font-semibold mt-4 text-center">Error loading product</Text>
                <Text className="text-gray-600 mt-2 text-center">{error}</Text>
            </View>
        )
    }

    if (!product) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Ionicons name="search-outline" size={48} color="#6B7280" />
                <Text className="text-gray-500 text-lg mt-4">Product not found</Text>
            </View>
        )
    }

    return (
        <View className="flex-1 bg-gray-50">
            <HeaderBar title="Product Details" iconName='arrow-back' />
            
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                {/* Product Image with Shadow */}
                <View className="bg-white rounded-b-3xl shadow-lg shadow-black/10 pb-6">
                    {product.images && product.images.length > 0 && (
                        <Image
                            source={{ uri: product.images[0] }}
                            className="w-full h-96 rounded-b-3xl"
                            resizeMode="cover"
                        />
                    )}
                </View>

                {/* Product Details Card */}
                <View className="bg-white mx-4 mt-6 rounded-3xl shadow-sm shadow-black/5 p-6">
                    {/* Product Name and Price */}
                    <View className="flex-row justify-between items-start mb-4">
                        <Text className="text-2xl font-bold text-gray-900 flex-1 mr-4">
                            {product.productName}
                        </Text>
                        <Text className="text-2xl font-bold text-blue-600">
                            ${product.price}
                        </Text>
                    </View>

                    {/* Brand and Stock */}
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-base text-gray-600">
                            by {product.brandName}
                        </Text>
                        <View className={`px-3 py-1 rounded-full ${
                            product.stock > 10 ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                            <Text className={`text-sm font-medium ${
                                product.stock > 10 ? 'text-green-800' : 'text-red-800'
                            }`}>
                                {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                            </Text>
                        </View>
                    </View>

                    {/* Description */}
                    <View className="mb-6">
                        <Text className="text-lg font-semibold text-gray-900 mb-3">Description</Text>
                        <Text className="text-gray-600 leading-6">
                            {showFullDescription ? product.description : truncateDescription(product.description)}
                        </Text>
                        {product.description && product.description.length > 120 && (
                            <TouchableOpacity 
                                onPress={() => setShowFullDescription(!showFullDescription)}
                                className="mt-2"
                            >
                                <Text className="text-blue-500 font-medium">
                                    {showFullDescription ? 'See Less' : 'See More'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Color Selection */}
                    {product.colors && product.colors.length > 0 && (
                        <View className="mb-6">
                            <Text className="text-lg font-semibold text-gray-900 mb-3">
                                Select Color
                                {selectedColor && (
                                    <Text className="text-blue-500 font-normal"> • {selectedColor.name}</Text>
                                )}
                            </Text>
                            
                            {/* Color Selection Required Message */}
                            {!selectedColor && (
                                <Text className="text-red-500 text-sm mb-3">
                                    * Please select a color
                                </Text>
                            )}
                            
                            <View className="flex-row flex-wrap">
                                {product.colors.map((color, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleColorSelect(color)}
                                        className={`flex-row items-center mr-4 mb-3 p-2 rounded-2xl border-2 ${
                                            selectedColor?.name === color.name 
                                                ? 'border-blue-500 bg-blue-50' 
                                                : 'border-gray-200 bg-white'
                                        } shadow-sm`}
                                    >
                                        <View 
                                            className="w-8 h-8 rounded-full mr-3 border-2 border-gray-300 shadow-sm"
                                            style={{ backgroundColor: color.value }}
                                        />
                                        <Text className={`font-medium ${
                                            selectedColor?.name === color.name 
                                                ? 'text-blue-700' 
                                                : 'text-gray-700'
                                        }`}>
                                            {color.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Available Colors (Display only - non interactive) */}
                    {product.colors && product.colors.length > 0 && (
                        <View className="mb-6">
                            <Text className="text-lg font-semibold text-gray-900 mb-3">Available Colors</Text>
                            <View className="flex-row flex-wrap">
                                {product.colors.map((color, index) => (
                                    <View key={index} className="flex-row items-center mr-4 mb-3">
                                        <View 
                                            className="w-6 h-6 rounded-full mr-2 border border-gray-300"
                                            style={{ backgroundColor: color.value }}
                                        />
                                        <Text className="text-gray-600 text-sm">{color.name}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Category */}
                    <View className="mb-6">
                        <Text className="text-lg font-semibold text-gray-900 mb-2">Category</Text>
                        <View className="bg-gray-100 px-4 py-2 rounded-2xl self-start">
                            <Text className="text-gray-700 font-medium">{product.category}</Text>
                        </View>
                    </View>

                    {/* Add to Cart Button */}
                    <TouchableOpacity 
                        onPress={() => handleAddToCart(product)}
                        className={`py-4 rounded-2xl shadow-lg ${
                            (product.colors && product.colors.length > 0 && !selectedColor)
                                ? 'bg-gray-400 shadow-gray-400/30'
                                : 'bg-blue-500 shadow-blue-500/30'
                        }`}
                        disabled={product.colors && product.colors.length > 0 && !selectedColor}
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            {product.colors && product.colors.length > 0 && !selectedColor
                                ? 'Select Color First'
                                : 'Add to Cart'
                            }
                        </Text>
                    </TouchableOpacity>

                    {/* Selected Color Preview */}
                    {selectedColor && (
                        <View className="mt-4 p-3 bg-blue-50 rounded-2xl border border-blue-200">
                            <Text className="text-blue-800 text-center font-medium">
                                Selected: <Text className="font-bold">{selectedColor.name}</Text>
                            </Text>
                        </View>
                    )}
                </View>

                {/* Similar Products Section */}
                {similarProducts.length > 0 && (
                    <View className="mt-8 mx-4">
                        <Text className="text-2xl font-bold text-gray-900 mb-4">Similar Products</Text>
                        <FlatList
                            data={similarProducts}
                            keyExtractor={(item) => item._id || item.id}
                            renderItem={({ item }) => (
                                <View className="mr-4" style={{ width: 160 }}>
                                    <ProductCard 
                                        item={item}
                                        onPress={handleProductPress}
                                    />
                                </View>
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingRight: 16 }}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default ProductDetails