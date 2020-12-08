import React from "react";
import {Button} from "react-native";
import {createStackNavigator} from '@react-navigation/stack';

import MaidListScreen from "../screens/maidList/MaidListScreen";
import MaidDetailsScreen from "../screens/maidList/MaidDetailsScreen";
import FavoriteMaidList from "../screens/maidList/FavoriteMaidList";
import ScreenHeader from "../screens/ScreenHeader";

import constants from "../config/constants";
import i18n from "../config/i18n";

const Stack = createStackNavigator();
const MainNavigator=({screen})=>{
   
    return(
        <Stack.Navigator>
                <Stack.Screen name={constants.route.main.maidList}  
                component={MaidListScreen} options={{ title: 'Maid List' }}/>
                <Stack.Screen name={constants.route.main.maidDetails}
                component={MaidDetailsScreen} /> 
                <Stack.Screen name={constants.route.main.favoriteMaidList} component={FavoriteMaidList} />
        </Stack.Navigator>
    );
}

export default MainNavigator;