import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { EyeIcon, DocumentIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Font from "expo-font";

import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import PdfGeneration from "../InVoice/PdfGeneration";

const OrderCard = ({ props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [uploadDetails, setUploadDetails] = useState(true);
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

  const handleUploadDetails = () => {
    setUploadDetails(false);
  };

  return (
    <Animated.View
      entering={FadeInRight.delay(200).duration(2000).springify().damping(12)}
      style={styles.orderContainer}
    >
      {props.payment_status === 1 && props.payment_verified === 1 ? (
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
      {props.payment_status === 1 && props.payment_verified === 0 ? (
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
              {/* <TouchableOpacity style={styles.iconContainer}>
                <EyeIcon size={wp(5)} color={"#4870F4"} />
                <Text style={styles.documentText}>Receipt</Text>
              </TouchableOpacity> */}
            </View>
            <View>
              <Text style={styles.process}>under process</Text>
            </View>
          </View>
        </>
      ) : (
        <></>
      )}

      {props.payment_status === 0 && props.payment_verified === 0 ? (
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
              {uploadDetails ? (
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={handleUploadDetails}
                >
                  <DocumentIcon size={wp(5)} color={"#E64242"} />
                  <Text style={styles.document}>Upload Payment Details</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <Text style={styles.document}>
                    Our Team will update your status
                  </Text>
                </>
              )}
            </View>
            <View>
              <Text style={styles.pending}> Payment Pending</Text>
            </View>
          </View>
        </>
      ) : (
        <></>
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
  document: {
    color: "#E64242",
    marginHorizontal: wp(1),
  },
  pending: {
    color: "#E64242",
    fontWeight: "bold",
    textAlign: "right",
  },
  process: {
    color: "#fbbf24",
    textAlign: "right",
    fontWeight: "bold",
  },
});
