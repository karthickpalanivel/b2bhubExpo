import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
  Modal,
  RefreshControl,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AppLoaderAnimation from "../loaders/AppLoaderAnimation";
import FloatingNavigationButton from "../button/FloatingNavigationButton";
import * as Font from "expo-font";

const ProductDetails = ({ route }) => {
  const { params } = route;
  const navigation = useNavigation();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/admin/getProducts`;
    axios
      .post(url, {})
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });

    async function loadFonts() {
      await Font.loadAsync({
        Quicksand: require("../../assets/fonts/Quicksand Regular.ttf"),
        // Load other fonts as needed
      });
      setIsLoading(false);
    }

    loadFonts();
  }, []);

  useEffect(() => {
    const getProduct = products.find(
      (item) => item.productId === params?.productId
    );
    setProduct(getProduct);
  }, [products, params]);

  if (isLoading) {
    return <AppLoaderAnimation />;
  }

  if (!product) {
    return (
      <View>
        <Text>Invalid product data</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.productDetailContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar style={"auto"} backgroundColor="#fbbf24" />
        <Text>Product ID: {product.productId}</Text>
        <Text>Product Name: {product.name}</Text>
        <Image
          source={{ uri: product.CommonImage }}
          style={styles.productImage}
        />
        <Text>Description: {product.description}</Text>
        <Text>Price: {product.costPerUnit}</Text>
        <Text>Category: {product.category}</Text>
        <Text>Location: {product.location}</Text>
      </ScrollView>
      <View style={styles.floatNavigationContainer}>
        <FloatingNavigationButton />
      </View>
    </>
  );
};
export default ProductDetails;

const styles = StyleSheet.create({
  productDetailContainer: {
    backgroundColor: "white",
    marginTop: wp(6.5),
    flex: 1,
  },
  floatNavigationContainer: {
    position: "absolute",
    bottom: hp(5),
    right: wp(5),
  },
  topBar: {
    backgroundColor: "#fbbf24",
    borderRadius: 25,
    width: wp(100),
    height: hp(60),
    paddingHorizontal: "2%",
  },

  productName: {
    fontSize: wp(6),
    width: wp(50),
    color: "white",
    fontFamily: "QuicksandBold",
    marginHorizontal: wp(4),
  },

  descriptionTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(3),
  },

  descriptionText: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: wp(1),
  },

  textDescription: {
    fontSize: wp(4),
    marginLeft: wp(1),
    color: "white",
    fontFamily: "QuicksandBold",
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
    fontSize: wp(7),
    color: "white",
    fontFamily: "QuicksandBold",
  },
  inputTonContainer: {
    width: wp(50),
    marginTop: hp(1),
    borderRadius: 9999,
    marginRight: hp(1),
    backgroundColor: "white",
    elevation: 4,
  },

  iconContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
  },

  inputTons: {
    width: wp(30),
    padding: hp(0.1),
    height: hp(6),
    paddingLeft: hp(2),
    borderRadius: 9999,
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
    justifyContent: "center",
    marginLeft: wp(3),
    backgroundColor: "white",
    width: wp(40),
    elevation: 3,
    borderRadius: 999,
  },

  ratingBack: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  ratingText: {
    fontSize: hp(2.2),
    color: "white",
    fontFamily: "QuicksandBold",
  },

  offerText: {
    marginHorizontal: wp(3),
    fontSize: wp(5),
    fontFamily: "QuicksandBold",
  },
  mrpPrice: {
    color: "#FF5858",
    textDecorationLine: "line-through",
    fontSize: wp(4),
    fontFamily: "QuicksandBold",
  },

  detailsHeader: {
    marginTop: wp(30),
    marginRight: "10%",
  },

  icon: {
    color: "#fbbf24",
    fontSize: 25,
    fontFamily: "QuicksandBold",
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
  descriptionContainer: {
    width: wp(90),
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: hp(2),
  },
  ratingImage: {
    width: wp(6),
    height: wp(6),
    marginRight: wp(3),
  },
  grade: {},

  offerPrice: {
    color: "white",
    fontSize: wp(6),
    fontFamily: "QuicksandBold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontFamily: "QuicksandBold",
    color: "#333",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "QuicksandBold",
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 15,
    paddingVertical: 5,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "#4870F4",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "QuicksandBold",
  },
  paymentButton: {
    backgroundColor: "#4870F4",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  paymentButtonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "QuicksandBold",
  },
  table: {
    width: "100%",
    marginVertical: 15,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    fontSize: 16,
    color: "#333",
    fontFamily: "QuicksandBold",
  },
});
