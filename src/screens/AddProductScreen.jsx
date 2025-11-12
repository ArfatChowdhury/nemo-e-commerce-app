import { View, Text, TextInput, ScrollView, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderBar from '../components/HeaderBar'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, setColors, setCategory, resetForm, addProduct } from '../Store/slices/productFormSlice';
import NewImagePicker from '../components/ImagePicker';

const AddProductScreen = () => {

  const route = useRoute()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const formData = useSelector(state => state.productForm)
  const productsList = useSelector(state => state.productForm.products)

  const [checkData, setCheckData] = useState([])


  useEffect(() => {
    if (route.params?.selectedColors) {
      dispatch(setColors(route.params.selectedColors))
    }

  }, [route.params])


  const handleAdd = () => {

    fetch('http://localhost:5000/products',{
      method: 'POST',
      headers: {
        'content-type' : 'application/json' 
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => 
      console.log('data in the frontend' , data)
    )







    // dispatch(addProduct(formData))
    // dispatch(resetForm())
    // console.log('All products:', productsList)
  }





  const handleCategoryInput = () => {
    navigation.navigate('category')
  }

  const handleColorSelection = () => {
    navigation.navigate('colorSelection')
  }



  return (
    <View className='flex-1 bg-gray-50 '>
      <HeaderBar iconName='arrow-back' title='Add Product' size={24} />
      <ScrollView className='px-4 py-4'>

        {/* Product Name */}
        <View className='mb-6'>
          <Text className='text-lg font-semibold mb-2 text-gray-800'>Product Name</Text>
          <TextInput
            placeholder='e.g., Wireless Bluetooth Headphones'
            className='bg-white border border-gray-300 rounded-lg px-4 py-3 text-base'
            placeholderTextColor={'#9CA3AF'}
            value={formData.productName}
            onChangeText={(text) => dispatch(updateField({ field: 'productName', value: text }))}

          />
        </View>

        {/* Price */}
        <View className='mb-6'>
          <Text className='text-lg font-semibold mb-2 text-gray-800'>Price</Text>
          <View className='flex-row items-center'>
            <Text className='text-lg text-gray-600 mr-2'>$</Text>
            <TextInput
              placeholder='0.00'
              keyboardType='decimal-pad'
              className='bg-white border border-gray-300 rounded-lg px-4 py-3 text-base flex-1'
              placeholderTextColor={'#9CA3AF'}
              value={formData.price}
              onChangeText={(text) => dispatch(updateField({ field: 'price', value: text }))}
            />
          </View>
        </View>

        {/* Description */}
        <View className='mb-6'>
          <Text className='text-lg font-semibold mb-2 text-gray-800'>Description</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
            <TextInput
              placeholder='Describe your product...'
              multiline
              numberOfLines={4}
              className='bg-white border border-gray-300 rounded-lg px-4 py-3 text-base h-32'
              placeholderTextColor={'#9CA3AF'}
              textAlignVertical='top'
              value={formData.description}
              onChangeText={(text) => dispatch(updateField({ field: 'description', value: text }))}
            />
          </KeyboardAvoidingView>
        </View>

        {/* Image option  */}
        <View className='mb-6'>
          <Text className='text-lg font-semibold mb-2 text-gray-800'>Product Images</Text>
          <NewImagePicker />
        </View>

        {/*Brand name*/}
        <View className='mb-6'>
          <Text className='text-lg font-semibold mb-2 text-gray-800'>Brand name</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
            <TextInput
              placeholder='e.g., Nokia, JBL, Samsung'
              className='bg-white border border-gray-300 rounded-lg px-4 py-3 text-base'
              placeholderTextColor={'#9CA3AF'}
              value={formData.brandName}
              onChangeText={(text) => dispatch(updateField({ field: 'brandName', value: text }))}
            />
          </KeyboardAvoidingView>
        </View>

        {/* Stock */}
        <View className='mb-6'>
          <Text className='text-lg font-semibold mb-2 text-gray-800'>Product Stock</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
            <TextInput
              placeholder='0'
              keyboardType='decimal-pad'
              className='bg-white border border-gray-300 rounded-lg px-4 py-3 text-base flex-1 w-full'
              placeholderTextColor={'#9CA3AF'}
              value={formData.stock}
              onChangeText={(text) => dispatch(updateField({ field: 'stock', value: text }))}
            />
          </KeyboardAvoidingView>

        </View>




        {/* Colors Section*/}
        <View className='mb-6'>
          <Text className='text-lg font-semibold mb-2 text-gray-800'>Colors</Text>

          {/* Selected Colors Preview */}
          {formData.colors.length > 0 && (
            <View className='mb-3'>
              <Text className='text-gray-600 mb-2'>Selected colors:</Text>
              <View className='flex-row flex-wrap'>
                {formData.colors.map((color, index) => (
                  <View
                    key={index}
                    className='flex-row items-center bg-blue-100 rounded-full px-3 py-2 mr-2 mb-2'
                  >
                    <View
                      style={{ backgroundColor: color.value }}
                      className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                    />
                    <Text className='text-blue-800 text-sm'>{color.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Color Selection Button */}
          <TouchableOpacity
            onPress={handleColorSelection}
            className='border border-gray-400 p-4 rounded-xl flex-row items-center justify-between w-full bg-white'
          >
            <Text className='text-gray-700 flex-1'>
              {formData.colors.length > 0
                ? `${formData.colors.length} color(s) selected`
                : 'Select product colors'
              }
            </Text>
            <Ionicons name='chevron-forward-outline' size={24} color='gray' />
          </TouchableOpacity>
        </View>

        {/* category */}
        <View>
          <Text className='text-lg font-semibold mb-2 text-gray-800'>Select Category</Text>
          <TouchableOpacity
            onPress={handleCategoryInput}
            className='border border-gray-400 p-4 rounded-xl flex-row items-center justify-between w-full'>
            <Text className='text-gray-700 flex-1'>{formData.category || 'Select product category'}</Text>
            <Ionicons name='chevron-forward-outline' size={24} color='gray' />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleAdd} className='py-4 px-4 bg-blue-400 mb-5 mt-4'>
          <Text>ADD PRODUCT</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}

export default AddProductScreen