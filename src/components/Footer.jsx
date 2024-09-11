import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonIcon from "./ButtonIcon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Font from "expo-font";
import AppLoaderAnimation from "./loaders/AppLoaderAnimation";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Quicksand: require("../assets/fonts/Quicksand Regular.ttf"),
        QuicksandBold: require("../assets/fonts/Quicksand Bold.ttf"),
        QuicksandSemiBold: require("../assets/fonts/Quicksand SemiBold.ttf"),
        QuicksandLight: require("../assets/fonts/Quicksand Light.ttf"),
      });
      setIsLoading(false);
    }

    loadFonts();
  }, []);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <View
          style={{ alignItems: "center", borderRadius: 9999, borderWidth: 0.1 }}
        >
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <ButtonIcon iconName="home" displayName="Home" />
              {/* <ButtonIcon iconName="shopping-bag" displayName="Products" /> */}
              <ButtonIcon iconName="shopping-cart" displayName="Orders" />
              {/* <ButtonIcon iconName="user" displayName="Profile" /> */}
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Footer;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    width: wp(60),
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuContainer: {},
  icon: {},
});
