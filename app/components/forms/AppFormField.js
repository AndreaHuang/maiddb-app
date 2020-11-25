import React,{useState} from "react";
import {StyleSheet} from "react-native";
import { useFormikContext } from "formik";

import AppText from "../AppText";
import AppTextInput from "../AppTextInput";
import AppErrorMessage from "./AppErrorMessage";
import color from "../../config/color";
function AppFormField({ name,label, ...otherProps }) {
  const {
    errors,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  } = useFormikContext();
  return (
    <>
      <AppTextInput
        onBlur={() => {setFieldTouched(name)}}
        onChangeText={(value) => setFieldValue(name, value)}
        value={values[name]}
        placeholder={label}
        label={label}
        error={errors.hasOwnProperty(name)}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
