// import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
// import React, { useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { useNavigation } from '@react-navigation/native'
// import { useDispatch, useSelector } from 'react-redux'
// import { signupUser } from '../Store/slices/authSlice'
// import { Ionicons } from '@expo/vector-icons'

// const SignupScreen = () => {
//     const navigation = useNavigation()
//     const dispatch = useDispatch()
//     const { loading } = useSelector((state: any) => state.auth)

//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     })

//     const handleSignup = async () => {
//         if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
//             Alert.alert('Error', 'Please fill in all fields')
//             return
//         }

//         if (formData.password !== formData.confirmPassword) {
//             Alert.alert('Error', 'Passwords do not match')
//             return
//         }

//         if (formData.password.length < 6) {
//             Alert.alert('Error', 'Password must be at least 6 characters')
//             return
//         }

//         try {
//             await dispatch(signupUser({
//                 name: formData.name,
//                 email: formData.email,
//                 password: formData.password
//             })).unwrap()

//             Alert.alert('Success', 'Account created successfully!', [
//                 {
//                     text: 'OK',
//                     onPress: () => navigation.reset({
//                         index: 0,
//                         routes: [{ name: 'bottomTabs' }],
//                     })
//                 }
//             ])
//         } catch (err) {
//             Alert.alert('Signup Failed', err)
//         }
//     }

//     return (
//         <SafeAreaView className="flex-1 bg-gray-50">
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                 className="flex-1"
//             >
//                 <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
//                     {/* Logo/Title */}
//                     <View className="items-center mt-8 mb-8">
//                         <View className="w-20 h-20 bg-orange-500 rounded-full items-center justify-center mb-4">
//                             <Ionicons name="person-add" size={40} color="white" />
//                         </View>
//                         <Text className="text-3xl font-bold text-gray-900">Create Account</Text>
//                         <Text className="text-gray-500 mt-2">Sign up to get started</Text>
//                     </View>

//                     {/* Name Input */}
//                     <View className="mb-4">
//                         <Text className="text-gray-700 mb-2 ml-1">Full Name</Text>
//                         <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3">
//                             <Ionicons name="person-outline" size={20} color="#6B7280" />
//                             <TextInput
//                                 placeholder="Enter your name"
//                                 className="flex-1 ml-3 text-base"
//                                 value={formData.name}
//                                 onChangeText={(text) => setFormData({ ...formData, name: text })}
//                             />
//                         </View>
//                     </View>

//                     {/* Email Input */}
//                     <View className="mb-4">
//                         <Text className="text-gray-700 mb-2 ml-1">Email</Text>
//                         <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3">
//                             <Ionicons name="mail-outline" size={20} color="#6B7280" />
//                             <TextInput
//                                 placeholder="Enter your email"
//                                 className="flex-1 ml-3 text-base"
//                                 value={formData.email}
//                                 onChangeText={(text) => setFormData({ ...formData, email: text })}
//                                 keyboardType="email-address"
//                                 autoCapitalize="none"
//                             />
//                         </View>
//                     </View>

//                     {/* Password Input */}
//                     <View className="mb-4">
//                         <Text className="text-gray-700 mb-2 ml-1">Password</Text>
//                         <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3">
//                             <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
//                             <TextInput
//                                 placeholder="Enter your password"
//                                 className="flex-1 ml-3 text-base"
//                                 value={formData.password}
//                                 onChangeText={(text) => setFormData({ ...formData, password: text })}
//                                 secureTextEntry
//                             />
//                         </View>
//                         <Text className="text-gray-500 text-xs mt-1 ml-1">At least 6 characters</Text>
//                     </View>

//                     {/* Confirm Password Input */}
//                     <View className="mb-6">
//                         <Text className="text-gray-700 mb-2 ml-1">Confirm Password</Text>
//                         <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3">
//                             <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
//                             <TextInput
//                                 placeholder="Confirm your password"
//                                 className="flex-1 ml-3 text-base"
//                                 value={formData.confirmPassword}
//                                 onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
//                                 secureTextEntry
//                             />
//                         </View>
//                     </View>

//                     {/* Signup Button */}
//                     <TouchableOpacity
//                         onPress={handleSignup}
//                         disabled={loading}
//                         className={`bg-orange-500 py-4 rounded-xl shadow-lg shadow-orange-500/30 mb-4 ${loading ? 'opacity-50' : ''}`}
//                     >
//                         <Text className="text-white text-center font-bold text-lg">
//                             {loading ? 'Creating Account...' : 'Sign Up'}
//                         </Text>
//                     </TouchableOpacity>

//                     {/* Login Link */}
//                     <View className="flex-row justify-center mb-8">
//                         <Text className="text-gray-600">Already have an account? </Text>
//                         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                             <Text className="text-orange-500 font-bold">Login</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     )
// }

// export default SignupScreen
