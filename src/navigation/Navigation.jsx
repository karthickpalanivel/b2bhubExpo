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
import AccountSettings from "../screens/ProfileScreenContains/AccountSettings";
import DeliveryScreen from "../screens/ProfileScreenContains/DeliveryScreen";
import OffersRewards from "../screens/ProfileScreenContains/OffersRewards";
import PaymentShippingScreen from "../screens/ProfileScreenContains/PaymentShippingScreen";
import SettingsScreen from "../screens/ProfileScreenContains/SettingsScreen";
import EditScreen from "../screens/ProfileScreenContains/EditScreen";
import PasswordEditScreen from "../screens/ProfileScreenContains/PasswordEditScreen";
import SearchBarScreen from "../screens/HomePageScreens/SearchBarScreen";
import LoginScreen from "../screens/OauthScreen/LoginScreen";
import SignUpScreen from "../screens/OauthScreen/SignUpScreen";
import ShopDetails from "../screens/OauthScreen/ShopDetails";
import PaymentSummary from "../components/product/Payment";
import ForgotPasswordScreen from "../screens/OauthScreen/ForgotPasswordScreen";
import OTPAndPasswordScreen from "../screens/OauthScreen/OTPAndPasswordScreen";
import AppLoaderAnimation from "../components/loaders/AppLoaderAnimation";
import SellerHomeScreen from "../sellerScreens/mainDashBoard/SellerHomeScreen";
import GenerateReactNativeInvoice from "../components/InVoice/GenerateReactNativeInvoice";
import PdfGeneration from "../components/InVoice/PdfGeneration";

//variables
const Stack = createNativeStackNavigator();

//functions
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        {/* App loader */}

        <Stack.Screen name="Apploader" component={AppLoaderAnimation} />

        {/* Bottom Navbar Screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Orders" component={OrderScreen} />
        <Stack.Screen name="Products" component={ProductScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Sucessfull" component={OrderSuccessful} />

        <Stack.Screen name="Search Bar" component={SearchBarScreen} />

        {/* Authentication Page */}

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="EntryShopDetails" component={ShopDetails} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen
          name="OtpConformScreen"
          component={OTPAndPasswordScreen}
        />

        {/* other screens */}
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        {/* <Stack.Screen name="Notifications" component={NotificationScreen} /> */}

        {/* Profile Screen navigation */}
        <Stack.Screen name="AccountDetails" component={AccountSettings} />
        <Stack.Screen name="DeliveryDetails" component={DeliveryScreen} />
        <Stack.Screen name="OfferRewardsDetails" component={OffersRewards} />
        <Stack.Screen
          name="PaymentShippingDetails"
          component={PaymentShippingScreen}
        />
        <Stack.Screen name="Payment" component={PaymentSummary} />

        <Stack.Screen name="SignUpShopDetails" component={ShopDetails} />
        <Stack.Screen name="EditScreen" component={EditScreen} />
        <Stack.Screen name="PasswordEdit" component={PasswordEditScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />

        <Stack.Screen name="Invoice" component={PdfGeneration} />

        {/* Sellers Screens */}
        <Stack.Screen name="SellerHome" component={SellerHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
