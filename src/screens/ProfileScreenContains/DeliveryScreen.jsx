import {StyleSheet, Text, View, ScrollView, RefreshControl} from "react-native";
import {Image, Pressable} from "react-native";
import React, {useEffect, useState} from "react";
import ProfileHeaderLayout from "./ProfileHeaderLayout";
import {orderData} from "../../data/OrderData";
import {useNavigation} from "@react-navigation/native";
import OrderCard from "../../components/Order/OrderCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import {StatusBar} from "expo-status-bar";
import AppLoaderAnimation from "../../components/loaders/AppLoaderAnimation";
import FloatingNavigationButton from "../../components/button/FloatingNavigationButton";
import {useTranslation} from "react-i18next";
const colors = "#EF5A6F";
const backgrounds = "#FCF8F3";

const DeliveryScreen = () => {
  const [status, setStatus] = useState("All");
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [orderDetails, setOrderDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [token, setToken] = useState("");
  const [loading, setloading] = useState(true);

  const {t} = useTranslation();

  const [apiCalled, setApiCalled] = useState(false);
  useEffect(() => {
    const fetchDataFromAsyncStorageAndCallApi = async () => {
      try {
        const token1 = await AsyncStorage.getItem("token");
        const customerId1 = await AsyncStorage.getItem("customerId");

        // console.log(token1 + customerId1);

        if (token1 && customerId1) {
          if (!apiCalled) {
            setIsFetching(true);
            const url =
              `${process.env.REACT_APP_BACKEND_URL}` + "/sales/viewOrders";
            axios
              .post(
                url,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token1}`,
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((res) => {
                setApiCalled(true)
                setOrderDetails(res.data.reverse());
                setIsFetching(false);
                console.log(res.data);
              })
              .catch((err) => console.log(err));
          }
        } else {
          console.log("No item found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching from AsyncStorage:", error);
      }
    };

    fetchDataFromAsyncStorageAndCallApi();
  }, [apiCalled]);

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
          <ProfileHeaderLayout header={t("orders")} />
          <StatusBar style="light" backgroundColor={colors} />
          <ScrollView refreshControl={<RefreshControl refreshing={!apiCalled} onRefresh={()=>setApiCalled(false)}/>}>
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
                      {t("looks_like_you_need_to_make_orders")}
                    </Text>
                    <Text style={styles.noOrderTwo}>
                      {t("start_your_first_order")}
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
    backgroundColor: backgrounds,
    alignItems: "center",
  },

  floatNavigationContainer: {
    position: "absolute",
    bottom: hp(3),
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
    fontSize: hp(1.75),
    color: "grey",
    textAlign: "center",
  },

  noOrderTwo: {
    fontSize: hp(2),
    color: "grey",
    textAlign: "center",
  },

  homeBtnContainer: {
    marginTop: hp(4),
    width: wp(30),
    height: wp(10),
    alignItems: "center",
    backgroundColor: colors,
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
