import React from "react";
import { useFormikContext } from "formik";
import AppPicker from "../AppPicker";
import AppErrorMessage from "./AppErrorMessage";

function AppFormPicker({
  label,
  name,
  items,
  numberOfLines,
  PickerItemComponent,
  placeholder,
}) {
  const { errors, touched, values, setFieldValue } = useFormikContext();
  console.log("values",values),
    console.log("name",name);

  return (
    <>
      <AppPicker
        label={label}
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
export default AppFormPicker;
