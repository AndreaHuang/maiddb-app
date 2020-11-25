import React from 'react';
import { View,StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";

import i18n from "../config/i18n";
import color from "../config/color";
import AppText from "../components/AppText";
import AppLink from "../components/AppLink";


const AppSection = ({items, editFunction,sectionTitle}) => {
     const { t } = useTranslation();
    const keys = Object.keys(items);
    return ( <View style={styles.container}>
                <View style={styles.headerRow}>
                    <AppText style={styles.title}>{sectionTitle}</AppText>
                    <AppLink title="Edit" onPress={editFunction} style={styles.editButton}></AppLink>
                </View>
                {keys.map((key,index)=>{
                    return(
                        <View style={styles.itemRow} key={index}>
                                <AppText style={styles.label}>{t(key)}</AppText>
                                <AppText style={styles.value}>{items[key]}</AppText>
                        </View>
                    );
                })}

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
        title:{
            fontSize:24,
            fontWeight:"400"

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