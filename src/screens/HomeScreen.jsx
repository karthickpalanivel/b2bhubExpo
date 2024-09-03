import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  BackHandler,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  BellIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
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

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const navigation = useNavigation();

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

  const handleFocusInput = () => {
    let searchBar = document.querySelector(".searchBar");
    searchBar.focus();
  };

  let name = "John";
  let userName = name.toUpperCase();
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
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
          <Text style={styles.userName}>Hello, {userName}</Text>
          {/* <View style={styles.iconContainer}>
            <MapPinIcon size={hp(2)} color="red" />
            <Text style={styles.city}>Chennai</Text>
          </View> */}
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
        <Pressable style={styles.searchBarContainer}>
          <TextInput
            placeholder="Search Dal"
            placeholderTextColor={"grey"}
            style={styles.searchBar}
            className="searchBar"
          />

          <TouchableOpacity style={styles.searchIconContainer}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="grey" />
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

  searchBar: {
    width: "85%",
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
});
