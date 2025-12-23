import React, { useRef, useState, useEffect } from 'react';
import { View, Image, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = 180;

// Banner images - using local assets
const bannerImages = [
    require('../../assets/banner/banner-nemo-without-text.png'),
    require('../../assets/banner/banner-nemo-without-text-1.png'),
    require('../../assets/banner/banner-nemo-without-text-2.png'),
];

interface BannerCarouselProps {
    autoPlayInterval?: number;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ autoPlayInterval = 4000 }) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll effect
    useEffect(() => {
        const timer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % bannerImages.length;
            scrollViewRef.current?.scrollTo({
                x: nextIndex * SCREEN_WIDTH,
                animated: true,
            });
            setCurrentIndex(nextIndex);
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [currentIndex, autoPlayInterval]);

    const handleScroll = (event: any) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffset / SCREEN_WIDTH);
        setCurrentIndex(index);
    };

    return (
        <View className="mb-4">
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
                decelerationRate="fast"
            >
                {bannerImages.map((image, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.9}
                        className="overflow-hidden"
                        style={{ width: SCREEN_WIDTH }}
                    >
                        <Image
                            source={image}
                            className="rounded-2xl mx-4"
                            style={{
                                width: SCREEN_WIDTH - 32,
                                height: BANNER_HEIGHT,
                            }}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Dot Indicators */}
            <View className="flex-row justify-center items-center mt-3">
                {bannerImages.map((_, index) => (
                    <View
                        key={index}
                        className={`mx-1 rounded-full ${index === currentIndex
                                ? 'bg-teal-600 w-6 h-2'
                                : 'bg-gray-300 w-2 h-2'
                            }`}
                    />
                ))}
            </View>
        </View>
    );
};

export default BannerCarousel;
