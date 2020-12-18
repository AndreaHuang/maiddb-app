import React,{useState} from 'react';
import { View,StyleSheet,TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";

import i18n from "../config/i18n";
import color from "../config/color";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import ActionIcon from "../components/ActionIcon";
import Icon from "../components/Icon";


const AppSection = ({children, onEdit,onAdd,onDelete,sectionTitle,defaultCollapsed=true,smallMode=false}) => {
     const { t } = useTranslation();
     const [collapsed,setCollapsed]= useState(defaultCollapsed);
    return ( <View style={styles.container}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={()=>{collapsed? setCollapsed(false):setCollapsed(true)}}>
                    <View style={styles.titleIcon}>
                        {collapsed ? <Icon name="expand-all-outline"/> : <Icon name="collapse-all-outline" /> }
                        <AppText style={smallMode? defaultStyles.smallTitle: defaultStyles.title}>{sectionTitle}</AppText>
                    </View>
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        {onEdit && <ActionIcon  iconName="square-edit-outline" iconColor ={color.primary} onPress={onEdit} /> }
                        {onAdd && <ActionIcon  iconName="plus-box-outline" onPress={onAdd} iconColor ={color.primary} /> }
                        {onDelete && <ActionIcon iconName="trash-can-outline" iconColor ={color.primary}  onPress={onDelete} /> }
                    </View>
                </View>
                <View style={styles.itemContainer}>
                {collapsed? null: children}
                </View>
            </View> );
}

const styles=StyleSheet.create(
    {
        container:{

        },
        buttonContainer:{
            flexDirection:"row"
        },
        itemContainer:{
            marginLeft:20,
            marginVertical:5     
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
    }
);

 
export default AppSection;