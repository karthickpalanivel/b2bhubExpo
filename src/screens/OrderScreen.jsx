import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ProductData } from "../data/ProductData";
import { ChevronLeftIcon, ArrowLeftIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Radio from "../components/button/Radio";

const OrderScreen = ({ route }) => {
  const [product, setProduct] = useState(null);
  const { params } = route;
  const navigation = useNavigation();

  useEffect(() => {
    const getProduct = ProductData.find((item) => {
      return item?._id === params?._id;
    });
    setProduct(getProduct);
    console.log(getProduct);
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
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.iconButton} onPress={goback}>
          <ArrowLeftIcon size={hp(3.5)} strokeWidth={2.5} color={"black"} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Summary</Text>
      </View>

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
                    fontSize: hp(2.0),
                    fontWeight: "bold",
                  }}
                >
                  {product.name}
                </Text>
                {product.offer > 1 ? (
                  <Text style={styles.offerPrice}>
                    ₹{calculatePrice(product.price, product.offer)}/ Kg
                  </Text>
                ) : (
                  <Text style={styles.offerPrice}>₹{product.price}/ Kg</Text>
                )}
                <View>
                  <Image
                    source={require("../assets/rating/ratingSample.png")}
                    style={styles.ratingImage}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    Will be delivered within next 3 days
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text>Loading product details...</Text>
      )}

      <View style={styles.radioContainer}>
        <Radio />
      </View>

      <Pressable style={styles.placeOrderContainer} onPress={orderSuccessful}>
        <Text style={styles.placeOrder}>Place Order</Text>
      </Pressable>
    </View>
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
    flexDirection: "row",
    textAlign: "left",
  },
  textRatingContainer: {},
  card: {
    width: "90%",
    flexDirection: "row",
    marginVertical: "10%",
    borderColor: "black",
    padding: "2%",
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
  },

  headerBar: {
    marginTop: "10%",
    flexDirection: "row",
    alignItems: "center",
  },

  offerPrice: {
    marginLeft: "5%",
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    marginVertical: "2%",
  },

  ratingImage: {
    width: "65%",
    height: 50,
    resizeMode: "center",
  },
  imagePage: {
    width: wp(30),
    height: wp(30),
    marginTop: "1%",
    marginHorizontal: "1%",
    borderRadius: 10,
  },

  iconButton: {
    padding: 8,
    borderRadius: 9999,
    borderWidth: 0.1,
    width: wp(12),
    borderColor: "black",
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
  imageCard: {},
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
