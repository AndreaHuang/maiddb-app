import React from "react";

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { SimpleLineIcons } from '@expo/vector-icons'; 


import color from "../config/color";
import InboxScreen from "../screens/InboxScreen";
import ProfileNavigator from "./ProfileNavigator";
import CommonNavigator from "./CommonNavigator";

import constants from "../config/constants";
import i18n from "../config/i18n";

const Tab = createBottomTabNavigator();
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
                    }  else if(route.name==='Home'){
                         iconName = "home"
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
                <Tab.Screen name="Home"  component={CommonNavigator} />  
                <Tab.Screen name="Inbox"  component={InboxScreen} />      
        </Tab.Navigator>
    );
}

export default AppNavigator;