import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import color from "../config/color";
function ActionIcon({ iconColor = color.primary, iconName, onPress, size = 24,style ,IconComponent}) {
  return (
    <TouchableOpacity style={styles.icon} onPress={onPress}>
      <View
        style={[
          styles.iconBackGround,
          style,
          {
            width: size,
            height: size,           
          },
        ]}
      >
        {IconComponent ? IconComponent :
        <MaterialCommunityIcons name={iconName} color={iconColor} size={size} />}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  iconBackGround: {
    justifyContent: "center",
    alignItems: "center",
    
  },
});
export default ActionIcon;
