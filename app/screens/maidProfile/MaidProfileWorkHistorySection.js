import React from 'react';
import {StyleSheet} from "react-native";
import { useTranslation } from "react-i18next";

import AppSection from "../../components/AppSection"
import i18n from "../../config/i18n";

import {AppLabelValue,AppTags} from '../../components/display';

const locale="zh";
const calculateYearMonth = (startDateString,endDateString) =>{
    if(!startDateString) return null;
    if(!endDateString) return null;

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const years = (endDate.getFullYear() - startDate.getFullYear());
    const months = endDate.getMonth() - startDate.getMonth() ;
    if(months < 0 ){
        years --;
        months = 12 - months;
    }
    if(years===0 && months===0){
       const days = endDate.getDay() - startDate.getDay() 
       return {
           days
       }
    } else{
        return {
            years,
            months
        }   
    }
   
}

const MaidProfilWorkHistorySection = ({data,onEdit,onDelete}) => {
    const {t} = useTranslation();
    
    const buildTitle =({startDate,endDate,isCurrentJob})=>{
        const from = new Date(startDate).toLocaleDateString(locale);
        const to = isCurrentJob? 
                t("now") : new Date(endDate).toLocaleDateString(locale);
        if(isCurrentJob){
            return from + " - " + to;
        }
        const yearMonths = calculateYearMonth (startDate,endDate)
        if(yearMonths){
            const yearDisplay =  yearMonths.years ? yearMonths.years +t("years")  :"";
            const monthDisplay = yearMonths.months ? yearMonths.months +t("months")  :"";
            const dayDisplay = yearMonths.days ? yearMonths.days +t("days")  :"";
            
            

            return from + " - " + to +" ("+yearDisplay+monthDisplay+dayDisplay+")";
        } else{
            return from + " - " + to;
        }
        
    }

    
    
    return ( <AppSection sectionTitle={buildTitle(data)} smallMode onEdit={onEdit} onDelete={onDelete} defaultCollapsed={false}>
            <AppLabelValue label={t("location")} value={t(data.location)}/>
            <AppLabelValue label={t("reasonOfLeaving")} value={t(data.reasonOfLeaving)} />
            <AppTags  label={t("duties")} items={data.duties}/>
        </AppSection>
    );
}
 
const styles = StyleSheet.create({
})
export default MaidProfilWorkHistorySection;