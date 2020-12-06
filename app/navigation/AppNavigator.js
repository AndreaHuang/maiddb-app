import React from "react";

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { SimpleLineIcons } from '@expo/vector-icons'; 


import color from "../config/color";
import InboxScreen from "../screens/InboxScreen";
import ProfileNavigator from "./ProfileNavigator";
import MainNavigator from "./MainNavigator";

import constants from "../config/constants";
import i18n from "../config/i18n";
import defaultStyles from "../config/styles";

const Tab = createBottomTabNavigator();
const AppNavigator=({screen})=>{
   
    return(
        <Tab.Navigator
            screenOptions={({route})=>({
                tabBarIcon:({focused,color,size})=>{
                    let iconName;
                    if(route.name=== constants.route.stack.profile ){
                         iconName = "user"
                    } else if(route.name===constants.route.stack.inbox ){
                         iconName = "bubble"
                    }  else if(route.name=== constants.route.stack.main ){
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
                    // showLabel:false
                    labelStyle:{
                        fontSize: defaultStyles.tinyText.fontSize
                    }

                }
            }
            >
                <Tab.Screen name={constants.route.stack.main}  component={MainNavigator} />  
                {/* <Tab.Screen name={constants.route.stack.activity}  component={MainNavigator} />   */}
                <Tab.Screen name={constants.route.stack.profile} component={ProfileNavigator} /> 
                <Tab.Screen name={constants.route.stack.inbox}  component={InboxScreen} />      
        </Tab.Navigator>
    );
}

export default AppNavigator;