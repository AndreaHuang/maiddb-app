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
    itemHeight: Dimensions.get("window").height * 0.25,
  },
  smallText:{
    fontSize:14
  },
  title:{
    fontSize:18,
    fontWeight:"400",
    marginLeft:5
  },
  smallTitle:{
    fontSize:16
  },
  image:{
    resizeToWidth:400
  },
  buttonText:{
    color: colors.white,
    fontWeight:"400",
    fontSize:18,
    fontFamily: Platform === "android" ? "Roboto" : "Avenir",
  },
  smallButtonText:{
    fontSize:16,
  },
  linkText :{
    color: colors.dark,
    textDecorationLine: "underline",
    fontSize: 16,
    fontWeight:"400"
  }
};
