import React from "react";
import { StyleSheet, View } from "react-native";
import { useFormikContext } from "formik";

import AppFormPicker from "./AppFormPicker";
import AppTextInput from "../AppTextInput";

import AppErrorMessage from "./AppErrorMessage";

function AppFormFieldWithUnit({ name, unitName, units, ...otherProps }) {
  const { errors, values,handleChange, setFieldTouched, touched } = useFormikContext();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <AppTextInput
            value={values[name]}
            onBlur={() => setFieldTouched(name)}
            onChangeText={handleChange(name)}
            {...otherProps}
          />
        </View>
        <View style={styles.unitContainer}>
          <AppFormPicker items={units} name={unitName} />
        </View>
      </View>
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    flex: 3,
  },
  unitContainer: {
    flex: 2,
    marginLeft: -10,
  },
});
export default AppFormFieldWithUnit;
