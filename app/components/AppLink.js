import React from "react";
import { Image,Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/color.js";
import defaultStyles from "../config/styles";
function AppLink({ onPress, title ,style}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[defaultStyles.linkText,style]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default AppLink;
