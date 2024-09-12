import { StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import React, { useEffect, useState }  from "react";
import { EyeIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Font from "expo-font";

import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import PdfGeneration from "../InVoice/PdfGeneration";

const OrderCard = ({ props }) => {const [isLoading, setIsLoading] = useState(true);

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
    <Animated.View
      entering={FadeInRight.delay(200).duration(2000).springify().damping(12)}
      style={styles.orderContainer}
    >
      {props.payment_status ? (
        <>
        <Text>Ordered Item: {props.product_name}</Text>
          <View style={styles.container}>
            <Text>{props.product_name}</Text>
            <Text>Date: {props.date}</Text>
          </View>
          <View style={styles.container}>
            <Text>Order id: {props.invoiceId}</Text>
            <Text>Quantity: {props.product_quantity} tons</Text>
          </View>
          <Text>Price: ₹{props.total_amount}</Text>
          <View style={styles.container}>
            <View>
              <TouchableOpacity style={styles.iconContainer}>
                <EyeIcon size={wp(5)} color={"#4870F4"} />
                <Text style={styles.documentText}>InVoice</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <EyeIcon size={wp(5)} color={"#4870F4"} />
                <Text style={styles.documentText}>Receipt</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.completed}>Completed</Text>
            </View>
          </View>
        </>
      ) : (
        <>
        <Text>Ordered Item: {props.product_name}</Text>
          <View style={styles.container}>
            <Text>{props.product_name}</Text>

            <Text>Date: {props.date}</Text>
          </View>

          <View style={styles.container}>
            <View>
              <Text>Order id: {props.invoiceId}</Text>
              <Text>Price: ₹{props.total_amount}</Text>
            </View>
            <View>
              <Text>Quantity: {props.product_quantity} tons</Text>
              <Text style={[styles.process, { marginVertical: wp(1) }]}>
                Under Process
              </Text>
            </View>
          </View>
          {/* <View style={styles.container}>
            <View>
              <TouchableOpacity style={styles.iconContainer}>
                <EyeIcon size={wp(5)} color={"#4870F4"} />
                <Text style={styles.documentText}>InVoice</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <EyeIcon size={wp(5)} color={"#4870F4"} />
                <Text style={styles.documentText}>Receipt</Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </>
      )}
    </Animated.View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  orderContainer: {
    width: wp(90),
    marginHorizontal: wp(5),
    marginVertical: hp(1),
    backgroundColor: "#fff",
    padding: wp(3),
    borderRadius: wp(2),
    elevation: 3,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: wp(1),
  },
  iconContainer: {
    marginVertical: wp(1),
    flexDirection: "row",
    alignItems: "center",
  },
  documentText: {
    color: "#4870F4",
    marginHorizontal: wp(1),
  },
  completed: {
    color: "#42E642",
    fontWeight: "bold",
  },
  process: {
    color: "#E64242",
    fontWeight: "bold",
    textAlign: "right",
  },
});
