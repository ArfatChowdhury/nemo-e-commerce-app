import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../context/AuthContext'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/types'

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>()
    const { signIn } = useAuth()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            Alert.alert('Error', 'Please fill in all fields')
            return
        }

        setLoading(true)
        try {
            await signIn(formData.email, formData.password)

            // Navigate to home on successful login
            navigation.reset({
                index: 0,
                routes: [{ name: 'bottomTabs' }],
            })
        } catch (err: any) {
            let errorMessage = 'Something went wrong'
            if (err.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email'
            } else if (err.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password'
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address'
            } else if (err.code === 'auth/too-many-requests') {
                errorMessage = 'Too many attempts. Please try again later'
            }
            Alert.alert('Login Failed', errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 px-6 justify-center">
                    {/* Logo/Title */}
                    <View className="items-center mb-8">
                        <View className="w-20 h-20 bg-orange-500 rounded-full items-center justify-center mb-4">
                            <Ionicons name="cart" size={40} color="white" />
                        </View>
                        <Text className="text-3xl font-bold text-gray-900">Welcome Back</Text>
                        <Text className="text-gray-500 mt-2">Login to your account</Text>
                    </View>

                    {/* Email Input */}
                    <View className="mb-4">
                        <Text className="text-gray-700 mb-2 ml-1">Email</Text>
                        <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3">
                            <Ionicons name="mail-outline" size={20} color="#6B7280" />
                            <TextInput
                                placeholder="Enter your email"
                                className="flex-1 ml-3 text-base"
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Password Input */}
                    <View className="mb-6">
                        <Text className="text-gray-700 mb-2 ml-1">Password</Text>
                        <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3">
                            <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                            <TextInput
                                placeholder="Enter your password"
                                className="flex-1 ml-3 text-base"
                                value={formData.password}
                                onChangeText={(text) => setFormData({ ...formData, password: text })}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        disabled={loading}
                        className={`bg-orange-500 py-4 rounded-xl shadow-lg shadow-orange-500/30 ${loading ? 'opacity-50' : ''}`}
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            {loading ? 'Logging in...' : 'Login'}
                        </Text>
                    </TouchableOpacity>

                    {/* Signup Link */}
                    <View className="flex-row justify-center mt-6">
                        <Text className="text-gray-600">Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text className="text-orange-500 font-bold">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen
