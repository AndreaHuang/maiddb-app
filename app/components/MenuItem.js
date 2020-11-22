import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import colors from "../config/color";
function MenuItem({ IconComponent, title, onPress }) {
  return (
     <TouchableOpacity style={styles.container} onPress={onPress}>
      {IconComponent}
      <View style={styles.detailsContainer}>
        <AppText numberOfLines={1} style={styles.title}>
          {title}
        </AppText>
      </View>

      <MaterialCommunityIcons
        color={colors.medium}
        name="chevron-right"
        size={20}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
    marginBottom: 7,
  },
});
export default MenuItem;
