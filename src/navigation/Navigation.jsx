import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ProductDetails from "../components/product/ProductDetails";
import ProfileScreen from "../screens/ProfileScreen";
// import NotificationScreen from "../screens/NotificationScreen";
import ProductScreen from "../screens/ProductScreen";
import OrderScreen from "../screens/OrderScreen";
import OrderSuccessful from "../screens/OrderSuccessful";

//variables
const Stack = createNativeStackNavigator();

//functions
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        {/* Bottom Navbar Screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Orders" component={OrderScreen} />
        <Stack.Screen name="Products" component={ProductScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Sucessfull" component={OrderSuccessful} />

        {/* other screens */}
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        {/* <Stack.Screen name="Notifications" component={NotificationScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
