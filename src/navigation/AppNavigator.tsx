import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import NewsListScreen from '../screens/NewsListScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function HomeNavigator() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="NewsList"
                component={NewsListScreen}
                options={{ title: 'Daily Tea' }}
            />

            <Stack.Screen
                name="NewsDetails"
                component={NewsDetailScreen}
                options={{ title: 'News Details' }}
            />
        </Stack.Navigator>
    );
}

function FavoriteNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Favorites" component={FavoriteScreen} />
        </Stack.Navigator>
    );
}

function aboutNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
    );
}

function TabsNavigator() {
    return (
        <Tabs.Navigator screenOptions={({ route }) => ({
            tabBarIcon: () => {
                let iconName = "";
                if (route.name == "Home") {
                    iconName = "home"
                } else if (route.name == "Favorite") {
                    iconName = "favorite"
                }
                return <MaterialIcons name={"home"} color="#111a27" size={24} />
            }
        })}>
            <Tabs.Screen options={{headerShown: false}} name="Home" component={HomeNavigator} />
            <Tabs.Screen options={{headerShown: false}} name="Favorite" component={FavoriteNavigator} />
        </Tabs.Navigator>
    );
}

function AppNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="News" component={TabsNavigator} />
                <Drawer.Screen name="About" component={AboutScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;