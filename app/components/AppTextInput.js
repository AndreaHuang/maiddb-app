import React from "react";
import { View, StyleSheet } from "react-native";
import {TextInput} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import paperTheme from "../config/paperTheme";


function AppTextInput({ iconName, label, error=false, ...otherProps }) {
  return (
        <TextInput
          mode="outlined"
          style={[styles.text,defaultStyles.text]}
          label={label}
          theme={paperTheme}
          error={error}
          {...otherProps}
      ></TextInput>
  );
}
const styles = StyleSheet.create({
  text:{
    paddingHorizontal:10,
    marginVertical:10,
  },
  
});
export default AppTextInput;
