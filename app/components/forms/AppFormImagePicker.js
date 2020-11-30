import React from "react";

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
  const handleRmove = (imageItem) => {
     console.log("try to remove ",imageItem);
    let currentValue = values[name];
    console.log("before remove",currentValue);
    // const newArray=[];
    // currentValue.forEach(item => {
    //    if(!item.uri.normalize() === imageItem.uri.normalize()){
    //      console.log("got a item");
    //      newArray.push(item);
    //    }
    //   });
       
    const newArray= currentValue.filter(function(item){
        return item.uri.normalize() === imageItem.uri.normalize()
    } 
      // console.debug(item.uri);
      // console.debug(imageItem.uri);
      // console.debug(item.uri === imageItem.uri);
      // console.debug(item.uri.normalize() === imageItem.uri.normalize());
     
    );
     console.log("after remove",newArray);
     return newArray;

    
  };
  return (
    <>
      <ImageInputList
        imageUris={values[name]}
        onAddImage={(imageItem) => setFieldValue(name, handleAdd(imageItem))}
        onRemoveImage={(imageItem) => setFieldValue(name, handleRmove(imageItem))}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
export default AppFormImagePicker;
