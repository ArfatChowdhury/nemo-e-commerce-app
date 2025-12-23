import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../context/AuthContext'
import { updateProfile, updateEmail } from 'firebase/auth'
import HeaderBar from '../components/HeaderBar'

const EditProfileScreen = () => {
    const navigation = useNavigation()
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        phone: '',
        address: ''
    })

    useEffect(() => {
        if (user) {
            setFormData({
                displayName: user.displayName || '',
                email: user.email || '',
                phone: '', // Placeholder as we don't have this in auth
                address: '' // Placeholder
            })
        }
    }, [user])

    const handleUpdateProfile = async () => {
        if (!user) return

        if (!formData.displayName.trim()) {
            Alert.alert('Error', 'Name cannot be empty')
            return
        }

        setLoading(true)
        try {
            // Update Display Name
            if (formData.displayName !== user.displayName) {
                await updateProfile(user, {
                    displayName: formData.displayName
                })
            }

            // Note: Email update requires re-authentication usually, so skipping for simplicity unless requested
            // If we had a backend, we would save phone and address there.

            Alert.alert('Success', 'Profile updated successfully', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ])
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to update profile')
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <HeaderBar title="Edit Profile" iconName="arrow-back" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>

                    {/* Avatar Section */}
                    <View className="items-center mb-8">
                        <View className="w-24 h-24 bg-teal-600 rounded-full items-center justify-center mb-3 shadow-sm">
                            <Text className="text-white text-3xl font-bold">
                                {formData.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                            </Text>
                            <View className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-sm border border-gray-100">
                                <Ionicons name="camera" size={16} color="#0d9488" />
                            </View>
                        </View>
                        <Text className="text-gray-500 text-sm">Tap to change photo</Text>
                    </View>

                    {/* Form Fields */}
                    <View className="space-y-4">
                        {/* Name */}
                        <View>
                            <Text className="text-gray-700 mb-2 ml-1 font-medium">Full Name</Text>
                            <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3">
                                <Ionicons name="person-outline" size={20} color="#6B7280" />
                                <TextInput
                                    placeholder="Enter your name"
                                    className="flex-1 ml-3 text-base text-gray-900"
                                    value={formData.displayName}
                                    onChangeText={(text) => setFormData({ ...formData, displayName: text })}
                                />
                            </View>
                        </View>

                        {/* Email */}
                        <View>
                            <Text className="text-gray-700 mb-2 ml-1 font-medium">Email</Text>
                            <View className="flex-row items-center bg-gray-100 border border-gray-200 rounded-xl px-4 py-3">
                                <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                                <TextInput
                                    placeholder="Enter your email"
                                    className="flex-1 ml-3 text-base text-gray-500"
                                    value={formData.email}
                                    editable={false} // Email update is complex, keeping read-only
                                />
                                <Ionicons name="lock-closed" size={16} color="#9CA3AF" />
                            </View>
                            <Text className="text-xs text-gray-400 ml-1 mt-1">Email cannot be changed</Text>
                        </View>

                        {/* Phone (Placeholder) */}
                        <View>
                            <Text className="text-gray-700 mb-2 ml-1 font-medium">Phone Number</Text>
                            <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3">
                                <Ionicons name="call-outline" size={20} color="#6B7280" />
                                <TextInput
                                    placeholder="+1 234 567 8900"
                                    className="flex-1 ml-3 text-base text-gray-900"
                                    value={formData.phone}
                                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>

                        {/* Address (Placeholder) */}
                        <View>
                            <Text className="text-gray-700 mb-2 ml-1 font-medium">Address</Text>
                            <View className="flex-row items-start bg-white border border-gray-200 rounded-xl px-4 py-3">
                                <Ionicons name="location-outline" size={20} color="#6B7280" style={{ marginTop: 2 }} />
                                <TextInput
                                    placeholder="Enter your address"
                                    className="flex-1 ml-3 text-base text-gray-900"
                                    value={formData.address}
                                    onChangeText={(text) => setFormData({ ...formData, address: text })}
                                    multiline
                                    numberOfLines={3}
                                    style={{ textAlignVertical: 'top' }}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                        onPress={handleUpdateProfile}
                        disabled={loading}
                        className={`bg-teal-600 py-4 rounded-xl shadow-lg shadow-teal-600/30 mt-8 mb-8 flex-row justify-center items-center ${loading ? 'opacity-70' : ''}`}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="white" className="mr-2" />
                        ) : (
                            <Ionicons name="save-outline" size={20} color="white" className="mr-2" />
                        )}
                        <Text className="text-white text-center font-bold text-lg">
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default EditProfileScreen
