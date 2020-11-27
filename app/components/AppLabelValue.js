import React from 'react';
import {StyleSheet,View} from "react-native";
import AppText from "./AppText";
import color from "../config/color";
const AppLabelValue = ({label,value,smallMode=false}) => {
    return (  <View style={styles.itemRow}>
                    <AppText style={[styles.label,smallMode?small:null]}>{label}</AppText>
                    <AppText style={[styles.value,smallMode?small:null]}>{value}</AppText>
            </View> );
}
 
const styles=StyleSheet.create({
    itemRow:{
             flexDirection:"row",
             marginHorizontal:15,
             marginVertical:5,
             paddingVertical:2,
             borderBottomColor:color.medium,
             borderBottomWidth:.5

        },
        label:{
            color:color.dark,
            flex:2
        },
        value:{
            color:color.dark,
            fontWeight:"200",
            flex:4
        },
        small:{
            fontSize:14
        }

    });
export default AppLabelValue;