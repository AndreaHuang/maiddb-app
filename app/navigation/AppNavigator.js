import React from "react";

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { SimpleLineIcons } from '@expo/vector-icons'; 

import color from "../config/color";
import LoginScreen from "../screens/LoginScreen";
import AccountScreen from "../screens/AccountScreen";
import MaidProfileEditScreen from "../screens/MaidProfileEditScreen"
import InboxScreen from "../screens/InboxScreen";
import MaidProfileScreen from '../screens/MaidProfileScreen';

const Tab = createBottomTabNavigator();

const ProfileStack = createStackNavigator();

const ProfileNavigator=()=>{
    return(
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Account" component={AccountScreen}/>
            {/* <ProfileStack.Screen name="EditMaidProfile" component={MaidProfileEditScreen}/> */}
            {/* <ProfileStack.Screen name="MaidProfile" component={MaidProfileScreen}/> */} 
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