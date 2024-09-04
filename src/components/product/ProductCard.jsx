import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ props, index }) => {
  const navigation = useNavigation();
  let isEven = index % 2 === 0;
  let isThree = props._id % 3 === 0;

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
          {props.name.length > 20
            ? props.name.slice(0, 17) + "..."
            : props.name}
        </Text>
        <View>
          {props.offer > 1 ? (
            <>
              <Text style={styles.offerPrice}>
                ₹{calculatePrice(props.price, props.offer)}/ Kg
              </Text>
              <Text style={styles.mrpPrice}>₹{props.price}/ Kg</Text>
            </>
          ) : (
            <Text style={styles.offerPrice}>₹{props.price}/ Kg</Text>
          )}
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
  },
  offerPrice: {
    marginLeft: "5%",
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  mrpPrice: {
    color: "grey",
    opacity: 0.5,
    marginLeft: "6%",
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },
});
