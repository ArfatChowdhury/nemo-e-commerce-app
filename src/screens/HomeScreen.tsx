import { View, Text, TextInput, ScrollView, RefreshControl, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchProducts, Product } from '../Store/slices/productFormSlice';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { Ionicons } from '@expo/vector-icons';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import BannerCarousel from '../components/BannerCarousel';
import FlashSale from '../components/FlashSale';
import CategoryGrid from '../components/CategoryGrid';
import ProductCard from '../components/ProductCard';

const HomeScreen = React.memo(() => {
  const loading = useAppSelector((state) => state.productForm.loading);
  const products = useAppSelector((state) => state.productForm.products);
  const error = useAppSelector((state) => state.productForm.error);
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchProducts());
    setTimeout(() => setRefreshing(false), 1000);
  }, [dispatch]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = products;

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.productName?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.brandName?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [products, searchQuery, selectedCategory]);

  const handleCategoryPress = useCallback((category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  }, []);

  const renderProductItem = useCallback(
    ({ item, index }: { item: Product; index: number }) => (
      <View
        style={{ width: '48%' }}
        className={index % 2 === 0 ? 'mr-2' : 'ml-2'}
      >
        <ProductCard item={item} />
      </View>
    ),
    []
  );

  if (loading && products.length === 0) {
    return <ProductGridSkeleton itemsCount={6} />;
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-4 bg-gray-50">
        <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
        <Text className="text-red-500 text-lg font-semibold mt-4 text-center">
          Error loading products
        </Text>
        <Text className="text-gray-600 mt-2 text-center">{error}</Text>
        <TouchableOpacity
          onPress={onRefresh}
          className="mt-4 bg-teal-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0d9488']}
            tintColor="#0d9488"
          />
        }
      >
        {/* Header */}
        <View className="px-4 py-3 flex-row items-center justify-between">
          <Image
            source={require('../../assets/nemo-green.png')}
            style={{ width: 100, height: 40 }}
            resizeMode="contain"
          />
          <TouchableOpacity className="bg-teal-50 p-3 rounded-full">
            <Ionicons name="notifications-outline" size={24} color="#0d9488" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="mx-4 mb-4">
          <View className="flex-row items-center bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
            <Ionicons name="search" size={22} color="#6B7280" />
            <TextInput
              placeholder="Search products..."
              className="flex-1 text-base ml-3"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Banner Carousel */}
        <BannerCarousel />

        {/* Flash Sale */}
        <FlashSale products={products} />

        {/* Category Grid */}
        <CategoryGrid
          onCategoryPress={handleCategoryPress}
          selectedCategory={selectedCategory || undefined}
        />

        {/* Products Section */}
        <View className="px-4 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-gray-900">
              {selectedCategory || 'All Products'}
            </Text>
            <TouchableOpacity>
              <Text className="text-teal-600 font-medium text-sm">See All</Text>
            </TouchableOpacity>
          </View>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <View className="py-10 items-center">
              <Ionicons name="search-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 mt-3 text-center">
                No products found
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredProducts}
              renderItem={renderProductItem}
              keyExtractor={(item) => item._id}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={{ gap: 16 }}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

export default HomeScreen;
