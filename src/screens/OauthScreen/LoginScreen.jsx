import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  BackHandler,
  Image,
  ScrollView,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import * as Font from "expo-font";
import axios from "axios";
import Toggle from "react-native-toggle-element";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTranslation } from "react-i18next";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import Animated, { FadeInRight } from "react-native-reanimated";
import LanguageList from "../../language/LanguageList.json";
import { useLanguage } from "../../hooks/LanguageContext";
import AppLoaderAnimation from "../../components/loaders/AppLoaderAnimation";
import Feather from "react-native-vector-icons/Feather";

export const CustomCheckBox = ({ value, onValueChange }) => (
  <TouchableOpacity
    style={[styles.checkbox, value && styles.checkboxChecked]}
    onPress={() => onValueChange(!value)}
  >
    {value && <Text style={styles.checkmark}>✓</Text>}
  </TouchableOpacity>
);

const LoginScreen = () => {
  const { t } = useTranslation();
  //Language Modals Hooks
  const { language, changeLanguage } = useLanguage;
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  // const [Language, setLanguage] = useState(LanguageList[language].nativeName);

  const [buyerEmail, setBuyerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [logintext, setLogintext] = useState(t("login"));
  // const [showPassword, setShowpassword] = useState(true);
  const [toggleValue, setToggleValue] = useState(false); //false->buyer,true->seller
  const [sellerPassword, setSellerPassword] = useState("");

  const [viewPassword, setViewPassword] = useState(true);
  //const [email, setEmail] = useState('');
  const [sellerEmail, setSellerEmail] = useState("");

  const navigation = useNavigation();

  const [isChecked, setIsChecked] = useState(false);

  const handleComplete = () => {
    if (isChecked) {
      navigation.navigate("sellerRegistration");
    } else {
      alert("Please agree to the terms and conditions.");
    }
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

  const handleSellerSubmit = async () => {
    setLogintext(t("processing"));
    if (sellerEmail && sellerPassword) {
      // console.log("Email:", sellerEmail);
      // console.log("Password:", sellerPassword);

      const url = `${process.env.REACT_APP_BACKEND_URL}` + "/b2b/login";
      // console.log("====================================");
      // console.log(url);
      // console.log("====================================");
      await axios
        .post(url, {
          email: sellerEmail,
          pwd: sellerPassword,
          isSeller: true,
        })
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            setLogintext(t("login"));
            const customer = res.data.user;
            // console.log(customer);
            navigation.navigate("SellerHome");
            try {
              AsyncStorage.setItem("loginstate", "false");
              AsyncStorage.setItem("userEmail", sellerEmail);
              AsyncStorage.setItem("customerId", customer.customerId);
              AsyncStorage.setItem("companyname", customer.CompanyName);
              AsyncStorage.setItem("phone", customer.phoneNo);
              AsyncStorage.setItem("gst", customer.gstNo);
              AsyncStorage.setItem("email", customer.Email);
              AsyncStorage.setItem("token", res.data.token);
              AsyncStorage.setItem("pan", customer.PAN);
            } catch (e) {
              console.error(e);
            }
          } else Alert.alert(res.message);
        })
        .catch((error) => {
          Alert.alert(error);
          setLogintext(t("login"));
          return;
        });
    } else {
      Alert.alert("Error", "Please enter both email and password.");
    }
  };

  async function handleLogin() {
    setLogintext(t("processing"));
    const url = `${process.env.REACT_APP_BACKEND_URL}` + "/b2b/login";
    // console.log("====================================");
    // console.log(url);
    // console.log("====================================");
    await axios
      .post(url, {
        email: buyerEmail,
        pwd: password,
        isSeller: false,
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          setLogintext(t("login"));
          const customer = res.data.user;
          console.log(customer);
          navigation.navigate("Home");
          try {
            AsyncStorage.setItem("loginstate", "true");
            AsyncStorage.setItem("userEmail", buyerEmail);
            AsyncStorage.setItem("customerId", customer.customerId);
            AsyncStorage.setItem("companyname", customer.CompanyName);
            AsyncStorage.setItem("phone", customer.phoneNo);
            AsyncStorage.setItem("gst", customer.gstNo);
            AsyncStorage.setItem("email", customer.Email);
            AsyncStorage.setItem("token", res.data.token);
            AsyncStorage.setItem("pan", customer.PAN);
          } catch (e) {
            console.error(e);
          }
        } else Alert.alert(res.message);
      })
      .catch((error) => {
        Alert.alert(error);
        setLogintext(t("login"));
        return;
      });
  }

  useEffect(() => {
    setVisible(false);
    setIsChecked(false);
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

  const handleBuyerSubmit = () => {
    if (buyerEmail && password) {
      console.log("Email:", buyerEmail);
      console.log("Password:", password);
    } else {
      Alert.alert("Error", "Please enter both email and password.");
    }
  };

  const navigateToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const navigateToRegister = () => {
    navigation.navigate("SignUp");
  };

  const navigateToSellerRegister = () => {
    navigation.navigate("sellerRegistration");
  };

  const termsAndcondition = () => {
    setVisible(true);
  };

  const backToSign = () => {
    navigation.navigate("Login");
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const exitApp = () => {
    BackHandler.exitApp();
  };

  return (
    <>
      <StatusBar style={"light"} />
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <>
          <ScrollView style={styles.container}>
            {/* Add logo */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View />
              <View style={styles.logoContainer}>
                <Image
                  source={require("../../assets/B2BlogoRounded.png")}
                  style={styles.logo}
                />
              </View>
              <View
                style={{
                  marginLeft: wp(10),
                }}
              >
                <></>
                <Text style={{ color: "white", fontSize: wp(3) }}>
                  {LanguageList[language]}
                </Text>
              </View>
            </View>

            <View style={{ alignItems: "center" }}>
              <Toggle
                value={toggleValue}
                onPress={(newState) => setToggleValue(newState)}
                leftComponent={
                  <Text
                    style={{ fontFamily: "QuicksandSemiBold", fontSize: wp(4) }}
                  >
                    {t("buyer")}
                  </Text>
                }
                rightComponent={
                  <Text
                    style={{ fontFamily: "QuicksandSemiBold", fontSize: wp(4) }}
                  >
                    {t("seller")}
                  </Text>
                }
                trackBarStyle={{
                  borderColor: "#f7e2e2",
                  backgroundColor: "#f7e2e2",
                  justifyContent: "center",
                }}
                trackBar={{
                  borderWidth: 2,
                  width: wp(70),
                }}
                thumbButton={{
                  width: wp(35),
                  radius: wp(10),
                  activeBackgroundColor: "#fff",
                  inActiveBackgroundColor: "#fff",
                }}
              />
            </View>
            {!toggleValue ? (
              <>
                <View style={styles.loginCard}>
                  <Text style={styles.title}>{t("buyer_login")}</Text>

                  <Text style={styles.inputName}>{t("email")}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={t("email")}
                    keyboardType="email-address"
                    value={buyerEmail}
                    onChangeText={(text) => setBuyerEmail(text)}
                  />

                  <Text style={styles.inputName}>{t("password")}</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder={t("password")}
                      secureTextEntry={viewPassword}
                      value={password}
                      onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setViewPassword(!viewPassword)}
                    >
                      {viewPassword ? (
                        <Feather name="eye-off" size={wp(5)} color="gray" />
                      ) : (
                        <Feather name="eye" size={wp(5)} color="gray" />
                      )}
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.forgetPassword}
                    onPress={navigateToForgotPassword}
                  >
                    <Text style={styles.forget}>{t("forgot_password")} ?</Text>
                  </TouchableOpacity>

                  {/* Submit Button */}
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => handleLogin()}
                  >
                    <Text style={styles.submitButtonText}>{t(logintext)}</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Animated.View
                  entering={FadeInRight.delay(50)
                    .duration(1500)
                    .springify()
                    .damping(12)}
                >
                  <View style={styles.loginCard}>
                    <Text style={styles.title}>{t("seller_login")}</Text>

                    <Text style={styles.inputName}>{t("email")}</Text>
                    <TextInput
                      style={styles.input}
                      placeholder={t("email")}
                      keyboardType="email-address"
                      value={sellerEmail}
                      onChangeText={(text) => setSellerEmail(text)}
                    />

                    <Text style={styles.inputName}>{t("password")}</Text>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={styles.passwordInput}
                        placeholder={t("password")}
                        secureTextEntry={viewPassword}
                        value={sellerPassword}
                        onChangeText={(text) => setSellerPassword(text)}
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setViewPassword(!viewPassword)}
                      >
                        {viewPassword ? (
                          <Feather name="eye-off" size={wp(5)} color="gray" /> // Heroicon for "eye-off"
                        ) : (
                          <Feather name="eye" size={wp(5)} color="gray" /> // Heroicon for "eye"
                        )}
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.forgetPassword}
                      onPress={navigateToForgotPassword}
                    >
                      <Text style={styles.forget}>
                        {t("forgot_password")} ?
                      </Text>
                    </TouchableOpacity>

                    {/* Submit Button */}
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={() => handleSellerSubmit()}
                    >
                      <Text style={styles.submitButtonText}>
                        {t(logintext)}
                      </Text>
                    </TouchableOpacity>

                    <View style={styles.noteContainer}>
                      <Text style={styles.noteText}>
                        {t("note_register_seller")}
                      </Text>
                      <TouchableOpacity onPress={navigateToSellerRegister}>
                        <Text style={styles.registerSeller}>
                          {t("click_register_seller")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              </>
            )}
            <TouchableOpacity onPress={navigateToRegister}>
              <Text style={styles.register}>{t("register_a_new_account")}</Text>
            </TouchableOpacity>
            {visible ? (
              <Modal>
                <View style={styles.modalBackground}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={backToSign}
                    >
                      <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>
                      {t("terms_and_condition")}
                    </Text>
                    <ScrollView style={styles.scrollView}>
                      <Text style={styles.termsSentence}>
                        1.
                        <Text style={styles.boldSentence}>
                          {t("introduction")}:
                        </Text>
                        {t("seller_tc_1")}
                      </Text>
                      <Text style={styles.termsSentence}>
                        2.{" "}
                        <Text style={styles.boldSentence}>
                          {t("definition")}:
                        </Text>
                        {t("seller_tc_2")}
                      </Text>
                      <Text style={styles.termsSentence}>
                        3.
                        <Text style={styles.boldSentence}>
                          {t("registration_and_account_creation")}:
                        </Text>
                        {t("seller_tc_3")}
                      </Text>
                      <Text style={styles.termsSentence}>
                        4.
                        <Text style={styles.boldSentence}>
                          {t("product_listings_and_compliance")}:
                        </Text>
                        {t("seller_tc_4")}
                      </Text>
                      <Text style={styles.termsSentence}>
                        5.
                        <Text style={styles.boldSentence}>
                          {t("pricing_and_payment")}:
                        </Text>
                        {t("seller_tc_5")}
                      </Text>
                      <Text style={styles.termsSentence}>
                        6.
                        <Text style={styles.boldSentence}>
                          {t("shipping_and_fulfillment")}:
                        </Text>
                        {t("seller_tc_6")}
                      </Text>
                      <Text style={styles.termsSentence}>
                        7.
                        <Text style={styles.boldSentence}>
                          {t("returns_and_refunds")}:
                        </Text>
                        {t("seller_tc_7")}
                      </Text>
                      <Text style={styles.termsSentence}>
                        8.
                        <Text style={styles.boldSentence}>
                          {t("intellectual_property")}:
                        </Text>
                        {t("seller_tc_8")}
                      </Text>
                      <Text style={styles.termsSentence}>
                        9.
                        <Text style={styles.boldSentence}>
                          {t("seller_conduct")}:
                        </Text>
                        {t("seller_tc_9")}
                      </Text>
                      <Text style={styles.termsSentence}>
                        10.
                        <Text style={styles.boldSentence}>
                          {t("limitation_of_liability")}:
                        </Text>
                        {t("seller_tc_10")}
                      </Text>
                      <Text style={styles.termsSentence}>
                        11.
                        <Text style={styles.boldSentence}>
                          {t("termination_and_account_suspension")}:
                        </Text>
                        {t("seller_tc_11")}
                      </Text>
                      <Text style={styles.termsSentence}>
                        12.
                        <Text style={styles.boldSentence}>
                          {t("governing_law")}:
                        </Text>
                        {t("seller_tc_12")}
                      </Text>
                      <Text style={styles.termsSentence}>
                        13.
                        <Text style={styles.boldSentence}>
                          {" "}
                          {t("amendments")}:{" "}
                        </Text>
                        {t("seller_tc_13")}
                      </Text>
                      <Text style={styles.termsSentence}>
                        14.
                        <Text style={styles.boldSentence}>
                          {t("contact_information")}:
                        </Text>
                        {t("seller_tc_14")}
                      </Text>
                    </ScrollView>
                    <View style={styles.checkboxContainer}>
                      <CustomCheckBox
                        value={isChecked}
                        onValueChange={setIsChecked}
                      />
                      <Text style={styles.checkboxLabel}>
                        {t("seller_tc_15")}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.button,
                        isChecked ? styles.buttonActive : styles.buttonDisabled,
                      ]}
                      onPress={handleComplete}
                      disabled={!isChecked}
                    >
                      <Text style={styles.buttonText}>{t("complete")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setVisible(false)} // Close modal
                      style={{ marginTop: wp(5), alignSelf: "center" }}
                    >
                      <Text style={{ color: "red", fontSize: wp(4) }}>
                        {t("close")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            ) : null}
          </ScrollView>
          {/* <View style={styles.exitAppPosition}>
            <Pressable style={{ alignItems: "center" }} onPress={exitApp}>
              <ArrowRightStartOnRectangleIcon
                strokeWidth={wp(0.2)}
                color={"white"}
                size={hp(4)}
              />
              <View style={styles.exitAppContainer}>
                <Text>{t("exit_app")}</Text>
              </View>
            </Pressable>
          </View> */}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d53c46",
    height: hp(100),
    alignContent: "center",
  },
  logoContainer: {
    marginTop: hp(5),
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

  title: {
    fontSize: wp(8),
    margin: wp(5),
    color: "#d53c46",
    fontFamily: "QuicksandBold",
  },

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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("75%"),
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 10,
    borderColor: "gray",
    backgroundColor: "white",
    elevation: 2,
  },
  passwordInput: {
    flex: 1,
    padding: wp(2.5),
  },

  eyeIcon: {
    padding: wp(2.5),
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
  forgetPassword: {
    marginLeft: wp(45),
    marginVertical: wp(4),
  },
  forget: {
    color: "#d53c46",
    fontFamily: "QuicksandBold",
  },
  register: {
    fontFamily: "QuicksandBold",
    marginVertical: hp(2),
    // color: "#d53c46",
    color: "white",
    marginTop: hp(4),
    textAlign: "center",
  },
  noteContainer: {
    width: "80%",
    marginBottom: wp(3),
    padding: wp(2),
    borderRadius: wp(3),
    backgroundColor: "white",
    elevation: 2,
  },
  noteText: {
    fontSize: wp(3.5),
    textAlign: "justify",
    // textDecorationLine: "underline",
    fontFamily: "QuicksandSemiBold",
    color: "#000",
  },
  registerSeller: {
    fontFamily: "QuicksandBold",
    textDecorationLine: "underline",
    fontSize: wp(4),
    color: "#d53c46",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: wp(90),
    backgroundColor: "white",
    padding: wp(5),
    borderRadius: wp(2.5),
    maxHeight: "80%",
  },
  scrollView: {
    marginBottom: wp(5),
  },
  closeButton: {
    position: "absolute",
    top: wp(2.5),
    right: wp(2.5),
    zIndex: 1,
    padding: wp(1.25),
  },
  closeButtonText: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: "#333",
  },
  modalTitle: {
    fontSize: wp(4.5),
    fontWeight: "bold",
    marginBottom: wp(3.75),
  },
  termsSentence: {
    fontSize: wp(3.5),
    marginBottom: wp(5),
    fontFamily: "QuicksandSemiBold",
  },
  boldSentence: {
    fontFamily: "QuicksandSemiBold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: wp(5),
  },
  checkboxLabel: {
    marginLeft: wp(2.5),
    fontSize: wp(3.5),
  },
  button: {
    paddingVertical: wp(2.5),
    borderRadius: wp(1.25),
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#4870F4",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: wp(2),
    color: "#fff",
    fontWeight: "bold",
  },
  checkbox: {
    width: wp(5),
    height: wp(5),
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#4870F4",
  },
  checkmark: {
    color: "#fff",
  },

  exitAppPosition: {
    position: "absolute",
    bottom: wp(5),
    right: wp(5),
  },
  exitAppContainer: {
    width: wp(25),
    marginTop: wp(1),
    height: wp(7),
    backgroundColor: "white",
    borderRadius: wp(99),
    justifyContent: "center",
    alignItems: "center",
  },
});
export default LoginScreen;

// async function handleLogin() {
//   await axios
//     .post("https://erp-backend-new-plqp.onrender.com/b2b/login", {
//       email: buyerEmail,
//       pwd: password,
//       isSeller:false
//     })
//     .then((res) => {
//       console.log(res.status);
//       if (res.status === 200) {
//         const customer = res.data.user;
//         console.log(customer);
//         try {
//           AsyncStorage.setItem("loginstate", "true");
//           AsyncStorage.setItem("userEmail", email);
//           AsyncStorage.setItem("customerId", customer.customerId);
//           AsyncStorage.setItem("companyname", customer.CompanyName);
//           AsyncStorage.setItem("phone", customer.phoneNo);
//           AsyncStorage.setItem("gst", customer.gstNo);
//           AsyncStorage.setItem("email", customer.Email);
//           AsyncStorage.setItem("token", res.data.token);
//         } catch (e) {
//           // saving error
//           console.error(e);
//         }

//         navigation.navigate("Home");
//       } else window.alert(res.message);
//     })
//     .catch((error) => {
//       window.alert(error);
//       return;
//     });
// }
