import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import ProfileButton from '../components/ProfileButton'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../Store/slices/authSlice'

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
  const dispatch = useDispatch()
  const { user } = useSelector((state: any) => state.auth)

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          dispatch(logoutUser())
        }
      }
    ])
  }

  return (
    <View className="flex-1 bg-gray-50">
      {user ? (
        // Logged in view
        <>
          {/* User Info Card */}
          <View className="bg-white m-4 p-6 rounded-2xl shadow-sm">
            <View className="items-center mb-4">
              <View className="w-20 h-20 bg-orange-500 rounded-full items-center justify-center mb-3">
                <Ionicons name="person" size={40} color="white" />
              </View>
              <Text className="text-xl font-bold text-gray-900">{user.displayName || 'User'}</Text>
              <Text className="text-gray-500">{user.email}</Text>
            </View>
          </View>

          {/* Menu Options */}
          <View>
            <ProfileButton iconName='bag-handle-outline' name='Product Management' onPress={() => navigation.navigate('productManagement')} />
            <ProfileButton name='Wishlist' iconName='heart-outline' onPress={() => navigation.navigate('Wishlist')} />
            <ProfileButton iconName='receipt-outline' name='Order History' onPress={() => navigation.navigate('OrderHistory')} />

            {/* Logout Button */}
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-white mx-4 my-2 p-4 rounded-xl flex-row items-center border border-red-100"
            >
              <Ionicons name="log-out-outline" size={24} color="#EF4444" />
              <Text className="flex-1 text-base font-medium ml-3 text-red-500">Logout</Text>
              <Ionicons name="chevron-forward" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // Logged out view
        <View className="flex-1 justify-center px-6">
          <View className="items-center mb-8">
            <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center mb-4">
              <Ionicons name="person-outline" size={50} color="#9CA3AF" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 mb-2">Welcome!</Text>
            <Text className="text-gray-500 text-center">Please login or sign up to continue</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="bg-orange-500 py-4 rounded-xl shadow-lg shadow-orange-500/30 mb-3"
          >
            <Text className="text-white text-center font-bold text-lg">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            className="bg-white border-2 border-orange-500 py-4 rounded-xl"
          >
            <Text className="text-orange-500 text-center font-bold text-lg">Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default ProfileScreen