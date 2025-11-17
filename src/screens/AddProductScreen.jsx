import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import HeaderBar from "../components/HeaderBar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  resetForm,
  fetchProducts,
} from "../Store/slices/productFormSlice";
import NewImagePicker from "../components/ImagePicker";
import { API_BASE_URL, IMGBB_API_KEY } from "../constants/apiConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import InputBlock from "../components/InputBlocks";

const BASE_URL = API_BASE_URL;

const AddProductScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.productForm);

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
      const uploaded = await uploadImageToImgBB(img);
      urls.push(uploaded);
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

  // Add product
  // const handleAdd = async () => {
  //   const error = validateForm();
  //   if (error) return Alert.alert("Error", error);

  //   try {
  //     const uploadedUrls = await uploadAllImages(formData.images);

  //     const productData = {
  //       ...formData,
  //       images: uploadedUrls,
  //       createdAt: new Date().toISOString(),
  //     };

  //     const res = await fetch(`${BASE_URL}/products`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(productData),
  //     });

  //     const json = await res.json();
  //     if (!res.ok) throw new Error(JSON.stringify(json));

  //     dispatch(fetchProducts());
  //     dispatch(resetForm());
  //     Alert.alert("Success", "Product added successfully!");
  //   } catch (err) {
  //     Alert.alert("Error", err.message);
  //   }
  // };

  const handleAdd = async () => {
    const error = validateForm();
    if (error) return Alert.alert("Error", error);
  
    try {
      console.log('📤 Starting product creation...');
      
      // Upload images first
      console.log('🖼️ Uploading images to ImgBB...');
      const uploadedUrls = await uploadAllImages(formData.images);
      console.log('✅ Images uploaded:', uploadedUrls);
  
      // Prepare product data
      const productData = {
        ...formData,
        images: uploadedUrls,
        createdAt: new Date().toISOString(),
      };
  
      console.log('📦 Sending to server:', productData);
  
      // Make the API request with better error handling
      const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(productData),
      });
  
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.log('❌ Server returned non-JSON response:', textResponse.substring(0, 200));
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
  
      // Parse JSON only if it's actually JSON
      const json = await response.json();
      
      if (!response.ok) {
        console.log('❌ Server error response:', json);
        throw new Error(json.message || `HTTP error! status: ${response.status}`);
      }
  
      console.log('✅ Product created successfully:', json);
  
      // Success
      dispatch(fetchProducts());
      dispatch(resetForm());
      Alert.alert("Success", "Product added successfully!");
      
    } catch (err) {
      console.log('❌ Error adding product:', err);
      Alert.alert(
        "Error", 
        err.message || "Failed to add product. Please check your connection and try again."
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <HeaderBar iconName="arrow-back" title="Add Product" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={{ paddingHorizontal: 16, paddingTop: 12 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Product Name */}
          <InputBlock
            label="Product Name"
            placeholder="e.g., Wireless Bluetooth Headphones"
            value={formData.productName}
            onChange={(v) =>
              dispatch(updateField({ field: "productName", value: v }))
            }
          />

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
                onChangeText={(v) =>
                  dispatch(updateField({ field: "price", value: v }))
                }
              />
            </View>
          </View>

          {/* Description */}
          <InputBlock
            label="Description"
            placeholder="Describe your product..."
            multiline
            height={120}
            value={formData.description}
            onChange={(v) =>
              dispatch(updateField({ field: "description", value: v }))
            }
          />

          {/* Images */}
          <View style={{ marginBottom: 24 }}>
            <Text className="text-lg font-semibold mb-2 text-gray-800">
              Product Images
            </Text>
            <NewImagePicker />
            {formData.images.length > 0 && (
              <Text className="text-green-600 text-sm mt-1">
                {formData.images.length} image(s) selected
              </Text>
            )}
          </View>

          {/* Brand */}
          <InputBlock
            label="Brand Name"
            placeholder="e.g., JBL, Samsung"
            value={formData.brandName}
            onChange={(v) =>
              dispatch(updateField({ field: "brandName", value: v }))
            }
          />

          {/* Stock */}
          <InputBlock
            label="Product Stock"
            placeholder="0"
            keyboardType="numeric"
            value={formData.stock}
            onChange={(v) =>
              dispatch(updateField({ field: "stock", value: v }))
            }
          />

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

          {/* BUTTON FIXED */}
          <TouchableOpacity className="bg-blue-500 py-4 rounded-lg mb-8" onPress={handleAdd}>
            <Text className="text-center text-white font-semibold text-lg">
              ADD PRODUCT
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddProductScreen;


