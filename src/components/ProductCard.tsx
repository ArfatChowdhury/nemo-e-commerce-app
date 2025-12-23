import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { setWishlists, removeFromWishlist, addToCart, Product } from '../Store/slices/productFormSlice';
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

  const isInWishlist = wishlist.some((wishItem: any) => wishItem._id === item._id);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const formatPrice = (price: number | string) => {
    if (typeof price === 'number') {
      return `$${price.toFixed(2)}`;
    }
    return `$${price}`;
  };

  const handleProductPress = useCallback(() => {
    if (onPress) {
      onPress(item);
    }
    navigation.navigate("productDetails", {
      productId: item._id
    });
  }, [navigation, item, onPress]);

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(item._id));
    } else {
      dispatch(setWishlists(item));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      _id: item._id,
      productName: item.productName,
      price: item.price,
      images: item.images,
      description: item.description,
      brandName: item.brandName,
      stock: item.stock,
      category: item.category,
    }));
  };

  return (
    <View className="bg-white rounded-2xl shadow-sm shadow-black/10 elevation-2 overflow-hidden">
      {/* Image Container */}
      <TouchableOpacity onPress={handleProductPress} activeOpacity={0.9}>
        <View className="w-full h-32 bg-gray-100 relative">
          {imageError ? (
            <View className="w-full h-full bg-gray-200 justify-center items-center">
              <Ionicons name="image-outline" size={32} color="#9CA3AF" />
            </View>
          ) : (
            <>
              <Image
                source={{
                  uri: item.images?.[0] || 'https://placehold.co/600x400/0d9488/FFFFFF/png?text=Nemo'
                }}
                className="w-full h-full"
                resizeMode="cover"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
              {imageLoading && (
                <View className="absolute inset-0 bg-gray-200 justify-center items-center">
                  <ActivityIndicator size="small" color="#0d9488" />
                </View>
              )}
            </>
          )}

          {/* Wishlist Button */}
          <TouchableOpacity
            onPress={handleToggleWishlist}
            className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 shadow-sm"
          >
            <Ionicons
              name={isInWishlist ? "heart" : "heart-outline"}
              size={18}
              color={isInWishlist ? "#ef4444" : "#6B7280"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Product Info */}
      <View className="p-3">
        {/* Brand */}
        <Text className="text-xs text-gray-500 mb-0.5" numberOfLines={1}>
          {item.brandName}
        </Text>

        {/* Product Name */}
        <TouchableOpacity onPress={handleProductPress}>
          <Text className="text-sm font-semibold text-gray-800 mb-1" numberOfLines={2}>
            {item.productName}
          </Text>
        </TouchableOpacity>

        {/* Price */}
        <Text className="text-base font-bold text-teal-600 mb-2">
          {formatPrice(item.price)}
        </Text>

        {/* Stock Status */}
        <Text
          className={`text-xs font-medium mb-3 ${item.stock > 10 ? 'text-green-600' : 'text-red-500'
            }`}
        >
          {item.stock > 10 ? 'In Stock' : `Only ${item.stock} left`}
        </Text>

        {/* Add to Cart Button */}
        <TouchableOpacity
          onPress={handleAddToCart}
          className="bg-teal-600 py-2.5 rounded-xl flex-row items-center justify-center"
          activeOpacity={0.8}
        >
          <Ionicons name="cart-outline" size={16} color="white" />
          <Text className="text-white font-bold text-sm ml-1.5">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(ProductCard);