import React from 'react';
import {StyleSheet,View} from "react-native";
import {useFormikContext} from "formik";

import AppToggle from "../AppToggle";
import AppText from "../AppText";
import AppErrorMessage from './AppErrorMessage';
import defaultStyles from "../../config/styles";


const AppFormSwitch = ({name,label,items}) => {
    const { values, errors,touched,setFieldTouched, setFieldValue } = useFormikContext();
    return ( 
        <View style={styles.container}>
            <AppText style={[defaultStyles.title,styles.label]}>{label}</AppText>
            <AppToggle
                onChange={(value) =>{ setFieldValue(name, value),setFieldTouched[name]}}
                value={values[name]}
                items={items} 
            /> 
            <AppErrorMessage error={errors[name]} visible={touched[name]}/>
        </View>
        );
        
}


const styles = StyleSheet.create({
  container:{
    margin: 15,
  },
  label:{
    marginBottom:5,  
  }

})

 
export default AppFormSwitch;