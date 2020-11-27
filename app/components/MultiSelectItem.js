import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import defaultStyles from "../config/styles";
import colors from "../config/color";

import { useTranslation } from "react-i18next";
import i18 from "../config/i18n";

function MultiSelectItem({ item, onToggleItem ,selected=false}) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity onPress={() => onToggleItem(item)}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: selected ? colors.primary : colors.light,
          },
        ]}
      >
        <Text style={[defaultStyles.text, styles.text,
          {
            color: selected ? colors.light : colors.dark,
          },
          ]} numberOfLines={1}>
          {t(item)}
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
    paddingHorizontal: 8,
    marginHorizontal:4,
    marginVertical: 5,
    minWidth: 80,
    maxWidth: 300,
    height:30
  },
  text: {
    textAlign: "center",
    fontSize:16,
  },
});
export default MultiSelectItem;
