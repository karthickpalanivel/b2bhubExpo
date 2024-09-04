import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const navigateToShopDetails = () => {
    navigation.navigate("SignUpShopDetails");
  };
  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(1500).springify().damping(12)}
      style={styles.full}
    >
      <View>
        <View style={styles.container}>
          <Image
            source={require("../../assets/logo.png")}
            style={{ height: 120, width: 120 }}
          />
        </View>
        <Text style={styles.title}>Create Account</Text>
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
        <Text style={{ width: width * 0.8, fontSize: 14 }}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          maxLenght={10}
          inputMode="tel"
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={styles.button} onPress={navigateToShopDetails}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={navigateToLogin}>
          <Text style={styles.toggleText}>Already Have a account?</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    borderWidth: 1,
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
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleButton: {
    marginTop: 5,
  },
  toggleText: {
    color: "#4870F4",
    fontSize: wp(4),
    fontWeight: "bold",
  },
});

export default SignUpScreen;
