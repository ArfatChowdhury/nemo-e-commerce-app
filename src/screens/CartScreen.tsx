import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../constants/apiConfig'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'

const CartScreen = () => {

  const products = useSelector(state => state.productForm.products)

  // console.log(products, 'in cart');

  const category = products.map(cat => cat.category)

  const uniqueCategories =  [...new Set(category)]

  const [selectedCategory, setSelectedCategory] = useState('All')

  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(()=>{
    if(selectedCategory === 'All'){
      setFilteredProducts(products)
    }else{
      const filtered = products.filter(product => product.category === selectedCategory)
      setFilteredProducts(filtered)
    }
  },[selectedCategory, products])



  return (
    <View></View>
//     <View>
//      <View>
//      <FlatList
//        data={['All', ...uniqueCategories]}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View className='mr-3 p-4 bg-white rounded-lg shadow-sm'>
//             <TouchableOpacity onPress={()=> setSelectedCategory(item)}>
//             <Text className='text-lg font-medium'>{item}</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         horizontal={true}
//         showsHorizontalScrollIndicator={true}
//         contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
//       />
//      </View>

// {/* display filtered  */}
//       <View>
//         <Text>Products in {selectedCategory}</Text>


//         <FlatList
//           data={filteredProducts}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <ProductCard  item={item}/>
//           )}
//         />
//       </View>

     
//     </View>
  )
}

export default CartScreen

