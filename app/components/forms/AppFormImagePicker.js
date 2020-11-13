import React from "react";
import { View, StyleSheet } from "react-native";
import ImageInputList from "../ImageInputList";
import AppErrorMessage from "./AppErrorMessage";
import { useFormikContext } from "formik";
function AppFormImagePicker({ name }) {
  const { errors, touched, values, setFieldValue } = useFormikContext();
  const handleAdd = (uri) => {
    let currentValue = values[name];
    return [...currentValue, uri];
  };
  const handleRmove = (uri) => {
    let currentValue = values[name];
    return currentValue.filter((item) => {
      return !item === uri;
    });
  };
  return (
    <>
      <ImageInputList
        imageUris={values[name]}
        onAddImage={(uri) => setFieldValue(name, handleAdd(uri))}
        onRemoveImage={(uri) => setFieldValue(name, handleRmove[uri])}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {},
});
export default AppFormImagePicker;
