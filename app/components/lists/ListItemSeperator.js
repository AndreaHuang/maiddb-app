import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../config/color";
function ListItemSeperator({ style }) {
  return <View style={[styles.seperator, style]}></View>;
}
const styles = StyleSheet.create({
  seperator: {
    width: "100%",
    height: 2,
    backgroundColor: colors.light,
  },
});
export default ListItemSeperator;
