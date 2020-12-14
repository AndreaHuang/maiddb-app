import React from "react";
import {StyleSheet,Image,View} from "react-native";
import * as Linking from "expo-linking";
import ActionIcon from "./ActionIcon";
import AppText from "./AppText";
import colors from "../config/color";
const whatsappLogo =require("../assets/logo/whatsapp.svg");

export const Whatsapp=({number,message})=>{
    if(!number){
        return null;
    }
    let url = 'https://wa.me/'+number;
    if(message){
        url=url+"?text="+encodeURI(message);
    }
  
// return <ActionIcon IconComponent = {<Image source={whatsappLogo}/> }
//           onPress={()=>{
//                             Linking.openURL(url);
//                         }} />

    return  ( <View style={styles.container}><ActionIcon iconName="whatsapp" 
                        onPress={()=>{
                            Linking.openURL(url);
                        }} />
                        <AppText style={styles.text}>{number}</AppText>
                        </View>
    )
}

export const Email=({email,subject,content})=>{
     if(!email){
        return null;
    }
    let url = 'mailto:'+email;
     if(subject){
        url=url+"?subject="+encodeURI(subject);
    }
    if(content){
        url=url+"?body="+encodeURI(body);
    }
     return <View style={styles.container}><ActionIcon iconName="email-outline" iconColor={colors.primary} onPress={()=>{
         Linking.openURL(url);
    }} /><AppText style={styles.text}>{email}</AppText></View>
}

const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        marginVertical:5
    },
    text:{
        marginHorizontal:10
    }
})