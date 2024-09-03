import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "./HomeScreen";
import Categories from "../components/Categories";

const MainScreen = () => {
  return (
    <>
      <HomeScreen />
      <Categories />
    </>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
