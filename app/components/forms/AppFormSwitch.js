import React from 'react';

import {useFormikContext} from "formik";

import AppSwitch from "../AppSwitch";


const AppFormSwitch = ({name,label}) => {
    const { values, setFieldValue } = useFormikContext();
    return ( 
            <AppSwitch
                onChange={(value) => setFieldValue(name, value)}
                value={values[name]}
                label={label}
            /> 
        );
        
}

 
export default AppFormSwitch;