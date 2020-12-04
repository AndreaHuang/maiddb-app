import React from 'react';
import {StyleSheet,View} from "react-native";
import { useTranslation } from "react-i18next";

import AppSection from "../../components/AppSection";
import AppText from "../../components/AppText";
import i18n from "../../config/i18n";
import AppLabelValue from '../../components/display/AppLabelValue';
import AppRating from '../../components/AppRating';
import AppSwitch from '../../components/AppSwitch';
import ListItem from "../../components/lists/ListItem";
import ListItemSeperator from "../../components/lists/ListItemSeperator";
import { date } from 'yup';



const MaidProfileBasicInfoSection = ({data,onEdit,defaultCollapsed=true}) => {
    const {t} = useTranslation();
    return (   

    <AppSection sectionTitle={t("basicInfo")} onEdit={onEdit} defaultCollapsed={defaultCollapsed}>
                <AppLabelValue label ={t("currentLocation")} value = {t(data.currentLocation)} />
                <AppLabelValue label ={t("currentStatus")} value = {t(data.currentStatus)} />
                 <ListItemSeperator/>
                <AppLabelValue label ={t("religion")} value = {t(data.religion)} />
                <AppSwitch label ={t("eatPork")} value = {data.eatPork} disabled={true}/>
                 <ListItemSeperator/>
                <AppLabelValue label ={t("education")} value = {t(data.education)} />
                <AppRating label ={t("english")} value = {t(data.english)} disabled={true}/>
                <AppRating label ={t("cantonese")} value = {t(data.cantonese)} disabled={true}/>
                <AppRating label ={t("mandarin")} value = {t(data.mandarin)} disabled={true}/>
                <ListItemSeperator/>

                <AppLabelValue label ={t("height")} value = {data.height + " " + t(data.heightUnit)} /> 
                <AppLabelValue label ={t("weight")} value = {data.weight + " " + t(data.weightUnit)} />
                 <ListItemSeperator/>

               </AppSection>
    );
}

const styles=StyleSheet.create({
    collapsible:{
        
    }
});
 
export default MaidProfileBasicInfoSection;