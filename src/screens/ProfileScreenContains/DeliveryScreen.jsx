import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import ProfileHeaderLayout from "./ProfileHeaderLayout";
import { orderData } from "../../data/OrderData";
import { useNavigation } from "@react-navigation/native";
import OrderCard from "../../components/Order/OrderCard";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const DeliveryScreen = () => {
  const [status, setStatus] = useState("All");
  const navigation = useNavigation();

  const [all, setAll] = useState(true);
  const [pending, setPending] = useState(false);
  const [complete, setComplete] = useState(false);

  const allFilter = () => {
    setAll(true);
    setPending(false);
    setComplete(false);
  };

  const pendingFilter = () => {
    setAll(false);
    setPending(true);
    setComplete(false);
  };

  const completeFilter = () => {
    setAll(false);
    setPending(false);
    setComplete(true);
  };
  return (
    <View>
      <ProfileHeaderLayout header={"Deliveries & Orders"} />
      {orderData.length !== 0 ? (
        <>
          <Text style={styles.orderHeader}>Orders</Text>

          <View style={{ alignItems: "center" }}>
            <View style={styles.filterContainer}>
              <TouchableOpacity onPress={allFilter}>
                <Text style={all ? styles.filterText : styles.normal}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={completeFilter}>
                <Text style={complete ? styles.filterText : styles.normal}>
                  Completed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={pendingFilter}>
                <Text style={pending ? styles.filterText : styles.normal}>
                  Process
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <></>
      )}
      {orderData.length !== 0 ? (
        orderData?.map((item) => {
          return (
            <>
              <OrderCard props={item} />
            </>
          );
        })
      ) : (
        <>
          <View style={styles.container}>
            <View styles={styles.imageCard}>
              <Image
                source={require("../../assets/orders/noOrders.png")}
                styles={styles.imageCard}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  imageCard: {
    width: wp(100),
    height: wp(100),
    marginTop: hp(50),
  },
  orderHeader: {
    fontSize: hp(3),
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: hp(2),
  },
  filterContainer: {
    width: wp(90),
    marginVertical: hp(2),
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    paddingVertical: wp(3),
    borderRadius: 9999,
    borderWidth: 0.1,
    elevation: 8,
  },
  filterTextContainer: {
    backgroundColor: "#4870F4",
  },
  filterText: {
    fontWeight: "bold",
    color: "#4870F4",
    textDecorationColor: "#4870F4",
    textDecorationLine: "underline",
  },
  normal: {
    fontSize: wp(3.5),
  },
});
