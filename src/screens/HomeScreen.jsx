import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  BackHandler,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  BellIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "react-native-heroicons/outline";
import {
  MapPinIcon,
  LanguageIcon,
  XCircleIcon,
} from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Categories from "../components/Categories";
import Product from "../components/product/Product";
import { categoriesData } from "../data/Categories";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import BannerOne from "../components/Banner/BannerOne";

// fonts
import { useFonts } from "expo-font";
import { Cookie_400Regular } from "@expo-google-fonts/cookie";
import Footer from "../components/Footer";
import { Modal } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import AppLoading from "expo-app-loading";
import AppLoaderAnimation from "../components/loaders/AppLoaderAnimation";
const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [language, setLanguage] = useState("English");
  const [languageHeader, setLanguageHeader] = useState("Select Language");
  const [isLoading, setIsLoading] = useState(false);

  const show = () => setModalVisible(true);
  const hide = () => setModalVisible(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const profileScreen = () => {
    navigation.navigate("Profile");
  };

  const navigateAppLoader = () => {
    navigation.navigate("Apploader");
  };

  // user name details

  let name = "John";
  let userName = name.toUpperCase();

  // language details
  const tamilLanguage = () => {
    setLanguage("தமிழ்");
    setLanguageHeader("மொழியை தேர்ந்தெடுங்கள்");
    hide();
  };

  const englishLanguage = () => {
    setLanguage("English");
    setLanguageHeader("Select Language");
    hide();
  };

  const japaneseLanguage = () => {
    setLanguage("日本語");
    setLanguageHeader("好きな語を選んでください");
    hide();
  };

  const teluguLanguage = () => {
    setLanguage("తెలుగు");
    setLanguageHeader("మీ భాషను ఎంచుకోండి");
    hide();
  };

  const LanguageModal = ({ visible, setVisible }) => {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={hide}
        transparent
      >
        <SafeAreaView style={styles.safeAreaContent}>
          <View style={styles.languageModalContainer}>
            <View>
              <TouchableOpacity>
                <XCircleIcon
                  size={wp(8)}
                  color="black"
                  style={styles.iconX}
                  onPress={hide}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: hp(3),
                textAlign: "center",
                marginTop: wp(5),
                color: "white",
              }}
            >
              {languageHeader}
            </Text>
            <TouchableOpacity
              style={styles.languageContainer}
              onPress={tamilLanguage}
            >
              <Text style={styles.languageText}>தமிழ்</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageContainer}
              onPress={japaneseLanguage}
            >
              <Text style={styles.languageText}>日本語</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageContainer}
              onPress={teluguLanguage}
            >
              <Text style={styles.languageText}>తెలుగు</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageContainer}
              onPress={englishLanguage}
            >
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <>
      {isLoading ? (
        <AppLoading>
          <AppLoaderAnimation />
        </AppLoading>
      ) : (
        <View style={styles.container}>
          <StatusBar style="auto" backgroundColor="white" />
          <LanguageModal visible={modalVisible} setVisible={setModalVisible} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={styles.avatarContainer}>
              <Pressable style={styles.logoContainer}>
                <Image
                  source={require("../assets/logo.png")}
                  style={styles.logoImage}
                />
              </Pressable>
              <Pressable onPress={profileScreen}>
                <Image
                  source={require("../assets/profileImage.png")}
                  style={styles.avatarImage}
                />
              </Pressable>
            </View>

            <View style={styles.headerContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.userName}>Hello, {userName}</Text>
                  <View style={styles.iconContainer}>
                    <MapPinIcon size={hp(2)} color="#f59e0b" />
                    <Text style={{ fontSize: wp(4), color: "#f59e0b" }}>
                      Chennai
                    </Text>
                  </View>
                </View>
                <View>
                  <Pressable
                    style={{ flexDirection: "row" }}
                    onPress={navigateAppLoader}
                  >
                    <LanguageIcon size={hp(2)} color="#f59e0b" />
                    <Text style={{ color: "#475569" }}>Language</Text>
                  </Pressable>
                  <TouchableOpacity onPress={() => setModalVisible(show)}>
                    <Text style={{ color: "#f59e0b", textAlign: "right" }}>
                      {language}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={styles.punchOne}>Start your business</Text>
              </View>
              <Text style={styles.punchTwo}>
                From your <Text style={styles.city}>City</Text>
              </Text>

              {/* <View>
          <LottieView
            style={styles.lottieIcon}
            source={require("../assets/lottie/welcomeLottie.json")}
            autoPlay
            loop
          />
          <Text>Lottie icon</Text>
        </View> */}
            </View>

            {/* Search bar */}
            <Pressable
              style={styles.searchBarContainer}
              onPress={() => navigation.navigate("Search Bar")}
            >
              <Text style={styles.searchBarText}>Search </Text>

              <TouchableOpacity style={styles.searchIconContainer}>
                <MagnifyingGlassIcon
                  size={hp(2.5)}
                  strokeWidth={3}
                  color="grey"
                />
              </TouchableOpacity>
            </Pressable>

            <Categories
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            <BannerOne />
            <Product
              category={categoriesData}
              productActiveData={activeCategory}
              setProductActiveData={setActiveCategory}
            />
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  categoryContainer: {
    width: "100%",
  },

  scrollViewContainer: {
    paddingBottom: 50,
    paddingTop: 56,
    marginBottom: 24,
  },

  logoContainer: {
    backgroundColor: "white",
    borderRadius: 999,
    elevation: 3,
  },
  logoImage: {
    width: hp(10),
    borderRadius: 999,
    height: hp(10),
  },

  avatarContainer: {
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  avatarImage: {
    height: hp(6),
    width: hp(6),
    borderRadius: 100,
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  userName: {
    fontSize: hp(2),
    color: "#475569",
  },

  headerContainer: {
    marginHorizontal: "5%",
    paddingVertical: 8,
    marginBottom: 8,
  },
  lottieIcon: {
    width: wp(20),
    height: hp(20),
  },
  city: {
    color: "#f59e0b",
    // fontFamily: "QuicksandBold",
  },

  punchOne: {
    fontSize: hp(3.8),
    fontWeight: "500",
    color: "#475569",
  },

  punchTwo: {
    fontSize: hp(3.8),
    fontWeight: "500",
    color: "#475569",
  },

  searchBarText: {
    width: "85%",
    color: "grey",
  },
  searchBarContainer: {
    marginHorizontal: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: 16,
  },

  searchIconContainer: {
    backgroundColor: "white",
    borderRadius: 9999,
    padding: 12,
  },

  safeAreaContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: wp(100),
    height: hp(100),
    borderTopRightRadius: wp(3),
    borderTopLeftRadius: wp(3),
  },
  languageModalContainer: {
    width: wp(80),
    backgroundColor: "#f59e0b",
    elevation: 4,
    borderRadius: wp(3),
  },
  languageText: {
    fontSize: hp(2.5),
    color: "white",
    borderBottomWidth: 0.2,
    borderColor: "white",
  },
  languageContainer: {
    alignItems: "center",
    padding: hp(2),
    borderRadius: 4,
  },
  iconX: {
    position: "absolute",
    right: -10,
    top: -10,
  },

  whatsappIcon: {
    width: wp(20),
    height: wp(20),
    position: "absolute",
    right: wp(10),
    bottom: wp(10),
    backgroundColor: "rgba(255,255,255,0)",
  },
});
