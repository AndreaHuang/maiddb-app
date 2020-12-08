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
import MaidProfileBasicInfoSection from "./MaidProfileBasicInfoSection";
import MaidProfileWorkHistorySection from "./MaidProfileWorkHistorySection";
import CaroselWithModal from '../../components/CaroselWithModal';
import MaidProfileHeaderSection from './MaidProfileHeaderSection';


const MaidProfileScreen = ({navigation}) => {
    const [loading,setLoading]=useState(false);
    const {user} = useContext(AuthContext);
    const { t } = useTranslation();
    const [profile,setProfile] = useState(null);
     useEffect(()=>{
        async function retreiveOrCreateProfile(){
            setLoading(true);
            const profileResult=  await maidProfileDB.retreiveOrCreateProfile();
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

   
     
    const navigateToEditProfile=(editScreen,data,index)=>{
            navigation.navigate(editScreen,{data:data,uid:user.uid,index:index});
    }
    const removeWorkHistory = (index)=>{
        const confirmToDelete = () =>
            Alert.alert(
            t("message.confirm.remove.workhistory"),
            null,
            [   {
                text: "Cancel",
                // onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "OK", onPress: () => {
                        maidProfileDB.removeWorkHistory(user.uid,index);
                        navigation.replace(constants.route.maid.maidProfile);
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
        <ScrollScreen>
                <MaidProfileHeaderSection data={profile.basicInfo}/>
                <AppSection sectionTitle={t("image")} defaultCollapsed={false}  onEdit={()=>{navigateToEditProfile(constants.route.maid.editImage,profile.images)}} />
                <CaroselWithModal data={profile.images}/>
                <MaidProfileBasicInfoSection data={profile.basicInfo} defaultCollapsed={false}  onEdit={()=>navigateToEditProfile(constants.route.maid.editMaidProfileBasicInfo,profile.basicInfo)}/>
                <AppSection sectionTitle={t("workHistory")} defaultCollapsed={false}  onAdd={()=>{navigateToEditProfile(constants.route.maid.editWorkHistory,null,-1)}}>
                    {profile.workHistory?
                        profile.workHistory.map((item,index)=>{return  <MaidProfileWorkHistorySection key={index} data={item}
                                onDelete={()=>removeWorkHistory(index)}
                                onEdit={()=>navigateToEditProfile(constants.route.maid.editWorkHistory,item,index)}
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
export default MaidProfileScreen;