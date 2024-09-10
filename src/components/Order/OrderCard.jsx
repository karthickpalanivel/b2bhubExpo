import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { EyeIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import PdfGeneration from "../InVoice/PdfGeneration";

const OrderCard = ({ props }) => {
  function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[today.getMonth()]; // Get the month name
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const navigateToInvoice = () => {};

  return (
    <Animated.View
      entering={FadeInRight.delay(200).duration(2000).springify().damping(12)}
      style={styles.orderContainer}
    >
      {props.payment_status ? (
        <><Text>Ordered Item: {props.product_name}</Text>
          <View style={styles.container}>
            <Text>Order id: {props.orderId}</Text>
            <Text>Date: {getCurrentDate()}</Text>
          </View>
          <View style={styles.container}>
            <Text>Price: ₹{props.total_amount}</Text>
            <Text>Quantity: {props.product_quantity} tons</Text>
          </View>
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
        <><Text>Ordered Item: {props.product_name}</Text>
          <View style={styles.container}>
            <Text>Order id: {props.invoiceId}</Text>
            <Text>Date: {getCurrentDate()}</Text>
          </View>
          <View style={styles.container}>
            <Text>Price: ₹{props.total_amount}</Text>
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
