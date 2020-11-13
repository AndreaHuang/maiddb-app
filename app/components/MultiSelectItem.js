import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import defaultStyles from "../config/styles";
import colors from "../config/color";

import { useTranslation } from "react-i18next";

function MultiSelectItem({ item, onToggleItem }) {
  const { t, i18n } = useTranslation();
  return (
    <TouchableOpacity onPress={() => onToggleItem(item)}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: !item.selected ? colors.light : colors.primary,
          },
        ]}
      >
        <Text style={[defaultStyles.text, styles.text]} numberOfLines={1}>
          {t(item.label)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    minWidth: 100,
    maxWidth: 300,
  },
  text: {
    textAlign: "center",
  },
});
export default MultiSelectItem;
