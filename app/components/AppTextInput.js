import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

function AppTextInput({ iconName, ...otherProps }) {
  return (
    <View style={styles.container}>
      {iconName && (
        <MaterialCommunityIcons
          style={styles.icon}
          name={iconName}
          size={20}
          color={defaultStyles.colors.medium}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text}
        {...otherProps}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
    padding: 15,
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
});
export default AppTextInput;
