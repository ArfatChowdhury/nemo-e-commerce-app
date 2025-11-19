import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import HeaderBar from '../components/HeaderBar'
import EditProductCard from '../components/EditProductCard'
import { fetchProducts } from '../Store/slices/productFormSlice'

const EditProductScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const products = useSelector(state => state.productForm.products)
    const loading = useSelector(state => state.productForm.loading)
    const error = useSelector(state => state.productForm.error)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const handleProductPress = (product) => {
        navigation.navigate("productDetails", {
            productId: product._id 
        });
    }

    const handleEditProduct = (product) => {
       navigation.navigate('EditForm',{
        productId: product._id 
       })
       console.log('pressed');
       
    }

    const handleDeleteProduct = (productId) => {
        console.log('Delete product ID:', productId);
        // Add your delete API call here
        // dispatch(deleteProduct(productId));
        Alert.alert('Success', 'Product deleted successfully!');
    }

    // ... rest of your loading/error states

    return (
        <View className="flex-1 bg-gray-50">
            <HeaderBar iconName='arrow-back' title='Edit Product' />
            
            <FlatList
                data={products}
                keyExtractor={(item) => item._id || item.id}
                renderItem={({ item }) => (
                    <EditProductCard 
                        item={item}
                        onPress={handleProductPress}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                )}
                numColumns={2}
                contentContainerStyle={{
                    padding: 8,
                    paddingBottom: 20
                }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center mt-20">
                        <Text className="text-gray-500 text-lg">No products found</Text>
                        <Text className="text-gray-400 mt-2">Add some products to edit</Text>
                    </View>
                }
            />
        </View>
    )
}

export default EditProductScreen