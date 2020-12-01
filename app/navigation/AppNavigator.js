import React from "react";

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { useTranslation } from "react-i18next";

import color from "../config/color";
import LoginScreen from "../screens/LoginScreen";
import AccountScreen from "../screens/AccountScreen";
import MaidProfileEditScreen from "../screens/MaidProfileEditScreen"
import InboxScreen from "../screens/InboxScreen";
import MaidProfileScreen from '../screens/maidProfile/MaidProfileScreen';
import MaidProfileBasicInfoEditScreen from "../screens/maidProfile/MaidProfileBasicInfoEditScreen";
import MaidProfileWorkHistoryEditScreen from "../screens/maidProfile/MaidProfileWorkHistoryEditScreen";
import MaidProfileImageEditScreen from "../screens/maidProfile/MaidProfileImageEditScreen";
import TestScreen from "../screens/maidProfile/TestScreen";

import constants from "../config/constants";
import i18n from "../config/i18n";


const Tab = createBottomTabNavigator();

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
            <ProfileStack.Screen name={constants.route.account}component={AccountScreen} options={{ title: 'My Account' }}/>
            <ProfileStack.Screen name={constants.route.editMaidProfile} component={MaidProfileEditScreen} options={{ headerShown: false }}/>
            <ProfileStack.Screen name={constants.route.editMaidProfileBasicInfo} component={MaidProfileBasicInfoEditScreen} options={{ headerShown: false }}/>
            <ProfileStack.Screen name={constants.route.editWorkHistory} component={MaidProfileWorkHistoryEditScreen} options={{ headerShown: false }}/>
            <ProfileStack.Screen name={constants.route.maidProfile} component={MaidProfileScreen} options={{ title: 'My Profile' }}/> 
            <ProfileStack.Screen name={constants.route.editImage} component={MaidProfileImageEditScreen} options={{ title:t("editImageScreenTitle") }}/> 
        </ProfileStack.Navigator>
    );

}


const AppNavigator=({screen})=>{
   
    return(
        <Tab.Navigator
            screenOptions={({route})=>({
                tabBarIcon:({focused,color,size})=>{
                    let iconName;
                    if(route.name==='Login'){
                        iconName = "login"
                    } else if(route.name==='Profile'){
                         iconName = "user"
                    } else if(route.name==='Inbox'){
                         iconName = "bubble"
                    }
                    return <SimpleLineIcons color={color}  name={iconName} size={size} /> ;
            },})}
            tabBarOptions={
                {
                    activeBackgroundColor:color.primary,
                    activeTintColor:color.white,
                    inactiveBackgroundColor:color.white,
                    inactiveTintColor:color.dark,
                    showLabel:false
                }
            }
            >
                <Tab.Screen name="Profile"  component={ProfileNavigator} />  
                <Tab.Screen name="Inbox"  component={InboxScreen} />      
        </Tab.Navigator>
    );
}

export default AppNavigator;