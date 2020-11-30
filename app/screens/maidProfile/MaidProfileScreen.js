import React, { useContext, useEffect,useState } from 'react';
import {Text,Alert} from 'react-native';
import { useTranslation } from "react-i18next";


import cache from "../../utiity/Cache";

import Screen from '../../components/Screen';
import AppButton from "../../components/AppButton";
import AppSection from "../../components/AppSection";
import constants from "../../config/constants";

import maidProfileDB from "../../database/maidProfile";
import maidProfileScheme from "../../schemes/maidProfile";

import i18n from "../../config/i18n";
import AuthContext from '../../auth/AuthContext';
import { set } from 'lodash';
import ActivityIndicator from '../../components/ActivityIndicator';
import MaidProfileBasicInfoSection from "./MaidProfileBasicInfoSection";
import MaidProfileWorkHistorySection from "./MaidProfileWorkHistorySection";

const MaidProfileScreen = ({navigation}) => {
    const [loading,setLoading]=useState(false);
    const {user} = useContext(AuthContext);
    const { t } = useTranslation();
    const [profile,setProfile] = useState(null);
    
     useEffect(()=>{
        async function retreiveOrCreateProfile(){
            setLoading(true);
            const profileResult=  await maidProfileDB.retreiveOrCreateProfile();
            // console.debug("profileResult",profileResult);
            setProfile(profileResult);
            setLoading(false);
        }
        const cached = cache.retrieve(constants.cache.maidProfile)
        if(cached){
            setProfile(cached);
        } else{
            setProfile(maidProfileScheme.initialScheme)
        }
       
       
        retreiveOrCreateProfile();
    
        
     },[]);

   
     
    const navigateToEditProfile=(editScreen,data,index)=>{
            navigation.navigate(editScreen,{data:data,uid:user.uid,index:index});
    }
    const removeWorkHistory = (index)=>{
        const confirmToDelete = () =>
            Alert.alert(
            "My Alert Msg",
            null,
            [   {
                text: "Cancel",
                // onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "OK", onPress: () => {
                        maidProfileDB.removeWorkHistory(user.uid,index);
                        navigation.replace(constants.route.maidProfile);
                        }
                }
                    
            ],
            { cancelable: false }
        );
        confirmToDelete();
    }
    // const {basicInfo,experience,family,language,preference} = profile;
    if(loading || !profile) {
        return  <ActivityIndicator />
    }
    return ( 
    
        <Screen>
                <MaidProfileBasicInfoSection data={profile.basicInfo} onEdit={()=>navigateToEditProfile(constants.route.editMaidProfileBasicInfo,profile.basicInfo)}/>
                {/* <AppSection sectionTitle="Basic Info" items={profile.basicInfo} editFunction={()=>{navigateToEditProfile(constants.route.editMaidProfileBasicInfo,profile.basicInfo)}}/> */}
                {/* <AppSection sectionTitle="Work History" items={profile.experience} editFunction={()=>{navigateToEditProfile("WorkHistory")}}/> */}
                
                <AppSection sectionTitle={t("image")} defaultCollapsed={false}  onEdit={()=>{navigateToEditProfile(constants.route.editImage)}}>

                </AppSection>
                <AppSection sectionTitle={t("workHistory")} defaultCollapsed={true}  onAdd={()=>{navigateToEditProfile(constants.route.editWorkHistory,null,-1)}}>
                    {profile.workHistory?
                        profile.workHistory.map((item,index)=>{return  <MaidProfileWorkHistorySection key={index} data={item}
                                onDelete={()=>removeWorkHistory(index)}
                                onEdit={()=>navigateToEditProfile(constants.route.editWorkHistory,item,index)}
                        />})
                        :null}
                </AppSection>

    </Screen>);
}
 
export default MaidProfileScreen;