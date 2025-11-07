import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import AppNavigator from './src/navigation/AppNavigator'
export default function App() {
  return (
    <View className='flex-1 mt-12'>
      <AppNavigator></AppNavigator>
      <StatusBar style="auto" />
    </View>
  );
}


