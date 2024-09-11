import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as Font from "expo-font";
import { XCircleIcon } from "react-native-heroicons/outline";

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
  currentOrderPrice,
  totalAmount,
  productName,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [productSummary, setProductSummary] = useState();

  const nav = useNavigation();
  
  useEffect(() => {
    const productSummaryDetails = {
      productName: productName,
      totalAmount: totalAmount,
      currentOrderPrice: currentOrderPrice,
    };

    setProductSummary(productSummaryDetails);
    console.log(productSummary)
  }, []);

  const proceedToPayment = () => {
    console.log(productSummary);
  };

  const handleComplete = () => {
    console.log(productSummary);
    if (isChecked) {
      nav.navigate("Payment", { productSummary: productSummary });
    } else {
      alert("Please agree to the terms and conditions.");
    }
  };

  return visible ? (
    <View style={styles.modalBackground}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <XCircleIcon color="black" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Terms and Conditions</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.termsText}>
            1. <Text style={styles.boldText}>Introduction:</Text> These Terms
            and Conditions govern the use of our B2B trading platform,
            specifically for the purchase of Moong Dal, Toor Dal, Urad Dal, and
            Gram Dal. By creating an account and purchasing products through our
            platform, you agree to these terms.
          </Text>
          <Text style={styles.termsText}>
            2. <Text style={styles.boldText}>Eligibility:</Text> This platform
            is intended for use by businesses only. By registering, you confirm
            that you are authorized to enter into a binding agreement on behalf
            of your business and that your business is legally permitted to buy
            and trade agricultural commodities.
          </Text>
          <Text style={styles.termsText}>
            3. <Text style={styles.boldText}>Account Creation:</Text> To access
            our platform, you must create a business account. You are
            responsible for maintaining the confidentiality of your account
            information and for all activities that occur under your account.
            You agree to provide accurate and up-to-date information during the
            registration process.
          </Text>
          <Text style={styles.termsText}>
            4.{" "}
            <Text style={styles.boldText}>
              Purchase and Order Requirements:
            </Text>{" "}
            All purchases made through our platform must be for a minimum of 100
            tons of any of the available dal varieties (Moong Dal, Toor Dal,
            Urad Dal, Gram Dal). Orders below this quantity will not be
            processed. Upon placing an order, you agree to pay the total amount
            as specified at checkout.
          </Text>
          <Text style={styles.termsText}>
            5. <Text style={styles.boldText}>Pricing and Payment:</Text> Pricing
            for all dal varieties is provided at the time of purchase and is
            subject to change without prior notice. All payments must be made in
            full before the order is processed. We accept various payment
            methods as indicated during checkout. All transactions are secure
            and encrypted.
          </Text>
          <Text style={styles.termsText}>
            6. <Text style={styles.boldText}>Shipping and Delivery:</Text> We
            will arrange for the shipping of your order to the address specified
            during checkout. Shipping times may vary based on location and
            availability of the products. We are not responsible for any delays
            caused by third-party shipping services.
          </Text>
          <Text style={styles.termsText}>
            7. <Text style={styles.boldText}>Returns and Refunds:</Text> Due to
            the nature of bulk agricultural products, all sales are final. We do
            not accept returns or provide refunds once the order has been
            processed. Please review your order carefully before finalizing your
            purchase.
          </Text>
          <Text style={styles.termsText}>
            8. <Text style={styles.boldText}>Intellectual Property:</Text> All
            content on our platform, including product descriptions, images, and
            trademarks, is the intellectual property of our company or our
            licensors. Unauthorized use, reproduction, or distribution of this
            content is prohibited and may result in legal action.
          </Text>
          <Text style={styles.termsText}>
            9. <Text style={styles.boldText}>Limitation of Liability:</Text> We
            are not liable for any indirect, incidental, or consequential
            damages arising out of or in connection with your use of the
            platform or the purchase of products. Our maximum liability to you
            shall not exceed the amount you paid for the products.
          </Text>
          <Text style={styles.termsText}>
            10. <Text style={styles.boldText}>Changes to Terms:</Text> We
            reserve the right to modify these Terms and Conditions at any time.
            Any changes will be effective immediately upon posting on this page.
            Continued use of the platform after changes are posted constitutes
            your acceptance of the new terms.
          </Text>
          <Text style={styles.termsText}>
            11. <Text style={styles.boldText}>Governing Law:</Text> These Terms
            and Conditions are governed by and construed in accordance with the
            laws of Chennai. Any disputes arising under these terms shall be
            subject to the exclusive jurisdiction of the courts in Chennai.
          </Text>
          <Text style={styles.termsText}>
            12. <Text style={styles.boldText}>Contact Information:</Text> If you
            have any questions or concerns about these Terms and Conditions,
            please contact us at support@b2bhubindia.com.
          </Text>
        </ScrollView>
        <View style={styles.checkboxContainer}>
          <CustomCheckBox value={isChecked} onValueChange={setIsChecked} />
          <Text style={styles.agreeText}>
            I agree to the terms and conditions
          </Text>
        </View>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleComplete}
        >
          <Text style={styles.completeButtonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: 200,
  },
  termsText: {
    fontSize: 14,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#4870F4",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
  },
  agreeText: {
    fontSize: 14,
  },
  completeButton: {
    backgroundColor: "#4870F4",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  completeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TermsAndConditionsModal;
