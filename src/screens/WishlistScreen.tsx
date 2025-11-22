import { View, Text, FlatList } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderBar from '../components/HeaderBar'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { useNavigation } from '@react-navigation/native'

const WishlistScreen = () => {
    const wishlists = useSelector((state: any) => state.productForm.wishlists);
    const navigation = useNavigation();

    const handleProductPress = useCallback((product: any) => {
        // navigation.navigate('ProductDetails', { product })
    }, [])

    const renderProductItem = useCallback(({ item }: { item: any }) => (
        <ProductCard
            item={item}
            onPress={handleProductPress}
        />
    ), [handleProductPress])

    const keyProductExtractor = useCallback((item: any, index: number) => item._id || item.id || index.toString(), [])

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <HeaderBar title="Wishlist" iconName="arrow-back" />

            {wishlists.length === 0 ? (
                <View className="flex-1 justify-center items-center px-4">
                    <Ionicons name="heart-outline" size={64} color="#D1D5DB" />
                    <Text className="text-gray-500 text-lg font-medium mt-4">Your wishlist is empty</Text>
                    <Text className="text-gray-400 text-sm text-center mt-2">
                        Tap the heart icon on products to add them here.
                    </Text>
                </View>
            ) : (
                <View className="flex-1 px-4 pt-4">
                    <FlatList
                        data={wishlists}
                        keyExtractor={keyProductExtractor}
                        renderItem={renderProductItem}
                        numColumns={2}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
        </SafeAreaView>
    )
}

export default WishlistScreen
