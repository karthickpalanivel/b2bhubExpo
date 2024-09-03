import { StyleSheet, View } from "react-native";
import React from "react";
import ButtonIcon from "./ButtonIcon";

const Footer = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <ButtonIcon iconName="home" displayName="Home" />
        <ButtonIcon iconName="shopping-bag" displayName="Products" />
        <ButtonIcon iconName="shopping-cart" displayName="Orders" />
        {/* <ButtonIcon iconName="user" displayName="Profile" /> */}
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal:40 ,
    paddingVertical: 10,
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 25,
    color: "#000",
  },
  mainContainer: {
    backgroundColor: "white",
  },
});
