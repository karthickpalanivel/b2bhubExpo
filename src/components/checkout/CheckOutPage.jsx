import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const CheckOutPage = ({ route }) => {
  const [product, setProduct] = useState(null);
  const { params } = route;

  useEffect(() => {
    const getProduct = ProductData.find((item) => {
      return item?._id === params?._id;
    });
    setProduct(getProduct);
    {
      productName.includes(product?.pictureName) && setData(true);
    }
    // console.log(getProduct);
  }, [params?._id]);
  return (
    <View>
      <Text>{product.name}</Text>
    </View>
  );
};

export default CheckOutPage;

const styles = StyleSheet.create({});
