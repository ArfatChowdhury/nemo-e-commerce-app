import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
// import PropTypes from 'prop-types';

const ProductCard = ({ item, onPress }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  console.log('🖼️ Product Image URL:',item.images?.[0]);

  const handleImageError = (e) => {
    console.log('❌ Image failed to load:', e.nativeEvent.error);
    console.log('🖼️ Failed URL:', item.images?.[0]);
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully');
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageLoadStart = () => {
    setImageLoading(true);
    setImageError(false);
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `$${price.toFixed(2)}`;
    }
    return `$${price}`;
  };

  const getAccessibilityLabel = () => {
    return `Product: ${item.productName}, Price: ${formatPrice(item.price)}, Brand: ${item.brandName}, ${item.stock > 10 ? 'In Stock' : `Only ${item.stock} left`}`;
  };

  return (
    <TouchableOpacity 
      className="bg-white rounded-xl m-2 shadow-sm shadow-black/20 elevation-3 w-48"
      onPress={() => onPress(item)}
      accessible={true}
      accessibilityLabel={getAccessibilityLabel()}
      accessibilityRole="button"
      accessibilityHint="Double tap to view product details"
    >
      {/* Product Image Container */}
      <View className="w-full h-32 rounded-t-xl bg-gray-100 justify-center items-center overflow-hidden">
        {imageError ? (
          <View className="w-full h-32 rounded-t-xl bg-red-200 justify-center items-center">
            <Text className="text-gray-500 text-xs text-center px-2">
              Image not available
            </Text>
          </View>
        ) : (
          <View className="relative w-full h-full">
            <Image 
              source={{ 
                uri: item.images?.[0] || 'https://placehold.co/600x400/000000/FFFFFF/png' 
              }} 
              className="w-full h-full rounded-t-xl"
              resizeMode="cover"
              onError={handleImageError}
              onLoad={handleImageLoad}
              onLoadStart={handleImageLoadStart}
            />
            {imageLoading && (
              <View className="absolute inset-0 bg-gray-200 justify-center items-center">
                <ActivityIndicator size="small" color="#3B82F6" />
              </View>
            )}
          </View>
        )}
      </View>

      {/* Product Details */}
      <View className="p-3">
        {/* Brand Name */}
        <Text 
          className="text-xs text-gray-600 mb-1"
          accessibilityRole="text"
          accessibilityLabel={`Brand: ${item.brandName}`}
        >
          {item.brandName}
        </Text>

        {/* Product Name */}
        <Text 
          className="text-sm font-bold mb-1.5 text-gray-800" 
          numberOfLines={2}
          accessibilityRole="text"
        >
          {item.productName}
        </Text>

        {/* Price */}
        <Text 
          className="text-base font-bold text-blue-500 mb-2"
          accessibilityRole="text"
          accessibilityLabel={`Price: ${formatPrice(item.price)}`}
        >
          {formatPrice(item.price)}
        </Text>
        
        {/* Stock Status */}
        <View className="mb-2">
          <Text 
            className={`
              text-xs font-medium
              ${item.stock > 10 ? 'text-green-500' : 'text-red-500'}
            `}
            accessibilityRole="text"
            accessibilityLabel={item.stock > 10 ? 'In Stock' : `Only ${item.stock} items left`}
          >
            {item.stock > 10 ? 'In Stock' : `Only ${item.stock} left`}
          </Text>
        </View>
        
        {/* Color Options */}
        {item.colors && item.colors.length > 0 && (
          <View 
            className="flex-row items-center"
            accessibilityRole="text"
            accessibilityLabel={`Available in ${item.colors.length} colors`}
          >
            {item.colors.slice(0, 3).map((color, index) => (
              <View 
                key={`${color.value}-${index}`}
                className="w-3 h-3 rounded-full mr-1 border border-gray-200"
                style={{ backgroundColor: color.value }}
                accessibilityRole="image"
                accessibilityLabel={`Color option ${index + 1}`}
              />
            ))}
            {item.colors.length > 3 && (
              <Text 
                className="text-xs text-gray-600 ml-1"
                accessibilityRole="text"
              >
                +{item.colors.length - 3}
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Prop Types validation
// ProductCard.propTypes = {
//   item: PropTypes.shape({
//     images: PropTypes.arrayOf(PropTypes.string),
//     brandName: PropTypes.string,
//     productName: PropTypes.string.isRequired,
//     price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     stock: PropTypes.number,
//     colors: PropTypes.arrayOf(PropTypes.shape({
//       value: PropTypes.string
//     }))
//   }).isRequired,
//   onPress: PropTypes.func.isRequired
// };

// // Default props
// ProductCard.defaultProps = {
//   item: {
//     images: [],
//     brandName: '',
//     productName: '',
//     price: 0,
//     stock: 0,
//     colors: []
//   },
//   onPress: () => {}
// };

export default React.memo(ProductCard);