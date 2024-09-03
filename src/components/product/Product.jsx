import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import ProductCard from "./ProductCard";
import Loading from "../../loading/Loading";
import { ProductData } from "../../data/ProductData";

export default function Product({
  category,
  productActiveData,
  setProductActiveData,
}) {
  const handlePress = () => {
    setProductActiveData("Exclusive Product");
  };

  return (
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
                strokeWidth={4.5}
                color={"black"}
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
            data={ProductData}
            keyExtractor={(item) => item._id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <ProductCard props={item} index={i} />}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
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
    fontWeight: "500",
  },

  loadingState: {
    fontWeight: "500",
    color: "#475569",
  },
  iconContainer: {
    marginRight: "4%",
  },
});
