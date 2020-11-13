import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import color from "../config/color";
function ActionIcon({ iconColor = color.dark, iconName, onPress, size = 24 }) {
  return (
    <TouchableOpacity style={styles.icon} onPress={onPress}>
      <View
        style={[
          styles.iconBackGround,
          {
            width: size,
            height: size,
            marginHorizontal: size / 4,
          },
        ]}
      >
        <MaterialCommunityIcons name={iconName} color={iconColor} size={size} />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  icon: {},
  iconBackGround: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ActionIcon;
