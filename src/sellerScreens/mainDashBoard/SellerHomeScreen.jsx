import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TagIcon } from "react-native-heroicons/outline";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Tab = createBottomTabNavigator();

const SellerHomeScreen = () => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default SellerHomeScreen;

const styles = StyleSheet.create({});
