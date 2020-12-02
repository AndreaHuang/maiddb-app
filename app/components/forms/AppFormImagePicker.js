import React from "react";
import _ from "lodash";
import ImageInputList from "../ImageInputList";
import AppErrorMessage from "./AppErrorMessage";
import { useFormikContext } from "formik";
function AppFormImagePicker({ name }) {
  const { errors, touched, values, setFieldValue } = useFormikContext();
  const handleAdd = (imageItem) => {
    let currentValue = values[name];
    if(currentValue){
       return [...currentValue, imageItem];
    }else{
      return [imageItem];
    }
   
  };
  const handleRmove = (targetIndex) => {
    //  console.log("to be remove",imageItem);
    // let currentValue = values[name];
    //  console.log("currentValue",currentValue);
  
    // const newArray= currentValue.filter((item)=>{
    //       return !imageItem === item;
    // });
    //  console.log("after remove",newArray);
    //  return newArray;
    console.log("to be remove",targetIndex);
    let currentValue = values[name];    
    delete currentValue[targetIndex];
    console.log("after remove",currentValue);
    return currentValue;
    

    
  };
  return (
    <>
      <ImageInputList
        imageUris={values[name]}
        onAddImage={(imageItem) => setFieldValue(name, handleAdd(imageItem))}
        onRemoveImage={(index) => setFieldValue(name, handleRmove(index))}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
export default AppFormImagePicker;
