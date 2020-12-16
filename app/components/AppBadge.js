import React from 'react';
import {StyleSheet,View} from "react-native";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
const AppBadage = ({value,size=24,style,textStyle}) => {
    return ( <View style={[styles.container,{
        width:size,
        height:size,
        borderRadius:size/2

    },style]}>
        <AppText style={[defaultStyles.smallText,styles.text,textStyle]}>{value}</AppText>
    </View> );
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:defaultStyles.colors.primary,
        padding:2,
        justifyContent:"center",
        alignItems:"center"
        
    },
    text:{
        color:defaultStyles.colors.white,
        fontWeight:"bold"
    }
});

export default AppBadage;