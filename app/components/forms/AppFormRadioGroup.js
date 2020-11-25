import React from 'react';
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
    <>
      <AppText>{label}</AppText>
      <AppRadioGroup options={options} value={values[name]} onChange={(value) => setFieldValue(name, value)}></AppRadioGroup>
      <AppErrorMessage error={errors[name]} />
    </>
  );
}

export default AppFormRadioGroup;