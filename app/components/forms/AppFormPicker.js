import React from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import AppPicker from "../AppPicker";
import AppErrorMessage from "./AppErrorMessage";

function AppFormPicker({
  name,
  items,
  numberOfLines,
  PickerItemComponent,
  placeholder,
}) {
  const { errors, touched, values, setFieldValue } = useFormikContext();
  return (
    <>
      <AppPicker
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        numberOfColumns={numberOfLines}
        placeholder={placeholder}
        selectedItem={values[name]}
        PickerItemComponent={PickerItemComponent}
      ></AppPicker>
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {},
});
export default AppFormPicker;
