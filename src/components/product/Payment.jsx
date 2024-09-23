import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import * as Font from "expo-font";

import { StatusBar } from "expo-status-bar";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import PdfGeneration from "../InVoice/PdfGeneration";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

// CustomCheckBox Component
export const CustomCheckBox = ({ value, onValueChange }) => (
  <TouchableOpacity
    style={[styles.checkbox, value && styles.checkboxChecked]}
    onPress={() => onValueChange(!value)}
  >
    {value && <Text style={styles.checkmark}>✓</Text>}
  </TouchableOpacity>
);

// PaymentSummary Component
const PaymentSummary = ({ route }) => {
  const [companyName, setCompanyName] = useState("");
  const [orderId, setOrderId] = useState(1);
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [requestSample, setRequestSample] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  const navigation = useNavigation();

  const { productSummary } = route.params;

  // console.log(productSummary);
  useEffect(() => {
    console.log("Payment Page");
    console.log(productSummary);
  }, []);

  const { t } = useTranslation();

  const orderPlaced = () => {
    const orderItems = {
      companyName: companyName,
      orderId: orderId,
      phoneNo: phoneNo,
      email: email,
      gstNo: gstNo,
      addressOne: addressOne,
      addressTwo: addressTwo,
      city: city,
      state: state,
      landmark: landmark,
      zipCode: zipCode,
      requestSample: requestSample ? "Yes" : "No",
    };
    setIsOrderSuccess(true);
    console.log(orderItems);
    setTimeout(() => {
      navigation.navigate("Sucessfull");
    }, 5000);
  };
  // const { productSummary } = route.params;
  // console.log("payment screen print");
  // console.log(productSummary);
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

  AsyncStorage.getItem("companyname")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        //console.log("Value:", value);
        setCompanyName(value);
      } else {
        // No value found
        console.log("No value found");
        setCompanyName("");
      }
    })
    .catch((error) => {
      // Error retrieving value
      console.error("Error:", error);
    });
  AsyncStorage.getItem("gst")
    .then((value) => {
      if (value !== null) {
        setGstNo(value);
        // Value was found, do something with it
        //console.log("Value:", value);
      } else {
        // No value found
        console.log("No value found");
        setGstNo("");
      }
    })
    .catch((error) => {
      // Error retrieving value
      console.error("Error:", error);
    });
  AsyncStorage.getItem("email")
    .then((value) => {
      if (value !== null) {
        setEmail(value);
        // Value was found, do something with it
        //console.log("Value:", value);
      } else {
        // No value found
        console.log("No value found");
        setEmail("");
      }
    })
    .catch((error) => {
      // Error retrieving value
      console.error("Error:", error);
    });
  AsyncStorage.getItem("phone")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        //console.log("Value:", value);
        setPhoneNo(value);
      } else {
        // No value found
        console.log("No value found");
        setPhoneNo("");
      }
    })
    .catch((error) => {
      // Error retrieving value
      console.error("Error:", error);
    });
  AsyncStorage.getItem("token")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        //console.log("Value:", value);
        setToken(value);
      } else {
        // No value found
        console.log("No value found");
      }
    })
    .catch((error) => {
      // Error retrieving value
      console.error("Error:", error);
    });

  const handleConfirmOrder = async () => {
    const orderUrl = `https://erp-backend-new-ketl.onrender.com/sales/addorder`;
    setProceedPaymentText("Processing...");
    let newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const invoiceIdRequest = await axios.post(
          `https://erp-backend-new-ketl.onrender.com/sales/getInoivceId`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const invoiceUrl = await generateInvoice(
          getInvoiceData(invoiceIdRequest.data[0].invoiceId)
        );
        const orderDetails = getOrderDetails(
          invoiceUrl,
          invoiceIdRequest.data[0].invoiceId
        );
        await axios.post(orderUrl, orderDetails, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        setProceedPaymentText("Thanks For Business");
        setIsOrderSuccessful(true);
        setModelOpen(true);

        console.log("Order Confirmed and email sent");
      } catch (error) {
        console.error("Error processing the order:", error);
        setProceedPaymentText("Failed. Try Again");
      }
    } else {
      toast.error("Error with making purchase", { position: "top-center" });
      setProceedPaymentText("Failed. Try Again");
      setErrors(newErrors);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const gstCalculatedPrice = () =>{
    return productSummary.currentOrderPrice + (productSummary.currentOrderPrice * productSummary.gst) 
  }

  const translatedProductName = () => {
    if (productSummary.productName == "ToorDal") return t("toor_dal");
    if (productSummary.productName == "MoongDal") return t("moong_dal");
    if (productSummary.productName == "UradDal") return t("urad_dal");
    if (productSummary.productName == "GramDal") return t("gram_dal");
  };

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <ScrollView style={styles.container}>
          <StatusBar backgroundColor="white" />
          {/* Total Price Card */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={goBack} style={styles.icon}>
              <ArrowLeftIcon color="#4870F4" size={hp(3)} strokeWidth={2} />
            </TouchableOpacity>
            <Text style={styles.goback}>{t("go_back_for_changes")}</Text>
          </View>
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>{t("order_summary")}</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{t("product_name")}</Text>
                <Text style={styles.tableCell}>{translatedProductName()}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{t("total_price")}</Text>
                <Text style={styles.tableCell}>
                  ₹ {productSummary.currentOrderPrice}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>
                  {t("gst")} ({t("exempted")})
                </Text>
                <Text style={styles.tableCell}>{productSummary.gst}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{t("total_amount")}</Text>
                <Text style={styles.tableCell}>
                  ₹ {productSummary.totalAmount}
                </Text>
              </View>
            </View>
          </View>

          {/* QR Code Payment Card */}
          <View style={styles.card}>
            {/* QR Code Placeholder */}
            {/* <Text style={[styles.cardTitle, { fontSize: 15 }]}>
              Scan the QR to Proceed with the Payment
            </Text>
            
            <View style={styles.qrPlaceholder}>
              <Text>QR Code Placeholder</Text>
            </View>
            <Text style={styles.cardContent}>Or</Text> */}
            <Text style={styles.cardTitle}>{t("bank_details")}</Text>
            <Text style={styles.cardContent}>
              {t("account_number")}: 3940002100057010
            </Text>
            <Text style={styles.cardContent}>
              {t("ifsc_code")}: PUNB03940000
            </Text>
            <Text style={styles.cardContent}>{t("bank_name")}</Text>
          </View>

          {/* Buyer's Information Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t("buyers_information")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("company_name")}
              value={companyName}
              onChangeText={setCompanyName}
            />
            <TextInput
              style={styles.input}
              placeholder={t("phone")}
              value={phoneNo}
              onChangeText={setPhoneNo}
            />
            <TextInput
              style={styles.input}
              placeholder={t("email")}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder={t("gst_number")}
              value={gstNo}
              onChangeText={setGstNo}
            />
            <Text style={styles.cardTitle}>{t("delivery_address")}</Text>

            <TextInput
              style={styles.input}
              placeholder={t("address_line_1")}
              value={addressOne}
              onChangeText={setAddressOne}
            />

            <TextInput
              style={styles.input}
              placeholder={t("address_line_2")}
              value={addressTwo}
              onChangeText={setAddressTwo}
            />

            <TextInput
              style={styles.input}
              placeholder={t("city")}
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={styles.input}
              placeholder={t("state")}
              value={state}
              onChangeText={setState}
            />
            <TextInput
              style={styles.input}
              placeholder={t("landmark")}
              value={landmark}
              onChangeText={setLandmark}
            />
            <TextInput
              style={styles.input}
              placeholder={t("pin_code")}
              value={zipCode}
              onChangeText={setZipCode}
            />
            {/* Request for Sample Checkbox */}
            <View style={styles.checkboxContainer}>
              <CustomCheckBox
                value={requestSample}
                onValueChange={setRequestSample}
              />
              <Text style={styles.checkboxLabel}>
                {t("request_for_sample")}
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={{ fontSize: 13, fontFamily: "QuicksandSemiBold" }}>
              {t("send_payment_transaction_details")}
            </Text>
            <Text style={styles.supportEmail}>Support@b2bhubindia.com</Text>
          </View>

          <View style={styles.deliveryDetails}>
            <Text style={styles.cardTitle}>{t("delivery_details")}</Text>
            <Text style={styles.cardContent}>{t("delivery_time")}</Text>
            <Text style={{ color: "#4870F4", fontFamily: "QuicksandSemiBold" }}>
              **{t("conditions_apply")}
            </Text>
            <Text style={styles.cardContent}>{t("samples_can_be_sent")} </Text>

            <Pressable onPress={orderPlaced} style={styles.preBookContainer}>
              <Text style={styles.preBookText}>
                {isOrderSuccess ? t("processing") : t("pre_book_order")}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: "#f0f0f0",
    marginTop: wp(5),
  },
  card: {
    backgroundColor: "white",
    padding: wp(4),
    marginBottom: wp(4),
    borderRadius: wp(2.5),
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  cardTitle: {
    marginBottom: wp(3),
    fontSize: wp(4),
    // fontWeight: "bold",
    fontFamily: "QuicksandSemiBold",
    color: "#4870F4",
  },
  cardContent: {
    fontSize: 14,
    color: "#333",
    fontFamily: "QuicksandSemiBold",
  },
  qrPlaceholder: {
    height: wp(26),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: wp(2.5),
    marginTop: wp(2.5),
    marginBottom: wp(2.5),
  },
  input: {
    height: wp(10),
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: wp(2.25),
    marginBottom: wp(2.5),
    paddingHorizontal: wp(2.5),
    fontFamily: "QuicksandSemiBold",
    width: "100%",
  },
  table: {
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: wp(2.5),
    width: "100%",
  },
  tableCell: {
    fontSize: wp(3.5),
    color: "#333",
    fontFamily: "QuicksandSemiBold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: wp(3.5),
    width: "100%",
  },
  checkbox: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(1),
    borderWidth: wp(0.5),
    borderColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(2.5),
  },
  checkboxChecked: {
    backgroundColor: "#007bff",
  },
  checkmark: {
    fontSize: wp(3.5),
    color: "white",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
    fontFamily: "QuicksandSemiBold",
  },
  supportEmail: {
    padding: wp(2.5),

    color: "#4870F4",
  },
  deliveryDetails: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: wp(3.75),
    paddingHorizontal: wp(3.75),
    marginBottom: wp(3.75),
  },

  headerContainer: {
    width: hp(30),
    marginBottom: wp(5),
    padding: wp(3),
    backgroundColor: "white",
    borderRadius: 9999,
    alignItems: "center",
    flexDirection: "row",
  },
  goback: {
    fontSize: wp(4),
    marginLeft: wp(5),
    color: "#4870F4",
    // fontWeight: "bold",
    fontFamily: "QuicksandSemiBold",
  },
  header: {
    fontSize: wp(5),
    marginLeft: wp(3),
    color: "white",
  },

  preBookContainer: {
    backgroundColor: "#4870F4",
    padding: wp(2),
    justifyContent: "center",
    borderRadius: wp(4),
    marginVertical: wp(4),
    marginHorizontal: wp(1),
    width: wp(80),
  },
  preBookText: {
    color: "white",
    textAlign: "center",
    fontFamily: "QuicksandSemiBold",
  },
});

export default PaymentSummary;
