import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import ProfileButton from '../components/ProfileButton'
import { StackNavigationProp } from '@react-navigation/stack'
import { useAuth } from '../context/AuthContext'
import { RootStackParamList } from '../navigation/types'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logOut, loading } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logOut();
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {user ? (
        // Logged in view
        <View className="flex-1">
          {/* User Info Section */}
          <View className="bg-white m-4 p-6 rounded-2xl shadow-sm">
            <View className="items-center mb-4">
              <View className="w-20 h-20 bg-teal-600 rounded-full items-center justify-center mb-3">
                <Text className="text-white text-2xl font-bold">
                  {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                </Text>
              </View>
              <Text className="text-xl font-bold text-gray-900">
                {user.displayName || 'User'}
              </Text>
              <Text className="text-gray-500 text-sm mt-1">{user.email}</Text>
            </View>
          </View>

          {/* Menu Options */}
          <View>
            <ProfileButton iconName='bag-handle-outline' name='Product Management' onPress={() => navigation.navigate('productManagement')} />
            <ProfileButton name='Wishlist' iconName='heart-outline' onPress={() => navigation.navigate('Wishlist')} />
            <ProfileButton iconName='receipt-outline' name='Order History' onPress={() => navigation.navigate('OrderHistory')} />
          </View>

          {/* Logout Button */}
          <View className="mx-4 mt-4">
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-red-500 py-4 rounded-xl flex-row items-center justify-center"
            >
              <Ionicons name="log-out-outline" size={20} color="white" />
              <Text className="text-white font-bold text-base ml-2">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
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
              <Text className="text-gray-500 text-sm mt-1">Sign in to access all features</Text>
            </View>

            {/* Login/Signup Buttons */}
            <View className="flex-row mt-6 gap-3">
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                className="flex-1 bg-teal-600 py-3 rounded-xl"
              >
                <Text className="text-white text-center font-bold">Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
                className="flex-1 bg-gray-200 py-3 rounded-xl"
              >
                <Text className="text-gray-700 text-center font-bold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Menu Options */}
          <View>
            <ProfileButton iconName='bag-handle-outline' name='Product Management' onPress={() => navigation.navigate('productManagement')} />
            <ProfileButton name='Wishlist' iconName='heart-outline' onPress={() => navigation.navigate('Wishlist')} />
            <ProfileButton iconName='receipt-outline' name='Order History' onPress={() => navigation.navigate('OrderHistory')} />
          </View>
        </View>
      )}
    </View>
  )
}

export default ProfileScreen