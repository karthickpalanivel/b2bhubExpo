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

  const navigation = useNavigation();

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
    console.log(orderItems);
    navigation.navigate("Sucessfull");
  };
  const { productSummary } = route.params;
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
  console.log(route);
  const goBack = () => {
    navigation.goBack();
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
            <Text style={styles.goback}>Go back for Changes</Text>
          </View>
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Payment Summary</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Total Price</Text>
                <Text style={styles.tableCell}>₹ 1,04,45,23,411</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>GST (Exempted)</Text>
                <Text style={styles.tableCell}>₹ 0</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Total Amount</Text>
                <Text style={styles.tableCell}>₹ 1,84,78,23,434</Text>
              </View>
            </View>
          </View>

          {/* QR Code Payment Card */}
          <View style={styles.card}>
            <Text style={[styles.cardTitle, { fontSize: 15 }]}>
              Scan the QR to Proceed with the Payment
            </Text>
            {/* QR Code Placeholder */}
            <View style={styles.qrPlaceholder}>
              <Text>QR Code Placeholder</Text>
            </View>
            <Text style={styles.cardContent}>Or</Text>
            <Text style={styles.cardTitle}>Bank Details</Text>
            <Text style={styles.cardContent}>
              Account Number: 3940002100057010
            </Text>
            <Text style={styles.cardContent}>IFSC Code: PUNB03940000</Text>
            <Text style={styles.cardContent}>
              Bank Name: Punjab National Bank
            </Text>
          </View>

          {/* Buyer's Information Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Buyer’s Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Company Name"
              value={companyName}
              onChangeText={setCompanyName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone No"
              value={phoneNo}
              onChangeText={setPhoneNo}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="GST No"
              value={gstNo}
              onChangeText={setGstNo}
            />
            <Text style={styles.cardTitle}>Delivery Address</Text>

            <TextInput
              style={styles.input}
              placeholder="Address Line 1"
              value={addressOne}
              onChangeText={setAddressOne}
            />

            <TextInput
              style={styles.input}
              placeholder="Address Line 2"
              value={addressTwo}
              onChangeText={setAddressTwo}
            />

            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={state}
              onChangeText={setState}
            />
            <TextInput
              style={styles.input}
              placeholder="Landmark"
              value={landmark}
              onChangeText={setLandmark}
            />
            <TextInput
              style={styles.input}
              placeholder="Zip code"
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
                Request for Sample (optional)
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              Send the Payment Transaction Details to this Mail
            </Text>
            <Text style={styles.supportEmail}>Support @b2bhubindia.com</Text>
          </View>

          <View style={styles.deliveryDetails}>
            <Text style={styles.cardTitle}>Delivery Details</Text>
            <Text style={styles.cardContent}>
              Delivery takes 3 to 7 business days from the date of payment.
            </Text>
            <Text style={{ color: "#4870F4" }}>**Conditions apply.</Text>
            <Text style={styles.cardContent}>
              The samples can be sent to the provided address on request.
            </Text>

            <Pressable
              onPress={orderPlaced}
              style={{
                backgroundColor: "#4870F4",
                padding: 8,
                justifyContent: "center",
                borderRadius: 15,
                margin: 5,
                width: "100%",
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Pre Book Order
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
    padding: 20,
    backgroundColor: "#f0f0f0",
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  cardTitle: {
    marginVertical: wp(5),
    fontSize: 16,
    fontWeight: "bold",
    color: "#4870F4",
  },
  cardContent: {
    fontSize: 14,
    color: "#333",
  },
  qrPlaceholder: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  table: {
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
  },
  tableCell: {
    fontSize: 14,
    color: "#333",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#007bff",
  },
  checkmark: {
    fontSize: 14,
    color: "white",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },
  supportEmail: {
    padding: 10,

    color: "#4870F4",
  },
  deliveryDetails: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
  },

  headerContainer: {
    width: hp(30),
    marginBottom: wp(5),
    padding: wp(3),
    backgroundColor: "white",
    borderRadius: 999,
    alignItems: "center",
    flexDirection: "row",
  },
  goback: {
    fontSize: wp(4),
    marginLeft: wp(5),
    color: "#4870F4",
    fontWeight: "bold",
  },
  header: {
    fontSize: wp(5),
    marginLeft: wp(3),
    color: "white",
  },
});

export default PaymentSummary;
