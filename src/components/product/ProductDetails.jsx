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
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { useTranslation } from "react-i18next";
import Entypo from "react-native-vector-icons/Entypo";

const ProductDetails = ({ route }) => {
  const { productDetailsInArray } = route.params;
  console.log(
    "----------------------------------------------------------------"
  );
  console.log("details page");
  console.log(productDetailsInArray);
  const navigation = useNavigation();

  const goback = () => {
    navigation.navigate("Home");
  };

  const orderNow = () => {
    console.log(
      productDetails.productName + productDetails.productId + "ordered"
    );
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
  };

  console.log("--------------------------object log--------------------------");
  console.log(productDetails);

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

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
    else if (productDetails.productCategory == "GOLD") return "#A10E38"; //#DD7522
    else return "#fff";
  };

  const color = premiumColor();
  const backgroundColor = memberShipBackgroundColor();


  const translatedProductName = () =>{
    if(productDetails.productName == "toordal") return t('toordal')
  }

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

  return (
    <>
      {isLoading && productDetailsInArray == null ? (
        <AppLoaderAnimation />
      ) : (
        <>
          <StatusBar style="dark" backgroundColor="#fbbf24" />
          <ScrollView style={styles.mainContainer}>
            <View style={styles.productDetailsContainer}>
              <View style={styles.headerOfProductDetails}>
                <TouchableOpacity
                  style={styles.iconBackButton}
                  onPress={goback}
                >
                  <ChevronLeftIcon
                    size={hp(3.5)}
                    strokeWidth={4.5}
                    color={"#fbbf24"}
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
                    <Text style={{ textAlign: "" }}>
                      {productDetails.productName}
                    </Text>
                  </View>
                  <View>
                    <Text>
                      {productDetails.productPrice} / {t("kg")}
                    </Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <MapPinIcon size={hp(5)} color={"white"} />
                    <View>
                      <Text style={{ marginTop: wp(1) }}>{t("location")} </Text>
                    </View>
                  </View>
                  <Text>{productDetails.productLocation}</Text>

                  {/* <Text>{productDetails.productCategory}</Text> */}
                </View>
              </View>
              {/* Special Featuers */}
              {/* premium product */}
              <View>
                <View style={styles.qualityContainer}>
                  <View>
                    {productDetails.productCategory == "PLATINUM" ? (
                      <>
                        <Image
                          source={require("../../assets/offer/premium_productImage.png")}
                          style={styles.premiumImage}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                  <View style={styles.qualityTextContainer}>
                    <Text>{t("premium_quality_product")}</Text>
                    <TouchableOpacity>
                      <Text>{t("order_now")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                {productDetails.productMoisture ? (
                  <>
                    <Text>{productDetails.productMoisture}</Text>
                  </>
                ) : null}

                {productDetails.productQualityAvailable ? (
                  <>
                    <Text>
                      {productDetails.productQualityAvailable.slice(0, 2) +
                        t("grade")}
                    </Text>
                  </>
                ) : null}
              </View>

              <View>
                {productDetails.productIsOrganic == 1 ? (
                  <>
                    <Text>{t("organic")}</Text>
                  </>
                ) : null}

                {productDetails.productSpeciality ? (
                  <>
                    <Text>{t("high_in_protein")}</Text>
                  </>
                ) : null}
              </View>
            </View>

            {/* Other Products */}
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
    backgroundColor: "#fff",
  },

  //top product screen design

  productDetailsContainer: {
    height: hp(60),
    backgroundColor: "#fbbf24",
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
  },

  headerOfProductDetails: {
    marginTop: hp(5),
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

  headerText: {
    fontSize: wp(6),
    marginLeft: wp(1),
    fontFamily: "QuicksandBold",
    color: "#fff"
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
  },
  qualityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qualityTextContainer: {
    marginHorizontal: wp(2),
  },

  floatNavigationContainer: {
    position: "absolute",
    bottom: hp(5),
    right: wp(5),
  },
});
