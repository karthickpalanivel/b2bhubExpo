import React, { useState, useCallback, useEffect } from "react";
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
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
const { width } = Dimensions.get("window");
import axios from "axios";
import {
  ChevronLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EntryExitTransition } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  async function handleLogin() {
    await axios
      .post("https://erp-backend-new-ketl.onrender.com/b2b/login", {
        email: email,
        pwd: password,
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          const customer = res.data.user;
          console.log(customer);
          try {
            AsyncStorage.setItem('loginstate','true');
            AsyncStorage.setItem('userEmail',email);
            AsyncStorage.setItem('customerId',customer.customerId);
            AsyncStorage.setItem('companyname',customer.CompanyName);
            AsyncStorage.setItem('phone',customer.phoneNo);
            AsyncStorage.setItem('gst',customer.gstNo);
            AsyncStorage.setItem('email',customer.Email);
            AsyncStorage.setItem('token',res.data.token)
            
          } catch (e) {
            // saving error
            console.error(e)
          }
          
          navigation.navigate("Home");
        } else window.alert(res.message);
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  }

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Quicksand: require("../../assets/fonts/Quicksand Regular.ttf"),
        QuicksandBold: require("../../assets/fonts/Quicksand Bold.ttf"),
        QuicksandSemiBold: require("../../assets/fonts/Quicksand SemiBold.ttf"),
        QuicksandLight: require("../../assets/fonts/Quicksand Light.ttf"),
      });
      setIsLoading(false);
    }

    loadFonts();
  }, []);

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
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

  const handleShowPassword = () => {
    setShowpassword(!showPassword);
  };

  return (
    <>
      {isLoading ? (
        <View>
          <Text>loading</Text>
        </View>
      ) : (
        <View style={styles.full}>
          <StatusBar style="auto" backgroundColor="white"/>
          <View>
            <ChevronLeftIcon size={wp(6)} color={"grey"} style={styles.icon} />
            <View style={styles.container}>
              <Image
                source={require("../../assets/logo.png")}
                style={{ height: wp(30), width: wp(30) }}
              />
            </View>
            <Text style={[styles.title]}>Login</Text>
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
            <Text style={{ width: wp(80), fontSize: wp(5) }}>Password</Text>
            <View
              style={{
                width: wp(80),
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor="#999"
                secureTextEntry={showPassword}
              />
              <View>
                <TouchableOpacity onPress={handleShowPassword}>
                  {showPassword ? (
                    <EyeSlashIcon
                      size={wp(5)}
                      color={"grey"}
                      style={styles.eyeIcon}
                    />
                  ) : (
                    <EyeIcon
                      size={wp(5)}
                      color={"grey"}
                      style={styles.eyeIcon}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ width: wp(80), marginTop: hp(2) }}>
            <TouchableOpacity onPress={navigateToForgotPassword}>
              <Text
                style={{
                  textAlign: "right",
                  color: "#4870F4",
                  fontWeight: "bold",
                }}
              >
                Forget Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity style={styles.button} onPress={()=>handleLogin()}>
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
      )}
    </>
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
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: wp(7),
    fontWeight: "bold",
    marginVertical: wp(2.5),
    color: "#333",
    fontFamily:"QuicksandBold",
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
  eyeIcon: {
    position: "absolute",
    right: wp(2.5),
    top: hp(-1.5),
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
    fontFamily:"QuicksandBold"
  },
  icon: {
    position: "absolute",
    top: wp(-20),
    zIndex: 100,
  },
});
export default LoginScreen;
