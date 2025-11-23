import { View, Text, TouchableOpacity } from 'react-native'
import React, { ComponentProps } from 'react'
import { Ionicons } from '@expo/vector-icons'


interface ProfileButtonProps {
    iconName: ComponentProps<typeof Ionicons>['name'];
    name: string;
    onPress: () => void;
}

const ProfileButton = ({ iconName, name, onPress }: ProfileButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View className='px-4 py-4 bg-white my-2 space-y-1'>
                <View className='flex-row items-center justify-between'>
                    <View className='flex-row gap-3 items-center '>
                        <Ionicons name={iconName} size={24} color='black' />
                        <Text className='text-base font-semibold'>{name}</Text>
                    </View>
                    <View>
                        <Ionicons name='chevron-forward-outline' size={24} color='black' />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProfileButton