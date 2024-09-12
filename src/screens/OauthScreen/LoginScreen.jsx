import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import * as Font from "expo-font";
import axios from "axios";

import Toggle from "react-native-toggle-element";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
const { width } = Dimensions.get("window");
import {
  ChevronLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";

import { StatusBar } from "expo-status-bar";
import Animated, { FadeInRight } from "react-native-reanimated";

const LoginScreen = () => {
  const [buyerEmail, setBuyerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [showPassword, setShowpassword] = useState(true);
  const [toggleValue, setToggleValue] = useState(false); //false->buyer,true->seller
  const [sellerPassword, setSellerPassword] = useState(""); // State to store password

  const [viewPassword, setViewPassword] = useState(true); // State to toggle password visibility
  // const [email, setEmail] = useState(''); // State to store email buyyer
  const [sellerEmail, setSellerEmail] = useState(""); //state to store email of seller

  const navigation = useNavigation();

  async function handleLogin() {
    await axios
      .post("https://erp-backend-new-ketl.onrender.com/b2b/login", {
        email: email,
        pwd: password,
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          const customer = res.data.user;
          console.log(customer);
          try {
            AsyncStorage.setItem("loginstate", "true");
            AsyncStorage.setItem("userEmail", email);
            AsyncStorage.setItem("customerId", customer.customerId);
            AsyncStorage.setItem("companyname", customer.CompanyName);
            AsyncStorage.setItem("phone", customer.phoneNo);
            AsyncStorage.setItem("gst", customer.gstNo);
            AsyncStorage.setItem("email", customer.Email);
            AsyncStorage.setItem("token", res.data.token);
          } catch (e) {
            // saving error
            console.error(e);
          }

          navigation.navigate("Home");
        } else window.alert(res.message);
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  }

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

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  async function handleLogin() {
    await axios
      .post("https://erp-backend-new-ketl.onrender.com/b2b/login", {
        email: buyerEmail,
        pwd: password,
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
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
          } catch (e) {
            // saving error
            console.error(e);
          }
        } else window.alert(res.message);
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  }

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

  const handleBuyerSubmit = () => {
    if (buyerEmail && password) {
      // Print email and password to the console
      console.log("Email:", buyerEmail);
      console.log("Password:", password);
      // Optionally, you can show an alert as well
    } else {
      Alert.alert("Error", "Please enter both email and password.");
    }
  };

  const handleSellerSubmit = () => {
    if (sellerEmail && sellerPassword) {
      // Print email and password to the console
      console.log("Email:", sellerEmail);
      console.log("Password:", sellerPassword);
      // Optionally, you can show an alert as well
      navigation.navigate("SellerHome");
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

  return (
    <>
      <StatusBar style={"light"} />
      {isLoading ? (
        <AppLoading />
      ) : (
        <ScrollView style={styles.container}>
          {/* Add logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/B2BlogoRounded.png")}
              style={styles.logo}
            />
          </View>

          {/* style={{textAlign: 'center'}} */}
          <View style={{ alignItems: "center" }}>
            <Toggle
              value={toggleValue}
              onPress={(newState) => setToggleValue(newState)}
              leftComponent={
                <Text style={{ fontFamily: "QuicksandSemiBold" }}>Buyer</Text>
              }
              rightComponent={<Text>Seller</Text>}
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
                <Text style={styles.title}>Buyer Login</Text>

                <Text style={styles.inputName}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={buyerEmail}
                  onChangeText={(text) => setBuyerEmail(text)} // Capture email input
                />

                <Text style={styles.inputName}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    secureTextEntry={viewPassword} // Show/hide password
                    value={password}
                    onChangeText={(text) => setPassword(text)} // Capture password input
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setViewPassword(!viewPassword)}
                  >
                    {viewPassword ? (
                      <EyeSlashIcon size={20} color="gray" /> // Heroicon for "eye-off"
                    ) : (
                      <EyeIcon size={20} color="gray" /> // Heroicon for "eye"
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.forgetPassword}
                  onPress={navigateToForgotPassword}
                >
                  <Text style={styles.forget}>Forget Password ?</Text>
                </TouchableOpacity>

                {/* Submit Button */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => handleLogin()}
                >
                  <Text style={styles.submitButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text style={styles.register}>
                    Don't have account? Click here
                  </Text>
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
                style={styles.loginCard}
              >
                <Text style={styles.title}>Seller Login</Text>

                <Text style={styles.inputName}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={sellerEmail}
                  onChangeText={(text) => setSellerEmail(text)} // Capture email input
                />

                <Text style={styles.inputName}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    secureTextEntry={viewPassword} // Show/hide password
                    value={sellerPassword}
                    onChangeText={(text) => setSellerPassword(text)} // Capture password input
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setViewPassword(!viewPassword)}
                  >
                    {viewPassword ? (
                      <EyeSlashIcon size={20} color="gray" /> // Heroicon for "eye-off"
                    ) : (
                      <EyeIcon size={20} color="gray" /> // Heroicon for "eye"
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.forgetPassword}
                  onPress={navigateToForgotPassword}
                >
                  <Text style={styles.forget}>Forget Password ?</Text>
                </TouchableOpacity>

                {/* Submit Button */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSellerSubmit}
                >
                  <Text style={styles.submitButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text style={styles.register}>
                    Don't have account? Click here
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </>
          )}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d53c46",
    height: "100%",
    alignContent: "center",
  },
  logoContainer: {
    marginTop: hp(10),
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
    width: wp("88%"),
    height: hp(50),
    margin: wp("5%"),
    paddingVertical: wp(2),
    backgroundColor: "#FFFFFF",
    borderRadius: wp(8),
  },
  title: {
    fontSize: wp(8),
    margin: wp(5),
    color: "#d53c46",
    fontFamily: "QuicksandBold",
    // fontWeight: "bold",
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
    marginTop: 10,
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
  },
  register: {
    fontFamily: "QuicksandBold",
    marginVertical: wp(4),
    color: "#d53c46",
  },
});
export default LoginScreen;
