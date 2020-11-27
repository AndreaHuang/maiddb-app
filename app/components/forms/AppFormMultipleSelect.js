import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import _ from "lodash";

import AppErrorMessage from "./AppErrorMessage";
import MultipleSelect from "../MultipleSelect";
import AppText from "../AppText";


function AppFormMultipleSelect({ label,name,items }) {
  const {
    errors,
    handleChange,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  } = useFormikContext();
  useEffect(()=>{
    if(!Array.isArray(values[name])){
      setFieldValue(name,[]);
    }
  },[]);

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
  const handleToggle = (currentItem) => {
    let existing = values[name];
    const index = _.indexOf(existing,currentItem);
    if(index === -1){  //Means not included
      const updated =_.union([currentItem],existing);
      setFieldValue(name, updated);
    } else { //Means already included
      _.pull(existing,currentItem);
      setFieldValue(name, existing);
    }
    setFieldTouched(name);
    
  };
  return (
    <View style={styles.container}>
      <AppText>{label}</AppText>
      <MultipleSelect value={values[name]} items={items} onSelect={handleToggle} />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal:15,
    marginTop:20
  },
});
export default AppFormMultipleSelect;
