import React from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import AppErrorMessage from "./AppErrorMessage";
import MultipleSelect from "../MultipleSelect";

function AppFormMultipleSelect({ name }) {
  const {
    errors,
    handleChange,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  } = useFormikContext();
  const handleSelect = (key) => {
    setFieldValue(name, [...values[name], key]);
  };
  const handleUnSelect = (key) => {
    let currentValue = values[name];
    setFieldValue(
      name,
      currentValue.filter((item) => {
        return !item.key === key;
      })
    );
  };
  const handleToggle = (toggledItem) => {
    console.log("Toggled", toggledItem);
    let items = values[name];
    let newItems = items.map((item) => {
      if (toggledItem && toggledItem.key === item.key) {
        console.log("found");
        let newItem = Object.assign({}, item);
        newItem.selected = !newItem.selected;
        return newItem;
      } else {
        return item;
      }
    });

    setFieldValue(name, newItems);
  };
  return (
    <>
      <MultipleSelect items={values[name]} onSelect={handleToggle} />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {},
});
export default AppFormMultipleSelect;
