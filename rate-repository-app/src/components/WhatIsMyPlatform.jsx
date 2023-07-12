import { React } from "react";
import { Platform, Text, StyleSheet } from "react-native";

// const styles = StyleSheet.create({
//   text: {
//     color: Platform.OS === "android" ? "green" : "blue",
//   },
// });

const styles = StyleSheet.create({
  text: {
    color: Platform.select({
      android: "green",
      ios: "blue",
      default: "black",
    }),
  },
});

const WhatIsMyPlatform = () => {
  return <Text style={styles.text}>Your platform is: {Platform.OS}</Text>;
};

export default WhatIsMyPlatform;
