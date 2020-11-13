import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import Icon from "../components/Icon";
import colors from "../config/color";
function CategeoryPickItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {item.icon && (
          <Icon
            name={item.icon}
            backgroundColor={
              item.backgroundColor ? item.backgroundColor : colors.secondary
            }
          />
        )}
        <AppText style={styles.text}>{item.label}</AppText>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  text: { paddingTop: 15, textAlign: "center" },
});
export default CategeoryPickItem;
