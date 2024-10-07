import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import Animated, {useSharedValue, withSpring} from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import * as Font from "expo-font";

export default function WelcomeScreen() {
  const ringOnePadding = useSharedValue(0);
  const ringTwoPadding = useSharedValue(0);
  const navigation = useNavigation();

  const [loggedin, setloggedin] = useState("false");
  console.log(loggedin);

  async function navigationScreen() {
    await AsyncStorage.getItem("loginstate")
      .then((value) => {
        if (value !== null && value == "true") {
          // Value was found, do something with it
          //console.log("Value:", value);
          navigation.navigate("Home");
        } else {
          navigation.navigate("Login");
          // No value found
          //console.log("No value found");
        }
      })
      .catch((error) => {
        // Error retrieving value
        console.error("Error:", error);
        navigation.navigate("Login");
      });
  }

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

    setTimeout(() => navigationScreen(), 2500);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View style={[styles.outerRing, {padding: ringOnePadding}]}>
        <Animated.View style={[styles.innerRing, {padding: ringTwoPadding}]}>
          <Image source={require("../assets/logo.png")} style={styles.image} />
        </Animated.View>
      </Animated.View>
      <View style={styles.textContainer}>
        <Text style={[styles.business, {fontSize: 25}]}>
          Make your business trading
        </Text>
        <Text style={[styles.business, {fontSize: 30}]}>Easier with us!</Text>
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
