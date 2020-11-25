import React from 'react';
import {StyleSheet,View} from "react-native";
import AppRadioGroup from "../AppRaidoGroup";
import { useFormikContext } from "formik";

import AppText from "../AppText";
import AppTextInput from "../AppTextInput";
import AppErrorMessage from "./AppErrorMessage";
import color from "../../config/color";
function AppFormRadioGroup({ name,label,options }) {
  const {
    errors,
    setFieldValue,
    values,
  } = useFormikContext();
  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{label}</AppText>
      <AppRadioGroup options={options} value={values[name]} onChange={(value) => setFieldValue(name, value)}></AppRadioGroup>
      <AppErrorMessage error={errors[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginLeft: 15
  },
  label:{
    marginBottom:5
  }

})

export default AppFormRadioGroup;