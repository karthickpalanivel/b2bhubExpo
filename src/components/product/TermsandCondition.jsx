import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Font from "expo-font";
import { XCircleIcon } from "react-native-heroicons/outline";
import { useTranslation } from "react-i18next";
import AppLoaderAnimation from "../loaders/AppLoaderAnimation";
const colors="#E84A5F";
const backgrounds="#FCF8F3";

const CustomCheckBox = ({ value, onValueChange }) => (
  <TouchableOpacity
    style={[styles.checkbox, value && styles.checkboxChecked]}
    onPress={() => onValueChange(!value)}
  >
    {value && <Text style={styles.checkmark}>✓</Text>}
  </TouchableOpacity>
);

const TermsAndConditionsModal = ({
  visible,
  onClose,
  productId,
  currentOrderPrice,
  totalAmount,
  productName,
  productQuantity,
  productType,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [productSummary, setProductSummary] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  // Object.entries(finalDetails).forEach((key, objects) => {
  //   console.log(key + " : " + objects);
  // });
  // const finalDetails = finalValue;

  // useEffect(() => {
  //   if (finalDetails) {
  //     console.log("Final Details: ", finalDetails);
  //     setProductSummary(finalDetails);
  //   }
  //   console.log("productSummary : " + productSummary);
  // }, [finalDetails]);

  useEffect(() => {
    const productSummaryDetails = {
      productName: productName,
      totalAmount: totalAmount,
      currentOrderPrice: currentOrderPrice,
      productId: productId,
      productQuantity: productQuantity,
      productType: productType,
    };

    setProductSummary(productSummaryDetails);

    console.log(
      productId,
      currentOrderPrice,
      totalAmount,
      productName,
      productType
    );
    console.log(
      "Product Summary Details Name: " + JSON.stringify(productSummaryDetails)
    );

    const translatedCategory = () => {
      return t(productDetails.productType).split(" ")[0];
    };

    const translatedProductName = () => {
      if (productDetails.productName == "ToorDal") return t("toor_dal");
      if (productDetails.productName == "MoongDal") return t("moong_dal");
      if (productDetails.productName == "UradDal") return t("urad_dal");
      if (productDetails.productName == "GramDal") return t("gram_dal");
    };

    const combinedName = () => {
      return (
        translatedCategory(productDetails.productType) +
        " " +
        translatedProductName()
      );
    };
  }, []);

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

  const proceedToPayment = () => {
    console.log(productSummary);
  };

  const handleComplete = () => {
    if (isChecked) {
      console.log(productSummary);
      navigation.navigate("paymentSummary", { productSummary: productSummary });
    } else {
      alert("Please agree to the terms and conditions.");
    }
  };

  const { t } = useTranslation();

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : visible ? (
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <XCircleIcon color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{t("terms_and_condition")}: </Text>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.termsText}>
                1. <Text style={styles.boldText}>{t("introduction")}: </Text>{" "}
                {t("terms_intro")}
              </Text>
              <Text style={styles.termsText}>
                2. <Text style={styles.boldText}>{t("eligibility")}: </Text>{" "}
                {t("business_use")}
              </Text>
              <Text style={styles.termsText}>
                3.{" "}
                <Text style={styles.boldText}>{t("account_creation")}: </Text>{" "}
                {t("account_access")}
              </Text>
              <Text style={styles.termsText}>
                4.
                <Text style={styles.boldText}>
                  {t("purchase_and_order_requirements")}:
                </Text>
                {t("purchase_minimum")}
              </Text>
              <Text style={styles.termsText}>
                5.{" "}
                <Text style={styles.boldText}>
                  {t("pricing_and_payment")}:{" "}
                </Text>
                {t("pricing_payment")}
              </Text>
              <Text style={styles.termsText}>
                6.{" "}
                <Text style={styles.boldText}>
                  {t("shipping_and_delivery")}:
                </Text>{" "}
                {t("shipping")}
              </Text>
              <Text style={styles.termsText}>
                7.{" "}
                <Text style={styles.boldText}>
                  {t("returns_and_refunds")}:{" "}
                </Text>
                {t("sales_final")}
              </Text>
              <Text style={styles.termsText}>
                8.{" "}
                <Text style={styles.boldText}>
                  {t("intellectual_property")}:
                </Text>{" "}
                {t("intellectual_property_tc")}
              </Text>
              <Text style={styles.termsText}>
                9.{" "}
                <Text style={styles.boldText}>
                  {t("limitation_of_liability")}:
                </Text>{" "}
                {t("liability")}
              </Text>
              <Text style={styles.termsText}>
                10. <Text style={styles.boldText}>{t("changes_to_terms")}</Text>{" "}
                {t("terms_change")}
              </Text>
              <Text style={styles.termsText}>
                11. <Text style={styles.boldText}>{t("governing_law")}:</Text>{" "}
                {t("governing_law_tc")}
              </Text>
              <Text style={styles.termsText}>
                12.{" "}
                <Text style={styles.boldText}>{t("contact_information")}:</Text>{" "}
                {t("contact_information_tc")}
              </Text>
            </ScrollView>
            <View style={styles.checkboxContainer}>
              <CustomCheckBox value={isChecked} onValueChange={setIsChecked} />
              <Text style={styles.agreeText}>
                {t("i_agree_to_terms_and_conditions")}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleComplete}
            >
              <Text style={styles.completeButtonText}>{t("complete")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: wp(90),
    height: hp(70),
    backgroundColor: "#f5f5f5",
    padding: wp(5),
    borderRadius: wp(2.5),
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: wp(5),
  },
  modalTitle: {
    fontSize: 20,
    // fontWeight: "bold",
    marginBottom: wp(2.5),
    fontFamily: "QuicksandSemiBold",
  },
  scrollView: {
    maxHeight: hp(50),
  },
  termsText: {
    fontSize: wp(3.5),
    fontFamily: "QuicksandSemiBold",
    marginBottom: wp(2.5),
  },
  boldText: {
    // fontWeight: "bold",
    fontFamily: "QuicksandBold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: wp(2.5),
  },
  checkbox: {
    width: wp(6),
    height: wp(6),
    borderWidth: 2,
    borderColor: "#000",
    marginRight: wp(2.5),
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: colors,
    borderWidth: 2,
    borderColor: "#fff",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
  },
  agreeText: {
    fontSize: wp(3.5),
  },
  completeButton: {
    backgroundColor: colors,
    padding: wp(2.5),
    borderRadius: wp(1.25),
    alignItems: "center",
  },
  completeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TermsAndConditionsModal;
