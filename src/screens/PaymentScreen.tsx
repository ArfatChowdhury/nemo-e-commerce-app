import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderBar from '../components/HeaderBar'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { checkoutSuccess } from '../Store/slices/productFormSlice'
import { RootStackParamList } from '../navigation/types'

type PaymentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Payment'>
type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>

const PaymentScreen = () => {
    const navigation = useNavigation<PaymentScreenNavigationProp>()
    const route = useRoute<PaymentScreenRouteProp>()
    const { shippingAddress, totals, cartItems } = route.params
    const dispatch = useDispatch()

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card')

    const paymentMethods = [
        { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' as const },
        { id: 'paypal', name: 'PayPal', icon: 'wallet-outline' as const },
        { id: 'apple', name: 'Apple Pay', icon: 'logo-apple' as const },
        { id: 'cash', name: 'Cash on Delivery', icon: 'cash-outline' as const },
    ]

    const handlePlaceOrder = () => {
        dispatch(checkoutSuccess())
        alert('Order placed successfully!')
        // Navigate to order history or home
        navigation.navigate('bottomTabs')
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <HeaderBar iconName='arrow-back' title="Payment" />

            <ScrollView
                className="flex-1 px-4"
                showsVerticalScrollIndicator={false}
            >
                {/* Payment Methods Section */}
                <View className="mt-4 mb-6">
                    <Text className="text-lg font-bold text-gray-900 mb-4">Payment Method</Text>

                    <View className="space-y-3">
                        {paymentMethods.map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                onPress={() => setSelectedPaymentMethod(method.id)}
                                className={`bg-white p-4 rounded-xl border-2 flex-row items-center ${selectedPaymentMethod === method.id
                                    ? 'border-teal-600 bg-teal-50'
                                    : 'border-gray-200'
                                    }`}
                            >
                                <Ionicons
                                    name={method.icon}
                                    size={24}
                                    color={selectedPaymentMethod === method.id ? '#0d9488' : '#6b7280'}
                                />
                                <Text
                                    className={`flex-1 ml-3 text-base ${selectedPaymentMethod === method.id
                                        ? 'font-bold text-teal-600'
                                        : 'text-gray-900'
                                        }`}
                                >
                                    {method.name}
                                </Text>
                                {selectedPaymentMethod === method.id && (
                                    <Ionicons name="checkmark-circle" size={24} color="#0d9488" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Shipping Address Section */}
                <View className="bg-white p-4 rounded-2xl border border-gray-100 mb-6 shadow-sm">
                    <Text className="text-lg font-bold text-gray-900 mb-3">Shipping Address</Text>
                    <View className="space-y-1">
                        <Text className="text-gray-700">{shippingAddress.fullName}</Text>
                        <Text className="text-gray-700">{shippingAddress.address}</Text>
                        <Text className="text-gray-700">
                            {shippingAddress.city}, {shippingAddress.zipCode}
                        </Text>
                        <Text className="text-gray-700">{shippingAddress.phone}</Text>
                    </View>
                </View>

                {/* Order Summary Section */}
                <View className="bg-white p-4 rounded-2xl border border-gray-100 mb-6 shadow-sm">
                    <Text className="text-lg font-bold text-gray-900 mb-3">Order Summary</Text>

                    {/* Cart Items */}
                    <View className="mb-3">
                        {cartItems.map((item: any, index: number) => (
                            <View key={index} className="flex-row justify-between mb-2">
                                <Text className="text-gray-600 flex-1">
                                    {item.name} x{item.quantity}
                                </Text>
                                <Text className="text-gray-900 font-medium">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View className="h-px bg-gray-200 my-2" />

                    <View className="space-y-2">
                        <View className="flex-row justify-between">
                            <Text className="text-gray-600">Subtotal</Text>
                            <Text className="text-gray-900 font-medium">${totals.subtotal.toFixed(2)}</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-gray-600">Shipping</Text>
                            <Text className="text-gray-900 font-medium">${totals.shipping.toFixed(2)}</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-gray-600">Tax (10%)</Text>
                            <Text className="text-gray-900 font-medium">${totals.tax.toFixed(2)}</Text>
                        </View>

                        <View className="h-px bg-gray-200 my-2" />

                        <View className="flex-row justify-between">
                            <Text className="text-lg font-bold text-gray-900">Total</Text>
                            <Text className="text-lg font-bold text-teal-600">${totals.total.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Bottom Button */}
            <View className="p-4 bg-white border-t border-gray-200">
                <TouchableOpacity
                    onPress={handlePlaceOrder}
                    className="bg-teal-600 py-4 rounded-2xl shadow-lg shadow-teal-600/30"
                >
                    <Text className="text-white text-center font-bold text-lg">
                        Place Order
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PaymentScreen

