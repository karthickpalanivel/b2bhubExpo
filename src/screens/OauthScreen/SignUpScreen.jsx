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
  Pressable,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import AppLoading from "expo-app-loading";
const { width } = Dimensions.get("window");
import { StatusBar } from "expo-status-bar";

const SignUpScreen = () => {
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
        <AppLoading>
          <View style={styles.appLoading}></View>
        </AppLoading>
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
                <Image
                  source={require("../../assets/logo.png")}
                  style={{ height: wp(40), width: wp(40) }}
                />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable onPress={navigateToLogin}>
                  <ChevronLeftIcon size={hp(3.5)} color={"black"} />
                </Pressable>
                <Text style={styles.title}>Create Account</Text>
              </View>
              <Text style={{ width: width * 0.8, fontSize: 14, marginTop: 2 }}>
                Email
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={{ width: width * 0.8, fontSize: 14 }}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#999"
                secureTextEntry
              />
              <Text style={{ width: width * 0.8, fontSize: 14 }}>
                Phone Number
              </Text>
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
            <Text style={{ width: width * 0.8, fontSize: 14, marginTop: 2 }}>
              Company Name
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Company Name"
              placeholderTextColor="#999"
              value={companyName}
              onChangeText={setCompanyName}
              keyboardType="email-address"
              className="shopName"
            />
            <Text style={{ width: width * 0.8, fontSize: 14 }}>GST Number</Text>
            <TextInput
              style={styles.input}
              placeholder="GST Number"
              placeholderTextColor="#999"
              value={gstNumber}
              onChangeText={setGstNumber}
              className="gstNumber"
            />
            <Text style={{ width: width * 0.8, fontSize: 14 }}>PAN number</Text>
            <TextInput
              style={styles.input}
              placeholder="PAN Number"
              value={panNumber}
              onChangeText={setPanNumber}
              placeholderTextColor="#999"
              className="panNumber"
            />

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity style={styles.button} onPress={navigateToHome}>
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

    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: wp(5),
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
    height: wp(10),
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
    marginTop: 5,
  },
  toggleText: {
    color: "#4870F4",
    fontSize: wp(4),
    fontWeight: "bold",
  },
});

export default SignUpScreen;
