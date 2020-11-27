import React from 'react';
import {StyleSheet,View} from "react-native";
import { Switch } from 'react-native-paper';

import paperTheme from "../config/paperTheme";
import AppText from "./AppText";

const AppSwitch = ({label,value=false,onChange,disabled=false}) => {
    return (  <View style={styles.container}>
                <AppText>{label}</AppText>
                 <Switch value ={value} onValueChange={onChange} theme={paperTheme} disabled={disabled}/>
              </View>);
}
const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:15,
        marginVertical:10,
        paddingRight:40,
    }
   
});
export default AppSwitch;