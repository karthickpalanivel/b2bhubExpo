// Home.js
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Image, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
import ProductCard from "./productCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useTranslation } from "react-i18next";
import * as Font from "expo-font";
import AppLoaderAnimation from "../../components/loaders/AppLoaderAnimation";

const products = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dve3s278t/image/upload/v1725256181/toordal_ttywek.webp",
    name: "Toor dal",
    price: "100",
    unit: "KG",
    moisture: "10%",
    Organic: false,
    shelfLife: "1 month",
    validity: "1 year",
    desc: "Organic Toor dal",
    quality: "100 tones",
  },
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dve3s278t/image/upload/v1725256181/toordal_ttywek.webp",
    name: "Toor dal",
    price: "100",
    unit: "KG",
    moisture: "10%",
    Organic: true,
    shelfLife: "1 month",
    validity: "1 year",
    desc: "Organic Toor dal",
    quality: "100 tones",
  },
];

const ProductDisplay = () => {
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [customerId, setcustomerId] = useState("");
  const [token, settoken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  AsyncStorage.getItem("customerId")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        //console.log("Value:", value);
        setcustomerId(value);
        handleFetch();
      } else {
        console.log("No value found");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  AsyncStorage.getItem("token")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        settoken(value);
        handleFetch();
        //console.log("Value:", value);
      } else {
        console.log("No value found");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
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

  const handleFetch = async () => {
    if (!token) {
      message.error("User is not authenticated.");
      return;
    }
    try {
      const url =
        `${process.env.REACT_APP_BACKEND_URL}` +
        "/seller/getProductsBySellerId";

      const res = await axios.post(
        url,
        { customerId: customerId },
        {
          headers: {
            Authorization: ` Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.length === 0) {
        setNoData(true);
        console.log("length is 0");
      } else {
        setData(res.data);
        setNoData(false);
        //console.log("no data");
      }
    } catch (error) {
      console.error("Error fetching products by seller ID:", error);
      setNoData(true);
    } finally {
      //setLoading(false); // End loading after fetching
    }
  };

  async function handleDeleteProduct(params) {}

  const formatDate = (isoDate) => {
    if (!isoDate) return ""; // Handle case where date is null or undefined

    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  // console.log("====================================");
  // console.log(data);
  // console.log("====================================");

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <View>
          <StatusBar style="dark" backgroundColor="#fff" />
          <ScrollView
            style={styles.mainContainer}
            showsVerticalScrollIndicator={false}
          >
            {data.map((product) => (
              <View style={styles.subMainContainer}>
                <StatusBar style="dark" backgroundColor="#fff" />

                <View style={styles.container}>
                  {/* Product Image */}
                  <View>
                    <Image
                      source={{ uri: product.productImg }}
                      style={styles.image}
                    />
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.buttonText}>{t("edit")}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.deleteButton}>
                        <Text style={styles.buttonText}>{t("delete")}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Product Details */}
                  <View style={styles.detailsContainer}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.rowValue}>
                      <Text style={styles.label}>{t("price")}: </Text>
                      <Text style={styles.value}>
                        {product.price}/ {t("kg")}
                      </Text>
                      <Text style={styles.value}>{products.units}</Text>
                    </View>
                    <Text style={styles.label}>
                      {t("moisture")}:{" "}
                      <Text style={styles.value}>{product.moisture}</Text>
                    </Text>
                    <Text style={styles.label}>
                      {t("organic")}:{" "}
                      <Text style={styles.value}>
                        {product.isOrganic ? "Yes" : "No"}
                      </Text>
                    </Text>
                    <Text style={styles.label}>
                      {t("shelf_life")}:{" "}
                      <Text style={styles.value}>{product.shelfLife}</Text>
                    </Text>
                    <Text style={styles.label}>
                      {t("validity")}:{" "}
                      <Text style={styles.value}>
                        {product.validity.slice(0, 10)}
                      </Text>
                    </Text>
                    <Text style={styles.label}>
                      <Text style={styles.value}>{product.description}</Text>
                    </Text>
                    <Text style={styles.label}>
                      {Object.keys(product.packaging).map((kg) => (
                        <Text key={kg} style={{ marginBottom: "4px" }}>
                          {kg}: {product.packaging[kg]} / {t("tonnes")}
                        </Text>
                      ))}
                    </Text>

                    {/* Edit and Delete Buttons */}
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer1: {
    flex: 1,
    marginTop: wp(5),
  },
  subMainContainer: {
    flex: 1,
    marginHorizontal: wp(3),
    marginBottom: 20,
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#729EDB",
    borderRadius: wp(4),
    padding: wp(3),
    elevation: 5,
  },
  image: {
    width: wp(35),
    height: hp(20),
    borderRadius: wp(3),
    marginTop: wp(7),
  },
  detailsContainer: {
    flex: 1,
    marginLeft: wp(3),
    justifyContent: "space-between",
  },
  productName: {
    fontSize: wp(5),
    // fontWeight: "bold",
    color: "white",
    marginBottom: wp(1),
    fontFamily: "QuicksandSemiBold",
  },
  label: {
    fontSize: wp(3.5),
    // fontWeight: "600",
    color: "white",
    marginVertical: hp(0.3),
    fontFamily: "QuicksandSemiBold",
  },
  value: {
    fontSize: wp(3.5),
    fontFamily: "QuicksandSemiBold",
    color: "white",
    // width: wp(),
  },
  rowValue: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
  },
  buttonContainer: {
    marginVertical: hp(1),
  },
  editButton: {
    width: wp(35),
    backgroundColor: "#2196F3",
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
    marginRight: wp(2),
    marginVertical: wp(2),
  },
  deleteButton: {
    width: wp(35),
    backgroundColor: "#4574B3",
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    borderRadius: wp(2),
  },
  buttonText: {
    fontSize: wp(4),
    color: "white",
    // fontWeight: 'bold',
    fontFamily: "QuicksandSemiBold",
    textAlign: "center",
  },
});

export default ProductDisplay;
