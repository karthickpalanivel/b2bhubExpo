import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  BackHandler,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";

import Toggle from "react-native-toggle-element";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInRight } from "react-native-reanimated";

const LoginScreen = () => {
  const [buyerEmail, setBuyerEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowpassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleValue, setToggleValue] = useState(false); //false->buyer,true->seller
  const [sellerPassword, setSellerPassword] = useState(""); // State to store password

  const [viewPassword, setViewPassword] = useState(true); // State to toggle password visibility
  // const [email, setEmail] = useState(''); // State to store email buyyer
  const [sellerEmail, setSellerEmail] = useState(""); //state to store email of seller

  const navigation = useNavigation();

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleBuyerSubmit = () => {
    if (buyerEmail && password) {
      // Print email and password to the console
      console.log("Email:", buyerEmail);
      console.log("Password:", password);
      // Optionally, you can show an alert as well
      navigation.navigate("Home");
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
        <SafeAreaView style={styles.container}>
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
              leftComponent={<Text>Buyer</Text>}
              rightComponent={<Text>Seller</Text>}
              trackBarStyle={{
                borderColor: "#f7e2e2",
                backgroundColor: "#f7e2e2",
                justifyContent: "center",
              }}
              trackBar={{
                borderWidth: 2,
                width: wp(60),
              }}
              thumbButton={{
                width: wp(30),
                height: hp(5),
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
                      <EyeIcon size={20} color="gray" /> // Heroicon for "eye"
                    ) : (
                      <EyeSlashIcon size={20} color="gray" /> // Heroicon for "eye-off"
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
                  onPress={handleBuyerSubmit}
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
                      <EyeIcon size={20} color="gray" /> // Heroicon for "eye"
                    ) : (
                      <EyeSlashIcon size={20} color="gray" /> // Heroicon for "eye-off"
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
              </Animated.View>
            </>
          )}
        </SafeAreaView>
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
    height: hp("48%"),
    margin: wp("5%"),
    padding: wp(2),
    backgroundColor: "#FFFFFF",
    borderRadius: wp(8),
  },
  title: {
    fontSize: wp(8),
    margin: wp(5),
    color: "#d53c46",
    fontWeight: "bold",
  },
  inputName: {
    width: wp(70),
    fontSize: wp(4),
    marginBottom: wp(2),
  },
  input: {
    borderColor: "gray",
    width: wp("75%"),
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
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
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
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
  },
  forgetPassword: {
    marginLeft: wp(45),
    marginVertical: wp(4),
  },
  forget: {
    color: "#d53c46",
  },
});
export default LoginScreen;
