import React, { useState, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const OTPAndPasswordScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [isOtpValid, setIsOtpValid] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const otpRefs = Array.from({ length: 5 }, () => useRef(null));

  const handleOtpChange = (index, value) => {
    let otpArray = [...otp];
    otpArray[index] = value;
    setOtp(otpArray);

    if (value && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    }

    if (!value && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const validateOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === "52155") {
      setIsOtpValid(true);
      setOtpVerified(true);
    } else {
      setIsOtpValid(false);
    }
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      Alert.alert("Success", "Password changed successfully!");
    } else {
      Alert.alert("Error", "Passwords do not match!");
    }
  };

  return (
    <View style={styles.container}>
      {!otpVerified ? (
        <>
          <Text style={styles.heading}>OTP confirmation</Text>
          <Text style={styles.subheading}>Check Your message for OTP</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={otpRefs[index]}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(index, value)}
              />
            ))}
          </View>

          {isOtpValid === false && (
            <Text style={styles.errorText}>
              Wrong OTP, re-check message inbox*
            </Text>
          )}

          <Button title="Confirm OTP" onPress={validateOtp} color="#007bff" />
        </>
      ) : (
        <>
          <Text style={styles.heading}>OTP confirmation</Text>
          <Text style={styles.subheading}>Check Your message for OTP</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                value={digit}
                editable={false}
              />
            ))}
          </View>

          <Text style={styles.verifiedText}>OTP verified*</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Re-Enter New Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <Button
            title="Confirm"
            onPress={handlePasswordChange}
            color="#007bff"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  verifiedText: {
    color: "green",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default OTPAndPasswordScreen;
