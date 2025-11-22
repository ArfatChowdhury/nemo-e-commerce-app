import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderBar from '../components/HeaderBar'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const CheckoutScreen = () => {
    const navigation = useNavigation()
    const cartItems = useSelector(state => state.productForm.cartItems)

    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        zipCode: '',
        phone: ''
    })

    const calculateTotal = () => {
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
        const shipping = subtotal > 0 ? 5.99 : 0
        const tax = subtotal * 0.1
        return {
            subtotal,
            shipping,
            tax,
            total: subtotal + shipping + tax
        }
    }

    const totals = calculateTotal()

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleProceedToPayment = () => {

        if (!formData.fullName || !formData.address || !formData.city || !formData.zipCode || !formData.phone) {
            alert('Please fill in all fields')
            return
        }

        navigation.navigate('Payment', {
            shippingAddress: formData,
            totals: totals
        })
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <HeaderBar iconName='arrow-back' title="Checkout" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1 px-4"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Shipping Address Section */}
                    <View className="mt-4 mb-6">
                        <Text className="text-lg font-bold text-gray-900 mb-4">Shipping Address</Text>

                        <View className="space-y-4">
                            <View>
                                <Text className="text-gray-600 mb-1 ml-1">Full Name</Text>
                                <TextInput
                                    className="bg-white p-4 rounded-xl border border-gray-200 text-gray-900"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChangeText={(text) => handleInputChange('fullName', text)}
                                />
                            </View>

                            <View>
                                <Text className="text-gray-600 mb-1 ml-1">Address</Text>
                                <TextInput
                                    className="bg-white p-4 rounded-xl border border-gray-200 text-gray-900"
                                    placeholder="Street address"
                                    value={formData.address}
                                    onChangeText={(text) => handleInputChange('address', text)}
                                />
                            </View>

                            <View className="flex-row space-x-4">
                                <View className="flex-1">
                                    <Text className="text-gray-600 mb-1 ml-1">City</Text>
                                    <TextInput
                                        className="bg-white p-4 rounded-xl border border-gray-200 text-gray-900"
                                        placeholder="City"
                                        value={formData.city}
                                        onChangeText={(text) => handleInputChange('city', text)}
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-600 mb-1 ml-1">Zip Code</Text>
                                    <TextInput
                                        className="bg-white p-4 rounded-xl border border-gray-200 text-gray-900"
                                        placeholder="12345"
                                        keyboardType="numeric"
                                        value={formData.zipCode}
                                        onChangeText={(text) => handleInputChange('zipCode', text)}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text className="text-gray-600 mb-1 ml-1">Phone Number</Text>
                                <TextInput
                                    className="bg-white p-4 rounded-xl border border-gray-200 text-gray-900"
                                    placeholder="+1 234 567 8900"
                                    keyboardType="phone-pad"
                                    value={formData.phone}
                                    onChangeText={(text) => handleInputChange('phone', text)}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Order Summary Section */}
                    <View className="bg-white p-4 rounded-2xl border border-gray-100 mb-6 shadow-sm">
                        <Text className="text-lg font-bold text-gray-900 mb-3">Order Summary</Text>

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
                                <Text className="text-lg font-bold text-orange-600">${totals.total.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            {/* Bottom Button */}
            <View className="p-4 bg-white border-t border-gray-200">
                <TouchableOpacity
                    onPress={handleProceedToPayment}
                    className="bg-orange-500 py-4 rounded-2xl shadow-lg shadow-orange-500/30"
                >
                    <Text className="text-white text-center font-bold text-lg">
                        Proceed to Payment
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default CheckoutScreen
