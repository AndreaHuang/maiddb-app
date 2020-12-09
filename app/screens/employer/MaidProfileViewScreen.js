import React, { useContext, useEffect,useState } from 'react';
import {StyleSheet,Text,Alert} from 'react-native';
import { useTranslation } from "react-i18next";


import cache from "../../utiity/Cache";

import ScrollScreen from '../../components/ScrollScreen';
import AppButton from "../../components/AppButton";
import AppSection from "../../components/AppSection";
import constants from "../../config/constants";

import maidProfileDB from "../../database/maidProfile";
import maidProfileScheme from "../../schemas/maidProfile";

import i18n from "../../config/i18n";
import AuthContext from '../../auth/AuthContext';
import ActivityIndicator from '../../components/ActivityIndicator';
import MaidProfileBasicInfoSection from "../maid/MaidProfileBasicInfoSection";
import MaidProfileWorkHistorySection from "../maid/MaidProfileWorkHistorySection";
import CaroselWithModal from '../../components/CaroselWithModal';
import MaidProfileHeaderSection from '../maid/MaidProfileHeaderSection';


const MaidProfileViewScreen = ({route}) => {
    // console.log("MaidProfileViewScreen is loading",route);
    const { t } = useTranslation();
    const profile = route.params.data;
    if(!profile) {
        return  Alert.alert("No Profile is found");
    }
    return (     
        <ScrollScreen>
                <MaidProfileHeaderSection data={profile.basicInfo}/>
                <AppSection sectionTitle={t("image")} defaultCollapsed={false}  />
                <CaroselWithModal data={profile.images}/>
                <MaidProfileBasicInfoSection data={profile.basicInfo} defaultCollapsed={false} />
               
                
                <AppSection sectionTitle={t("workHistory")} defaultCollapsed={false}>
                    {profile.workHistory?
                        profile.workHistory.map((item,index)=>{return  <MaidProfileWorkHistorySection key={index} data={item}
                        />})
                        :null}
                </AppSection>

        </ScrollScreen>
    );
}
 
const styles=StyleSheet.create({
    container:{
        height:6000
    }
})
export default MaidProfileViewScreen;