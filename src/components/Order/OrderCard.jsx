import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
  EyeIcon,
  DocumentIcon,
  XCircleIcon,
} from "react-native-heroicons/solid";

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
  const [modalVisible, setModalVisible] = useState(false);

  const show = () => setModalVisible(true);
  const hide = () => setModalVisible(false);
  const changeValue = () => {
    hide();
    setUploadDetails(false)
  };

  const showModal = () => {
    hide();
    show();
  };

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

  const PaymentDetailsModal = ({
    visible,
    productName,
    productPrice,
    productQuantity,
  }) => {
    const [accountNumber, setAccountNumber] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(true);
    const monthInLetters = [
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

    const onChangeDate = (selecteDate) => {
      const currentDate = selecteDate || date;
    };

    const formatDate = () => {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${day < 10 ? `0${day}` : day}-${monthInLetters[month]}-${year}`;
    };

    return (
      <Modal
        visible={visible}
        animationType="slide"
        animationDuration={1000}
        onRequestClose={hide}
        transparent
      >
        <SafeAreaView style={styles.fill}>
          <View style={styles.inputContainer}>
            <View>
              <TouchableOpacity>
                <XCircleIcon size={wp(8)} style={styles.icon} onPress={hide} />
              </TouchableOpacity>
              <View>
                <Text style={styles.modalText}>
                  Product Name: {productName}
                </Text>
              </View>
              <View>
                <Text style={styles.modalText}>
                  Product Price: ₹ {productPrice}
                </Text>
              </View>
              <View>
                <Text style={styles.modalText}>
                  Product Quantity: {productQuantity} ton
                </Text>
              </View>
              <View style={{ marginTop: hp(3) }}>
                <Text>Account Number</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setAccountNumber(text)}
                  placeholderTextColor={"#4870F4"}
                />
              </View>
              <View>
                <Text>Transaction ID</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setTransactionId(text)}
                  placeholderTextColor={"#4870F4"}
                />
              </View>
              <View>
                <Text>Transaction Date</Text>
                <TouchableOpacity>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setTransactionId(text)}
                  placeholderTextColor={"#4870F4"}
                />
                </TouchableOpacity>
              </View>
              <View>
                <Text>Amount</Text>
                <TextInput
                  style={styles.textInput}
                  value={productPrice}
                  disable
                  placeholderTextColor={"#4870F4"}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={changeValue}
              style={styles.conformContainer}
            >
              <Text style={styles.conformText}>confirm</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <Animated.View
      entering={FadeInRight.delay(200).duration(2000).springify().damping(12)}
    >
      <LinearGradient
        colors={["#ffFDe0", "#ffFDeF"]}
        style={styles.orderContainer}
      >
        <>
          <View style={styles.container}>
            <Text style={styles.productText}>{props.product_name}</Text>
            <Text style={styles.productText}>Date: {props.date_of_order}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.productText}>Order id: {props.orderId}</Text>
            <Text style={styles.productText}>
              Quantity: {props.product_quantity} tons
            </Text>
          </View>
          <Text style={styles.productText}>Price: ₹{props.total_amount}</Text>

          {props.payment_status === 1 && props.payment_verified === 1 ? (
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
                <Text style={styles.completed}>✅Completed</Text>
              </View>
            </View>
          ) : (
            <></>
          )}
          {props.payment_status === 2 && props.payment_verified === 0 ? (
            <View style={styles.container}>
              <TouchableOpacity style={styles.iconContainer}>
                <EyeIcon size={wp(5)} color={"#4870F4"} />
                <Text style={styles.documentText}>InVoice</Text>
              </TouchableOpacity>
              <View>
                <Text style={styles.process}>⏱️under process</Text>
              </View>
            </View>
          ) : (
            <></>
          )}
          {props.payment_status === 3 && props.payment_verified === 0 ? (
            <>
              <View style={styles.container}>
                <View>
                  <TouchableOpacity style={styles.iconContainer}>
                    <EyeIcon size={wp(5)} color={"#4870F4"} />
                    <Text style={styles.documentText}>InVoice</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.pending}>⌛Payment Pending</Text>
                </View>
              </View>
              {uploadDetails ? (
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => showModal()}
                >
                  <DocumentIcon size={wp(5)} color={"#E64242"} />
                  <Text style={styles.document}>
                    Click here to Upload Payment Details
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  <Text style={styles.document}>
                    Our Team will update your status
                  </Text>
                </>
              )}
            </>
          ) : (
            <></>
          )}
          {props.payment_status === 4 && props.payment_verified === 0 ? (
            <View style={styles.container}>
              <View>
                {/* <TouchableOpacity style={styles.iconContainer}>
                <EyeIcon size={wp(5)} color={"#4870F4"} />
                <Text style={styles.documentText}>InVoice</Text>
              </TouchableOpacity> */}
                {uploadDetails ? (
                  <></>
                ) : (
                  <>
                    <Text style={styles.document}>
                      Our Team will update your Order status
                    </Text>
                  </>
                )}
              </View>
              <View>
                <Text style={styles.pending}>☹️Rejected</Text>
              </View>
            </View>
          ) : (
            <></>
          )}

          <PaymentDetailsModal
            visible={modalVisible}
            productName={props.product_name}
            productPrice={props.total_amount}
            productQuantity={props.product_quantity}
          />
        </>
      </LinearGradient>
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
    width: "100%",
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
    fontFamily: "QuicksandSemiBold",
    marginHorizontal: wp(1),
  },

  productText: {
    fontFamily: "QuicksandSemiBold",
  },
  completed: {
    color: "#42E642",
    // fontWeight: "bold",
    fontFamily: "QuicksandSemiBold",
  },
  document: {
    color: "#E64242",
    marginHorizontal: wp(1),
    fontFamily: "QuicksandSemiBold",
  },
  pending: {
    color: "#E64242",
    // fontWeight: "bold",
    fontFamily: "QuicksandSemiBold",
    textAlign: "right",
  },
  process: {
    color: "#fbbf24",
    textAlign: "right",
    // fontWeight: "bold",
    fontFamily: "QuicksandSemiBold",
  },

  safeAreaContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: wp(100),
    height: hp(100),
    borderTopRightRadius: wp(3),
    borderTopLeftRadius: wp(3),
  },
  fill: {
    position: "absolute",
    bottom: hp(10),
    alignItems: "center",
    width: wp(90),
    height: hp(60),
  },
  textInput: {
    marginBottom: hp(2),
    borderWidth: 0.2,
    padding: wp(2),
    borderRadius: wp(1),
  },
  inputContainer: {
    marginLeft: wp(10),
    borderWidth: 1,
    borderColor: "#4870F4",
    elevation: 1,
    borderRadius: wp(1),
    width: wp(90),
    padding: wp(4),
    backgroundColor: "#fff",
  },
  icon: {
    position: "absolute",
    right: 0,
    color: "#4870F4",
  },
  conformContainer: {
    marginTop: hp(2),
    marginLeft: wp(1),
    width: wp(25),
    backgroundColor: "#4870F4",
    padding: wp(3),
    borderRadius: 10,
  },
  conformText: {
    color: "white",
    // fontWeight: "bold",
    fontFamily: "QuicksandSemiBold",
    textAlign: "center",
  },
  modalText: {
    color: "#000",
    fontSize: hp(2.2),
    fontFamily: "QuicksandSemiBold",
  },
});
