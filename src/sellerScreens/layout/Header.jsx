import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


const Header = ({ header }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Header</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: wp(100),
    height: hp(10),
    backgroundColor: ""
  },
  headerText: {},
});
