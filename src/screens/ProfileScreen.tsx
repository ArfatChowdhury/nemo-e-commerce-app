import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import ProfileButton from '../components/ProfileButton'
import { StackNavigationProp } from '@react-navigation/stack'

type RootStackParamList = {
  addProduct: undefined;
  productManagement: undefined;
  Wishlist: undefined;
  OrderHistory: undefined;
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'addProduct'>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  return (
    <View>
      <ProfileButton iconName='bag-handle-outline' name='Product Management' onPress={() => navigation.navigate('productManagement')} />
      <ProfileButton name='Wishlist' iconName='heart-outline' onPress={() => navigation.navigate('Wishlist')} />
      <ProfileButton iconName='receipt-outline' name='Order History' onPress={() => navigation.navigate('OrderHistory')} />
    </View>
  )
}

export default ProfileScreen