import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { useTranslation } from "react-i18next";

import constants from "../config/constants";
import color from "../config/color";
import i18n from "../config/i18n";



import MaidProfileScreen from '../screens/maidProfile/MaidProfileScreen';
import MaidProfileBasicInfoEditScreen from "../screens/maidProfile/MaidProfileBasicInfoEditScreen";
import MaidProfileWorkHistoryEditScreen from "../screens/maidProfile/MaidProfileWorkHistoryEditScreen";
import MaidProfileImageEditScreen from "../screens/maidProfile/MaidProfileImageEditScreen";

import AccountScreen from "../screens/account/AccountScreen";
import AccountInitiationScreen from "../screens/account/AccountInitiationScreen";

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
                },
                 headerBackTitleVisible:false
            }}
            >
            <ProfileStack.Screen name={constants.route.profile.accountProfile} component={AccountInitiationScreen} options={{ title: 'Complete My Profile' }}/>
            <ProfileStack.Screen name={constants.route.profile.account} component={AccountScreen} options={{ title: 'My Account' }}/>
            <ProfileStack.Screen name={constants.route.profile.editMaidProfileBasicInfo} component={MaidProfileBasicInfoEditScreen} options={{ headerShown: false }}/>
            <ProfileStack.Screen name={constants.route.profile.editWorkHistory} component={MaidProfileWorkHistoryEditScreen} options={{ headerShown: false }}/>
            <ProfileStack.Screen name={constants.route.profile.maidProfile} component={MaidProfileScreen} options={{ title: 'My Profile' }}/> 
            <ProfileStack.Screen name={constants.route.profile.editImage} component={MaidProfileImageEditScreen} options={ {headerShown: false }}/> 
        </ProfileStack.Navigator>
    );

};
export default ProfileNavigator;