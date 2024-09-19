import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { useTranslation } from "react-i18next";


const OTPAndPasswordScreen = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpValid, setIsOtpValid] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswrod, setShowPassword] = useState(true);

  const handleShowPassword = () => {
    setShowPassword(!showPasswrod);
  };
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
    if (enteredOtp === "000000") {
      setIsOtpValid(true);
      setOtpVerified(true);
    } else {
      setIsOtpValid(false);
    }
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword && newPassword.length >= 8) {
      Alert.alert("Success", "Password changed successfully!");
      navigation.navigate("Login");
    } else if (newPassword.length < 8) {
      Alert.alert("Error", "Passwords must be more than 8!");
    } else {
      Alert.alert("Error", "Passwords isn't match!");
    }
  };

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      
      <View style={styles.content}>
        {!otpVerified ? (
          <>
            <Text style={styles.heading}>{t('otp_confirmation')}</Text>
            <Text style={styles.subheading}>{t('check_mail_for_otp')}</Text>

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
                  {t('wrong_otp_recheck_mail')}
                </Text>
              </View>
            )}

            <Pressable onPress={validateOtp} style={styles.conformBtnContainer}>
              <Text style={styles.conformBtnText}>{t('confirm_otp')}</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.heading}>{t('otp_confirmation')}</Text>
            <Text style={styles.subheading}>{t('check_mail_for_otp')}</Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  value={digit}
                  editable={false}
                  minLength={8}
                />
              ))}
            </View>

            <Text style={styles.verifiedText}>{t('otp_verified')}*</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={t('enter_new_password')}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                minLength={8}
              />
              <TouchableOpacity onPress={handleShowPassword}>
                {showPasswrod ? (
                  <EyeSlashIcon
                    size={wp(5)}
                    color={"grey"}
                    style={styles.eyeIcon}
                  />
                ) : (
                  <EyeIcon size={wp(5)} color={"grey"} style={styles.eyeIcon} />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={t('reenter_new_password')}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={handleShowPassword}>
                {showPasswrod ? (
                  <EyeSlashIcon
                    size={wp(5)}
                    color={"grey"}
                    style={styles.eyeIcon}
                  />
                ) : (
                  <EyeIcon size={wp(5)} color={"grey"} style={styles.eyeIcon} />
                )}
              </TouchableOpacity>
            </View>

            <Pressable
              onPress={handlePasswordChange}
              style={styles.conformBtnContainer}
            >
              <Text style={styles.conformBtnText}>{t('change_password')}</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D53C46",
    paddingHorizontal: wp(5),
  },
  content: {
    width: wp(90),
    elevation: 2,
    paddingVertical: wp(10),
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: wp(5),
  },

  inputContainer: {
    flexDirection: "row",
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

  eyeIcon: {
    position: "absolute",
    top: wp(4),
    right: wp(3),
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
    width: wp(80),
    height: wp(12.5),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: wp(2.5),
    marginBottom: wp(5),
    paddingHorizontal: wp(2.5),
    elevation: 1,
    backgroundColor: "white",
  },

  conformBtnContainer: {
    width: wp(50),
    backgroundColor: "white",
    elevation: 2,
    padding: wp(3),
    alignItems: "center",
    borderRadius: wp(99),
  },

  conformBtnText: {
    color: "#D53C46",
    fontWeight: "bold",
  },
});

export default OTPAndPasswordScreen;
