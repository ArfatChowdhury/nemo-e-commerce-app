import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderBar from '../components/HeaderBar'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

const OrderHistoryScreen = () => {
    const orderHistory = useSelector((state: any) => state.productForm.orderHistory);

    const renderOrderItem = ({ item, index }: { item: any, index: number }) => {
        const totalAmount = item.cartItems.reduce((sum: number, cartItem: any) => sum + (cartItem.price * cartItem.quantity), 0);
        const totalItems = item.cartItems.reduce((sum: number, cartItem: any) => sum + cartItem.quantity, 0);
        const orderDate = new Date().toLocaleDateString(); // Mock date since we didn't save it

        return (
            <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
                <View className="flex-row justify-between items-center mb-3">
                    <View>
                        <Text className="text-lg font-bold text-gray-900">Order #{orderHistory.length - index}</Text>
                        <Text className="text-gray-500 text-xs">{orderDate}</Text>
                    </View>
                    <View className="bg-orange-100 px-3 py-1 rounded-full">
                        <Text className="text-orange-600 text-xs font-bold">Completed</Text>
                    </View>
                </View>

                <View className="h-px bg-gray-100 mb-3" />

                <View className="flex-row justify-between items-center mb-4">
                    <View>
                        <Text className="text-gray-500 text-xs mb-1">Total Amount</Text>
                        <Text className="text-lg font-bold text-gray-900">${totalAmount.toFixed(2)}</Text>
                    </View>
                    <View>
                        <Text className="text-gray-500 text-xs mb-1 text-right">Items</Text>
                        <Text className="text-lg font-bold text-gray-900 text-right">{totalItems}</Text>
                    </View>
                </View>

                <View className="flex-row">
                    {item.cartItems.slice(0, 4).map((cartItem: any, imgIndex: number) => (
                        <View key={imgIndex} className="mr-2 border border-gray-100 rounded-lg overflow-hidden">
                            <Image
                                source={{ uri: cartItem.images?.[0] || 'https://placehold.co/100x100' }}
                                className="w-12 h-12"
                            />
                            {imgIndex === 3 && item.cartItems.length > 4 && (
                                <View className="absolute inset-0 bg-black/50 justify-center items-center">
                                    <Text className="text-white text-xs font-bold">+{item.cartItems.length - 4}</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <HeaderBar title="Order History" iconName="arrow-back" />

            {orderHistory.length === 0 ? (
                <View className="flex-1 justify-center items-center px-4">
                    <Ionicons name="receipt-outline" size={64} color="#D1D5DB" />
                    <Text className="text-gray-500 text-lg font-medium mt-4">No orders found</Text>
                    <Text className="text-gray-400 text-sm text-center mt-2">
                        Looks like you haven't placed any orders yet.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={[...orderHistory].reverse()} // Show newest first
                    renderItem={renderOrderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ padding: 16 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    )
}

export default OrderHistoryScreen
