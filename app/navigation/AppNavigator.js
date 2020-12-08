import React,{useContext} from "react";

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { SimpleLineIcons } from '@expo/vector-icons'; 

import AuthContext from "../auth/AuthContext";

import color from "../config/color";
import InboxScreen from "../screens/InboxScreen";
import ProfileNavigator from "./ProfileNavigator";
import MaidListScreen from "../screens/maidList/MaidListScreen";
import MaidDetailsScreen from "../screens/maidList/MaidDetailsScreen";
import FavoriteMaidList from "../screens/maidList/FavoriteMaidList";
import ScreenHeader from "../screens/ScreenHeader";

import constants from "../config/constants";
import i18n from "../config/i18n";
import defaultStyles from "../config/styles";
import {ChatIcon} from "../screens/ScreenHeader";
import AppText from "../components/AppText";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator();
const AppNavigator=({navigation,screen})=>{
      const {t}=useTranslation();
    return(
        <Stack.Navigator screenOptions={{
                          headerTitleAlign:"left",
                          headerBackTitleVisible:false,
                          headerTintColor: color.primary,
                          headerTitleStyle: {
                                color:color.dark,
                                fontWeight: '400',
                                fontSize:defaultStyles.headerTitle.fontSize
                          },
                            


                }}>
                <Stack.Screen name={constants.route.main.maidList}  
                component={MaidListScreen} options={{headerTitle:<ScreenHeader/>}}/>
                <Stack.Screen name={constants.route.main.maidDetails}
                component={MaidDetailsScreen} /> 
                <Stack.Screen name={constants.route.main.favoriteMaidList} component={FavoriteMaidList} options={{
                     headerTitle:(props) =>(<AppText style={defaultStyles.title}>{t("favoritMaidList")}</AppText> ),
                     headerRight:(props) =>(<ChatIcon {...props}/> )
                }} />
                <Stack.Screen name={constants.route.main.inbox}  component={InboxScreen} />  
                <Stack.Screen name={constants.route.stack.profile} component={ProfileNavigator} /> 
                    
        </Stack.Navigator>
    );
}

export default AppNavigator;