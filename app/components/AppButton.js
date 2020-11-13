import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/color.js";
import defaultStyles from "../config/styles";
function AppButton({ color = "primary", onPress, title }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={defaultStyles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
});
export default AppButton;
