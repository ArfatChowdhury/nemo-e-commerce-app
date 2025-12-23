import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, Dimensions, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
    onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    // Animation values
    const logoScale = useRef(new Animated.Value(0.8)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const textTranslateY = useRef(new Animated.Value(20)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Sequence of animations
        Animated.sequence([
            // 1. Logo Animation (Scale up and Fade in)
            Animated.parallel([
                Animated.timing(logoScale, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]),

            // 2. Wait for 0.5 seconds
            Animated.delay(500),

            // 3. Text Animation (Slide up and Fade in)
            Animated.parallel([
                Animated.timing(textTranslateY, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),

            // 4. Hold for a moment before finishing
            Animated.delay(1500),
        ]).start(() => {
            // Animation finished
            onFinish();
        });
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Logo */}
            <Animated.View
                style={{
                    opacity: logoOpacity,
                    transform: [{ scale: logoScale }],
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={require('../../assets/splash-icon.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </Animated.View>

            {/* Company Name */}
            <Animated.View
                style={{
                    opacity: textOpacity,
                    transform: [{ translateY: textTranslateY }],
                    position: 'absolute',
                    bottom: height * 0.15, // Position from bottom
                }}
            >
                <Text style={styles.text}>NEMO MARKETPLACE</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d9488', // Teal background matching theme
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: width * 0.5,
        height: width * 0.5,
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
});

export default SplashScreen;
