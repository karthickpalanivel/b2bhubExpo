import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Entypo from "react-native-vector-icons/Entypo";
import ProductCard from "./ProductCard";
import Loading from "../../loading/Loading";
import { ProductData } from "../../data/ProductData";
import * as Font from "expo-font";
import AppLoaderAnimation from "../loaders/AppLoaderAnimation";
import axios from "axios";
import { useTranslation } from "react-i18next";
const colors = "#E84A5F";
const backgrounds = "#FCF8F3";

export default function Product({
  category,
  productActiveData,
  setProductActiveData,
}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log("====================================");
  // console.log(products);
  // console.log("====================================");
  const { t } = useTranslation();
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
  }, []);

  const handlePress = () => {
    setProductActiveData(t("exclusive_products"));
  };

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <View style={styles.container}>
          {productActiveData !== "" ? (
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={handlePress}
            >
              {productActiveData === "Exclusive Product" ? (
                ""
              ) : (
                <View style={styles.iconContainer}>
                  <Entypo
                    name="left"
                    size={hp(3.5)}
                    strokeWidth={wp(0.8)}
                    color={"#475569"}
                  />
                </View>
              )}
              <Text style={styles.productHeader}>{productActiveData}</Text>
            </Pressable>
          ) : (
            <Text style={styles.productHeader}>{t("exclusive_products")}</Text>
          )}
          <View>
            {category.length === 0 ? (
              <Loading size="large" style={styles.loadingState} />
            ) : (
              <MasonryList
                data={products}
                keyExtractor={(item) => item._id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, i }) => (
                  <ProductCard props={item} index={i} />
                )}
                onEndReachedThreshold={0.1}
              />
            )}
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "5%",
    paddingVertical: wp(3),
  },

  productHeader: {
    fontSize: hp(3),
    marginVertical: "5%",
    color: "#475569",
    fontFamily: "QuicksandSemiBold",
  },

  loadingState: {
    fontFamily: "QuicksandSemiBold",
    color: "#475569",
  },
  iconContainer: {
    marginRight: "4%",
  },
});
