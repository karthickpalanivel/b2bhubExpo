/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import AppLoaderAnimation from "../loaders/AppLoaderAnimation";
import * as Font from "expo-font";
const TradingSteps = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const registerUser = () => {
    navigation.navigate("SignIn");
  };

  const handleItem = () => {
    navigation.navigate("Home");
  };
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Quicksand: require("../../assets/fonts/Quicksand Regular.ttf"),
        QuicksandBold: require("../../assets/fonts/Quicksand Bold.ttf"),
        QuicksandSemiBold: require("../../assets/fonts/Quicksand SemiBold.ttf"),
        QuicksandLight: require("../../assets/fonts/Quicksand Light.ttf"),
      });
      setIsLoading(false);
    }
    loadFonts();
  }, []);

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <View style={styles.container}>
          <ScrollView
            horizontal={true}
            style={{ marginHorizontal: "3%" }}
            showsHorizontalScrollIndicator={false}
          >
            {/* <View style={styles.scrollContainer}>
          <Text style={styles.scrollText}>Scroll</Text>
          <ArrowRightIcon name="arrowright" style={styles.icon} />
        </View> */}

            <Pressable style={styles.imageSteps}>
              <Image
                source={require("../../assets/steps/firstStep.png")}
                style={styles.imageCard}
              />
              <Text style={styles.textPort}>Register</Text>
            </Pressable>
            {/* <View style={styles.scrollContainer}>
              <ArrowRightIcon name="arrowright" style={styles.icon} />
            </View> */}

            <Pressable style={styles.imageSteps}>
              <Image
                source={require("../../assets/steps/secondStep.png")}
                style={styles.imageCard}
              />
              <Text style={styles.textPort}>Select Item</Text>
            </Pressable>
            {/* <View style={styles.scrollContainer}>
              <ArrowRightIcon name="arrowright" style={styles.icon} />
            </View> */}
            <Pressable style={styles.imageSteps}>
              <Image
                source={require("../../assets/steps/thirdStep.png")}
                style={styles.imageCard}
              />
              <Text style={styles.textPort}>Place Order</Text>
            </Pressable>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default TradingSteps;

const styles = StyleSheet.create({
  container: {
    marginTop: wp(3),
    alignItems: "center",
  },
  imageSteps: {
    backgroundColor: "#fff",
    width: wp(25),
    marginHorizontal: wp(2),
    borderRadius: 10,
    padding: wp(2),
    alignItems: "center",
    marginVertical: wp(5),
    elevation: 1,
  },
  textPort: {
    fontSize: wp(3),
    color: "black",
    fontFamily: 'QuicksandSemiBold'
  },
  scrollContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: wp(2),
    color: "black",
    margin: "1%",
  },

  imageCard: {
    width: wp(30),
    height: wp(30),
  },

  registerContainer: {
    alignItems: "center",
    marginVertical: wp(5),
    width: wp(80),
    backgroundColor: "#42AD56",
    borderRadius: wp(12.5),
  },
  order: {
    fontSize: wp(5),
    fontFamily: "Space Grotesk Light",
    textAlign: "center",
    borderColor: "#42AD56",
    padding: wp(2.5),
    borderRadius: wp(1.7),
    backgroundColor: "#42AD56",
    color: "#fff",
  },
  boxShadow: {
    shadowColor: "#41B3A2",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 0.2,
  },
  androidShadow: {
    elevation: 1,
  },
});
