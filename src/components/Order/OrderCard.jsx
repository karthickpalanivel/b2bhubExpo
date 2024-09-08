import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { EyeIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const OrderCard = ({ props }) => {
  return (
    <View style={styles.orderContainer}>
      {props.paymentVerification ? (
        <>
          <View style={styles.container}>
            <Text>Order id: {props._id}</Text>
            <Text>Date: {props.date}</Text>
          </View>
          <View style={styles.container}>
            <Text>Price: ₹{props.productPrice}</Text>
            <Text>Quantity: {props.tonsQuantity} tons</Text>
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
              <Text style={styles.completed}> Completed</Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.container}>
            <Text>Order id: {props._id}</Text>
            <Text>Date: {props.date}</Text>
          </View>
          <View style={styles.container}>
            <Text>Price: ₹{props.productPrice}</Text>
            <Text>Quantity: {props.tonsQuantity} tons</Text>
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
              <Text style={styles.process}> Under Process</Text>
            </View>
          </View>
        </>
      )}
    </View>
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
  },
});
