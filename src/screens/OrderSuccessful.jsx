import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const OrderSuccessful = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  useEffect(() => {
    setTimeout(() => navigation.navigate("DeliveryDetails"), 1600);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottieIcon}
        source={require("../assets/lottie/successful.json")}
        autoPlay
        loop
      />
      <Text style={styles.orderSuccess}>{t("order_placed_successfully")}</Text>
    </View>
  );
};

export default OrderSuccessful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  orderSuccess: {
    flex: 1,
    position: "absolute",
    top: hp(60),
    left: wp(15),
    fontSize: 25,
    fontColor: "black",
    fontWeight: "bold",
  },
});
