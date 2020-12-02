import React from 'react';
import {View,Text,StyleSheet} from "react-native";
import { useTranslation } from "react-i18next";

import i18 from "../../config/i18n";
import color from '../../config/color';
import AppText from "../AppText";


const AppTags = ({label,items}) => {
      const { t } = useTranslation();
    return (
        <>
        {label && <AppText style={styles.label}>{label}</AppText> }
         <View style={styles.container}>
            {items && 
                items.map(
                    (item,index)=> { 
                        return (  <View style={styles.tagContainer} key={index}>
                                        <AppText style={styles.text} numberOfLines={1}>
                                        {t(item)}
                                        </AppText>
                                    </View>)
                }
            )} 
            </View>  
        </> );
}
const styles = StyleSheet.create({
  label:{
    marginLeft:12,
    marginTop:8
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical:8,
    marginHorizontal:10,
    borderBottomColor:color.medium,
    borderBottomWidth:.5

  },
  tagContainer: {
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    marginHorizontal:4,
    marginVertical: 5,
    minWidth: 80,
    maxWidth: 300,
    height:30,
    backgroundColor:color.primary
  },
  text: {
    textAlign: "center",
    fontSize:16,
    color:color.light
  },
});
 
export default AppTags;