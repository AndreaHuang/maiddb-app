import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { useTranslation } from "react-i18next";

import constants from "../config/constants";
import color from "../config/color";
import i18n from "../config/i18n";


import AccountScreen from "../screens/account/AccountScreen";
import AccountInitiationScreen from "../screens/account/AccountInitiationScreen";
import MaidProfileScreen from '../screens/maidProfile/MaidProfileScreen';
import MaidProfileBasicInfoEditScreen from "../screens/maidProfile/MaidProfileBasicInfoEditScreen";
import MaidProfileWorkHistoryEditScreen from "../screens/maidProfile/MaidProfileWorkHistoryEditScreen";
import MaidProfileImageEditScreen from "../screens/maidProfile/MaidProfileImageEditScreen";


const ProfileStack = createStackNavigator();

const ProfileNavigator=()=>{
    const { t } = useTranslation();
    return(
        <ProfileStack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: color.primary,
                },
                headerTintColor: color.white,
                headerTitleStyle: {
                    fontWeight: '400',
                    fontSize:22
                }}
            }
            >
            <ProfileStack.Screen name={constants.route.accountProfile} component={AccountInitiationScreen} />

            <ProfileStack.Screen name={constants.route.account} component={AccountScreen} options={{ title: 'My Account' }}/>
            <ProfileStack.Screen name={constants.route.editMaidProfileBasicInfo} component={MaidProfileBasicInfoEditScreen} options={{ headerShown: false }}/>
            <ProfileStack.Screen name={constants.route.editWorkHistory} component={MaidProfileWorkHistoryEditScreen} options={{ headerShown: false }}/>
            <ProfileStack.Screen name={constants.route.maidProfile} component={MaidProfileScreen} options={{ title: 'My Profile' }}/> 
            <ProfileStack.Screen name={constants.route.editImage} component={MaidProfileImageEditScreen} options={{ title:t("editImageScreenTitle") }}/> 
        </ProfileStack.Navigator>
    );

};
export default ProfileNavigator;