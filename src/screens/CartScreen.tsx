import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../constants/apiConfig'
import { useSelector } from 'react-redux'

const CartScreen = () => {
  const images= useSelector(state => state.productForm.images)
  console.log(images, 'koaoifjgioajoifdioasf')
  return (
    <View>
      <Text>{images}</Text>s
      
    </View>
  )
}

export default CartScreen

