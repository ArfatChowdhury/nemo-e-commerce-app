import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { View } from 'react-native';
import "./global.css"
import AppNavigator from './src/navigation/AppNavigator'
import { Provider } from 'react-redux';
import { store } from './src/Store/store'
import { AuthProvider } from './src/context/AuthContext';
import { useState, useEffect } from 'react';
import SplashScreen from './src/screens/SplashScreen';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  // Keep splash screen visible until fonts are loaded and the splash animation finishes
  if (isShowSplash || !fontsLoaded) {
    return (
      <SplashScreen
        onFinish={() => setIsShowSplash(false)}
      />
    );
  }

  return (
    <View className='flex-1 mt-12'>
      <Provider store={store}>
        <AuthProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </AuthProvider>
      </Provider>
    </View>
  );
}
