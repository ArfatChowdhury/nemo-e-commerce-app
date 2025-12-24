import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Category data with icons
const categories = [
    { name: 'Trending', icon: 'flame-outline', color: '#0d9488' },
    { name: 'Electronics', icon: 'laptop-outline', color: '#0d9488' },
    { name: 'Fashion', icon: 'shirt-outline', color: '#0d9488' },
    { name: 'Home & Kitchen', icon: 'home-outline', color: '#0d9488' },
    { name: 'Beauty & Personal Care', icon: 'sparkles-outline', color: '#0d9488' },
    { name: 'Sports & Outdoors', icon: 'football-outline', color: '#0d9488' },
    { name: 'Toys & Games', icon: 'game-controller-outline', color: '#0d9488' },
    { name: 'Health & Wellness', icon: 'heart-outline', color: '#0d9488' },
    { name: 'Automotive', icon: 'car-outline', color: '#0d9488' },
];

interface CategoryGridProps {
    onCategoryPress?: (category: string) => void;
    selectedCategory?: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryPress, selectedCategory }) => {
    const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => {
        const isSelected = selectedCategory === item.name;

        return (
            <TouchableOpacity
                onPress={() => onCategoryPress?.(item.name)}
                className={`items-center mr-4 ${isSelected ? 'opacity-100' : 'opacity-90'}`}
                style={{ width: 70 }}
            >
                <View
                    className={`w-14 h-14 rounded-2xl items-center justify-center mb-2 ${isSelected ? 'bg-teal-600' : 'bg-teal-50'
                        }`}
                >
                    <Ionicons
                        name={item.icon as any}
                        size={24}
                        color={isSelected ? 'white' : item.color}
                    />
                </View>
                <Text
                    className={`text-xs text-center font-medium ${isSelected ? 'text-teal-600' : 'text-gray-700'
                        }`}
                    numberOfLines={2}
                >
                    {item.name.split(' ')[0]}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View className="mb-4">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 mb-3">
                <Text className="text-lg font-bold text-gray-900">Categories</Text>
                <TouchableOpacity>
                    <Text className="text-teal-600 font-medium text-sm">See All</Text>
                </TouchableOpacity>
            </View>

            {/* Categories Horizontal Scroll */}
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
        </View>
    );
};

export default CategoryGrid;
