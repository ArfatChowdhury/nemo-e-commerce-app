import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ComponentProps } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


interface HeaderBarProps {
    title: string;
    iconName: ComponentProps<typeof Ionicons>['name'];
    size?: number;
}

const HeaderBar = ({ title, iconName, size = 24 }: HeaderBarProps) => {
    const navigation = useNavigation()
    return (
        <View className="  py-4  flex-row items-center">
            {/* Back Button */}
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="mr-3"
            >
                <Ionicons name={iconName} size={size} color='black' />
            </TouchableOpacity>

            {/* Page Title */}
            <Text className="text-xl font-bold flex-1 text-center">{title}</Text>
        </View>
    )
}

export default HeaderBar
