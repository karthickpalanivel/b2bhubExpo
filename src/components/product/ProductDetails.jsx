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
  Platform,
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
import ProductCardTwo from "./ProductCardTwo";


import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

import { useTranslation } from "react-i18next";
import TermsAndConditionsModal from "./TermsandCondition";
import { useScrollToTop } from "@react-navigation/native";
const colors = "#E84A5F";
const backgrounds = "#FCF8F3";

const ProductDetails = ({ route }) => {
  const { productDetailsInArray } = route.params;
  // console.log("details page");
  // console.log(productDetailsInArray);

  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalQuantity, setModalQuantity] = useState(100);
  const [showSummary, setShowSummary] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);
  const [modalTermVisible, setModalTermVisible] = useState(false);

  const handleContinue = () => {
    setShowSummary(true);
  };
  const handlePayment = () => {
    // Handle payment logic here
    setModalVisible(false);
    setModalTermVisible(true);
    setTermsVisible(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setModalVisible(false);
      setModalTermVisible(false);
      setShowSummary(false);
      setTermsVisible(false);
    }, 50);
  }, []);

  const navigation = useNavigation();

  const goback = () => {
    navigation.navigate("Home");
  };

  const orderNow = (productDetailsInArray) => {
    // console.log(
    //   productDetails.productName +
    //     " " +
    //     productDetails.productId +
    //     " " +
    //     "ordered"
    // );
    navigation.navigate("paymentSummary", { productDetailsInArray });
  };

  const { t } = useTranslation();

  const productDetails = {
    productId: productDetailsInArray[0],

    productImage: productDetailsInArray[1],

    productName: productDetailsInArray[2],

    productPrice: productDetailsInArray[3],

    productLocation: productDetailsInArray[4],

    productMoisture:
      productDetailsInArray[5] !== "" ? productDetailsInArray[5] : "",

    productQualityAvailable:
      productDetailsInArray[6] !== "" ? productDetailsInArray[6] : "",

    productIsOrganic:
      productDetailsInArray[7] !== "" ? productDetailsInArray[7] : "",

    productSpeciality:
      productDetailsInArray[8] !== "" ? productDetailsInArray[8] : "",

    productCategory: productDetailsInArray[9],

    productType: productDetailsInArray[10],
  };

  const calculateTotal = (productPrice) => {
    const totalPrice = productPrice * modalQuantity * 1000;
    const gst = totalPrice * 0;
    const totalAmount = totalPrice + gst;

    return { totalPrice, gst, totalAmount };
  };

  const { totalPrice, gst, totalAmount } = calculateTotal(
    productDetails.productPrice
  );

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}` + "/admin/getProducts";
    axios
      .post(url, {})
      .then((response) => {
        // console.log(response.data);
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
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
    // console.log("--------------------------object log--------------------------");
    // console.log(productDetails.productType);
  }, [products]);

  // Premium qualtiy utilties

  const premiumColor = () => {
    if (productDetails.productCategory == "PLATINUM")
      return "#e5e4e2"; //#FFD700
    else if (productDetails.productCategory == "GOLD")
      return "#FFD700"; //Platnium
    else return "#000000";
  };

  const productCategoryName = () => {
    if (productDetails.productCategory == "PLATINUM") return t("platinum");
    else if (productDetails.productCategory == "GOLD") return t("gold");
  };

  const memberShipBackgroundColor = () => {
    if (productDetails.productCategory == "PLATINUM") return "#DD7522";
    else if (productDetails.productCategory == "GOLD")
      return "#A10E38"; //#DD7522
    else return "#fff";
  };

  const color = premiumColor();
  const backgroundColor = memberShipBackgroundColor();

  const translatedCategory = (key) => {
    if (key === "Imported") return t("imported");
    if (key === "Desi") return t("desi");
    if (key === "Polished") return t("polished");
    if (key === "Unpolished") return t("unpolished");
    if (key === "Mysore") return t("mysore");
    if (key === "Fatka") return t("fatka");
    if (key === "Gold") return t("gold");
    if (key === "Premium") return t("premium");
  };

  const translatedProductName = () => {
    if (productDetails.productName == "ToorDal") return t("toor_dal");
    if (productDetails.productName == "MoongDal") return t("moong_dal");
    if (productDetails.productName == "UradDal") return t("urad_dal");
    if (productDetails.productName == "GramDal") return t("gram_dal");
  };

  const combinedName = () => {
    return (
      translatedCategory(productDetails.productType) +
      " " +
      translatedProductName()
    );
  };

  const translatingLocation = () => {};

  return (
    <>
      {isLoading && productDetailsInArray == null ? (
        <AppLoaderAnimation />
      ) : (
        <>
          <StatusBar style="dark" backgroundColor={colors} />
          <ScrollView style={styles.mainContainer}>
            <View style={styles.productDetailsContainer}>
              <View style={styles.headerOfProductDetails}>
                <TouchableOpacity
                  style={styles.iconBackButton}
                  onPress={goback}
                >
                  <Entypo
                    name="chevron-left"
                    size={hp(3.5)}
                    strokeWidth={4.5}
                    color={colors}
                  />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                  {productDetails.productName}
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <View>
                  <Image
                    source={{ uri: productDetails?.productImage }}
                    style={styles.imagePage}
                  />
                </View>
                <View style={styles.textContainer}>
                  <View>
                    <Text style={styles.productName}>
                      {translatedProductName()}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.productPrice}>
                      ₹ {productDetails.productPrice} / {t("kg")}
                    </Text>
                  </View>
                  {productDetails.productLocation && (
                    <>
                      <View style={styles.locationContainer}>
                        <FontAwesome
                          name="map-marker"
                          size={hp(3)}
                          color={"white"}
                          style={styles.mapIcon}
                        />
                        <Text style={styles.productLocation}>
                          {productDetails.productLocation}
                        </Text>
                        {/* <View>
                          <Text style={styles.locationLabel}>
                            {t("location")}
                          </Text>
                        </View> */}
                      </View>

                      {/* <Text style={styles.productLocation}></Text> */}
                    </>
                  )}

                  {/* <Text>{productDetails.productCategory}</Text> */}
                </View>
              </View>
              {/* Special Featuers */}

              {/* premium product */}
              <View>
                <View style={styles.qualityContainer}>
                  <View>
                    {productDetails.productCategory == "PLATINUM" ||
                    productDetails.productCategory == "GOLD" ? (
                      <>
                        <Entypo
                          name="price-ribbon"
                          size={wp(15)}
                          color={color}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                  <View
                    style={[
                      styles.qualityTextContainer,
                      productDetails.productCategory == null && {
                        marginLeft: wp(10),
                      },
                    ]}
                  >
                    {productDetails.productCategory != null && (
                      <Text style={styles.premiumProduct}>
                        {t("premium_quality_product")}
                      </Text>
                    )}
                    <TouchableOpacity
                      style={styles.orderNowContainer}
                      onPress={() => setModalVisible(true)}
                    >
                      <Feather
                        name={"shopping-cart"}
                        size={wp(6)}
                        color={"black"}
                        style={styles.iconCart}
                      />
                      <Text style={styles.orderNow}>{t("order_now")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.descriptionContainer}>
                <View>
                  {productDetails.productIsOrganic == 1 ? (
                    <View style={styles.verifedDescription}>
                      <MaterialCommunityIcons
                        name="check-decagram-outline"
                        size={hp(2.5)}
                        color={"white"}
                        style={styles.verifiedIcon}
                      />
                      <Text style={styles.descriptionText}>
                        {t("organic") + " " + t("product")}
                      </Text>
                    </View>
                  ) : null}

                  {productDetails.productSpeciality ? (
                    <View style={styles.verifedDescription}>
                     <MaterialCommunityIcons
                        name="check-decagram-outline"
                        size={hp(2.5)}
                        color={"white"}
                        style={styles.verifiedIcon}
                      />
                      <Text style={styles.descriptionText}>
                        {t("high_in_protein")}
                      </Text>
                    </View>
                  ) : null}
                </View>

                <View>
                  {productDetails.productQualityAvailable ? (
                    <View style={styles.verifedDescription}>
                      <MaterialCommunityIcons
                        name="check-decagram-outline"
                        size={hp(2.5)}
                        color={"white"}
                        style={styles.verifiedIcon}
                      />
                      <Text style={styles.descriptionText}>
                        {productDetails.productQualityAvailable.slice(0, 2) +
                          t("grade") +
                          " " +
                          t("product")}
                      </Text>
                    </View>
                  ) : null}

                  {productDetails.productMoisture ? (
                    <View style={styles.verifedDescription}>
                      <MaterialCommunityIcons
                        name="check-decagram-outline"
                        size={hp(2.5)}
                        color={"white"}
                        style={styles.verifiedIcon}
                      />
                      <Text>{t("moisture")}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>

            <Modal
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
              animationType="slide"
            >
              <TouchableOpacity
                style={styles.modelIconsBack}
                onPress={() => {
                  // navigation.goBack();
                  setModalVisible(false);
                }}
              >
                 <Entypo
                    name="chevron-left"
                    size={hp(3.5)}
                    strokeWidth={4.5}
                    color={colors}
                  />
              </TouchableOpacity>
              <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      setModalVisible(false);
                      // navigation.goBack();
                    }}
                  >
                    <Feather name="x-circle" size={hp(3)} color={"black"} />
                  </TouchableOpacity>
                  {!showSummary ? (
                    <>
                      <Text style={styles.modalTitle}>
                        {t("select_quantity_in_tons")}
                      </Text>

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
                        <Text style={styles.continueButtonText}>
                          {t("continue")}
                        </Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text style={styles.modalTitle}>
                        {t("order_summary")}
                      </Text>
                      <View style={styles.table}>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableCell}>
                            {t("total_price")}
                          </Text>
                          <Text style={styles.tableCell}>
                            ₹ {totalPrice.toFixed(0)}
                          </Text>
                        </View>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableCell}>{t("gst")} (0%)</Text>
                          <Text style={styles.tableCell}>
                            ₹ {gst.toFixed(0)}
                          </Text>
                        </View>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableCell}>
                            {t("total_amount")}
                          </Text>
                          <Text style={styles.tableCell}>
                            ₹ {totalAmount.toFixed(0)}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.paymentButton}
                        onPress={handlePayment}
                      >
                        <Text style={styles.paymentButtonText}>
                          {t("proceed_to_payment")}
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
                setVisible={setTermsVisible}
                onClose={() => setTermsVisible(false)}
                currentOrderPrice={totalPrice}
                totalAmount={totalAmount}
                productName={productDetails.productName}
                productType={productDetails.productType}
                productId={productDetails.productId}
                productQuantity={modalQuantity}
              />
            </Modal>

            {/* Other Products */}

            {products?.map((item) => {
              if (productDetails.productId !== item.productId)
                return <ProductCardTwo props={item} />;
            })}
          </ScrollView>
          {/* <ProductCardTwo /> */}
          <View style={styles.floatNavigationContainer}>
            <FloatingNavigationButton />
          </View>
        </>
      )}
    </>
  );
};
export default ProductDetails;

const styles = StyleSheet.create({
  // full screen container

  mainContainer: {
    flex: 1,
    backgroundColor: backgrounds,
  },

  //top product screen design

  productDetailsContainer: {
    height: hp(63),
    backgroundColor: colors,
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
  },

  headerOfProductDetails: {
    marginTop: hp(7),
    flexDirection: "row",
    alignItems: "center",
  },

  iconBackButton: {
    width: hp(5.7),
    padding: wp(2),
    marginLeft: hp(3),
    borderRadius: 9999,
    borderWidth: 0.1,
    borderColor: "black",
    marginHorizontal: wp(2),
    backgroundColor: "#fff",
  },

  modelIconsBack: {
    position: "absolute",
    top: Platform.OS === "android" ? hp(1) : hp(5),
    left: wp(1),
    width: hp(5.7),
    padding: wp(2),
    marginLeft: hp(3),
    borderRadius: 9999,
    borderWidth: 0.1,
    borderColor: "black",
    marginHorizontal: wp(2),
    backgroundColor: "#fff",
    zIndex: 500,
  },

  headerText: {
    fontSize: wp(6),
    marginLeft: wp(1),
    fontFamily: "QuicksandBold",
    color: "#fff",
  },

  //product details

  detailsContainer: {
    flexDirection: "row",
    marginTop: hp(1.2),
  },

  imagePage: {
    width: wp(40),
    height: wp(40),
    marginTop: wp(3),
    marginHorizontal: wp(6),
    borderRadius: wp(2.5),
    borderWidth: wp(1),
    borderColor: "white",
  },

  textContainer: {
    marginTop: wp(4),
  },

  premiumImage: {
    width: wp(20),
    height: wp(20),
  },

  locationContainer: {
    flexDirection: "row",
    marginRight: wp(10),
    alignItems: "center",
  },

  qualityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  qualityTextContainer: {
    marginHorizontal: wp(2),
    marginVertical: hp(1),
    alignItems: "center",
  },

  productName: {
    fontSize: wp(5),
    fontFamily: "QuicksandBold",
    color: "white",
  },

  productPrice: {
    fontSize: wp(4.5),
    fontFamily: "QuicksandSemiBold",
    color: "#fff",
    marginVertical: wp(1),
  },

  mapIcon: {
    color: "white",
    marginRight: wp(3),
  },

  locationLabel: {
    // marginTop: wp(1),
    fontFamily: "QuicksandSemiBold",
    fontSize: wp(4),
    color: "white",
  },

  productLocation: {
    fontFamily: "QuicksandSemiBold",
    fontSize: wp(5),
    color: "white",
  },

  premiumProduct: {
    width: wp(80),
    textAlign: "center",
    // marginLeft: wp(10),
    fontFamily: "QuicksandSemiBold",
    fontSize: wp(4.5),
    color: "white",
    marginBottom: wp(2.5),
  },

  orderNowContainer: {
    width: wp(60),
    backgroundColor: "white",
    borderRadius: 999,
    borderWidth: 0.1,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    height: hp(5),
    flexDirection: "row",
  },

  iconCart: {
    marginRight: "5%",
  },

  orderNow: {
    fontSize: wp(5),
    fontFamily: "QuicksandSemiBold",
    textAlign: "center",
  },

  // Description Designs

  descriptionContainer: {
    flexDirection: "row",
    marginLeft: wp(2.5),
  },

  verifedDescription: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(40),
    backgroundColor: "white",
    marginVertical: hp(1),
    marginHorizontal: wp(2.5),
    borderRadius: wp(3),
    elevation: 2,
    paddingVertical: wp(1),
  },

  descriptionText: {
    fontSize: wp(4),
    width: wp(30),
    marginLeft: wp(2),
    fontFamily: "QuicksandSemiBold",
    color: "#333",
    marginRight: wp(3),
  },

  verifiedIcon: {
    width: wp(5),
    height: wp(5),
    color: "#333",
    marginLeft: wp(2),
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    width: "90%",
    maxWidth: wp(80),
    padding: wp(5),
    backgroundColor: "white",
    borderRadius: wp(2.5),
    elevation: 5,
    position: "relative",
  },

  closeButton: {
    position: "absolute",
    top: wp(2.5),
    right: wp(2.5),
    padding: wp(2.5),
    zIndex: 200,
  },

  modalTitle: {
    fontSize: wp(4.5),
    // fontWeight: "bold",
    fontFamily: "QuicksandBold",
    marginBottom: wp(3.5),
  },

  picker: {
    height: wp(12.5),
    width: "100%",
    marginBottom: wp(3.5),
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: wp(3.5),
    paddingVertical: 5,
    fontSize: wp(4),
    fontFamily: "QuicksandSemiBold",
  },

  continueButton: {
    backgroundColor: colors,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  continueButtonText: {
    fontSize: 16,
    fontFamily: "QuicksandSemiBold",

    color: "#fff",
    fontWeight: "bold",
  },

  paymentButton: {
    backgroundColor: colors,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  paymentButtonText: {
    fontSize: 16,
    fontFamily: "QuicksandSemiBold",
    color: "#fff",
    // fontWeight: "bold",
  },

  closeButtonText: {
    fontSize: 18,
    fontFamily: "QuicksandSemiBold",
    // fontWeight: "bold",
    color: "#333",
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
    fontFamily: "QuicksandSemiBold",
    color: "#333",
  },

  floatNavigationContainer: {
    position: "absolute",
    bottom: hp(3),
    right: wp(5),
  },
});
