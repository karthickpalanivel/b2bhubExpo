import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {FadeInDown} from "react-native-reanimated";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import axios from "axios";
const {width} = Dimensions.get("window");
import * as Font from "expo-font";
import {StatusBar} from "expo-status-bar";
import AppLoaderAnimation from "../../components/loaders/AppLoaderAnimation";

const SignUpScreen = () => {
  async function HandleSignup() {
    await axios
      .post(
        "https://erp-backend-new-ketl.onrender.com/b2b/customer-registration",
        {
          Email: email,
          PAN: panNumber,
          gstNo: gstNumber,
          phoneNo: phone,
          CompanyName: companyName,
          Password: password,
        }
      )
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          console.log(res.status);
          const customer = res.data.user;
          console.log(customer);
          try {
            AsyncStorage.setItem("loginstate", "true");
            AsyncStorage.setItem("userEmail", email);
            AsyncStorage.setItem("customerId", customer.customerId);
            AsyncStorage.setItem("companyname", customer.CompanyName);
            AsyncStorage.setItem("phone", customer.phoneNo);
            AsyncStorage.setItem("gst", customer.gstNo);
            AsyncStorage.setItem("email", customer.Email);
          } catch (e) {
            // saving error
            console.error(e);
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

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");

  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <Animated.View
          entering={FadeInDown.delay(200)
            .duration(1500)
            .springify()
            .damping(12)}
          style={styles.full}
        >
          <StatusBar style="auto" backgroundColor="white" />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <View style={styles.container}>
                <Pressable onPress={navigateToLogin}>
                  <ChevronLeftIcon
                    size={hp(3.5)}
                    color={"white"}
                    style={styles.icon}
                  />
                </Pressable>
                <Image
                  source={require("../../assets/logo.png")}
                  style={styles.logo}
                />
              </View>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={styles.title}>Create Account</Text>
              </View>

              {/* <Text style={styles.label}>Email</Text> */}
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* <Text style={styles.label}>Password</Text> */}
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#999"
                secureTextEntry
              />

              {/* <Text style={styles.label}>Phone Number</Text> */}
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                maxLenght={10}
                inputMode="tel"
              />
            </View>
            {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={styles.button} onPress={navigateToShopDetails}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={navigateToLogin}>
          <Text style={styles.toggleText}>Already Have a account?</Text>
        </TouchableOpacity>
      </View> */}

            {/* <Text style={styles.label}>Company Name</Text> */}
            <TextInput
              style={styles.input}
              placeholder="Company Name"
              placeholderTextColor="#999"
              value={companyName}
              onChangeText={setCompanyName}
              keyboardType="email-address"
              className="shopName"
            />

            {/* <Text style={styles.label}>GST Number</Text> */}
            <TextInput
              style={styles.input}
              placeholder="GST Number"
              placeholderTextColor="#999"
              value={gstNumber}
              onChangeText={setGstNumber}
              className="gstNumber"
            />

            {/* <Text style={styles.label}>PAN number</Text> */}
            <TextInput
              style={styles.input}
              placeholder="PAN Number"
              value={panNumber}
              onChangeText={setPanNumber}
              placeholderTextColor="#999"
              className="panNumber"
            />

            <View style={{justifyContent: "center", alignItems: "center"}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => HandleSignup()}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity style={styles.toggleButton} onPress={navigateToLogin}>
        <Text style={styles.toggleText}>Already Have a account?</Text>
      </TouchableOpacity> */}
          </ScrollView>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: "#D53C46",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: hp(8),

    flexDirection: "row",
  },

  logo: {
    height: wp(30),
    width: wp(30),
    borderRadius: 999,
    marginLeft: wp(18),
  },
  label: {
    width: width * 0.8,
    fontSize: 14,
    color: "white",
  },

  title: {
    fontSize: wp(7),
    fontFamily: "QuicksandBold",
    marginVertical: wp(2.5),
    color: "#fff",
  },
  input: {
    width: wp(80),
    height: wp(10),
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderColor: "#999",
    borderWidth: 1,
  },
  // password: {
  //   fontSize: 10,
  //   fontWeight: "bold",
  //   marginTop: 2,
  //   marginHorizontal: 90,
  //   textAlign: "right",
  //   justifyContent: "flex-end",
  // },
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
    color: "#D53C46",
    fontSize: wp(4),
    fontWeight: "bold",
    textAlign: "center",
  },
  toggleButton: {
    marginTop: 5,
  },
  toggleText: {
    fontSize: wp(4),
    color: "#D53C46",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
