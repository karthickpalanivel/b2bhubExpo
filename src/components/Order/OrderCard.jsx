import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
  Linking,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Font from "expo-font";

import Animated, { FadeInRight } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import AppLoaderAnimation from "../loaders/AppLoaderAnimation";
import { useNavigation } from "@react-navigation/native";

const colors = "#EF5A6F";
const backgrounds = "#FCF8F3";

const OrderCard = ({ props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [uploadDetails, setUploadDetails] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
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

  const { t } = useTranslation();

  const show = () => setModalVisible(true);
  const hide = () => setModalVisible(false);
  const changeValue = () => {
    hide();
    setUploadDetails(false);
  };

  const showModal = () => {
    hide();
    show();
  };
  const navigation = useNavigation();
  const PdfResource = props.invoiceUrl;
  const openInvoice = async () => {
    try {
      const canOpen = await Linking.canOpenURL(PdfResource);
      if (!canOpen) {
        Alert.alert("Error on opening PDF links");
        throw new Error("Error occured");
      }
      await Linking.openURL(PdfResource);
    } catch (err) {
      console.log("Error on opening PDF : ", err);
    }
  };

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
        <ScrollView style={styles.fill}>
          {/* <TouchableOpacity
            style={styles.backContainer}
            onPress={() => setModalVisible(false)}
          >
            <ChevronLeftIcon
              size={wp(4)}
              color={colors}
              zIndex={500}
              strokeWidth={wp(1)}
              style={{ flexBasis: "flex-start" }}
            />
          </TouchableOpacity> */}
          <SafeAreaView
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: hp(90),
            }}
          >
            <View style={styles.inputContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.modalText}>
                    {t("product_name")}: {productName}
                  </Text>

                  <Text style={styles.modalText}>
                    {t("product") + " " + t("price")}: ₹ {productPrice}
                  </Text>

                  <Text style={styles.modalText}>
                    {t("product") + " " + t("quantity")}: {productQuantity} ton
                  </Text>
                </View>
                <TouchableOpacity style={{ zIndex: 700 }}>
                  <Feather
                    name="x-circle"
                    size={wp(8)}
                    style={styles.icon}
                    onPress={() => setModalVisible(false)}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: hp(3) }}>
                <Text style={styles.inputLabel}>{t("account_number")}</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setAccountNumber(text)}
                  placeholderTextColor={"grey"}
                  placeholder={t("account_number")}
                />
              </View>
              <View>
                <Text style={styles.inputLabel}>{t("transaction_id")}</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setTransactionId(text)}
                  placeholderTextColor={"grey"}
                  placeholder={t("transaction_id")}
                />
              </View>
              <View>
                <Text style={styles.inputLabel}>{t("transaction_date")}</Text>
                <TouchableOpacity>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setTransactionId(text)}
                    placeholderTextColor={"grey"}
                    placeholder={t("transaction_date")}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.inputLabel}>{t("amount")}</Text>
                <TextInput
                  style={styles.textInput}
                  value={productPrice}
                  disable
                  placeholder={t("amount")}
                />
              </View>
              <TouchableOpacity
                onPress={changeValue}
                style={styles.conformContainer}
              >
                <Text style={styles.conformText}>{t("confirm")}</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </Modal>
    );
  };

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <Animated.View
          entering={FadeInRight.delay(200)
            .duration(2000)
            .springify()
            .damping(12)}
        >
          <LinearGradient
            colors={["#ffFDe0", "#ffFDeF"]}
            style={styles.orderContainer}
          >
            <>
              <View style={styles.container}>
                <Text style={styles.productText}>
                  {t("product_name")} : {props.product_name}
                </Text>
                <Text style={styles.productText}>
                  {t("date")}: {props.date_of_order}
                </Text>
              </View>
              <View style={styles.container}>
                <Text style={styles.productText}>
                  {t("order_id")}: {props.orderId}
                </Text>
                <Text style={styles.productText}>
                  {t("quantity")}: {props.product_quantity} {t("tonnes")}
                </Text>
              </View>
              <Text style={styles.productText}>
                {t("price")}: ₹{props.total_amount}
              </Text>

              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={openInvoice}
                >
                  <Feather name="eye" size={wp(5)} color={"#4870F4"} />
                  <Text style={styles.documentText}>{t("invoice")}</Text>
                </TouchableOpacity>
                {props.payment_status ? (
                  <>
                    {props.payment_verified ? (
                      <>
                        {props.deliveryStatus ? (
                          <>
                            <Text style={styles.completed}>
                              ✅{t("completed")}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text style={styles.completed}>
                              🚚{t("shipped")}
                            </Text>
                          </>
                        )}
                      </>
                    ) : (
                      <Text style={styles.process}>⏱️{t("under_process")}</Text>
                    )}
                  </>
                ) : (
                  <View>
                    {uploadDetails ? (
                      <View style={{ width: wp(50) }}>
                        <TouchableOpacity
                          style={styles.iconContainer}
                          onPress={() => showModal()}
                        >
                          <Ionicons
                            name="document"
                            size={wp(5)}
                            color={"#E64242"}
                          />
                          <Text style={styles.document}>
                            {t("upload_payment_details")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <>
                        <Text style={styles.document}>
                          {t("our_team_will_update_your_status")}
                        </Text>
                      </>
                    )}
                    <View style={{ width: wp(45), marginVertical: wp(2) }}>
                      <Text style={styles.pending}>
                        ⌛{t("payment_pending")}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              <PaymentDetailsModal
                visible={modalVisible}
                productName={props.product_name}
                productPrice={props.total_amount}
                productQuantity={props.product_quantity}
              />
            </>
          </LinearGradient>
        </Animated.View>
      )}
    </>
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
    textAlign: "left",
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
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  textInput: {
    marginBottom: hp(2),
    borderWidth: 0.2,
    padding: wp(2),
    borderRadius: wp(1),
  },
  inputContainer: {
    borderWidth: 1,

    borderColor: colors,
    elevation: 1,
    borderRadius: wp(1),
    width: wp(90),
    padding: wp(4),
    backgroundColor: "#fff",
  },
  icon: {
    // position: "absolute",
    // right: 0,
    color: colors,
  },
  conformContainer: {
    marginTop: hp(2),
    marginLeft: wp(1),
    width: wp(25),
    backgroundColor: colors,
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
  inputLabel: {
    marginBottom: wp(2),
  },
  backContainer: {
    width: wp(10),
    height: wp(10),
    marginTop: hp(3),
    marginLeft: wp(5),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: wp(999),
  },
});

/*

{props.payment_status === true &&
              props.payment_verified === true ? (
                <View style={styles.container}>
                  <View>
                    <TouchableOpacity style={styles.iconContainer}>
                      <EyeIcon size={wp(5)} color={"#4870F4"} />
                      <Text style={styles.documentText}>{t("invoice")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer}>
                      <EyeIcon size={wp(5)} color={"#4870F4"} />
                      <Text style={styles.documentText}>Receipt</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={styles.completed}>✅{t("completed")}</Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
              {props.payment_status === true &&
              props.payment_verified === false ? (
                <View style={styles.container}>
                  <TouchableOpacity
                    style={[styles.iconContainer, { alignItems: "center" }]}
                  >
                    <EyeIcon size={wp(5)} color={"#4870F4"} />
                    <Text style={styles.documentText}>{t("invoice")}</Text>
                  </TouchableOpacity>
                  <Text style={styles.process}>⏱️{t("under_process")}</Text>
                </View>
              ) : (
                <></>
              )}
              {props.payment_status === false &&
              props.payment_verified === false ? (
                <>
                  <View style={styles.container}>
                    <TouchableOpacity style={styles.iconContainer}>
                      <EyeIcon size={wp(5)} color={"#4870F4"} />
                      <Text style={styles.documentText}>{t("invoice")}</Text>
                    </TouchableOpacity>

                    <Text style={styles.pending}>⌛{t("payment_pending")}</Text>
                  </View>

                  {uploadDetails ? (
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={() => showModal()}
                    >
                      <DocumentIcon size={wp(5)} color={"#E64242"} />
                      <Text style={styles.document}>
                        {t("upload_payment_details")}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <Text style={styles.document}>
                        {t("our_team_will_update_your_status")}
                      </Text>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
              {props.payment_status === false &&
              props.payment_verified === true ? (
                <View style={styles.container}>
                  <View>
                    <TouchableOpacity style={styles.iconContainer}>
                      <EyeIcon size={wp(5)} color={"#4870F4"} />
                      <Text style={styles.documentText}>{t("invoice")}</Text>
                    </TouchableOpacity>
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
                    <Text style={styles.pending}>☹️{t("rejected")}</Text>
                  </View>
                </View>
              ) : (
                <></>
              )}







                      <SafeAreaView style={styles.fill}>
          <View style={styles.inputContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.modalText}>
                {t("product_name")}: {productName}
              </Text>

              <Text style={styles.modalText}>
                {t("product") + " " + t("price")}: ₹ {productPrice}
              </Text>

              <Text style={styles.modalText}>
                {t("product") + " " + t("quantity")}:{" "}
                {productQuantity + t("tonnes")}
              </Text>

              <TouchableOpacity style={{ zIndex: 500 }}>
                <XCircleIcon
                  size={wp(8)}
                  style={styles.icon}
                  onPress={() => hide}
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: hp(3) }}>
              <Text>{t("account_number")}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => setAccountNumber(text)}
                placeholderTextColor={colors}
                placeholder={t("account_number")}
              />
            </View>
            <View>
              <Text>{t("transaction_id")}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => setTransactionId(text)}
                placeholderTextColor={colors}
                placeholder={t("transaction_id")}
              />
            </View>
            <View>
              <Text>{t("transaction_date")}</Text>
              <TouchableOpacity>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setTransactionId(text)}
                  placeholderTextColor={colors}
                  placeholder={t("transaction_date")}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text>{t("amount")}</Text>
              <TextInput
                style={styles.textInput}
                value={productPrice}
                disable
                placeholderTextColor={colors}
              />
            </View>

            <TouchableOpacity
              onPress={changeValue}
              style={styles.conformContainer}
            >
              <Text style={styles.conformText}>{t("conform")}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

*/
