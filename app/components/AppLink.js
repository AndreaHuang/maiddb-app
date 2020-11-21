import React from "react";
import { Image,Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/color.js";
import defaultStyles from "../config/styles";
function AppLink({ onPress, title ,style}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[defaultStyles.text,styles.text,style]}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  text :{
     color: colors.dark,
    textDecorationLine: "underline",
    fontSize: 18,
    fontWeight:"400"
  }
});
export default AppLink;
