import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

import Animated, { FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const ShopDetails = () => {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  const [shopName, setShopName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");

  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(2000).springify().damping(12)}
      style={styles.full}
    >
      <View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/logo.png")}
            style={{ height: 120, width: 120 }}
          />
        </View>
        <Text style={styles.title}>Company Details</Text>
        <Text style={{ width: width * 0.8, fontSize: 14, marginTop: 2 }}>
          Company Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          placeholderTextColor="#999"
          keyboardType="email-address"
          className="shopName"
        />
        <Text style={{ width: width * 0.8, fontSize: 14 }}>GST Number</Text>
        <TextInput
          style={styles.input}
          placeholder="GST Number"
          placeholderTextColor="#999"
          className="gstNumber"
        />
        <Text style={{ width: width * 0.8, fontSize: 14 }}>PAN number</Text>
        <TextInput
          style={styles.input}
          placeholder="PAN Number"
          placeholderTextColor="#999"
          className="panNumber"
        />
      </View>
      <View style={{ width: wp(80), marginTop: hp(2) }}></View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: wp(5),
    fontWeight: "bold",
    marginVertical: wp(2.5),
    color: "#333",
  },
  input: {
    width: width * 0.8,
    height: wp(12.5),
    backgroundColor: "#f5f5f5",
    borderRadius: wp(2),
    paddingHorizontal: wp(3.5),
    marginVertical: wp(2.5),
    borderColor: "#ddd",
    borderWidth: 1,
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
    fontWeight: "bold",
  },
});
export default ShopDetails;
