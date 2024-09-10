import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SellerHomeScreen from "../mainDashBoard/SellerHomeScreen";
import ModifyProductList from "../mainDashBoard/ModifyProductList";
import SellerProfile from "../mainDashBoard/SellerProfile";

const Tab = createBottomTabNavigator();

const SellerNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="sellerHome" component={SellerHomeScreen} />
      <Tab.Screen name="ModifyList" component={ModifyProductList} />
      <Tab.Screen name="sellerProfile" component={SellerProfile} />
    </Tab.Navigator>
  );
};

export default SellerNavigation;

const styles = StyleSheet.create({});
