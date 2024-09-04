import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const QuantityButton = () => {
  const [quantity, setQuantity] = useState(0);

  const addQty = () => {
    return setQuantity((prev) => prev + 10);
  };

  const subQty = () => {
    if (quantity <= 0) {
      return;
    }
    setQuantity((prev) => prev - 10);
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.plusMinus} onPress={subQty}>
          <Text style={styles.textOperation}>-</Text>
        </Pressable>
        <Text style={styles.qtyText}>
          {quantity} {quantity > 0 ? <Text>ton</Text> : null}
        </Text>
        <Pressable style={styles.plusMinus} onPress={addQty}>
          <Text style={styles.textOperation}>+</Text>
        </Pressable>
      </View>
    </>
  );
};

export default QuantityButton;

const styles = StyleSheet.create({
  container: {
    width: "35%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "15%",
    backgroundColor: "white",
    borderRadius: 100,
  },

  plusMinus: {
    width: "25%",
    height: 30,
    backgroundColor: "white",
    elevation: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },

  textOperation: {
    width: "auto",
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
  },

  qtyText: {
    color: "black",
    fontSize: 18,
  },
});
