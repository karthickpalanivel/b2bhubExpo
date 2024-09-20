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
import { useTranslation } from "react-i18next";
import axios from 'axios'


const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [originalOtp, setOriginalOtp] = useState("")
  const { t } = useTranslation();
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


  const handleEmailSubmit = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}` + "/b2b/sendOtp";
      const res = await axios.post(url, {email});
      setOriginalOtp(res.data.otp); 
      console.log('====================================');
      console.log(originalOtp);
      console.log('====================================');
      Alert.alert('OTP sent to your email!');
    } catch (error) {
      Alert.alert('Failed to send OTP'+error);
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };



  const handleSendOTP = async()  => {
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      Alert.alert(`${t("invalid_email")} \n${t("enter_valid_email")}`);
      try {
        const url = `${process.env.REACT_APP_BACKEND_URL}` + "/b2b/sendOtp";
        const res = await axios.post(url, {email});
        setOriginalOtp(res.data.otp.toString());
        console.log(originalOtp);
        Alert.alert(`${t("otp_sent")} \n${t("otp has been sent to ")}${email}`);
      } catch (error) {
        console.log(error)
      } finally {
        navigation.navigate("OtpConformScreen", {
          email: email,
          originalOtp: originalOtp,
        });
      }
      return;
    }
    setIsValidEmail(true);
    // console.log("OTP Sent to:", email);
    
    Alert.alert(`${t("otp_sent")} \n${t("otp_has_been_sent_to ")}${email}`);
    navigation.navigate("OtpConformScreen",{email: email});
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={goBack} style={styles.goBackContainer}>
        <ChevronLeftIcon size={hp(3.5)} color={"#D53C46"} strokeWidth={3} />
      </Pressable>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.header}>{t("forgot_password")}</Text>
        </View>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.label}>Email</Text> */}

          <TextInput
            style={[styles.input, !isValidEmail && styles.errorInput]}
            placeholder={t("enter_your_email")}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {!isValidEmail && (
            <Text style={styles.errorText}>{t("send_otp")}</Text>
          )}
        </View>

        <TouchableOpacity onPress={handleEmailSubmit} style={styles.sendOtpButton}>
          <Text style={styles.sendOtpText}>{t('send_otp')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: "#D53C46",
    alignContent: "center",
  },

  content: {
    paddingVertical: wp(10),
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: wp(5),
  },
  header: {
    fontSize: wp(6),
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: wp(3),
    marginBottom: hp(1),
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
    width: wp(80),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: wp(2.5),
    paddingHorizontal: wp(2.5),
    paddingVertical: wp(3),
  },
  errorInput: {
    borderColor: "red",
  },
  goBackContainer: {
    marginVertical: hp(2),
    width: hp(5),
    height: hp(5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    marginTop: wp(2.5),
  },
  sendOtpButton: {
    width: "80%",
    backgroundColor: "white",
    paddingVertical: wp(3),
    borderRadius: wp(80),
    borderWidth: 0.1,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  sendOtpText: {
    color: "#D53C46",
    fontSize: wp(4),
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
