import React from 'react';
import {StyleSheet} from "react-native";
import { useTranslation } from "react-i18next";

import AppSection from "../../components/AppSection"
import i18n from "../../config/i18n";
import AppText from '../../components/AppText';

const locale="zh";

const MaidProfilWorkHistorySection = ({data,onEdit,onDelete}) => {
    const {t} = useTranslation();
    
    const buildTitle =({startDate,endDate,isCurrentJob})=>{
        const from = new Date(startDate).toLocaleDateString(locale);
        const to = isCurrentJob? 
                t("now") : new Date(endDate).toLocaleDateString(locale);
        return from + " - " + to;
    }

    
    
    return ( <AppSection sectionTitle={buildTitle(data)} smallMode onEdit={onEdit} onDelete={onDelete} defaultCollapsed={true}>
            <AppText></AppText>
        </AppSection>
    );
}
 
const styles = StyleSheet.create({
})
export default MaidProfilWorkHistorySection;