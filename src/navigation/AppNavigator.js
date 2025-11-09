import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import AddProductScreen from '../screens/AddProductScreen';
import { Ionicons } from "@expo/vector-icons";
import CartScreen from "../screens/CartScreen";
import Category from "../screens/Category";
import { Platform } from "react-native";


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()


function MyTabs() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({color , size, focused}) => (
                    <Ionicons name="home" size={size} color={color} />
                )
            }} />
             <Tab.Screen name='Cart' component={CartScreen} options={{
                tabBarIcon: ({color, size,focused}) => (
                    <Ionicons name="cart" size={size} color={color}/>

                )
            }}/>
            <Tab.Screen name='Profile' component={ProfileScreen} options={{
                tabBarIcon: ({color, size,focused}) => (
                    <Ionicons name="person" size={size} color={color}/>

                )
            }}/>
        </Tab.Navigator>

    )
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='bottomTabs' component={MyTabs} />
                <Stack.Screen name='addProduct' component={AddProductScreen} />
                <Stack.Screen name="category" component={Category} 
        options={{
          presentation: 'modal',
          cardStyle: {
            marginTop: Platform.OS === 'android' ? 75 : 0,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,

          },
          cardOverlayEnabled: true,
        }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

