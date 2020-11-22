import React,{useState} from "react";
import {StyleSheet} from "react-native";
import { useFormikContext } from "formik";

import AppText from "../AppText";
import AppTextInput from "../AppTextInput";
import AppErrorMessage from "./AppErrorMessage";
import color from "../../config/color";
function AppFormField({ name,label, ...otherProps }) {
  const [focused,setFocused]=useState(false);
  const {
    errors,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  } = useFormikContext();
  return (
    <>
      {(focused || values[name] !=="") && <AppText style={focused ?styles.activeLabel : styles.inactiveLabel}>{label}</AppText>}
      <AppTextInput
        onBlur={() => {setFocused(false); setFieldTouched(name)}}
        onFocus={()=> setFocused(true) }
        onChangeText={(value) => setFieldValue(name, value)}
        value={values[name]}
        placeholder={label}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles=StyleSheet.create({
  activeLabel: {
    color:"blue",
    fontSize:14,
    marginLeft:20,
    marginBottom:-5
  },
  inactiveLabel: {
    color:color.medium,
    fontSize:14,
    marginLeft:20,
    marginBottom:-5
  },
});

export default AppFormField;
