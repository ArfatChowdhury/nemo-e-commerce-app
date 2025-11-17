import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputBlockProps extends Omit<TextInputProps, 'onChange' | 'onChangeText' | 'value' | 'placeholder'> {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  multiline?: boolean;
  height?: number;
  error?: string;
}

const InputBlock: React.FC<InputBlockProps> = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  multiline, 
  height, 
  error,
  ...rest 
}) => (
    <View className="mb-5">
    <Text className="text-lg font-semibold mb-2 text-gray-800">{label}</Text>
    <TextInput
      placeholder={placeholder}
      className={`
        bg-white border border-gray-300 rounded-lg px-4 py-3 text-base
        ${error ? 'border-red-500' : 'border-gray-300'}
        ${multiline ? 'text-align-vertical-top' : ''}
      `}
      placeholderTextColor="#9CA3AF"
      value={value}
      multiline={multiline}
      style={height ? { height } : {}}
      onChangeText={onChange}
      {...rest}
    />
    {error && (
      <Text className="text-red-500 text-sm mt-1">{error}</Text>
    )}
  </View>
);



export default InputBlock;