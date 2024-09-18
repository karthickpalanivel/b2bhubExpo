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
import {REACT_APP_BACKEND_URL} from '@env'
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
  //const [email, setEmail] = useState(''); // State to store email buyyer
  const [sellerEmail, setSellerEmail] = useState(""); //state to store email of seller

  const navigation = useNavigation();

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

  async function handleLogin() {

    const url = `${process.env.REACT_APP_BACKEND_URL}`+"/b2b/login";
    console.log('====================================');
    console.log(url);
    console.log('====================================');
    await axios
      .post(url, {
        email: buyerEmail,
        pwd: password,
        isSeller: false,
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
            AsyncStorage.setItem("pan", customer.PAN);
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

  async function handleSellerSubmit(){
    const url = `${process.env.REACT_APP_BACKEND_URL}`+"/b2b/login";
    await axios
      .post(url, {
        email: sellerEmail,
        pwd: sellerPassword,
        isSeller: true,
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          const customer = res.data.user;
          console.log(customer);
          navigation.navigate("SellerHome");
          try {
            AsyncStorage.setItem("loginstate", "true");
            AsyncStorage.setItem("userEmail", sellerEmail);
            AsyncStorage.setItem("customerId", customer.customerId);
            AsyncStorage.setItem("companyname", customer.CompanyName);
            AsyncStorage.setItem("phone", customer.phoneNo);
            AsyncStorage.setItem("gst", customer.gstNo);
            AsyncStorage.setItem("email", customer.Email);
            AsyncStorage.setItem("token", res.data.token);
            AsyncStorage.setItem("pan", customer.PAN);
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
                    onPress={()=>handleSellerSubmit()}
                  >
                    <Text style={styles.submitButtonText}>Login</Text>
                  </TouchableOpacity>

                  <View style={styles.noteContainer}>
                    <Text style={styles.noteText}>
                      Note: Your must registered as seller before logging in as
                      Seller if not
                      <TouchableOpacity onPress={navigateToSellerRegister}>
                        <Text style={styles.registerSeller}>
                          Click here to register as seller
                        </Text>
                      </TouchableOpacity>
                    </Text>
                  </View>
                </View>
              </Animated.View>
            </>
          )}
          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.register}>Click here for New Registration</Text>
          </TouchableOpacity>
        </ScrollView>
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
    fontFamily: "QuicksandSemiBold",
    color: "#000",
  },
  registerSeller: {
    fontFamily: "QuicksandBold",
    fontSize: wp(4),
    color: "#d53c46",
  },
});
export default LoginScreen;
