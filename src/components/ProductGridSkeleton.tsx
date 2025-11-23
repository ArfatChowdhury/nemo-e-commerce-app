import React from 'react';
import { View } from 'react-native';


interface ProductGridSkeletonProps {
  itemsCount?: number;
  columns?: number;
  showSearchAndCategories?: boolean;
}

const ProductGridSkeleton = ({ itemsCount = 6, columns = 2, showSearchAndCategories = true }: ProductGridSkeletonProps) => {
  const rows = Math.ceil(itemsCount / columns);

  const SkeletonItem = () => (
    <View className="w-[48%] mb-4">
      {/* Image Skeleton */}
      <View className="w-full h-32 bg-gray-300 rounded-xl mb-3 animate-pulse" />

      {/* Content Skeleton */}
      <View className="space-y-2">
        {/* Brand Name */}
        <View className="w-3/5 h-3 bg-gray-300 rounded-full animate-pulse" />

        {/* Product Name */}
        <View className="w-4/5 h-4 bg-gray-300 rounded-full animate-pulse" />

        {/* Price */}
        <View className="w-2/5 h-4 bg-gray-300 rounded-full animate-pulse" />

        {/* Stock */}
        <View className="w-3/5 h-3 bg-gray-300 rounded-full animate-pulse" />

        {/* Colors */}
        <View className="flex-row space-x-2 mt-2">
          <View className="w-4 h-4 bg-gray-300 rounded-full animate-pulse" />
          <View className="w-4 h-4 bg-gray-300 rounded-full animate-pulse" />
          <View className="w-4 h-4 bg-gray-300 rounded-full animate-pulse" />
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Search Bar Skeleton */}
      {showSearchAndCategories && (
        <>
          <View className='flex flex-row items-center bg-gray-200 rounded-full px-4 py-3 mx-4 my-4 animate-pulse'>
            <View className="w-6 h-6 bg-gray-300 rounded-full mr-2" />
            <View className="flex-1 h-6 bg-gray-300 rounded-full" />
          </View>

          {/* Categories Skeleton */}
          <View className="h-20 px-4 mb-4">
            <View className="flex-row space-x-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <View
                  key={index}
                  className="w-20 h-10 bg-gray-300 rounded-lg animate-pulse"
                />
              ))}
            </View>
          </View>

          {/* Section Title Skeleton */}
          <View className="px-4 mb-3">
            <View className="w-40 h-6 bg-gray-300 rounded-full animate-pulse" />
          </View>
        </>
      )}

      {/* Products Grid Skeleton */}
      <View className="px-2">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <View key={rowIndex} className="flex-row justify-between mb-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <SkeletonItem key={`${rowIndex}-${colIndex}`} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProductGridSkeleton;