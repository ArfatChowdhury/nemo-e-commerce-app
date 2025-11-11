import { View, Text, FlatList } from 'react-native'
import React from 'react'
import HeaderBar from '../components/HeaderBar'
import { categories } from '../constants/categories'
import CategoryCard from '../components/CategoryCard'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useDispatch } from 'react-redux'
import { setCategory } from '../Store/slices/productFormSlice';

type RootStackParamList = {
    addProduct: { selectedCategory: string } | undefined;
    category: undefined;
}

type CategoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'category'>;

const Category = () => {
    const navigation = useNavigation<CategoryScreenNavigationProp>()
    const dispatch = useDispatch()
    const handleCategory = (item: string) => {
        console.log('Selected category:', item);
        dispatch(setCategory(item));
        navigation.goBack();
    }
    return (

        <View className='px-4'>
            <HeaderBar iconName='close' title='Category' size={35} />
            <Text className='text-3xl font-bold mt-4'>Select category</Text>
            <Text className='text-base mt-2 text-gray-500 '>Select a category that describes your product </Text>
            <FlatList
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <CategoryCard item={item} handleCategory={handleCategory} />
                )}
                numColumns={2}
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Category