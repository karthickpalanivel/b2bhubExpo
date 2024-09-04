import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";

const Radio = () => {
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <View style={styles.container}>
      <View style={styles.radioGroup}>
        <View style={styles.radioButton}>
          <RadioButton.Android
            value="option1"
            status={selectedValue === "option1" ? "checked" : "unchecked"}
            onPress={() => setSelectedValue("option1")}
            color="#007BFF"
          />
          <Text style={styles.radioLabel}>UPI banking</Text>
        </View>

        <View style={styles.radioButton}>
          <RadioButton.Android
            value="VTS PAY"
            status={selectedValue === "option2" ? "checked" : "unchecked"}
            onPress={() => setSelectedValue("option2")}
            color="#007BFF"
          />
          <Text style={styles.radioLabel}>Online Banking</Text>
        </View>

        <View style={styles.radioButton}>
          <RadioButton.Android
            value="Net Banking"
            status={selectedValue === "option3" ? "checked" : "unchecked"}
            onPress={() => setSelectedValue("option3")}
            color="#007BFF"
          />
          <Text style={styles.radioLabel}>VTS - Pay</Text>
        </View>
      </View>
    </View>
  );
};

export default Radio;

const styles = StyleSheet.create({
  container: {
    
  },
  radioGroup: {
    borderRadius: 8,
    backgroundColor: "white",
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
});
