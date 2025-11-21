import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import HeaderBar from "../components/HeaderBar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  resetForm,
  fetchProducts,
} from "../Store/slices/productFormSlice";
import NewImagePicker from "../components/ImagePicker";
import { API_BASE_URL, IMGBB_API_KEY } from "../constants/apiConfig";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE_URL = API_BASE_URL;

const EditFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.productForm);
  const products = useSelector(state => state.productForm.products)

  // Get the product data from navigation params
  const { productId } = route.params || {};

  const product = products.find(p => p._id === productId);


  useEffect(() => {
    if (product) {
      dispatch(updateField({ field: "productName", value: product.productName || "" }));
      dispatch(updateField({ field: "price", value: product.price?.toString() || "" }));
      dispatch(updateField({ field: "description", value: product.description || "" }));
      dispatch(updateField({ field: "brandName", value: product.brandName || "" }));
      dispatch(updateField({ field: "stock", value: product.stock?.toString() || "" }));
      dispatch(updateField({ field: "category", value: product.category || "" }));
      dispatch(updateField({ field: "colors", value: product.colors || [] }));
      dispatch(updateField({ field: "images", value: product.images || [] }));
    }
  }, [product, dispatch]);

  // ImgBB Upload
  const uploadImageToImgBB = async (uri) => {
    try {
      const data = new FormData();
      const fileName = uri.split("/").pop();
      const match = /\.(\w+)$/.exec(fileName);
      const type = match ? `image/${match[1]}` : "image";

      data.append("image", {
        uri,
        name: fileName,
        type,
      });

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: data,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const json = await res.json();
      if (json.success) return json.data.url;
      throw new Error(json.error?.message ?? "Upload failed");
    } catch (err) {
      console.log("ImgBB error:", err);
      throw err;
    }
  };

  const uploadAllImages = async (images) => {
    const urls = [];
    for (const img of images) {
      // Only upload new images (local URIs), keep existing URLs
      if (img.startsWith('file://') || img.startsWith('http://') || img.startsWith('https://')) {
        const uploaded = await uploadImageToImgBB(img);
        urls.push(uploaded);
      } else {
        // Keep existing image URLs
        urls.push(img);
      }
    }
    return urls;
  };

  // Validation
  const validateForm = () => {
    if (!formData.productName.trim()) return "Product name required";
    if (!formData.brandName.trim()) return "Brand name required";
    if (!formData.price || isNaN(formData.price)) return "Valid price required";
    if (!formData.stock || isNaN(formData.stock))
      return "Valid stock required";
    if (!formData.category.trim()) return "Category is required";
    if (!formData.images.length) return "At least one image required";
    return null;
  };

 
 
const handleUpdate = async () => {
  const error = validateForm();
  if (error) return Alert.alert("Error", error);

  try {
    console.log('📤 Starting product update...');

    // Upload new images first
    console.log('🖼️ Uploading new images to ImgBB...');
    const uploadedUrls = await uploadAllImages(formData.images);
    console.log('✅ Images processed:', uploadedUrls);

   
    const productData = {
      productName: formData.productName,
      price: parseFloat(formData.price), 
      description: formData.description,
      brandName: formData.brandName,
      stock: parseInt(formData.stock), 
      category: formData.category,
      colors: formData.colors,
      images: uploadedUrls,
      updatedAt: new Date().toISOString(),
    };

    console.log('📦 Sending update to server (clean data):', productData);

    // Make the API request to update product
    const response = await fetch(`${BASE_URL}/products/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(productData),
    });

   
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      console.log('❌ Server returned non-JSON response:', textResponse.substring(0, 200));
      throw new Error(`Server error: ${response.status} - ${response.statusText}`);
    }

    const json = await response.json();

    if (!response.ok) {
      console.log('❌ Server error response:', json);
      throw new Error(json.message || `HTTP error! status: ${response.status}`);
    }

    console.log('✅ Product updated successfully:', json);

  
    dispatch(fetchProducts());
    dispatch(resetForm())
    Alert.alert("Success", "Product updated successfully!");
    navigation.goBack();

  } catch (err) {
    console.log('❌ Error updating product:', err);
    Alert.alert(
      "Error",
      err.message || "Failed to update product. Please check your connection and try again."
    );
  }
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <HeaderBar iconName="arrow-back" title="Edit Product" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={{ paddingHorizontal: 16, paddingTop: 12 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Product Name */}
          <View style={{ marginBottom: 20 }}>
            <Text className="text-lg font-semibold mb-2 text-gray-800">Product Name</Text>
            <TextInput
              placeholder="e.g., Wireless Bluetooth Headphones"
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholderTextColor="#9CA3AF"
              value={formData.productName}
              onChangeText={(v) => dispatch(updateField({ field: "productName", value: v }))}
            />
          </View>

          {/* Price */}
          <View style={{ marginBottom: 20 }}>
            <Text className="text-lg font-semibold mb-2 text-gray-800">
              Price
            </Text>
            <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-3">
              <Text className="text-lg text-gray-600 mr-2">$</Text>
              <TextInput
                placeholder="0.00"
                keyboardType="decimal-pad"
                className="flex-1 text-base"
                value={formData.price}
                onChangeText={(v) => dispatch(updateField({ field: "price", value: v }))}
              />
            </View>
          </View>

          {/* Description */}
          <View style={{ marginBottom: 20 }}>
            <Text className="text-lg font-semibold mb-2 text-gray-800">Description</Text>
            <TextInput
              placeholder="Describe your product..."
              multiline
              numberOfLines={4}
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base h-32"
              placeholderTextColor="#9CA3AF"
              textAlignVertical="top"
              value={formData.description}
              onChangeText={(v) => dispatch(updateField({ field: "description", value: v }))}
            />
          </View>

          {/* Images */}
          <View style={{ marginBottom: 24 }}>
  <Text className="text-lg font-semibold mb-2 text-gray-800">
    Product Images
  </Text>
  <NewImagePicker />
  
  {/* Show selected images in small size */}
  {formData.images.length > 0 && (
    <View className="mt-3">
      <Text className="text-green-600 text-sm mb-2">
        {formData.images.length} image(s) selected
      </Text>
      
      {/* Small image previews */}
      <View className="flex-row flex-wrap">
        {formData.images.map((image, index) => (
          <View key={index} className="mr-3 mb-3 relative">
            <View className="w-20 h-20 rounded-lg border border-gray-200 overflow-hidden">
              <Image
                source={{ uri: image }}
                className="w-full h-full"
                resizeMode="cover"
                onError={() => console.log('Image failed to load:', image)}
              />
            </View>
            
            {/* Remove button */}
            <TouchableOpacity 
              onPress={() => {
                const updatedImages = formData.images.filter((_, i) => i !== index);
                dispatch(updateField({ field: "images", value: updatedImages }));
              }}
              className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 rounded-full items-center justify-center border-2 border-white shadow-sm"
            >
              <Ionicons name="close" size={12} color="white" />
            </TouchableOpacity>
            
            {/* Image number badge */}
            <View className="absolute top-1 left-1 bg-black/50 px-1 rounded">
              <Text className="text-white text-xs">{index + 1}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )}
</View>

          {/* Brand */}
          <View style={{ marginBottom: 20 }}>
            <Text className="text-lg font-semibold mb-2 text-gray-800">Brand Name</Text>
            <TextInput
              placeholder="e.g., JBL, Samsung"
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholderTextColor="#9CA3AF"
              value={formData.brandName}
              onChangeText={(v) => dispatch(updateField({ field: "brandName", value: v }))}
            />
          </View>

          {/* Stock */}
          <View style={{ marginBottom: 20 }}>
            <Text className="text-lg font-semibold mb-2 text-gray-800">Product Stock</Text>
            <TextInput
              placeholder="0"
              keyboardType="numeric"
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholderTextColor="#9CA3AF"
              value={formData.stock}
              onChangeText={(v) => dispatch(updateField({ field: "stock", value: v }))}
            />
          </View>

          {/* Colors */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2 text-gray-800">
              Colors
            </Text>

            {formData.colors.length > 0 && (
              <View className="flex-row flex-wrap mb-2">
                {formData.colors.map((c, i) => (
                  <View
                    key={i}
                    className="flex-row items-center bg-blue-100 rounded-full px-3 py-2 mr-2 mb-2"
                  >
                    <View
                      style={{ backgroundColor: c.value }}
                      className="w-4 h-4 rounded-full mr-2 border"
                    />
                    <Text className="text-blue-800">{c.name}</Text>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate("colorSelection")}
              className="border border-gray-400 p-4 rounded-xl flex-row justify-between bg-white"
            >
              <Text className="text-gray-700">
                {formData.colors.length > 0
                  ? `${formData.colors.length} selected`
                  : "Select colors"}
              </Text>
              <Ionicons name="chevron-forward-outline" size={22} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Category */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2 text-gray-800">
              Select Category
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("category")}
              className="border border-gray-400 p-4 rounded-xl flex-row justify-between bg-white"
            >
              <Text className="text-gray-700">
                {formData.category || "Select product category"}
              </Text>
              <Ionicons name="chevron-forward-outline" size={22} color="gray" />
            </TouchableOpacity>
          </View>

          {/* UPDATE BUTTON */}
          <TouchableOpacity className="bg-green-500 py-4 rounded-lg mb-8" onPress={handleUpdate}>
            <Text className="text-center text-white font-semibold text-lg">
              UPDATE PRODUCT
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditFormScreen;