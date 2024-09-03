import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";

const Loading = ({ props }) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator {...props} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
