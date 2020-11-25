import React, { useContext, useEffect,useState } from 'react';
import {ActionSheetIOS, Text} from 'react-native';
import { useTranslation } from "react-i18next";


import cache from "../utiity/Cache";

import Screen from '../components/Screen';
import AppLink from "../components/AppLink";
import AppSection from "../components/AppSection";
import constants from "../config/constants";

import maidProfile from "../database/maidProfile";
import maidProfileScheme from "../schemes/maidProfile";

import i18n from "../config/i18n";
import AuthContext from '../auth/AuthContext';
import { set } from 'lodash';
import ActivityIndicator from '../components/ActivityIndicator';

const MaidProfileScreen = ({navigation}) => {
    const [loading,setLoading]=useState(false);
    const {user} = useContext(AuthContext);
     const { t } = useTranslation();
     const [profile,setProfile] = useState(null);
    
     useEffect(()=>{
        async function retreiveOrCreateProfile(){
            setLoading(true);
            const profileResult=  await maidProfile.retreiveOrCreateProfile();
            console.debug("profileResult",profileResult);
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

   
     
    const navigateToEditProfile=(editScreen,data)=>{
        navigation.replace(editScreen,{data:data,uid:user.uid})
    }
    // const {basicInfo,experience,family,language,preference} = profile;
    return ( 
    
        <Screen>
        {(loading || !profile )&& <ActivityIndicator />}
        {!loading && profile &&
            <>
                <AppSection sectionTitle="Basic Info" items={profile.basicInfo} editFunction={()=>{navigateToEditProfile(constants.route.editMaidProfileBasicInfo,profile.basicInfo)}}/>
                {/* <AppSection sectionTitle="Work History" items={profile.experience} editFunction={()=>{navigateToEditProfile("WorkHistory")}}/> */}
                <AppSection sectionTitle="Language" items={profile.language} editFunction={()=>{navigateToEditProfile(constants.route.editMaidProfileLanguage,profile.language)}}/>
            </>
        }

    </Screen>);
}
 
export default MaidProfileScreen;