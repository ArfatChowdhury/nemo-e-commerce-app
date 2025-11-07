const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");
const { createStackNavigator, Header } = require("@react-navigation/stack");
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import AddProductScreen from '../screens/AddProductScreen';


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()


function MyTabs() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>

    )
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='bottomTabs' component={MyTabs} />
                <Stack.Screen name='AddProduct' component={AddProductScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

