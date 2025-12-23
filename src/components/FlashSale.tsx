import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from './ProductCard';
import { Product } from '../Store/slices/productFormSlice';

interface FlashSaleProps {
    products: Product[];
    onSeeAll?: () => void;
}

const FlashSale: React.FC<FlashSaleProps> = ({ products, onSeeAll }) => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 5,
        minutes: 23,
        seconds: 45,
    });

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    // Reset timer when it reaches 0
                    hours = 5;
                    minutes = 23;
                    seconds = 45;
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (num: number) => num.toString().padStart(2, '0');

    // Get first 6 products for flash sale (or apply discount logic)
    const flashSaleProducts = products.slice(0, 6);

    const renderProductItem = useCallback(
        ({ item }: { item: Product }) => (
            <View className="mr-3" style={{ width: 160 }}>
                <ProductCard item={item} onPress={() => { }} />
            </View>
        ),
        []
    );

    if (flashSaleProducts.length === 0) return null;

    return (
        <View className="mb-6">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 mb-3">
                <View className="flex-row items-center">
                    <View className="bg-teal-600 p-2 rounded-lg mr-3">
                        <Ionicons name="flash" size={20} color="white" />
                    </View>
                    <View>
                        <Text className="text-lg font-bold text-gray-900">Flash Sale</Text>
                        <Text className="text-xs text-gray-500">Limited time offer!</Text>
                    </View>
                </View>

                {/* Countdown Timer */}
                <View className="flex-row items-center">
                    <View className="bg-teal-600 px-2 py-1 rounded-md">
                        <Text className="text-white font-bold text-sm">
                            {formatTime(timeLeft.hours)}
                        </Text>
                    </View>
                    <Text className="text-teal-600 font-bold mx-1">:</Text>
                    <View className="bg-teal-600 px-2 py-1 rounded-md">
                        <Text className="text-white font-bold text-sm">
                            {formatTime(timeLeft.minutes)}
                        </Text>
                    </View>
                    <Text className="text-teal-600 font-bold mx-1">:</Text>
                    <View className="bg-teal-600 px-2 py-1 rounded-md">
                        <Text className="text-white font-bold text-sm">
                            {formatTime(timeLeft.seconds)}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Products Horizontal Scroll */}
            <FlatList
                data={flashSaleProducts}
                renderItem={renderProductItem}
                keyExtractor={(item) => `flash-${item._id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />

            {/* See All Button */}
            {onSeeAll && (
                <TouchableOpacity
                    onPress={onSeeAll}
                    className="mx-4 mt-3 py-2 border border-teal-600 rounded-xl"
                >
                    <Text className="text-teal-600 text-center font-bold">See All Deals</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default FlashSale;
