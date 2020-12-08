import React,{useContext} from "react";

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { SimpleLineIcons } from '@expo/vector-icons'; 

import AuthContext from "../auth/AuthContext";

import color from "../config/color";
import InboxScreen from "../screens/InboxScreen";
import ProfileNavigator from "./ProfileNavigator";
import MainNavigator from "./MainNavigator";
import MaidListScreen from "../screens/maidList/MaidListScreen";
import MaidDetailsScreen from "../screens/maidList/MaidDetailsScreen";
import FavoriteMaidList from "../screens/maidList/FavoriteMaidList";
import ScreenHeader from "../screens/ScreenHeader";

import constants from "../config/constants";
import i18n from "../config/i18n";
import defaultStyles from "../config/styles";

const Stack = createStackNavigator();
const AppNavigator=({navigation,screen})=>{
    return(
        <Stack.Navigator screenOptions={{
                        headerBackTitleVisible:false
                }}>
                <Stack.Screen name={constants.route.main.maidList}  
                component={MaidListScreen}/>
                <Stack.Screen name={constants.route.main.maidDetails}
                component={MaidDetailsScreen} /> 
                <Stack.Screen name={constants.route.main.favoriteMaidList} component={FavoriteMaidList} />

                <Stack.Screen name={constants.route.stack.profile} component={ProfileNavigator} /> 
                {/* <Tab.Screen name={constants.route.stack.inbox}  component={InboxScreen} />       */}
        </Stack.Navigator>
    );
}

export default AppNavigator;