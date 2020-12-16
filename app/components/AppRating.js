import React from "react";
import { View, StyleSheet } from "react-native";
import color from "../config/color";
import {AirbnbRating } from 'react-native-ratings';
import { useTranslation } from "react-i18next";

import paperTheme from "../config/paperTheme";
import i18n from "../config/i18n";
import AppText from "./AppText";



const AppRating = ({onChange,value,category,count,label,disabled=false}) => {

    const {t} = useTranslation();
    const reviews = Array.from(Array(count),(value,index) => t(category+"_"+index));
    return (  
         <View style={styles.container}>
            
                <AppText style={styles.label}>{label}</AppText>
                <View style={styles.ratingContainer}>
                    
                    <AirbnbRating
                            showRating={false}
                            count={count}
                            reviews={reviews}
                            defaultRating={value}
                            size={18}
                            reviewSize={18}
                            onFinishRating={onChange}
                            selectedColor={color.primary}
                            reviewColor={color.primary}
                            isDisabled={disabled}
                />
                <AppText style={styles.ratingLabel}>{reviews[value-1]}</AppText>
                </View>
      </View>
   );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        marginHorizontal:15,
        justifyContent:"space-between",
        alignItems:"center"

    },
    label:{
        flex:1,
        marginVertical:6,
    },
    ratingContainer:{
        flex:1,
        flexDirection:"row",
        paddingRight:15,
        alignSelf:"center",
        
    },
    ratingLabel:{
        marginLeft:20,
        color:color.primary,
        fontWeight:"400"
    }

});
 
export default AppRating;