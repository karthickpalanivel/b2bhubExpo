import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
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
        <Text style={styles.title}>Shop Details</Text>
        <Text style={{ width: width * 0.8, fontSize: 14, marginTop: 2 }}>
          Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Shop Name"
          placeholderTextColor="#999"
          keyboardType="email-address"
         
        />
        <Text style={{ width: width * 0.8, fontSize: 14 }}>GST Number</Text>
        <TextInput
          style={styles.input}
          placeholder="GST Number"
          placeholderTextColor="#999"
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
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  input: {
    width: width * 0.8,
    height: 50,
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
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: wp(4),
    fontWeight: "bold",
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
