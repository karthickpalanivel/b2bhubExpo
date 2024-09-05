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

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

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
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={{ backgroundColor: "#C0C0C0", width: "20%", borderRadius: 10 }}
      >
        <Text style={{ textAlign: "center", fontSize: 18 }}>Back</Text>
      </Pressable>
      <Text style={styles.header}>Forgot Password</Text>

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
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  sendOtpButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sendOtpText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
