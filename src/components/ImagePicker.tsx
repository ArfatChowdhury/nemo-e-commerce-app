import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../Store/hooks'
import { addImage } from '../Store/slices/productFormSlice'
import * as ImagePicker from 'expo-image-picker'

const NewImagePicker = () => {
  const dispatch = useAppDispatch()
  const images = useAppSelector(state => state.productForm.images)

  const imagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5
    })

    if (!result.canceled) {
      const newImageUris = result.assets.map(asset => asset.uri)

      newImageUris.forEach(uri => {
        dispatch(addImage(uri))
      })
    }

  }

  return (
    <View>
      <Button onPress={imagePick} title='open gallery' />
    </View>
  )
}

export default NewImagePicker
