import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const TonsInput = ({ input }) => {
  return (
    <View>
      <TextInput
        style={styles.inputTons}
        placeholder={input}
        placeholderColor="black"
      />
    </View>
  );
};

export default TonsInput;

const styles = StyleSheet.create({
  inputTons: {
    width: wp(30),
    padding: hp(1),
    height: hp(6),
    borderWidth: 0.4,
    borderRadius: wp(0.5),
  },
});
