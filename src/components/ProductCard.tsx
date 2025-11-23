import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { setWishlists, Product } from '../Store/slices/productFormSlice';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { RootStackParamList } from '../navigation/types';

type ProductCardNavigationProp = StackNavigationProp<RootStackParamList>;

interface ProductCardProps {
  item: Product;
  onPress?: (product: Product) => void;
}

const ProductCard = ({ item, onPress }: ProductCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const navigation = useNavigation<ProductCardNavigationProp>();
  const wishlist = useAppSelector((state) => state.productForm.wishlists);

  const dispatch = useAppDispatch();


  const handleImageError = (e: any) => {


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

  const formatPrice = (price: number | string) => {
    if (typeof price === 'number') {
      return `$${price.toFixed(2)}`;
    }
    return `$${price}`;
  };

  const getAccessibilityLabel = () => {
    return `Product: ${item.productName}, Price: ${formatPrice(item.price)}, Brand: ${item.brandName}, ${item.stock > 10 ? 'In Stock' : `Only ${item.stock} left`}`;
  };

  const handleProductPress = useCallback(() => {
    if (onPress) {
      onPress(item);
    }
    navigation.navigate("productDetails", {
      productId: item._id
    });
  }, [navigation, item, onPress]);

  const handleAddToWishlist = (item: any) => {
    console.log('Added to wishlist:', item);
    dispatch(setWishlists(item));
  };

  const checkItemExistsInWishlist = (productId: string) => {
    return wishlist.find((item: any) => item._id === productId);
  };


  return (
    <TouchableOpacity
      className="bg-white rounded-xl m-2 shadow-sm shadow-black/20 elevation-3 w-48"
      onPress={handleProductPress}
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
                <ActivityIndicator size="small" color="#f97316" />
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
          className="text-base font-bold text-orange-500 mb-2"
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
            {item.colors.slice(0, 3).map((color: any, index: number) => (
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
        <TouchableOpacity
          onPress={() => handleAddToWishlist(item)}
          className="absolute top-2 right-2"
          accessibilityRole="button"
          accessibilityLabel="Add to wishlist"
        >
          <Ionicons name={checkItemExistsInWishlist(item._id) ? "heart" : "heart-outline"} size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ProductCard);