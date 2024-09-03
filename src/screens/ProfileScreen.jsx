import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Footer from "../components/Footer";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>ProfileScreen</Text>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
