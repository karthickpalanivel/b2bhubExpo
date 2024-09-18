import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

export default function WelcomeScreen() {
  const ringOnePadding = useSharedValue(0);
  const ringTwoPadding = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(() => {
    ringOnePadding.value = 0;
    ringTwoPadding.value = 0;
    setTimeout(
      () => (ringOnePadding.value = withSpring(ringOnePadding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ringTwoPadding.value = withSpring(ringOnePadding.value + hp(3))),
      300
    );

    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Quicksand: require("../assets/fonts/Quicksand Regular.ttf"),
        QuicksandBold: require("../assets/fonts/Quicksand Bold.ttf"),
        QuicksandSemiBold: require("../assets/fonts/Quicksand SemiBold.ttf"),
        QuicksandLight: require("../assets/fonts/Quicksand Light.ttf"),
      });
    }

    loadFonts();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View style={[styles.outerRing, { padding: ringOnePadding }]}>
        <Animated.View style={[styles.innerRing, { padding: ringTwoPadding }]}>
          <Image source={require("../assets/logo.png")} style={styles.image} />
        </Animated.View>
      </Animated.View>
      <View style={styles.textContainer}>
        <Text style={[styles.business, { fontSize: 25 }]}>
          Make your business trading
        </Text>
        <Text style={[styles.business, { fontSize: 30 }]}>Easier with us!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d53c46",
    paddingVertical: 10,
  },
  // #f59e0b
  image: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp("50%"),
  },
  textContainer: {
    alignItems: "center",

  },
  outerRing: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 9999,
  },
  innerRing: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 9999,
  },
  business: {
    color: "#fff",
    // fontWeight: "bold",
    textAlign: "center",
    fontFamily: "QuicksandSemiBold",
  },
});

/*
{
  "fonts": [
    "/src/assets/fonts/Galak Pro Demo.ttf",
    "/src/assets/fonts/Quicksand Bold.ttf",
    "/src/assets/fonts/Quicksand Light.ttf",
    "/src/assets/fonts/Quicksand Medium.ttf",
    "/src/assets/fonts/Quicksand Regular.ttf",
    "/src/assets/fonts/Quicksand SemiBold.ttf",
    "/src/assets/fonts/Space Grotesk Light.ttf"
  ]
}
*/
