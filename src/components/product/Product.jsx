import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import ProductCard from "./ProductCard";
import Loading from "../../loading/Loading";
import { ProductData } from "../../data/ProductData";
import * as Font from "expo-font";
import AppLoaderAnimation from "../loaders/AppLoaderAnimation";
import axios from "axios";

export default function Product({
  category,
  productActiveData,
  setProductActiveData,
}) {


  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log('====================================');
  console.log(products);
  console.log('====================================');

  useEffect(() => {

    const url = `${process.env.REACT_APP_BACKEND_URL}`+"/admin/getProducts";
    axios
      .post(url, {})
      .then((response) => {
        // console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err);
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
    setProductActiveData("Exclusive Product");
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
                  <ChevronLeftIcon
                    size={hp(3.5)}
                    strokeWidth={wp(0.8)}
                    color={"#475569"}
                  />
                </View>
              )}
              <Text style={styles.productHeader}>{productActiveData}</Text>
            </Pressable>
          ) : (
            <Text style={styles.productHeader}>Exclusive Products</Text>
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
    paddingVertical: 12,
  },

  productHeader: {
    fontSize: hp("3%"),
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
