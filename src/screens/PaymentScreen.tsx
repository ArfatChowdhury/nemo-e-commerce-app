import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderBar from '../components/HeaderBar'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { clearCart } from '../Store/slices/productFormSlice'
import { Ionicons } from '@expo/vector-icons'
import { setOrderHistory } from '../Store/slices/productFormSlice'
const PaymentScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()

    const { totals, shippingAddress, cartItems } = route.params || {}

    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolderName: ''
    })

    const handlePayment = () => {

        if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardHolderName) {
            Alert.alert('Error', 'Please fill in all card details')
            return
        }


        Alert.alert(
            'Processing Payment',
            'Please wait...',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {

                        setTimeout(() => {
                            Alert.alert(
                                'Payment Successful',
                                'Your order has been placed successfully!',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            dispatch(clearCart())
                                            dispatch(setOrderHistory({
                                                cartItems
                                            }))
                                            navigation.reset({
                                                index: 0,
                                                routes: [{ name: 'bottomTabs' }],
                                            })
                                        }
                                    }
                                ]
                            )
                        }, 1000)
                    }
                }
            ]
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <HeaderBar title="Payment" iconName="arrow-back" />

            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>

                {/* Order Summary Card */}
                <View className="bg-orange-500 p-6 rounded-3xl shadow-lg shadow-orange-500/30 mt-4 mb-6">
                    <Text className="text-orange-100 text-lg mb-1">Total Amount</Text>
                    <Text className="text-white text-4xl font-bold">
                        ${totals?.total?.toFixed(2) || '0.00'}
                    </Text>
                    <View className="flex-row items-center mt-4 bg-orange-600/30 p-2 rounded-lg self-start">
                        <Ionicons name="shield-checkmark" size={20} color="#FFEDD5" />
                        <Text className="text-orange-50 ml-2 text-sm">Secure Payment</Text>
                    </View>
                </View>

                {/* Payment Method Selection (Mock) */}
                <Text className="text-lg font-bold text-gray-900 mb-4">Payment Method</Text>
                <View className="flex-row space-x-4 mb-6">
                    <TouchableOpacity className="bg-white p-4 rounded-xl border-2 border-orange-500 flex-1 items-center justify-center shadow-sm">
                        <Ionicons name="card" size={24} color="#f97316" />
                        <Text className="text-orange-600 font-bold mt-2">Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white p-4 rounded-xl border border-gray-200 flex-1 items-center justify-center shadow-sm">
                        <Ionicons name="logo-apple" size={24} color="#374151" />
                        <Text className="text-gray-600 font-medium mt-2">Apple Pay</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white p-4 rounded-xl border border-gray-200 flex-1 items-center justify-center shadow-sm">
                        <Ionicons name="logo-google" size={24} color="#374151" />
                        <Text className="text-gray-600 font-medium mt-2">Google Pay</Text>
                    </TouchableOpacity>
                </View>

                {/* Card Details Form */}
                <View className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6">
                    <Text className="text-lg font-bold text-gray-900 mb-4">Card Details</Text>

                    <View className="space-y-4">
                        <View>
                            <Text className="text-gray-600 mb-1 ml-1">Card Number</Text>
                            <TextInput
                                className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-900"
                                placeholder="0000 0000 0000 0000"
                                keyboardType="numeric"
                                value={cardDetails.cardNumber}
                                onChangeText={(text) => setCardDetails({ ...cardDetails, cardNumber: text })}
                            />
                        </View>

                        <View className="flex-row space-x-4">
                            <View className="flex-1">
                                <Text className="text-gray-600 mb-1 ml-1">Expiry Date</Text>
                                <TextInput
                                    className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-900"
                                    placeholder="MM/YY"
                                    value={cardDetails.expiryDate}
                                    onChangeText={(text) => setCardDetails({ ...cardDetails, expiryDate: text })}
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-600 mb-1 ml-1">CVV</Text>
                                <TextInput
                                    className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-900"
                                    placeholder="123"
                                    keyboardType="numeric"
                                    maxLength={3}
                                    secureTextEntry
                                    value={cardDetails.cvv}
                                    onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
                                />
                            </View>
                        </View>

                        <View>
                            <Text className="text-gray-600 mb-1 ml-1">Card Holder Name</Text>
                            <TextInput
                                className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-900"
                                placeholder="John Doe"
                                value={cardDetails.cardHolderName}
                                onChangeText={(text) => setCardDetails({ ...cardDetails, cardHolderName: text })}
                            />
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Pay Button */}
            <View className="p-4 bg-white border-t border-gray-200">
                <TouchableOpacity
                    onPress={handlePayment}
                    className="bg-orange-600 py-4 rounded-2xl shadow-lg shadow-orange-500/30 flex-row justify-center items-center"
                >
                    <Ionicons name="lock-closed" size={20} color="white" className="mr-2" />
                    <Text className="text-white text-center font-bold text-lg ml-2">
                        Pay ${totals?.total?.toFixed(2) || '0.00'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PaymentScreen
