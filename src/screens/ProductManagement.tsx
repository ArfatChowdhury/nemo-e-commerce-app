import { View, Text } from 'react-native'
import React from 'react'
import ProfileButton from '../components/ProfileButton'
import { useNavigation } from '@react-navigation/native'
import HeaderBar from '../components/HeaderBar'

const ProductManagement = () => {

    const navigation = useNavigation()

  return (
    <View>
        <HeaderBar iconName='arrow-back' title='Product Management'/>
       <ProfileButton name='Add Product' iconName='add' onPress={() => navigation.navigate('addProduct')} />

       <ProfileButton name='Edit Product' iconName='brush-outline' onPress={() => navigation.navigate('EditProduct')} />
    </View>
  )
}

export default ProductManagement