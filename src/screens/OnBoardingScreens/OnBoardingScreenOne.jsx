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
import Animated, { FadeInLeft } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../hooks/LanguageContext";
import { StatusBar } from "expo-status-bar";

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


  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

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

  useEffect(() => {
    changeLanguage(selectLanguage);
  }, [selectLanguage]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="white" />
      <Onboarding
        containerStyles={{ paddingHorizontal: wp(5) }}
        pages={[
          {
            backgroundColor: "#fffff6",
            image: (
              <View style={styles.languageContainer}>
                <View>
                  <Text style={[styles.welcomeText, { fontSize: wp(6) }]}>
                    {t("welcome_to_b2b_hub_india")}
                  </Text>
                  <View style={styles.logoContainer}>
                    <Image
                      source={require("../../assets/B2BlogoRounded.png")}
                      style={styles.logo}
                    />
                  </View>

                  <View style={styles.dropDownContainer}>
                    <Text style={styles.selectLanguage}>
                      {t("select_language")}
                    </Text>
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
                    {t("start_your_business_in")}
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
                    {t("simple_steps")}
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
              <Animated.View
                entering={FadeInLeft.delay(200)
                  .duration(1500)
                  .springify()
                  .damping(12)}
              >
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
                <Text style={styles.registerText}>
                  {t("register_a_new_account")}
                </Text>
                <LottieView
                  source={require("../../assets/lottie/register.json")}
                  width={wp(90)}
                  height={wp(90)}
                  autoPlay
                  loop
                />
                <View style={styles.textContainer}>
                  <Text style={styles.registerDescription}>
                    {t("register_using_your_mobile_number")}
                  </Text>
                </View>
              </Animated.View>
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
                  {t("become_a_seller_or_buyer")}
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
                    {t("enter_your_business_email")}
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
                  {t("start_ordering_selling")}
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
                    {t("browse_and_order_products")}.
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
