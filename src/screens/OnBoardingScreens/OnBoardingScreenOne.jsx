import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Font from "expo-font";
import DropDownPicker from "react-native-dropdown-picker";

const OnBoardingScreenOne = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectLanguage, setSelectLanguage] = useState("en");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "English", value: "en" },
    { label: "தமிழ்", value: "ta" },
    { label: "తెలుగు", value: "tl" },
    { label: "हिन्दी", value: "hi" },
  ]);

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
    <View style={styles.container}>
      <Onboarding
        containerStyles={{ paddingHorizontal: wp(5) }}
        pages={[
          {
            backgroundColor: "#fffff6",
            image: (
              <View style={styles.languageContainer}>
                <View>
                  <Text style={[styles.welcomeText, { fontSize: wp(6) }]}>
                    Welcome to B2B Hub India
                  </Text>
                  <View style={styles.logoContainer}>
                    <Image
                      source={require("../../assets/B2BlogoRounded.png")}
                      style={styles.logo}
                    />
                  </View>

                  <View style={styles.dropDownContainer}>
                    <Text style={styles.selectLanguage}>Select Language</Text>
                    <DropDownPicker
                      open={open}
                      value={selectLanguage}
                      items={items}
                      setOpen={setOpen}
                      setValue={setSelectLanguage}
                      setItems={setItems}
                      containerStyle={{ height: wp(7) }}
                      style={{
                        backgroundColor: "#fffff6",
                        marginVertical: wp(3),
                      }}
                      itemStyle={{
                        justifyContent: "flex-start",
                      }}
                      dropDownContainerStyle={{
                        backgroundColor: "#fffff6",
                      }}
                    />
                  </View>
                </View>
                <View style={{ marginTop: hp(7) }}>
                  <Text style={[styles.welcomeText, { fontSize: wp(5) }]}>
                    Start your business
                  </Text>
                  <Text
                    style={[
                      styles.welcomeText,
                      { color: "red", fontSize: wp(7) },
                    ]}
                  >
                    3
                  </Text>
                  <Text style={[styles.welcomeText, { fontSize: wp(5) }]}>
                    Simple steps
                  </Text>
                </View>
              </View>
            ),
            title: "",
            subtitle: "",
          },
          {
            backgroundColor: "#fff",
            title: "",
            image: (
              <View>
                <View
                  style={{
                    borderRadius: 999,
                    backgroundColor: "grey",
                    width: wp(7),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp(5),
                      color: "white",
                      fontFamily: "QuicksandSemiBold",
                    }}
                  >
                    1
                  </Text>
                </View>
                <Text style={styles.registerText}>Register a new Account</Text>
                <LottieView
                  source={require("../../assets/lottie/register.json")}
                  width={wp(90)}
                  height={wp(90)}
                  autoPlay
                  loop
                />
                <View style={styles.textContainer}>
                  <Text style={styles.registerDescription}>
                    Register using your Mobile Number, Business Name, Email, GST
                    Number and PAN Number
                  </Text>
                </View>
              </View>
            ),

            subtitle: "",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View>
                <View
                  style={{
                    borderRadius: 999,
                    backgroundColor: "grey",
                    width: wp(7),
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: wp(5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp(5),
                      color: "white",
                      fontFamily: "QuicksandSemiBold",
                    }}
                  >
                    2
                  </Text>
                </View>
                <Text style={styles.registerText}>
                  Become a Seller or Buyer
                </Text>
                <View style={{ alignItems: "center", marginVertical: hp(4) }}>
                  <LottieView
                    source={require("../../assets/lottie/verifyRegistration.json")}
                    width={wp(70)}
                    height={wp(70)}
                    autoPlay
                    loop={false}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.registerDescription}>
                    Enter your Business Email, Location and Start trading your
                    products
                  </Text>
                </View>
              </View>
            ),
            title: "",
            subtitle: "",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View>
                <View
                  style={{
                    borderRadius: 999,
                    backgroundColor: "grey",
                    width: wp(7),
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: wp(5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp(5),
                      color: "white",
                      fontFamily: "QuicksandSemiBold",
                    }}
                  >
                    3
                  </Text>
                </View>
                <Text style={styles.registerText}>
                  Start Ordering & Selling
                </Text>
                <View style={{ alignItems: "center" }}>
                  <LottieView
                    source={require("../../assets/lottie/place_order.json")}
                    width={wp(90)}
                    height={wp(90)}
                    autoPlay
                    loop={false}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.registerDescription}>
                    Browse and order products from top sellers & brands.
                  </Text>
                </View>
              </View>
            ),
            title: "",
            subtitle: "",
          },
        ]}
      />
    </View>
  );
};

export default OnBoardingScreenOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff6",
    width: wp(100),
  },
  languageContainer: {
    width: wp(100),
    paddingHorizontal: wp(10),
  },
  logoContainer: {
    alignItems: "center",
  },
  selectLanguage: {
    fontSize: wp(6),
    fontFamily: "QuicksandSemiBold",
  },
  logo: {
    width: wp(50),
    height: wp(50),
  },
  welcomeText: {
    fontFamily: "QuicksandSemiBold",
    textAlign: "center",
  },
  registerText: {
    marginVertical: hp(3),
    textAlign: "center",
    fontSize: wp(5),
    fontFamily: "QuicksandSemiBold",
  },
  textContainer: {
    marginHorizontal: wp(7),
    padding: wp(4),
    backgroundColor: "white",
    borderRadius: wp(3),
    elevation: 3,
  },
  registerDescription: {
    fontSize: wp(4),
    fontFamily: "QuicksandSemiBold",
    textAlign: "justify",
    lineHeight: wp(7.5),
  },
});
