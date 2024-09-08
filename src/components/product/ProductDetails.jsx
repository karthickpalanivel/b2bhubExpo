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
import ProductCardTwo from "./ProductCardTwo";
import TermsAndConditionsModal from "./TermsandCondition";
import AppLoading from "expo-app-loading";
import AppLoaderAnimation from "../loaders/AppLoaderAnimation";

//component starts
const ProductDetails = ({ route }) => {
  const [product, setProduct] = useState(null);
  const [favorite, setFavorite] = useState(false);
  //const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const { params } = route;
  const [productName, setProductName] = useState("");

  const [data, setData] = useState(false);

  const [tonsInput, setTonsInput] = useState(100);
  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalQuantity, setModalQuantity] = useState(100);
  const [showSummary, setShowSummary] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);
  const [modalTermVisible, setModalTermVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //showSummary
  const handleContinue = () => {
    setShowSummary(true);
  };
  const handlePayment = () => {
    // Handle payment logic here
    setModalVisible(false);
    setModalTermVisible(true);
    setTermsVisible(true);
  };
  const calculateTotal = () => {
    const totalPrice = 500 * modalQuantity;
    const gst = totalPrice * 0;
    const totalAmount = totalPrice + gst;

    return { totalPrice, gst, totalAmount };
  };

  /*
  setModalVisible(false);
    setModalTermVisible(false)
    setshowSummary(false);
    setTermsVisible(false);
  */

  const { totalPrice, gst, totalAmount } = calculateTotal();

  useEffect(() => {
    const getProduct = ProductData.find((item) => {
      return item?._id === params?._id;
    });
    setProduct(getProduct);
    setProductName(getProduct?.name.replaceAll(" ", ""));
    {
      productName.includes(product?.pictureName) && setData(true);
    }
    // console.log(getProduct);

    setTimeout(() => {
      setModalVisible(false);
      setModalTermVisible(false);
      setShowSummary(false);
      setTermsVisible(false);
    }, 50);
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

  const onChangeText = (text) => {};
  return (
    <>
      {isLoading ? (
        <>
          <AppLoading>
            <AppLoaderAnimation />
          </AppLoading>
        </>
      ) : (
        <ScrollView style={styles.productDetailContainer}>
          <StatusBar style={"auto"} backgroundColor="#fbbf24" />
          <View style={styles.topBar}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: product?.imageUrl }}
                  style={styles.imagePage}
                />
              </View>
              <View style={styles.detailsHeader}>
                <View>
                  <Text style={styles.productName}>{product?.name}</Text>
                </View>
                <View
                  style={{
                    width: wp(40),

                    marginLeft: wp(5),
                  }}
                >
                  <View>
                    <Text style={styles.offerPrice}>₹{product.price}/ Kg</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",

                      marginVertical: "10%",
                    }}
                  >
                    <View style={styles.ratingBack}>
                      <Image
                        source={require("../../assets/rating/roundStar.png")}
                        style={styles.ratingImage}
                      />
                      <Text style={styles.ratingText}>{product.rating} /5</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <Text
                style={{
                  color: "white",
                  fontSize: wp(6),
                  fontWeight: "bold",
                  marginTop: hp(2),
                  textDecorationLine: "underline",
                }}
              >
                Description:
              </Text>
              <Text
                style={{
                  fontSize: wp(4),
                  color: "white",
                  marginLeft: wp(5),
                }}
              >
                {/* {product.description} */}
              </Text>
            </View>

            {/* <TouchableOpacity style={styles.addressContainer}>
        <MapPinIcon size={hp(3)} color={"white"} />
        <Text
          style={{
            color: "white",
            fontSize: wp(4),
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Delivered to: 123, down st, Chennai - 600006
        </Text>
      </TouchableOpacity> */}
            <View style={styles.iconContainerText}>
              <Pressable
                style={styles.clockIconContainer}
                onPress={() => setModalVisible(true)}
              >
                <ShoppingCartIcon
                  size={hp(5)}
                  strokeWidth={1.5}
                  color={"black"}
                />
                <Text style={styles.offerText}>Order Now</Text>
              </Pressable>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/*Modal view */}
            <Modal
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
              animationType="slide"
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>X</Text>
                  </TouchableOpacity>
                  {!showSummary ? (
                    <>
                      <Text style={styles.modalTitle}>Select Quantity</Text>

                      <TextInput
                        style={styles.input}
                        placeholder="Quantity in Tones"
                        keyboardType="numeric"
                        value={modalQuantity.toString()}
                        onChangeText={(text) => setModalQuantity(Number(text))}
                      />

                      <TouchableOpacity
                        style={styles.continueButton}
                        onPress={handleContinue}
                      >
                        <Text style={styles.continueButtonText}>Continue</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text style={styles.modalTitle}>Order Summary</Text>
                      <View style={styles.table}>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableCell}>Total Price</Text>
                          <Text style={styles.tableCell}>
                            Rs {totalPrice.toFixed(0)}
                          </Text>
                        </View>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableCell}>GST (0%)</Text>
                          <Text style={styles.tableCell}>
                            Rs {gst.toFixed(0)}
                          </Text>
                        </View>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableCell}>Total Amount</Text>
                          <Text style={styles.tableCell}>
                            Rs {totalAmount.toFixed(0)}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.paymentButton}
                        onPress={handlePayment}
                      >
                        <Text style={styles.paymentButtonText}>
                          Proceed to Payment
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </Modal>
            <Modal
              transparent={true}
              visible={modalTermVisible}
              onRequestClose={() => setModalTermVisible(false)}
              animationType="slide"
            >
              <TermsAndConditionsModal
                visible={termsVisible}
                onClose={() => setTermsVisible(false)}
              />
            </Modal>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={goback}>
              <ChevronLeftIcon
                size={hp(3.5)}
                strokeWidth={4.5}
                color={"#fbbf24"}
              />
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
            if (
              product.pictureName == item.pictureName &&
              product._id !== item._id
            ) {
              return <ProductCardTwo props={item} />;
            }
          })}
        </ScrollView>
      )}
    </>
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
    fontSize: wp(6),
    width: wp(50),
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
    fontSize: wp(9),
    color: "white",
    fontWeight: "bold",
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
    justifyContent: "space-between",
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
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "3%",
    backgroundColor: "white",
    width: wp(85),
    elevation: 3,
    padding: 5,
    borderRadius: 999,
    marginTop: "6%",
  },

  ratingBack: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  ratingText: {
    fontSize: hp(2.2),
    color: "white",
    fontWeight: "bold",
  },

  offerText: {
    marginHorizontal: wp(3),
    fontSize: wp(5),
  },
  mrpPrice: {
    color: "#FF5858",
    textDecorationLine: "line-through",
    fontSize: wp(4),
  },

  detailsHeader: {
    marginTop: wp(30),
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
    fontWeight: "bold",
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
    fontWeight: "bold",
    color: "#333",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    fontWeight: "bold",
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
  },
});
