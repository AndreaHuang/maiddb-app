import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import AppText from "./AppText";
import i18n from "../config/i18n";

function PickerItem({ item, onPress }) {
   const {t}= useTranslation();
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <AppText>{t(item)}</AppText>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
export default PickerItem;
