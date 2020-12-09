import React,{useContext} from "react";

import { createStackNavigator } from '@react-navigation/stack';


import color from "../config/color";
import ManageMaidListScreen from "../screens/admin/ManageMaidListScreen";

import ScreenHeader from "../screens/ScreenHeader";

import constants from "../config/constants";
import i18n from "../config/i18n";
import defaultStyles from "../config/styles";
import {ChatIcon} from "../screens/ScreenHeader";
import AppText from "../components/AppText";
import { useTranslation } from "react-i18next";


const Stack = createStackNavigator();
const AdminNavigator=({navigation,screen})=>{
      const {t}=useTranslation();
    return(
        <Stack.Navigator initialRouteName={constants.route.admin.manageMaidList}
            screenOptions={{
                          headerTitleAlign:"left",
                          headerBackTitleVisible:false,
                          headerTintColor: color.secondary,
                          headerTitleStyle: {
                                color:color.dark,
                                fontWeight: '400',
                                fontSize:defaultStyles.headerTitle.fontSize
                          }
                }}>
                <Stack.Screen name={constants.route.admin.manageMaidList}  
                    component={ManageMaidListScreen} 
                    options={{headerTitle:<ScreenHeader/>}}/>
        </Stack.Navigator>
    );
}

export default AdminNavigator;