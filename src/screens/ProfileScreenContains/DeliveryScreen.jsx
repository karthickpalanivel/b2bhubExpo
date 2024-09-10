import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import ProfileHeaderLayout from "./ProfileHeaderLayout";
import { orderData } from "../../data/OrderData";
import { useNavigation } from "@react-navigation/native";
import OrderCard from "../../components/Order/OrderCard";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import AppLoaderAnimation from "../../components/loaders/AppLoaderAnimation";



const DeliveryScreen = () => {
  const [status, setStatus] = useState("All");
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const navigationToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <View style={styles.container}>
          <ProfileHeaderLayout header={"Deliveries & Orders"} />
          <StatusBar style="light" backgroundColor="#4870F4" />
          {orderData.length !== 0 ? (
            <Text style={styles.orderHeader}>Orders</Text>
          ) : (
            <></>
          )}
          {orderData.length !== 0 ? (
            orderData?.map((item) => {
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
                    Looks like you need to make orders?
                  </Text>
                  <Text style={styles.noOrderTwo}>start your first order</Text>
                </View>
                <Pressable
                  style={styles.homeBtnContainer}
                  onPress={navigationToHome}
                >
                  <Text style={styles.homeBtnText}>Go Home</Text>
                </Pressable>
              </View>
            </>
          )}
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
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: hp(2),
  },
});
