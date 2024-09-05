import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const OTPAndPasswordScreen = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [isOtpValid, setIsOtpValid] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

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
          <Text style={styles.subheading}>Check Your mail for OTP</Text>

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
            <View>
              <Text style={styles.errorText}>
                Wrong OTP, re-check mail inbox*
              </Text>
            </View>
          )}

          <Pressable onPress={validateOtp}>
            <Text>Conform OTP</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.heading}>OTP confirmation</Text>
          <Text style={styles.subheading}>Check Your mail for OTP</Text>

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

          <Pressable
            onPress={handlePasswordChange}
            style={styles.conformBtnContainer}
          >
            <Text>Conform OTP</Text>
          </Pressable>
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
    paddingHorizontal: wp(5),
  },
  heading: {
    fontSize: wp(6),
    fontWeight: "bold",
    marginBottom: wp(2.5),
  },
  subheading: {
    fontSize: wp(4),
    marginBottom: wp(5),
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: wp(5),
  },
  otpInput: {
    width: wp(12.5),
    height: wp(12.5),
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: wp(4.5),
    marginHorizontal: 5,
    borderRadius: wp(2.5),
  },
  errorText: {
    color: "red",
    marginBottom: wp(2.5),
  },
  verifiedText: {
    color: "green",
    marginBottom: wp(5),
  },
  input: {
    width: "100%",
    height: wp(12.5),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: wp(2.5),
    marginBottom: wp(5),
    paddingHorizontal: wp(2.5),
  },

  conformBtnContainer: {},

  conformBtnText: {},
});

export default OTPAndPasswordScreen;
