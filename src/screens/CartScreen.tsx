import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import HeaderBar from '../components/HeaderBar'
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../Store/slices/productFormSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector } from '../Store/hooks'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const CartScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NavigationProp>()
  const cartItems = useAppSelector(state => state.productForm.cartItems)


  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const shipping = subtotal > 0 ? 5.99 : 0
    const tax = subtotal * 0.1
    return subtotal + shipping + tax
  }

  const handleIncreaseQuantity = (cartItemId: string) => {
    dispatch(increaseQuantity(cartItemId))
  }

  const handleDecreaseQuantity = (cartItemId: string) => {
    dispatch(decreaseQuantity(cartItemId))
  }

  const handleRemoveItem = (cartItemId: string, productName: string) => {
    Alert.alert(
      "Remove Item",
      `Remove ${productName} from cart?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => dispatch(removeFromCart(cartItemId))
        }
      ]
    )
  }

  const handleHeaderCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Cart Empty", "Please add items to cart before checkout")
      return
    }

    Alert.alert(
      "Proceed to Checkout",
      "Are you ready to checkout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Checkout",
          onPress: () => navigation.navigate('Checkout')
        }
      ]
    )
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Cart Empty", "Please add items to cart before checkout")
      return
    }

    navigation.navigate('Checkout')
  }

  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <HeaderBar iconName='arrow-back' title="Shopping Cart" />
        <View className="flex-1 justify-center items-center px-8">
          <Ionicons name="cart-outline" size={80} color="#9CA3AF" />
          <Text className="text-2xl font-bold text-gray-500 mt-6 text-center">
            Your cart is empty
          </Text>
          <Text className="text-gray-400 text-center mt-2 text-base">
            Add some products to get started
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <HeaderBar iconName='arrow-back' title="Shopping Cart" />

      {/* Cart Header with Checkout Button */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-lg font-semibold text-gray-900">
          {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
        </Text>
        <TouchableOpacity
          onPress={handleHeaderCheckout}
          className="flex-row items-center"
        >
          <Ionicons name="card-outline" size={20} color="#0d9488" />
          <Text className="text-teal-600 font-medium ml-1">Checkout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Cart Items */}
        <View className="px-4 mt-4">
          {cartItems.map((item) => (
            <View
              key={item.cartItemId}
              className="bg-white rounded-2xl shadow-sm shadow-black/5 p-4 mb-4 border border-gray-100"
            >
              <View className="flex-row">
                {/* Product Image */}
                <View className="mr-4">
                  <Image
                    source={{ uri: item.images?.[0] || 'https://placehold.co/600x400/000000/FFFFFF/png' }}
                    className="w-20 h-20 rounded-xl"
                    resizeMode="cover"
                  />
                </View>

                {/* Product Details */}
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900 mb-1" numberOfLines={2}>
                    {item.productName}
                  </Text>

                  {/* Selected Color */}
                  {item.selectedColor && (
                    <View className="flex-row items-center mb-2">
                      <View
                        className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                        style={{ backgroundColor: item.selectedColor.value }}
                      />
                      <Text className="text-gray-600 text-sm">
                        {item.selectedColor.name}
                      </Text>
                    </View>
                  )}

                  <Text className="text-lg font-bold text-teal-600 mb-3">
                    ${item.price}
                  </Text>

                  {/* Quantity Controls */}
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center border border-gray-300 rounded-full">
                      <TouchableOpacity
                        onPress={() => handleDecreaseQuantity(item.cartItemId)}
                        className="w-10 h-10 justify-center items-center"
                      >
                        <Ionicons name="remove" size={20} color="#6B7280" />
                      </TouchableOpacity>

                      <Text className="mx-4 font-semibold text-gray-900">
                        {item.quantity}
                      </Text>

                      <TouchableOpacity
                        onPress={() => handleIncreaseQuantity(item.cartItemId)}
                        className="w-10 h-10 justify-center items-center"
                      >
                        <Ionicons name="add" size={20} color="#6B7280" />
                      </TouchableOpacity>
                    </View>

                    {/* Remove Button */}
                    <TouchableOpacity
                      onPress={() => handleRemoveItem(item.cartItemId, item.productName)}
                      className="p-2"
                    >
                      <Ionicons name="trash-outline" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Item Total */}
              <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100">
                <Text className="text-gray-600">Item Total</Text>
                <Text className="text-lg font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View className="bg-white mx-4 mt-4 rounded-2xl shadow-sm shadow-black/5 p-6 border border-gray-100">
          <Text className="text-xl font-bold text-gray-900 mb-4">Order Summary</Text>

          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Subtotal</Text>
              <Text className="text-gray-900 font-medium">
                ${calculateSubtotal().toFixed(2)}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">Shipping</Text>
              <Text className="text-gray-900 font-medium">
                ${calculateSubtotal() > 0 ? '5.99' : '0.00'}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">Tax (10%)</Text>
              <Text className="text-gray-900 font-medium">
                ${(calculateSubtotal() * 0.1).toFixed(2)}
              </Text>
            </View>

            <View className="h-px bg-gray-200 my-2" />

            <View className="flex-row justify-between">
              <Text className="text-lg font-bold text-gray-900">Total</Text>
              <Text className="text-lg font-bold text-teal-600">
                ${calculateTotal().toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View className="px-4 pb-6 pt-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          onPress={handleCheckout}
          className="bg-teal-600 py-4 rounded-2xl shadow-lg shadow-teal-600/30"
        >
          <Text className="text-white text-center font-bold text-lg">
            Proceed to Checkout - ${calculateTotal().toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default CartScreen