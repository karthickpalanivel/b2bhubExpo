import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ProductData } from "../../data/ProductData";
import {
  ChevronLeftIcon,
  ShoppingCartIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useNavigation } from "@react-navigation/native";
import QuantityButton from "../button/QuantityButton";
import ProductCardTwo from "./ProductCardTwo";

//component starts
const ProductDetails = ({ route }) => {
  const [product, setProduct] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const { params } = route;
  const [productName, setProductName] = useState("");
  const [data, setData] = useState(false);

  useEffect(() => {
    const getProduct = ProductData.find((item) => {
      return item?._id === params?._id;
    });
    setProduct(getProduct);
    setProductName(getProduct?.name.replaceAll(" ", ""));
    {
      productName.includes(product?.pictureName) && setData(true);
    }
    console.log(getProduct);
  }, [params?._id]);

  const goback = () => {
    navigation.goBack();
  };

  if (!product) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

  // utilities

  const addQty = () => {
    return setQuantity((prev) => prev + 1);
  };

  const subQty = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
  };

  const orderPage = (id) => {
    navigation.navigate("Orders", { _id: id });
  };

  const calculatePrice = (price, discount) => {
    if (price < discount) {
      return;
    }
    const discountPrice = Math.round(price - (price * discount) / 100);
    return discountPrice;
  };
  return (
    <ScrollView style={styles.productDetailContainer}>
      <StatusBar style={"light"} />
      <View style={styles.topBar}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product?.imageUrl }}
              style={styles.imagePage}
            />
          </View>
          <View style={styles.detailsHeader}>
            <View style={{ width: "70%" }}>
              <Text style={styles.productName}>{product?.name}</Text>
            </View>
            <View
              style={{
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: "5%",
              }}
            >
              {product.offer > 1 ? (
                <View>
                  <Text style={styles.offerPrice}>
                    ₹{calculatePrice(product.price, product.offer)}/ Kg
                  </Text>
                  <Text style={styles.mrpPrice}>₹{product.price}/ Kg</Text>
                </View>
              ) : (
                <Text style={[styles.offerPrice, styles.withoutOffer]}>
                  ₹{product.price}/ Kg
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginVertical: "10%",
                }}
              >
                <View style={styles.ratingBack}>
                  <Image
                    source={require("../../assets/rating/star.png")}
                    style={styles.ratingImage}
                  />
                </View>
                <Text>{product.rating}</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 23,
              fontWeight: "bold",
              marginTop: "2%",
            }}
          >
            Description:
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "white",
              marginLeft: "10%",
            }}
          >
            {product.description}
          </Text>
        </View>

        <View>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              marginTop: '4%',
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Delivered to: 123, down st, Chennai - 600006
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "6%",
        }}
      >
        <View style={styles.iconContainerText}>
          <Pressable
            style={styles.clockIconContainer}
            onPress={() => orderPage(product._id)}
          >
            <ShoppingCartIcon size={hp(5)} strokeWidth={1.5} color={"black"} />
            <Text style={styles.offerText}>Add to Cart</Text>
          </Pressable>
        </View>
        <QuantityButton />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={goback}>
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={"#fbbf24"} />
        </TouchableOpacity>
        <Text style={styles.pictureName}>{product?.pictureName}</Text>
        <Pressable
          style={styles.iconButton}
          onPress={() => setFavorite(!favorite)}
        >
          <HeartIcon
            size={hp(4)}
            strokeWidth={2.5}
            color={favorite ? "red" : "gray"}
          />
        </Pressable>
      </View>

      {/* product Card two */}
      {ProductData?.map((item) => {
        if (product.pictureName == item.pictureName) {
          return <ProductCardTwo props={item} />;
        }
      })}
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  productDetailContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  topBar: {
    backgroundColor: "#fbbf24",
    borderRadius: 25,
    width: wp(100),
    height: hp(60),
    paddingHorizontal: "2%",
  },

  productName: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    margin: 16,
  },

  clockIconContainer: {
    padding: 2,
    backgroundColor: "white",
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
  },

  imageContainer: {
    marginTop: "35%",
  },

  imagePage: {
    width: wp(40),
    height: wp(40),
    marginTop: "1%",
    marginHorizontal: "1%",
    borderRadius: 10,
  },

  pictureName: {
    fontSize: wp(8),
    color: "white",
    fontWeight: "bold",
  },

  iconContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    justifyContent: "space-between",
  },

  iconButton: {
    padding: 8,
    borderRadius: 9999,
    borderWidth: 0.1,
    borderColor: "black",
    marginHorizontal: "5%",
    backgroundColor: "#fff",
  },

  iconContainerText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: "3%",
    backgroundColor: "white",
    width: "42%",
    padding: 10,
    borderRadius: 999,
  },

  ratingBack: {
    backgroundColor: "white",
    borderRadius: 999,
  },

  offerPrice: {
    color: "black",
    fontSize: 15,
  },
  mrpPrice: {
    color: "#FF5858",
    textDecorationLine: "line-through",
  },

  detailsHeader: {
    marginTop: "35%",
    marginRight: "10%",
  },

  icon: {
    color: "#fbbf24",
    fontSize: 25,
  },
  cartContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: "3%",
    backgroundColor: "#fff",
    width: "42%",
    padding: 10,
    borderRadius: 999,
  },

  ratingImage: {
    width: "25%",
    height: 20,
    resizeMode: "center",
  },
  grade: {},

  offerPrice: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
