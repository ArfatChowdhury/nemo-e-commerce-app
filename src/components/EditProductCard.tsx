import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, {  useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from '../constants/apiConfig'
import { useAppDispatch } from '../Store/hooks';
import { fetchProducts } from '../Store/slices/productFormSlice';


interface EditProductCardProps {
  item: any,
  onPress: (item: any) => void,
  onEdit: (item: any) => void,
  onDelete: (id: string) => void
}

interface Product {
  _id: string;
  productName: string;
  price: number | string;
  brandName: string;
  stock: number;
  images?: string[];
  colors?: Array<{
    name: string;
    value: string;
  }>;
}


const EditProductCard = ({ item, onPress, onEdit, onDelete }: EditProductCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch()
  const Base_URL = API_BASE_URL

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



  const handleEditPress = () => {
    if (onEdit) {
      onEdit(item);
    } else {

      navigation.navigate("EditForm", {
        productId: item._id
      });
    }
  };

  const handleDeletePress = (): void => {
    Alert.alert(
      "Delete Product",
      `Are you sure you want to delete "${item.productName}"?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              console.log('🗑️ Attempting to delete product:', item._id);
              console.log('🌐 URL:', `${Base_URL}/products/${item._id}`);

              const response = await fetch(`${Base_URL}/products/${item._id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              console.log('📡 Response status:', response.status);

              if (response.ok) {
                console.log('✅ Product deleted successfully');

                if (onDelete) {
                  onDelete(item._id);
                }


                Alert.alert('Success', 'Product deleted successfully');
                dispatch(fetchProducts())

              } else {

                const errorText = await response.text();
                console.error('❌ Failed to delete product:', response.status, errorText);

                let errorMessage = 'Failed to delete product';
                try {
                  const errorData = JSON.parse(errorText);
                  errorMessage = errorData.message || errorMessage;
                } catch (e) {
                  errorMessage = errorText || `Server error: ${response.status}`;
                }

                Alert.alert('Error', errorMessage);
              }
            } catch (error) {
              console.error('❌ Network error deleting product:', error);
              Alert.alert('Error', `Network error: ${(error as any).message}`);
            }
          }
        }
      ]
    );
  };

  return (
    <View className="bg-white rounded-xl m-2 shadow-sm shadow-black/20 elevation-3 w-48">
      {/* Action Buttons - Top Right */}
      <View className="absolute top-2 right-2 z-10 flex-row">
        {/* Edit Button */}
        <TouchableOpacity
          onPress={handleEditPress}
          className="bg-blue-500 w-8 h-8 rounded-full items-center justify-center mr-1 shadow-sm"
        >
          <Ionicons name="create-outline" size={16} color="white" />
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={handleDeletePress}
          className="bg-red-500 w-8 h-8 rounded-full items-center justify-center shadow-sm"
        >
          <Ionicons name="trash-outline" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Product Image Container */}
      <TouchableOpacity onPress={() => onPress(item)}>
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
      </TouchableOpacity>

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
      </View>
    </View>
  );
};

export default React.memo(EditProductCard);