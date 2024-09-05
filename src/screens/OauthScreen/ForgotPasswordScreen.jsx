import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const navigation = useNavigation();

  //   navigation function

  const goBack = () => {
    navigation.goBack();
  };

  // utilities

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleSendOTP = () => {
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    setIsValidEmail(true);
    console.log("OTP Sent to:", email);
    Alert.alert("OTP Sent", `An OTP has been sent to ${email}.`);
    navigation.navigate("OtpConformScreen")
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          marginTop: wp(10),
          alignItems: "center",
          marginVertical: hp(3),
        }}
      >
        <Pressable onPress={goBack}>
          <ChevronLeftIcon size={hp(5)} color={"grey"} />
        </Pressable>
        <Text style={styles.header}>Forgot Password</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>

        <TextInput
          style={[styles.input, !isValidEmail && styles.errorInput]}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {!isValidEmail && (
          <Text style={styles.errorText}>
            Please enter a valid email address
          </Text>
        )}
      </View>

      <TouchableOpacity onPress={handleSendOTP} style={styles.sendOtpButton}>
        <Text style={styles.sendOtpText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignContent: "center",
  },
  header: {
    fontSize: wp(6),
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: wp(3),
  },
  inputContainer: {
    marginBottom: wp(5),
  },
  label: {
    fontSize: wp(4),
    marginBottom: wp(3),
    marginLeft: wp(1),
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: wp(2.5),
    paddingHorizontal: wp(2.5),
    paddingVertical: wp(3),
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: wp(2.5),
  },
  sendOtpButton: {
    backgroundColor: "#007bff",
    paddingVertical: wp(3),
    borderRadius: wp(100),
    justifyContent: "center",
    alignItems: "center",
  },
  sendOtpText: {
    color: "#fff",
    fontSize: wp(4),
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
