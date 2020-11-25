import React from 'react';
import {StyleSheet,View} from "react-native";
import {useFormikContext} from "formik";

import AppSwitch from "../AppSwitch";
import AppText from "../AppText";

const AppFormSwitch = ({name,label}) => {
    const { values, setFieldValue } = useFormikContext();
    return ( 
        <View style={styles.container}>
            <AppText>{label}</AppText>
            <AppSwitch  
                onChange={(value) => setFieldValue(name, value)}
                value={values[name]}
            /> 
        
        </View> );
        
}
const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:15,
        marginVertical:10,
    }
});
 
export default AppFormSwitch;