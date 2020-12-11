import React from "react";
import {Alert} from "react-native";
import * as Linking from "expo-linking";
import ActionIcon from "./ActionIcon";
import colors from "../config/color";

export const Whatsapp=({number,message})=>{
    if(!number){
        return null;
    }
    let url = 'https://wa.me/'+number;
    if(message){
        url=url+"?text="+encodeURI(message);
    }
    return <ActionIcon iconName="whatsapp" iconColor="green" onPress={()=>{
        Alert.alert(number);
         Linking.openURL(url);
    }} />
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
    return <ActionIcon iconName="email-outline" iconColor={colors.primary} onPress={()=>{
         Linking.openURL(url);
    }} />
}