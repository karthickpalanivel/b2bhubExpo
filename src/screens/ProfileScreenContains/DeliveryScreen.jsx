import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProfileHeaderLayout from "./ProfileHeaderLayout";
import { orderData } from "../../data/OrderData";
import { useNavigation } from "@react-navigation/native";
import OrderCard from "../../components/Order/OrderCard";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from "expo-font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios"
import { StatusBar } from "expo-status-bar";
const DeliveryScreen = () => {
  const [status, setStatus] = useState("All");
  const [visible, setVisible] = useState(true);
  const navigation = useNavigation();
  const [orderDetails, setOrderDetails] = useState([]);
  const [isFetching ,setIsFetching] = useState(true);
  const [token, setToken] = useState("");
  const [loading, setloading] = useState(true);

  AsyncStorage.getItem('token')
  .then((value) => {
    if (value !== null) {
      // Value was found, do something with it
      setToken(value)
      setIsFetching(true)
    const url = 'https://erp-backend-new-ketl.onrender.com/sales/viewOrders'
    axios
      .post(url,{},{headers: {
        Authorization: `Bearer ${value}`,
        "Content-Type": "application/json",
      }})
      .then((res) => {
        setOrderDetails(res.data.reverse());
        setIsFetching(false)
        
      })
      .catch((err) => console.log(err));
    } else {
      // No value found
      console.log('No value found');
    }
  })
  .catch((error) => {
    // Error retrieving value
    console.error('Error:', error);
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



  return (
    <View style={styles.container}>
      <ProfileHeaderLayout header={"Deliveries & Orders"} />
      <StatusBar style="light" backgroundColor="#4870F4" />
      {orderDetails.length !== 0 ? (
        <Text style={styles.orderHeader}>Orders</Text>
      ) : (
        <></>
      )}
      {orderDetails.length !== 0 ? (
        orderDetails?.map((item) => {
          return (
            <>
              <OrderCard props={item} key={item.orderId}/>
            </>
          );
        })
      ) : (
        <>
          <View style={styles.container}>
            <View styles={styles.imageCard}>
              <Text>Looks like you need to make orders</Text>
            </View>
            <View>
              <Text>start your first order</Text>
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
    backgroundColor: "#fefefe",
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
});
