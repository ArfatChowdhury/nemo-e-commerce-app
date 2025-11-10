import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import AppNavigator from './src/navigation/AppNavigator'
import { Provider } from 'react-redux';
import {store} from './src/Store/store/store'

export default function App() {
  return (

    <View className='flex-1 mt-12'>
      <Provider store={store}>

        <AppNavigator></AppNavigator>
        <StatusBar style="auto" />
      </Provider>
    </View>

  );
}


