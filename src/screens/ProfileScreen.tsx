import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import ProfileButton from '../components/ProfileButton'
import { StackNavigationProp } from '@react-navigation/stack'

type RootStackParamList = {
  addProduct: undefined;
  messages: undefined;
  settings: undefined;
  
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'addProduct'>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}
const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  return (
    <View>
      <ProfileButton iconName='bag-handle-outline' name='Product Management' onPress={() => navigation.navigate('productManagement')}/>
      <ProfileButton name='Messages' iconName='mail-outline' onPress={() => navigation.navigate('messages')} />
      <ProfileButton iconName='settings-outline' name='Settings' onPress={() => navigation.navigate('settings')} />
    </View>
  )
}

export default ProfileScreen