import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Feather from "react-native-vector-icons/Feather";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
const colors="#d53c46";
const backgrounds="#FCF8F3";

const FloatingNavigationButton = ({buttonColor}) => {
  const [icon_1] = useState(new Animated.Value(40));
  const [icon_2] = useState(new Animated.Value(40));
  const [icon_3] = useState(new Animated.Value(40));

  useEffect(() => {
    popOut();
  }, []);

  const [pop, setPop] = useState(false);

  const navigation = useNavigation();

  const handleNavigateHome = () => {
    popOut();
    navigation.navigate("Home");
  };

  const handleNavigateOrders = () => {
    popOut();
    navigation.navigate("DeliveryDetails");
  };

  const handleNavigateAccounts = () => {
    popOut();
    navigation.navigate("AccountDetails");
  };

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: hp(10),
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: hp(6.6),
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: hp(3.3),
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: -hp(100),
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: -hp(100),
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: -hp(100),
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  return (
    <>
      <Animated.View style={[styles.floatButton, { bottom: icon_1 }]}>
        <TouchableOpacity onPress={handleNavigateHome}>
          <FontAwesome name="home" size={wp(5)} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.floatButton, { bottom: icon_2 }]}>
        <TouchableOpacity onPress={handleNavigateOrders}>
          <FontAwesome5 name="shopping-cart" size={wp(5)} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.floatButton, { bottom: icon_3 }]}>
        <TouchableOpacity onPress={handleNavigateAccounts}>
          <FontAwesome5 name="user-alt" size={wp(5)} color="white" />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={[styles.floatButton, { zIndex: 400 }]}
        onPress={() => {
          pop ? popOut() : popIn();
        }}
      >
        <Feather name="menu" size={wp(7)} color="white" />
      </TouchableOpacity>
    </>
  );
};

export default FloatingNavigationButton;

const styles = StyleSheet.create({
  floatButton: {
    width: wp(15),
    height: wp(15),
    backgroundColor: colors,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    elevation: 2,
  },
});
