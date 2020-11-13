import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import constants from "expo-constants";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    marginTop: constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});
export default Screen;
