import React,{useState} from 'react';
import { View,StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";

import i18n from "../config/i18n";
import color from "../config/color";
import AppText from "../components/AppText";
import AppLink from "../components/AppLink";
import ActionIcon from "../components/ActionIcon";


const AppSection = ({items, editFunction,sectionTitle,defaultCollapsed=true}) => {
     const { t } = useTranslation();
    const keys = Object.keys(items);
    const [collapsed,setCollapsed]= useState(defaultCollapsed);
    return ( <View style={styles.container}>
                <View style={styles.headerRow}>
                    <View style={styles.titleIcon}>
                        <AppText style={styles.title}>{sectionTitle}</AppText>
                        {collapsed ? <ActionIcon iconName="expand-all-outline" onPress={()=>setCollapsed(false)}/> : 
                        <ActionIcon iconName="collapse-all-outline" onPress={()=>setCollapsed(true)}/> }
                    </View>
                    <AppLink title="Edit" onPress={editFunction} style={styles.editButton}></AppLink>
                </View>
                <View style={[styles.collapsible,collapsed ? {display: "none"}:null ]} >
                {keys.map((key,index)=>{
                    return(
                        <View style={styles.itemRow} key={index}>
                                <AppText style={styles.label}>{t(key)}</AppText>
                                <AppText style={styles.value}>{items[key]}</AppText>
                        </View>
                    );
                })}
                </View>

    </View> );
}

const styles=StyleSheet.create(
    {
        container:{

        },
        editButton:{
            backgroundColor:color.primary,
            color:color.white,
            paddingHorizontal:15,
            // marginRight:10,
            borderRadius:15
        },
        headerRow:{
            flexDirection:"row",
            justifyContent:"space-between",
            marginHorizontal:15,
            marginTop:25,
            alignItems:"flex-end",
            borderBottomColor:color.medium,
            borderBottomWidth:1

        },
        titleIcon:{
            flexDirection:"row",
            alignItems:"center"
        },
        title:{
            fontSize:24,
            fontWeight:"400",
            marginLeft:5

        },
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
        }
    }
);

 
export default AppSection;