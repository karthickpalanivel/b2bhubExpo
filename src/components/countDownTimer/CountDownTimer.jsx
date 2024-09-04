/* eslint-disable react/react-in-jsx-scope */
import { Text, View, StyleSheet, Image } from "react-native";
import TimerCountDown from "./TimerCountDown";
const CountdownTimer = () => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.greatSale}>Great Sale</Text>
      <Text style={styles.endsIn}>Ends in: </Text>
    </View>
    <Image
      source={require("../../assets/offer/giftBox.png")}
      style={styles.giftBox}
    />
    <TimerCountDown />
  </View>
);
export default CountdownTimer;

const styles = StyleSheet.create({
  digitStyle: {
    backgroundColor: "#fbbf24",
  },
  digitTxtStyle: {
    color: "#fff",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fbbf24",
    width: "90%",
    height: 100,
    borderRadius: 10,
    elevation: 5,
    marginLeft: "5%",
    padding: 20,
  },
  textContainer: {
    paddingLeft: 10,
  },
  giftBox: {
    width: "20%",
    height: 50,
    resizeMode: "center",
  },
  greatSale: {
    fontSize: 25,
    color: "white",
  },
  endsIn: {
    color: "white",
  },
});
