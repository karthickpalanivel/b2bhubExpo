import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Footer from "../components/Footer";

const ProductScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>ProductScreen</Text>
      </ScrollView>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
