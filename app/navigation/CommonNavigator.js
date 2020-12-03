import React from "react";
import {createStackNavigator} from '@react-navigation/stack';

import MaidListScreen from "../screens/maidList/MaidListScreen";
import MaidDetailsScreen from "../screens/maidList/MaidDetailsScreen";

import constants from "../config/constants";
import i18n from "../config/i18n";

const Stack = createStackNavigator();
const CommonNavigator=({screen})=>{
   
    return(
        <Stack.Navigator>
                <Stack.Screen name={constants.route.mailList}  
                component={MaidListScreen} options={{ title: 'Maid List' }}/>  
                <Stack.Screen name={constants.route.maidDetails}
                component={MaidDetailsScreen} options={{ title: 'Maid Profile' }}/> 
        </Stack.Navigator>
    );
}

export default CommonNavigator;