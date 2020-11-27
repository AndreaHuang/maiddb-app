import React from 'react';
import {StyleSheet,View} from "react-native";
import { useTranslation } from "react-i18next";

import AppSection from "../../components/AppSection";
import AppText from "../../components/AppText";
import i18n from "../../config/i18n";
import AppLabelValue from '../../components/AppLabelValue';

const locale="zh_CN";

const MaidProfileBasicInfoSection = ({data,onEdit,collapsed=true}) => {
    const {t} = useTranslation();

    
    
    return (   <AppSection sectionTitle="Basic Info" onEdit={onEdit}>
                { data ?
                    <View>
                    {Object.keys(data).map((key,index)=>{
                        return(
                           <AppLabelValue value={data[key]} label={t(key)} key={index}/>
                        );
                    })}
                    </View>
                :null}

               </AppSection>


    );
}

const styles=StyleSheet.create({
    collapsible:{
        
    }
});
 
export default MaidProfileBasicInfoSection;