import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../AppText";
import color from "../../config/color";
function AppErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  return <AppText style={styles.error}>{error}</AppText>;
}
const styles = StyleSheet.create({
  error: {
    color: color.error,
    marginLeft:10
  },
});
export default AppErrorMessage;
