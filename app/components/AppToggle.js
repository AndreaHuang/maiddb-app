import React from 'react';
import { StyleSheet,View,Text,TouchableOpacity } from 'react-native';
import color from '../config/color';
import defaultStyles from "../config/styles";
import { useTranslation } from "react-i18next";
import i18 from "../config/i18n";

const AppToggle = ({value,items,onChange}) => {
  const{t} = useTranslation();
  return (
    <View style={styles.container}>
        {items.map((item,index)=>{
            return (
                 <TouchableOpacity key={index}
                    style={[styles.toggleButton, value === item? styles.selected:null]}
                    onPress={()=>onChange(item)}
                    >
                    <Text style={defaultStyles.buttonText,
                        value===item? styles.selectedText: styles.text}>{t(item)}</Text>
                </TouchableOpacity>
            )
        })}  
    </View>
  );
};
const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
    }, 
    toggleButton:{
        flex:1,
        backgroundColor: color.light,
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        marginVertical: 5,
        marginHorizontal: 2,
    },
    text:{
        color:color.black
    },  
    selected:{
        backgroundColor : color.primary
    },
    selectedText:{
         color:color.white
    }
})


export default AppToggle;