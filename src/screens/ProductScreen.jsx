import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
const ProductScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
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
