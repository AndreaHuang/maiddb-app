import React from "react";

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import color from "../config/color";
import LoginScreen from "./LoginScreen";
import AccountScreen from "./AccountScreen";
import MaidProfileEditScreen from "./MaidProfileEditScreen"

const Tab = createBottomTabNavigator();


const screens=[
  {
    name:"Profile",
    screenComponent: MaidProfileEditScreen,
    icon:"account"
  },
  {
    name:"Login",
    screenComponent: LoginScreen,
    icon:"login"
  },
//     {
//     name:"Account",
//     screenComponent: AccountScreen,
//     icon:"account"
//   }
]


const TabNavigator=({screen})=>{
    console.log(screen);
    return(
        <Tab.Navigator
            tabBarOptions={
                {
                    activeBackgroundColor:color.primary,
                    activeTintColor:color.white,
                    inactiveBackgroundColor:color.white,
                    inactiveTintColor:color.dark
                }
            }
            >
            { 
            screens.map((screen,index) => 
                (<Tab.Screen
                    key={index}
                    name={screen.name}
                    component={screen.screenComponent}
                    options={{
                        tabBarIcon:({size,color})=>{
                            return   <MaterialCommunityIcons
                                        color={color}
                                        name={screen.icon}
                                        size={size} />
                             }
                    }}
                >
                </Tab.Screen>)
                )}

            
        </Tab.Navigator>
    );
}

export default TabNavigator;