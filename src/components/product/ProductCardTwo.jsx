import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import Animated, { FadeInDown } from "react-native-reanimated";

const ProductCardTwo = ({ props }) => {
  const navigation = useNavigation();
  const [offerVisible, setOfferVisible] = useState(false);

  const hide = () => {
    setOfferVisible(false);
  };
  const show = () => {
    setOfferVisible(true);
  };
  // utilities
  const orderNow = () => {
    // console.log(props.name);
    navigation.navigate("Cart");
  };

  const addedToCart = () => {
    // console.log(props);
  };

  const onMoreDetails = (id) => {
    navigation.navigate("ProductDetails", { _id: id });
  };
  // "Orders", { _id: id }

  const calculatePrice = (price, discount) => {
    if (price < discount) {
      return;
    }
    const discountPrice = Math.round(price - (price * discount) / 100);
    return discountPrice;
  };

  // component return
  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(1500).springify().damping(12)}
    >
      <Pressable
        style={[styles.container, styles.boxShadow, styles.androidShadow]}
        onPress={() => onMoreDetails(props._id)}
      >
        <View style={styles.cardImage}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: props.imageUrl }} style={styles.styleImage} />
          </View>

          {/* {props.offer ? (
            <View style={styles.offerContainer}>
              <Text style={styles.offer}>20%</Text>
            </View>
          ) : (
            ""
          )} */}
        </View>
        <View style={styles.details}>
          <View style={styles.textDetails}>
            <Text style={styles.productName}>{props.name.substring(0, 9)}</Text>

            <View>
              <Text style={styles.offerPrice}>₹{props.price}/ Kg</Text>
            </View>
          </View>
          <View style={styles.ratingImage}>
            {props.quantity > 0 ? (
              <Text style={styles.inStock}>In Stock</Text>
            ) : (
              <Text style={styles.outOfStock}>Out of Stock</Text>
            )}
            {/* <Image
            source={require("../../assets/ratingSample.png")}
            style={styles.ratingStyles}
          /> */}
          </View>
          <View>
            <View style={styles.cartBtns}>
              <Feather name="shopping-cart" style={styles.icon} fill="green" />
              <Text style={styles.order}>Show Product</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};
// Name, price, offer, button
export default ProductCardTwo;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#Fffff2",
    borderRadius: 10,
    marginHorizontal: "5%",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: "2%",
  },
  ratingStyles: {
    width: "40%",
    height: 25,
    resizeMode: "contain",
  },
  offerPrice: {
    fontSize: 18,
    // fontFamily: "Quicksand light",
    color: "black",
  },
  textDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardImage: {
    height: 160,
    width: "40%",
    paddingRight: 3,
  },
  ratingImage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "3%",
  },
  inStock: {
    color: "green",
    backgroundColor: "#DCFF9C",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  outOfStock: {
    color: "red",
    backgroundColor: "#FFB9B9",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 3,
  },
  mrpPrice: {
    textAlign: "right",
    // fontFamily: "Quicksand Light",
    color: "#FF5858",
    textDecorationLine: "line-through",
  },
  icon: {
    fontSize: 24,
    color: "black",
  },
  styleImage: {
    width: "80%",
    height: 120,
    borderRadius: 10,
    padding: 10,
    marginTop: "15%",
  },
  imageContainer: {
    alignItems: "center",
  },
  details: {
    width: "56%",
    margin: "2%",
    justifyContent: "space-around",
  },
  productName: {
    // fontFamily: "Galak Pro Demo",
    fontSize: 18,
    color: "black",
  },
  order: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: "5%",
    borderWidth: 0.2,
    borderColor: "blue",
    width: "80%",
    padding: 5,
    borderRadius: 100,
    backgroundColor: "#8B71FF",
    color: "white",
    marginTop: "5%",
    // fontFamily: "Quicksand Bold",
  },
  cartBtns: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  offerContainer: {
    backgroundColor: "red",
    width: "30%",
    height: "25%",
    position: "absolute",
    marginHorizontal: "2%",
    marginVertical: "2%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    padding: 4,
  },
  offer: {
    color: "white",
  },
  boxShadow: {
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 0.2,
  },
  androidShadow: {
    elevation: 4,
  },
});
