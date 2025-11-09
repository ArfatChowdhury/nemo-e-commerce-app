import { View, Text, FlatList } from 'react-native'
import React from 'react'
import HeaderBar from '../components/HeaderBar'
import { categories } from '../constants/categories'
import CategoryCard from '../components/CategoryCard'
import { useNavigation } from '@react-navigation/native'
const Category = () => {

    const navigation = useNavigation()

    const handleCategory = (item) => {
        console.log('Selected category:', item);
        
        // ✅ Correct navigation - pass as params
        navigation.navigate('addProduct', { 
            selectedCategory: item 
        });
        
        // OR if you want to go back to previous screen with data:
        // navigation.goBack();
        // Then in AddProductScreen, get the category from route.params
    }


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