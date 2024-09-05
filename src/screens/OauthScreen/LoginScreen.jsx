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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const navigation = useNavigation();

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = () => {
    navigation.navigate("Home");
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
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <Text style={{ width: width * 0.8, fontSize: 14 }}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#999"
          secureTextEntry
        />
      </View>
      <View style={{ width: wp(80), marginTop: hp(2) }}>
        <TouchableOpacity onPress={navigateToForgotPassword}>
          <Text
            style={{ textAlign: "right", color: "#4870F4", fontWeight: "bold" }}
          >
            Forget Password?
          </Text>
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
          <Text style={styles.toggleText}>
            Click here to Create a new Account!
          </Text>
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
    fontSize: wp(7),
    fontWeight: "bold",
    marginVertical: wp(2.5),
    color: "#333",
  },

  input: {
    width: wp(80),
    height: wp(12.5),
    backgroundColor: "#f5f5f5",
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    marginVertical: 10,
    borderColor: "#ddd",
  },

  password: {
    fontSize: wp(3),
    fontWeight: "bold",
    marginTop: wp(0.5),
    marginHorizontal: wp(10),
    textAlign: "right",
    justifyContent: "flex-end",
  },

  button: {
    backgroundColor: "#fff",
    padding: wp(3),
    borderWidth: 0.1,
    elevation: 2,
    width: wp(80),
    borderRadius: 9999,
    marginVertical: wp(2.5),
  },

  buttonText: {
    color: "#4870F4",
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
