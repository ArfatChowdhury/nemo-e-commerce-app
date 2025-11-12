import { View, Text, TextInput, ScrollView, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderBar from '../components/HeaderBar'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, setColors, setCategory, resetForm, addProduct } from '../Store/slices/productFormSlice';
import NewImagePicker from '../components/ImagePicker';


const COMPUTER_IP = '192.168.1.2'; 

const BASE_URL = Platform.select({
  android: `http://${COMPUTER_IP}:5000`,  
  ios: `http://${COMPUTER_IP}:5000`,      
  default: `http://${COMPUTER_IP}:5000`,
});

const AddProductScreen = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const formData = useSelector(state => state.productForm)




  const validateForm = (formData) => {
    if (!formData.productName?.trim()) {
      return 'Product name is required';
    }

    if (!formData.brandName?.trim()) {
      return 'Brand name is required';
    }

    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      return 'Please enter a valid price';
    }

    if (!formData.stock || isNaN(formData.stock) || formData.stock < 0) {
      return 'Please enter valid stock quantity';
    }

    if (!formData.category?.trim()) {
      return 'Category is required';
    }

    if (!formData.images || formData.images.length === 0) {
      return 'Please add at least one image';
    }

    return null;
  };




  const handleAdd = async () => {
    try {

      const error = validateForm(formData);
      if (error) {
        alert(error);
        return;
      }

      console.log('📤 Sending product to backend:', formData);
      console.log('🌐 Using BASE_URL:', BASE_URL);
      console.log('📱 Platform:', Platform.OS);

      const url = `${BASE_URL}/products`;
      console.log('🔗 Full URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Product saved successfully:', data);

     
      dispatch(resetForm());

      
      alert('Product added successfully!');

    } catch (error) {
      console.error('❌ Error saving product:', error);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);
      
      let errorMessage = 'Failed to save product. ';
      if (error.message.includes('Network request failed')) {
        errorMessage += `\n\nNetwork error detected.\n\nPlease check:\n1. Backend server is running on ${BASE_URL}\n2. If testing on physical device, use your computer's IP address instead\n3. Both devices are on the same network`;
      } else {
        errorMessage += error.message;
      }
      
      alert(errorMessage);
    }
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