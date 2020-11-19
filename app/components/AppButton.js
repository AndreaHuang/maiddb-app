import React from "react";
import { Image,Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/color.js";
import defaultStyles from "../config/styles";
function AppButton({ color = "primary", onPress, title, image }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      {image && <Image style={styles.image} source={image} /> }
      <Text style={defaultStyles.text,styles.text}>{title}</Text>
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
    flexDirection:"row",
    alignItems:"center"
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight:10
  },
  text :{
    color: colors.white,
    fontSize: 20,
    fontWeight:"400"
  }
});
export default AppButton;
