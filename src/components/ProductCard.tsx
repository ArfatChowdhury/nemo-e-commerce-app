import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ProductCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity 
      className="bg-white rounded-xl m-2 shadow-sm shadow-black/20 elevation-3 w-40"
      onPress={() => onPress(item)}
    >
      {/* Product Image */}
      <Image 
        source={{ uri: item.images?.[0] || 'https://via.placeholder.com/150' }} 
        className="w-full h-30 rounded-t-xl"
        resizeMode="cover"
      />
      
      {/* Product Details */}
      <View className="p-3">
        <Text className="text-xs text-gray-600 mb-1">{item.brandName}</Text>
        <Text className="text-sm font-bold mb-1.5 text-gray-800" numberOfLines={2}>
          {item.productName}
        </Text>
        <Text className="text-base font-bold text-blue-500 mb-2">${item.price}</Text>
        
        {/* Stock Status */}
        <View className="mb-2">
          <Text className={`
            text-xs font-medium
            ${item.stock > 10 ? 'text-green-500' : 'text-red-500'}
          `}>
            {item.stock > 10 ? 'In Stock' : `Only ${item.stock} left`}
          </Text>
        </View>
        
        {/* Color Options */}
        {item.colors && item.colors.length > 0 && (
          <View className="flex-row items-center">
            {item.colors.slice(0, 3).map((color, index) => (
              <View 
                key={index}
                className="w-3 h-3 rounded-full mr-1 border border-gray-200"
                style={{ backgroundColor: color.value }}
              />
            ))}
            {item.colors.length > 3 && (
              <Text className="text-xs text-gray-600 ml-1">
                +{item.colors.length - 3}
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard