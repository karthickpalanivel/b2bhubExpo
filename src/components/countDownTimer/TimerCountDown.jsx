import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CountDown from "react-native-countdown-component";

const TimerCountDown = () => {
  return (
    <>
      <CountDown
        until={60 * 54 + 25}
        size={20}
        onFinish={() => alert("Finished")}
        digitStyle={{ backgroundColor: "#FFF" }}
        digitTxtStyle={{ color: "#1CC625" }}
        timeToShow={["M", "S"]}
        timeLabels={{ m: "minutes", s: "seconds" }}
        style={styles.countdown}
      />
    </>
  );
};

export default TimerCountDown;

const styles = StyleSheet.create({});
