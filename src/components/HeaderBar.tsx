import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const HeaderBar = ({title}) => {
    const navigation = useNavigation()
    return (
        <View className=" px-4 py-4  flex-row items-center">
            {/* Back Button */}
            <TouchableOpacity 
                onPress={() => navigation.goBack()}
                className="mr-3"
            >
                <Ionicons name='arrow-back' size={24} color='black' />
            </TouchableOpacity>
            
            {/* Page Title */}
            <Text className="text-xl font-bold flex-1 text-center">{title}</Text>
        </View>
    )
}

export default HeaderBar
