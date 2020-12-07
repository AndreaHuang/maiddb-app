import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// import constants from "expo-constants";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {/* <View style={[styles.view, style]}>{children}</View> */}
      {children}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    marginTop:-30,
    paddingTop:0

    // marginTop: constants.statusBarHeight,
    // flex: 1,
  },
  view: {
    flex: 1,
  },
});
export default Screen;
