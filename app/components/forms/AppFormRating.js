import React from 'react';

import {StyleSheet,View} from "react-native";
import {useFormikContext} from "formik";
import AppRating from "../AppRating";

import AppErrorMessage from "./AppErrorMessage";

const AppFormRating = ({name,label,category,count,disabled}) => {
     const { values,touched,errors, setFieldValue } = useFormikContext();

    // AppRating = ({onChange,value,category,count,disabled=false}
    return ( 
        <>
            <AppRating 
                onChange={(value => setFieldValue(name,value))}
                value={values[name]}
                category={category}
                count={count}
                disabled={disabled}
                label={label}
            />
            <AppErrorMessage error={errors[name]} visible={touched[name]} /> 
        </>);
}

 
export default AppFormRating;