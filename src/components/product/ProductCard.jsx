import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

const ProductCard = ({ props, index }) => {
  const navigation = useNavigation();
  let isEven = index % 2 === 0;
  const [isLoading, setIsLoading] = useState(true);
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

  const onMoreDetails = (id) => {
    navigation.navigate("ProductDetails", { _id: id });
  };

  const calculatePrice = (price, discount) => {
    if (price < discount) {
      return;
    }
    const discountPrice = Math.round(price - (price * discount) / 100);
    return discountPrice;
  };
  return (
    <Animated.View
      entering={FadeInDown.delay(index + 200)
        .duration(1500)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          paddingLeft: isEven ? 0 : 10,
          paddingRight: isEven ? 10 : 0,
          marginVertical: "10%",
          backgroundColor: "white",
          borderWidth: 0.1,
          borderColor: "#111",
        }}
        onPress={() => onMoreDetails(props._id)}
      >
        <Image
          source={{ uri: props.imageUrl }}
          style={{
            width: "100%",
            height: hp(20),
            borderRadius: 30,
          }}
        />
        <Text style={styles.productName}>
          {props.name.length > 15
            ? props.name.slice(0, 14) + "..."
            : props.name}
        </Text>
        <View>
          <Text style={styles.offerPrice}>₹{props.price}/ Kg</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productName: {
    fontSize: hp(2.1),
    fontWeight: "500",
    marginLeft: "4%",
    marginTop: "2%",
    fontFamily: "QuicksandSemiBold",
  },
  offerPrice: {
    marginLeft: "5%",
    fontSize: 15,
    color: "black",
    fontFamily: "QuicksandSemiBold",
  },
  mrpPrice: {
    color: "grey",
    opacity: 0.5,
    marginLeft: "6%",
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },
});
