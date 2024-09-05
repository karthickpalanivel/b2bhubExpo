import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  BackHandler,
  Dimensions,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const navigation = useNavigation();

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = () => {
    navigation.navigate("Home");
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
    <View style={styles.full}>
      <View>
        <View style={styles.container}>
          <Image
            source={require("../../assets/logo.png")}
            style={{ height: 120, width: 120 }}
          />
        </View>
        <Text style={styles.title}>Login</Text>
        <Text style={{ width: width * 0.8, fontSize: 14, marginTop: 2 }}>
          Email
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={{ width: width * 0.8, fontSize: 14 }}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
      </View>
      <View style={{ width: wp(80), marginTop: hp(2) }}>
        <TouchableOpacity>
          <Text style={{ textAlign: "right" }}>Forget Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={navigateToSignUp}
        >
          <Text style={styles.toggleText}>Click here Create a new Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },

  input: {
    width: width * 0.8,
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderColor: "#ddd",
  },
  
  password: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 2,
    marginHorizontal: 90,
    textAlign: "right",
    justifyContent: "flex-end",
  },
  
  button: {
    backgroundColor: "#4CAF50",
    padding: wp(3),
    width: wp(80),
    borderRadius: 9999,
    marginVertical: 10,
  },
  
  buttonText: {
    color: "#fff",
    fontSize: wp(4),
    fontWeight: "bold",
    textAlign: "center",
  },
  toggleButton: {
    marginTop: wp(2),
  },
  toggleText: {
    color: "#4870F4",
    fontSize: wp(4),
    fontWeight: "bold",
  },
});
export default LoginScreen;
