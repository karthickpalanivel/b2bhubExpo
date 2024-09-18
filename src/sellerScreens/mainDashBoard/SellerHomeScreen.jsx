import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ProductDisplay from "../sellerComponents/ProductDisplay";
import * as Font from "expo-font";
import AppLoaderAnimation from "../../components/loaders/AppLoaderAnimation";
import { ArrowRightStartOnRectangleIcon } from "react-native-heroicons/outline";

const SellerHomeScreen = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);

  const [sellerName, setSellerName] = useState("ABC Trader");
  const [activeProduct, setActiveProduct] = useState(25);
  const [newOrders, setNewOrders] = useState(4);
  const [productPublished, setProductPublished] = useState(10);
  const [totalOrders, setTotalOrders] = useState(15);

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

  const navigationToAddProduct = () => {
    navigation.navigate("ModifyProduct");
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const kgToTonnes = (num) => {
    return num * 0.001;
  };

  const tonnesToKg = (num) => {
    return num * 1000;
  };

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <>
          <StatusBar style="dark" backgroundColor="#fff" />
          <ScrollView contentContainerStyle={styles.container}>
            <View>
              <View style={styles.header}>
                <View>
                  <Text style={styles.welcomeText}>Welcome Back Seller,</Text>
                  <Text style={styles.nameText}>{sellerName}</Text>
                </View>
                {/* <Image
                  source={{
                    uri: "https://res.cloudinary.com/dve3s278t/image/upload/v1726223190/bc9fd4bd-de9b-4555-976c-8360576c6708_l9xbwx.jpg",
                  }}
                  style={styles.profilePic}
                /> */}
                <View>
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={handleLogout}
                  >
                    <ArrowRightStartOnRectangleIcon
                      color={"#333"}
                      size={wp(8)}
                      strokeWidth={wp(0.3)}
                      style={styles.profilePic}
                    />
                  </TouchableOpacity>
                  <Text>Logout</Text>
                </View>
              </View>

              <View style={styles.cardsContainer}>
                <View style={[styles.card, { backgroundColor: "#A3D8A2" }]}>
                  <Text style={styles.cardTitle}>Active Product</Text>
                  <Text style={styles.cardNumber}>
                    {activeProduct > 0
                      ? activeProduct
                      : "Currently no products added"}
                  </Text>
                  {/* <Text style={styles.cardDescription}>↑ 3 in last 7 days</Text> */}
                </View>

                <View style={[styles.card, { backgroundColor: "#F7A7A6" }]}>
                  <Text style={styles.cardTitle}>Total Order</Text>
                  <Text style={styles.cardNumber}>
                    {totalOrders > 0 ? totalOrders : "None"}
                  </Text>
                  {/* <Text style={styles.cardDescription}>
                    ↓ 1 Less vs last month
                  </Text> */}
                </View>

                <View style={[styles.card, { backgroundColor: "#F9D276" }]}>
                  <Text style={styles.cardTitle}>Pending publish</Text>
                  <Text style={styles.cardNumber}>
                    {productPublished > 0 ? productPublished : "None"}
                  </Text>
                  <Text style={styles.cardDescription}>Waiting</Text>
                </View>

                <View style={[styles.card, { backgroundColor: "#A0C4FF" }]}>
                  <Text style={styles.cardTitle}>New Order</Text>
                  <Text style={styles.cardNumber}>
                    {newOrders > 0 ? newOrders : "None"}
                  </Text>
                  <Text style={styles.cardDescription}>No new orders</Text>
                </View>
              </View>
            </View>

            <ProductDisplay />

            <TouchableOpacity
              style={styles.addProductContainer}
              onPress={navigationToAddProduct}
            >
              <Text style={styles.addProductText}>Add New product</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: wp(5),
    padding: wp("5%"),
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  welcomeText: {
    fontSize: wp("4%"),
    color: "#333",
    // fontWeight: "bold",
    fontFamily: "QuicksandSemiBold",
  },
  nameText: {
    fontSize: wp("6%"),
    // fontWeight: "bold",
    fontFamily: "QuicksandBold",
  },
  profilePic: {
    width: wp("15%"),
    height: wp("15%"),
    borderRadius: wp("7.5%"),
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: wp("42%"),
    height: hp("18%"),
    borderRadius: wp("3%"),
    padding: wp("4%"),
    marginBottom: wp("4%"),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: wp("4%"),
    color: "#FFF",
    // fontWeight: "bold",
    fontFamily: "QuicksandSemiBold",
  },
  cardNumber: {
    fontSize: wp(5),
    // fontWeight: "bold",
    color: "#FFF",
    marginVertical: hp("1%"),
    fontFamily: "QuicksandSemiBold",
  },
  cardDescription: {
    fontSize: wp("3.5%"),
    color: "#FFF",
    fontFamily: "QuicksandSemiBold",
  },
  addProductContainer: {
    paddingVertical: wp(0.2),
    paddingHorizontal: wp(4),
    height: wp(12),
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    elevation: 2,
    position: "absolute",
    bottom: wp(10),
    right: wp(10),
  },
  addProductText: {
    color: "white",
    fontSize: wp(5),
    fontFamily: "QuicksandBold",
  },
});

export default SellerHomeScreen;
