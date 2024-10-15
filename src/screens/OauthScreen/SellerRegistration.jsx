import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  Modal,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SellerRegistration = () => {
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [getOtp, setGetOtp] = useState(false);
  const [Otp, setOTP] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [categoryModal, setCategotyModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sucessModalVisible, setSucessModalVisible] = useState(false);
  const [token, setToken] = useState("");

  const navigation = useNavigation();

  const { t } = useTranslation();

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  // Handle email input change and validate in real time
  const handleEmailChange = (text) => {
    setEmail(text);
    validateEmail(text); // Validate email as user types
  };

  const handleRegister = () => {
    // Example: Send the OTP to the user's email and store the OTP sent by the server
    const url =
      `${process.env.REACT_APP_BACKEND_URL}` + "/b2b/reqToUpgradeSeller";
    axios
      .post(url, { email: email })
      .then((res) => {
        console.log("-----------", res.data.message);
        setGetOtp(true);
      })
      .catch((err) => {
        if (err.status === 404) {
          Alert.alert("Email Not Found" + err);
        } else if (err.status === 409) {
          Alert.alert("Email is already registered");
        } else if (err.status === 500) {
          Alert.alert("You're not created you B2B account, please Register");
        } else {
          Alert.alert("Error Sending OTP" + err);
        }
      });
    console.log(city);
    console.log(email);
    // Simulate the server sending OTP, store it for later comparison
    const generatedOtp = "1234"; // Simulated OTP sent by the server
    setServerOtp(generatedOtp);
    // Show OTP input field
  };

  const handleOtpChange = (text) => {
    setOTP(text);
  };

  const handleOtp = async () => {
    try {
      const url =
        `${process.env.REACT_APP_BACKEND_URL}` + "/b2b/upgradeToSeller";
      const res = await axios.put(url, { otp: Otp, email: email });
      if (res.status === 200) {
        AsyncStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setCategotyModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = () => {
    setCategotyModal(false);
    setSucessModalVisible(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}` + "/b2b/subcribe";
    axios
      .put(
        url,
        { category: selectedCategory, location: city },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          Alert.alert("Registered as Seller Successfully");
          navigation.navigate("Login");
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error Registering as Seller");
      });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handlenav = () => {
    setSucessModalVisible(false);
    navigation.navigate("Login");
  };

  const isFormValid = city !== "" && emailError === "" && email !== "";
  const isOtpValid = Otp !== ""; // Check if OTP is entered

  return (
    <ScrollView style={styles.container}>
      {/* Add logo */}
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Entypo
          name="chevron-thin-left"
          size={hp(4)}
          color={"#d53c46"}
          strokeWidth={wp(1)}
        />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/B2BlogoRounded.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.loginCard}>
        <Text style={styles.title}>
          {t("seller")} {t("registration")}
        </Text>

        <View>
          <Text style={styles.inputName}>
            <Text style={{ color: "#d53c46" }}>**</Text>{" "}
            {t("enter_your_location")}
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={city}
              style={styles.picker}
              onValueChange={(itemValue) => setCity(itemValue)}
            >
              <Picker.Item label={t("select_location")} value="" />
              <Picker.Item label={t("chennai")} value="Tamil Nadu" />
              <Picker.Item label={t("karnataka")} value="Karnataka" />
              <Picker.Item label={t("andhra_pradesh")} value="Andhra Pradesh" />
              <Picker.Item label={t("telangana")} value="Telangana" />
              <Picker.Item label={t("odisha")} value="Odisha" />
              <Picker.Item label={t("kerala")} value="Kerala" />
              <Picker.Item label={t("madhya_pradesh")} value="Madhya Pradesh" />
              <Picker.Item label={t("maharashtra")} value="Maharashtra" />
            </Picker>
          </View>

          <Text style={styles.inputName}>{t("email")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("email")}
            keyboardType="email-address"
            value={email}
            onChangeText={handleEmailChange} // Capture email input
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>

        {getOtp ? (
          <>
            <Text style={styles.inputName}>{t("enter_otp")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("enter_otp")}
              keyboardType="numeric"
              value={Otp}
              onChangeText={handleOtpChange} // Capture OTP input
            />
            {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}
            <TouchableOpacity
              style={[
                styles.submitButton,
                !isOtpValid && styles.disabledButton,
              ]}
              onPress={handleOtp} // Call your OTP verification function here
              disabled={!isOtpValid} // Disable the button if the form is not valid
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.submitButton, !isFormValid && styles.disabledButton]}
            onPress={handleRegister} // Call your registration function here
            disabled={!isFormValid} // Disable the button if the form is not valid
          >
            <Text style={styles.submitButtonText}>{t("send_otp")}</Text>
          </TouchableOpacity>
        )}
        {categoryModal ? (
          <Modal
            transparent={true}
            animationType="slide"
            visible={categoryModal}
            onRequestClose={() => setCategotyModal(false)} // Add this to close the modal on back press
          >
            <View style={styles.modalBackground}>
              <View style={styles.categorycontainer}>
                <Text style={styles.title}>{t("choose_your_category")}</Text>

                <TouchableOpacity
                  style={[
                    styles.option,
                    selectedCategory === "platinum" && styles.selected,
                  ]}
                  onPress={() => setSelectedCategory("platinum")}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../../assets/sellerCategory/platinum.png")}
                      style={styles.img}
                    />
                    <View>
                      <Text style={styles.categoryTitle}>
                        {t("platinum").toUpperCase()}{" "}
                        {t("seller").toUpperCase()}
                      </Text>
                      <Text style={styles.eligibilityText}>
                        {t("eligibility_business")} {t("more_than_50_crore")}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.option,
                    selectedCategory === "gold" && styles.selected,
                  ]}
                  onPress={() => setSelectedCategory("gold")}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../../assets/sellerCategory/gold.png")}
                      style={styles.img}
                    />
                    <View>
                      <Text style={styles.categoryTitle}>
                        {t("gold").toUpperCase()} {t("seller").toUpperCase()}
                      </Text>
                      <Text style={styles.eligibilityText}>
                        {t("eligibility_business")} {t("less_than_50_crore")}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleCategory}
                  disabled={!selectedCategory}
                >
                  <Text style={styles.registerButtonText}>
                    {t("register_as")}{" "}
                    {selectedCategory
                      ? selectedCategory === "platinum"
                        ? `${t("platinum")} ${t("member")}`
                        : `${t("gold")} ${t("member")}`
                      : "Member"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : null}
        {sucessModalVisible ? (
          <>
            <Modal transparent={true} animationType="fade">
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Text style={styles.successTitle}>
                    {t("successfully_registered_as_seller")}
                  </Text>
                  <Text style={styles.message}>
                    {t("use_existing_credentials")}
                  </Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handlenav}>
                      <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default SellerRegistration;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d53c46",
    height: hp(100),
    alignContent: "center",
  },

  backButton: {
    marginTop: hp(8),
    marginLeft: wp(5),
    width: wp(12),
    height: wp(12),
    borderRadius: 999,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginLeft: wp(35),
    marginBottom: hp(3),
    borderRadius: 999,
    borderWidth: 0.1,
    width: wp(30),
    height: wp(30),
  },

  logo: {
    width: wp(30),
    height: wp(30),
  },
  img: {
    width: wp(15),
    height: hp(7),
    marginRight: wp(2),
  },
  loginCard: {
    alignItems: "center",
    width: wp("90%"),
    marginHorizontal: wp(5),
    marginTop: wp(5),
    paddingTop: wp(2),
    paddingBottom: wp(5),
    backgroundColor: "#FFFFFF",
    borderRadius: wp(8),
  },
  // title: {
  //   fontSize: wp(8),
  //   margin: wp(5),
  //   color: "#d53c46",
  //   fontFamily: "QuicksandBold",
  // },
  inputName: {
    width: wp(70),
    fontSize: wp(4),
    fontFamily: "QuicksandBold",
    marginBottom: wp(2),
  },
  input: {
    borderColor: "gray",
    width: wp("75%"),
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: "QuicksandSemiBold",
    padding: wp(2.5),
    marginBottom: wp(2),
    backgroundColor: "white",
    elevation: 2,
  },
  pickerContainer: {
    borderColor: "gray",
    width: wp("75%"),
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: "QuicksandSemiBold",
    padding: wp(2.5),
    marginBottom: wp(2),
    backgroundColor: "white",
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    height: hp("3%"),
    width: "100%",
    marginBottom: wp(1),
    fontSize: wp(1),
    fontFamily: "QuicksandSemiBold",
  },
  submitButton: {
    backgroundColor: "#d53c46",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: wp(4),
    fontFamily: "QuicksandBold",
  },
  disabledButton: {
    backgroundColor: "#ccc", // Style to indicate the button is disabled
  },
  errorText: {
    color: "red",
    marginTop: wp(1),
    fontSize: wp(3.5),
    fontFamily: "QuicksandSemiBold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darken the background
  },
  categorycontainer: {
    padding: 20,
    width: wp(80),
    backgroundColor: "#fff", // Ensure it's visible
    borderRadius: 10,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    // fontWeight: "b",
    fontFamily: "QuicksandSemiBold",
    marginBottom: wp(7.5),
  },
  option: {
    width: wp(70),
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#ccc",
    elevation: 2,
    backgroundColor: "#fff",
  },
  selected: {
    borderColor: "#007bff",
    backgroundColor: "#e7f1ff",
  },
  categoryTitle: {
    fontSize: wp(4),
    fontWeight: "bold",
  },
  eligibilityText: {
    fontSize: wp(2.5),
    color: "#555",
    marginTop: 5,
  },
  registerButton: {
    marginTop: 30,
    padding: 15,
    width: "90%",
    backgroundColor: "#007bff",
    borderRadius: 10,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    margin: 5,
    backgroundColor: "#007bff",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    flex: 1,
    margin: 5,
    backgroundColor: "#ccc",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#333",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
});
