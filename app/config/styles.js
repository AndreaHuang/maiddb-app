import React from "react";
import { Dimensions, Platform } from "react-native";
import colors from "../config/color";

export default {
  colors,
  text: {
    fontSize: 16,
    color: colors.dark,
    fontFamily: Platform === "android" ? "Roboto" : "Avenir",
  },
  dimension: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  card: {
    itemHeight: Dimensions.get("window").height * 0.4,
  },
  smallText:{
    fontSize:14
  },
  title:{
    fontSize:20,
    fontWeight:"400",
    marginLeft:5
  },
  smallTitle:{
    fontSize:18
  }
};
