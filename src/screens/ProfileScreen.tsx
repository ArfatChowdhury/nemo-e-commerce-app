import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import ProfileButton from '../components/ProfileButton'
import { StackNavigationProp } from '@react-navigation/stack'

type RootStackParamList = {
  addProduct: undefined;
  productManagement: undefined;
  Wishlist: undefined;
  OrderHistory: undefined;
  Login: undefined;
  Signup: undefined;
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'addProduct'>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  // Firebase auth temporarily disabled due to Expo Go compatibility
  const user = null;

  return (
    <View className="flex-1 bg-gray-50">
      {user ? (
        // Logged in view (currently never shown)
        <>
          <View className="bg-white m-4 p-6 rounded-2xl shadow-sm">
            <View className="items-center mb-4">
              <View className="w-20 h-20 bg-orange-500 rounded-full items-center justify-center mb-3">
                <Ionicons name="person" size={40} color="white" />
              </View>
              <Text className="text-xl font-bold text-gray-900">User</Text>
            </View>
          </View>

          <View>
            <ProfileButton iconName='bag-handle-outline' name='Product Management' onPress={() => navigation.navigate('productManagement')} />
            <ProfileButton name='Wishlist' iconName='heart-outline' onPress={() => navigation.navigate('Wishlist')} />
            <ProfileButton iconName='receipt-outline' name='Order History' onPress={() => navigation.navigate('OrderHistory')} />
          </View>
        </>
      ) : (
        // Logged out view  
        <View className="flex-1">
          {/* User Info Section */}
          <View className="bg-white m-4 p-6 rounded-2xl shadow-sm">
            <View className="items-center">
              <View className="w-20 h-20 bg-gray-200 rounded-full items-center justify-center mb-3">
                <Ionicons name="person-outline" size={40} color="#9CA3AF" />
              </View>
              <Text className="text-xl font-bold text-gray-900">Guest User</Text>
              <Text className="text-gray-500 text-sm mt-1">Authentication coming soon!</Text>
            </View>
          </View>

          {/* Menu Options */}
          <View>
            <ProfileButton iconName='bag-handle-outline' name='Product Management' onPress={() => navigation.navigate('productManagement')} />
            <ProfileButton name='Wishlist' iconName='heart-outline' onPress={() => navigation.navigate('Wishlist')} />
            <ProfileButton iconName='receipt-outline' name='Order History' onPress={() => navigation.navigate('OrderHistory')} />
          </View>

          {/* Auth Note */}
          <View className="mx-6 mt-8 p-4 bg-orange-50 rounded-xl border border-orange-200">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#F97316" />
              <Text className="flex-1 ml-2 text-orange-800 text-sm">
                Login & Signup require a custom development build. They're not available in Expo Go.
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default ProfileScreen