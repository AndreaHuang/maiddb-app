import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/color";
function Icon({
  iconColor = colors.white,
  backgroundColor = colors.black,
  name,
  size = 40,
}) {
  return (
    <View
      style={[
        styles.iconBackGround,
        {
          backgroundColor: backgroundColor,
          width: size,
          height: size,
          borderRadius: size / 2,
          marginHorizontal: size / 4,
        },
      ]}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconBackGround: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Icon;
