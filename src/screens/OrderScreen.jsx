import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ProductData } from "../data/ProductData";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Radio from "../components/button/Radio";
import { PencilSquareIcon, TrashIcon } from "react-native-heroicons/outline";
import AppLoaderAnimation from "../components/loaders/AppLoaderAnimation";

const OrderScreen = ({ route }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { params } = route;
  const navigation = useNavigation();

  useEffect(() => {
    const getProduct = ProductData.find((item) => {
      return item?._id === params?._id;
    });
    setProduct(getProduct);
    // console.log(getProduct);
  }, [params?._id]);

  const goback = () => {
    navigation.goBack();
  };

  const calculatePrice = (price, discount) => {
    if (price < discount) {
      return;
    }
    const discountPrice = Math.round(price - (price * discount) / 100);
    return discountPrice;
  };

  const orderSuccessful = () => {
    navigation.navigate("Sucessfull");
  };

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <View style={styles.container}>
          <StatusBar style="auto" backgroundColor="#4870F4" />
          <View style={styles.headerBar}>
            <TouchableOpacity style={styles.iconButton} onPress={goback}>
              <ArrowLeftIcon size={hp(3.5)} strokeWidth={2.5} color={"black"} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Order Summary</Text>
          </View>
          <ScrollView>
            {product ? (
              <View style={{ alignItems: "center" }}>
                <View style={styles.card}>
                  <Image
                    source={{ uri: product?.imageUrl }}
                    style={styles.imagePage}
                  />
                  <View style={styles.cardTextContainer}>
                    <View style={styles.textRatingContainer}>
                      <Text
                        style={{
                          fontSize: hp(2),
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {product.name}
                      </Text>
                      {product.offer > 1 ? (
                        <Text style={styles.offerPrice}>
                          ₹{calculatePrice(product.price, product.offer)}/ Kg
                        </Text>
                      ) : (
                        <Text style={styles.offerPrice}>
                          ₹{product.price}/ Kg
                        </Text>
                      )}
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          source={require("../assets/rating/roundStar.png")}
                          style={styles.ratingImage}
                        />
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            marginLeft: wp(2),
                          }}
                        >
                          {product.rating}/5
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TouchableOpacity style={styles.actionContainer}>
                          <PencilSquareIcon color="white" size={hp(2)} />
                          <Text style={styles.actionText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionContainer}>
                          <TrashIcon color="white" size={hp(2)} />
                          <Text style={styles.actionText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <Text>Loading product details...</Text>
            )}
          </ScrollView>
          <View style={styles.radioContainer}>
            <Radio />
          </View>

          <Pressable
            style={styles.placeOrderContainer}
            onPress={orderSuccessful}
          >
            <Text style={styles.placeOrder}>Place Order</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  radioContainer: {
    width: "90%",
    marginHorizontal: "5%",
    marginBottom: "10%",
  },

  cardTextContainer: {
    width: wp(60),
    flexDirection: "row",
    textAlign: "left",
    marginLeft: wp(2),
  },
  textRatingContainer: {},
  card: {
    width: wp(90),
    flexDirection: "row",
    marginVertical: wp(10),
    borderColor: "white",
    padding: wp(2),
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "#4870F4",
  },

  actionContainer: {
    flexDirection: "row",
    marginTop: wp(4),
  },

  actionText: {
    fontSize: wp(4),
    color: "white",
    fontWeight: "600",
  },

  headerBar: {
    marginTop: "10%",
    flexDirection: "row",
    alignItems: "center",
  },

  offerPrice: {
    marginLeft: "5%",
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    marginVertical: "2%",
  },

  ratingImage: {
    marginTop: wp(2),
    width: wp(5),
    height: wp(5),
    resizeMode: "center",
  },
  imagePage: {
    width: wp(30),
    height: wp(30),
    margin: wp(1),
    borderRadius: 10,
  },

  iconButton: {
    padding: 8,
    borderRadius: 9999,
    borderWidth: 0.1,
    width: wp(12),
    borderColor: "white",
    marginHorizontal: "5%",
    backgroundColor: "white",
    elevation: 4,
  },
  headerText: {
    marginLeft: "8%",
    fontSize: 25,
    fontWeight: "bold",
    elevation: 3,
  },
  placeOrderContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#8B71FF",
    padding: "3%",
    marginHorizontal: "10%",
    borderRadius: 999,
    elevation: 9,
  },
  placeOrder: {
    alignItems: "center",
    fontSize: wp(5),
    fontWeight: "bold",
    color: "white",
  },
});
