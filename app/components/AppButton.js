import React from "react";
import { Image,Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/color.js";
import defaultStyles from "../config/styles";
function AppButton({ color = "primary", onPress, title, image,style }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] },style]}
      onPress={onPress}
    >
      {image && <Image style={styles.image} source={image} /> }
      <Text style={defaultStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    margin: 10,
    flexDirection:"row",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight:10
  }
});
export default AppButton;
