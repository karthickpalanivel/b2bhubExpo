import { StyleSheet, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";

const AppLoaderAnimation = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="white" />
      <LottieView
        style={styles.lottieIcon}
        source={require("../../assets/lottie/LoadingTwo.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default AppLoaderAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  lottieIcon: {
    width: wp(90),
    height: hp(90),
    borderWidth: 1,
    borderColor: "red",
  },
});
