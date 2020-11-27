import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/color";
function Icon({
  iconColor = colors.dark,
  name,
  size = 24,
}) {
  return (
      <MaterialCommunityIcons name={name} color={iconColor} size={size} />
  );
}


export default Icon;
