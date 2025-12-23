import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../context/AuthContext'

const ProfileScreen = () => {
  const navigation = useNavigation<any>()
  const { user, logOut, role } = useAuth()

  const handleLogout = async () => {
    try {
      await logOut()
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6 pt-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-2xl font-bold text-gray-900">Profile</Text>
          {/* Gear button removed as requested */}
        </View>

        {/* User Info */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-teal-600 rounded-full items-center justify-center mb-4 shadow-sm">
            <Text className="text-white text-3xl font-bold">
              {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
            </Text>
          </View>
          <Text className="text-xl font-bold text-gray-900">
            {user?.displayName || 'User'}
          </Text>
          <Text className="text-gray-500">{user?.email}</Text>
          {role === 'admin' && (
            <View className="bg-teal-100 px-3 py-1 rounded-full mt-2">
              <Text className="text-teal-800 text-xs font-bold uppercase">Admin</Text>
            </View>
          )}
        </View>

        {/* Menu Items */}
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <TouchableOpacity
            className="flex-row items-center py-4 border-b border-gray-100"
            onPress={() => navigation.navigate('EditProfile')}
          >
            <View className="w-10 h-10 bg-teal-50 rounded-full items-center justify-center mr-4">
              <Ionicons name="person-outline" size={20} color="#0d9488" />
            </View>
            <Text className="flex-1 text-gray-700 font-medium">Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-4 border-b border-gray-100"
            onPress={() => navigation.navigate('OrderHistory')}
          >
            <View className="w-10 h-10 bg-teal-50 rounded-full items-center justify-center mr-4">
              <Ionicons name="time-outline" size={20} color="#0d9488" />
            </View>
            <Text className="flex-1 text-gray-700 font-medium">Order History</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-4"
            onPress={() => navigation.navigate('Wishlist')}
          >
            <View className="w-10 h-10 bg-teal-50 rounded-full items-center justify-center mr-4">
              <Ionicons name="heart-outline" size={20} color="#0d9488" />
            </View>
            <Text className="flex-1 text-gray-700 font-medium">Wishlist</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Admin Section */}
        {role === 'admin' && (
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <Text className="text-gray-500 text-xs font-bold uppercase mb-2 ml-1">Admin Controls</Text>
            <TouchableOpacity
              className="flex-row items-center py-4"
              onPress={() => navigation.navigate('ProductManagement')}
            >
              <View className="w-10 h-10 bg-purple-50 rounded-full items-center justify-center mr-4">
                <Ionicons name="cube-outline" size={20} color="#7C3AED" />
              </View>
              <Text className="flex-1 text-gray-700 font-medium">Product Management</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        )}

        {/* Logout Button */}
        <TouchableOpacity
          className="flex-row items-center bg-white p-4 rounded-2xl shadow-sm mb-8"
          onPress={handleLogout}
        >
          <View className="w-10 h-10 bg-red-50 rounded-full items-center justify-center mr-4">
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          </View>
          <Text className="flex-1 text-red-500 font-medium">Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
