import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import ProfileHeaderLayout from "./ProfileHeaderLayout";
import { orderData } from "../../data/OrderData";
import { useNavigation } from "@react-navigation/native";
import OrderCard from "../../components/Order/OrderCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import AppLoaderAnimation from "../../components/loaders/AppLoaderAnimation";
import FloatingNavigationButton from "../../components/button/FloatingNavigationButton";
import { useTranslation } from "react-i18next";



const DeliveryScreen = () => {
  const [status, setStatus] = useState("All");
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [orderDetails, setOrderDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [token, setToken] = useState("");
  const [loading, setloading] = useState(true);

  const {t} = useTranslation()


  AsyncStorage.getItem("token")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        setToken(value);
        setIsFetching(true);
        const url = `${process.env.REACT_APP_BACKEND_URL}`+"/sales/viewOrders";
        axios
          .post(
            url,
            {},
            {
              headers: {
                Authorization: `Bearer ${value}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setOrderDetails(res.data.reverse());
            setIsFetching(false);
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      } else {
        // No value found
        console.log("No value found");
      }
    })
    .catch((error) => {
      // Error retrieving value
      console.error("Error:", error);
    });

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Quicksand: require("../../assets/fonts/Quicksand Regular.ttf"),
        QuicksandBold: require("../../assets/fonts/Quicksand Bold.ttf"),
        QuicksandSemiBold: require("../../assets/fonts/Quicksand SemiBold.ttf"),
        QuicksandLight: require("../../assets/fonts/Quicksand Light.ttf"),
      });
      setloading(false);
    }

    loadFonts();
  }, []);

  const navigationToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <View style={styles.container}>
          <ProfileHeaderLayout header={t('orders')} />
          <StatusBar style="light" backgroundColor="#4870F4" />
          <ScrollView>
            {orderDetails.length !== 0 ? (
              <Text style={styles.orderHeader}>Orders</Text>
            ) : (
              <></>
            )}
            {orderDetails.length !== 0 ? (
              orderDetails.map((item) => {
                return (
                  <>
                    <OrderCard props={item} key={item._id} />
                  </>
                );
              })
            ) : (
              <>
                <View style={styles.container}>
                  <Image
                    source={require("../../assets/emptyBox.png")}
                    style={styles.emptyBox}
                  />

                  <View styles={styles.imageCard}>
                    <Text style={styles.noOrderOne}>
                      {t('looks_like_you_need_to_make_orders')}
                    </Text>
                    <Text style={styles.noOrderTwo}>
                      {t('start_your_first_order')}
                    </Text>
                  </View>
                  {/* <Pressable
                    style={styles.homeBtnContainer}
                    onPress={navigationToHome}
                  >
                    <Text style={styles.homeBtnText}>Go Home</Text>
                  </Pressable> */}
                </View>
              </>
            )}
          </ScrollView>
          <View style={styles.floatNavigationContainer}>
            <FloatingNavigationButton />
          </View>
        </View>
      )}
    </>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
  },
  floatNavigationContainer: {
    position: "absolute",
    bottom: hp(5),
    right: wp(5),
  },
  imageCard: {
    width: wp(100),
    height: wp(100),
    marginTop: hp(50),
  },
  emptyBox: {
    marginTop: wp(50),
    width: wp(30),
    resizeMode: "contain",
  },

  noOrderOne: {
    fontSize: hp(2),
    color: "grey",
  },
  noOrderTwo: {
    fontSize: hp(2.5),
    color: "grey",
    textAlign: "center",
  },

  homeBtnContainer: {
    marginTop: hp(4),
    width: wp(30),
    height: wp(10),
    alignItems: "center",
    backgroundColor: "#4870F4",
    justifyContent: "center",
    borderRadius: wp(10),
  },
  homeBtnText: {
    fontSize: wp(5),
    color: "white",
  },

  orderHeader: {
    fontSize: hp(3),
    // fontWeight: "bold",
    fontFamily: "QuicksandSemiBold",
    textAlign: "center",
    marginVertical: hp(2),
  },
});
