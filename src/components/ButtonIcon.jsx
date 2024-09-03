import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const ButtonIcon = ({ iconName, displayName }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(displayName)}
      activeOpacity={true}
      style={styles.menuContainer}
    >
      <Feather name={iconName} style={styles.icon} />
      <Text style={styles.iconText}>{displayName}</Text>
    </TouchableOpacity>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 25,
    color: "#000",
  },
  iconText: {
    color: "#000",
  },
  active: {
    color: "#87ceeb",
  },
});
