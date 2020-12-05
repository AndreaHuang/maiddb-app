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
import {calculateAge} from "../../utiity/AgeCalculator";

const locale="zh_CN";
const femaleIcon=require("../../assets/female.png");
const maleIcon=require("../../assets/male.png");



const MaidProfileHeaderSection = ({data}) => {
    const {t} = useTranslation();
    const age = calculateAge(data.birthdate);
    const ageToDisplay = age? age + " " + t("yearsOld")  : ""
    

    return (   
        <ListItem
                title={data.name}
                subTitle={t(data.nationality)  +  "    " +ageToDisplay }
                image={
                data.photoURL
                    ? { source: { url: data.photoURL } }
                    : (data.gender ==='f' ? femaleIcon:maleIcon)
                }
        />
    


    );
}


 
export default MaidProfileHeaderSection;