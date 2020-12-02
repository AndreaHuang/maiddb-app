import React from "react";
import {createStackNavigator} from '@react-navigation/stack';

import MaidListScreen from "../screens/MaidListScreen";

import constants from "../config/constants";
import i18n from "../config/i18n";

const Stack = createStackNavigator();
const CommonNavigator=({screen})=>{
   
    return(
        <Stack.Navigator>
                <Stack.Screen name={constants.route.mailList}  
                component={MaidListScreen} options={{ title: 'Maid List' }}/>  
        </Stack.Navigator>
    );
}

export default CommonNavigator;