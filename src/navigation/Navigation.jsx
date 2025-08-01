import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useEffect, useState} from "react";
import {StyleSheet} from "react-native";

//Screens
import ProductDetails from "../components/product/ProductDetails";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

import AppLoaderAnimation from "../components/loaders/AppLoaderAnimation";
import PaymentSummary from "../components/product/Payment";

//Authentication screens
import ForgotPasswordScreen from "../screens/OauthScreen/ForgotPasswordScreen";
import LoginScreen from "../screens/OauthScreen/LoginScreen";
import OTPAndPasswordScreen from "../screens/OauthScreen/OTPAndPasswordScreen";
import SellerRegistration from "../screens/OauthScreen/SellerRegistration";
import SignUpScreen from "../screens/OauthScreen/SignUpScreen";

import OnBoardingScreenOne from "../screens/OnBoardingScreens/OnBoardingScreenOne";
import OrderSuccessful from "../screens/OrderSuccessful";

import AccountSettings from "../screens/ProfileScreenContains/AccountSettings";
import DeliveryScreen from "../screens/ProfileScreenContains/DeliveryScreen";

//seller screens
import ModifyProductList from "../sellerScreens/mainDashBoard/ModifyProductList";
import SellerHomeScreen from "../sellerScreens/mainDashBoard/SellerHomeScreen";
import SellerProfile from "../sellerScreens/mainDashBoard/SellerProfile";
import ProductDetailsForm from "../sellerScreens/sellerComponents/ProductDetailsForm";
import TermsAndCondition from "../screens/OauthScreen/TermsAndCondition";

//variables
const Stack = createNativeStackNavigator();

//functions
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        <Stack.Screen name="onBoardScreenOne" component={OnBoardingScreenOne} />

        {/* Onboarding Screens */}

        {/* App loader */}

        <Stack.Screen name="Apploader" component={AppLoaderAnimation} />

        {/* Bottom Navbar Screens */}
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Sucessfull" component={OrderSuccessful} />

        {/* Authentication Page */}

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen
          name="OtpConformScreen"
          component={OTPAndPasswordScreen}
        />

        <Stack.Screen
          name="sellerRegistration"
          component={SellerRegistration}
        />

        {/* other screens */}
        <Stack.Screen name="ProductDetails" component={ProductDetails} />

        {/* Profile Screen navigation */}
        <Stack.Screen name="AccountDetails" component={AccountSettings} />
        <Stack.Screen name="DeliveryDetails" component={DeliveryScreen} />

        <Stack.Screen name="Terms" component={TermsAndCondition} />

        <Stack.Screen name="paymentSummary" component={PaymentSummary} />

        {/* Sellers Screens */}
        <Stack.Screen name="SellerHome" component={SellerHomeScreen} />
        <Stack.Screen name="ModifyProduct" component={ModifyProductList} />
        <Stack.Screen name="SellerProfile" component={SellerProfile} />
        <Stack.Screen name="SellerProductEdit" component={ProductDetailsForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
