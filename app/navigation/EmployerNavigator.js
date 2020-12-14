import React,{useContext} from "react";

import { createStackNavigator } from '@react-navigation/stack';


import color from "../config/color";
import MaidListScreen from "../screens/employer/MaidListScreen";
import MaidDetailsScreen from "../screens/employer/MaidDetailsScreen";
import FavoriteMaidList from "../screens/employer/FavoriteMaidList";
import ScreenHeader from "../screens/ScreenHeader";

import constants from "../config/constants";
import i18n from "../config/i18n";
import defaultStyles from "../config/styles";
import {ChatIcon} from "../screens/ScreenHeader";
import AppText from "../components/AppText";
import { useTranslation } from "react-i18next";


const Stack = createStackNavigator();
const EmployerNavigator=({navigation,screen})=>{
      const {t}=useTranslation();
    return(
        <Stack.Navigator initialRouteName={constants.route.employer.maidList}
            screenOptions={{
                        headerStyle:{
                            backgroundColor:"pink",
                          },
                          headerTitleAlign:"left",
                          headerBackTitleVisible:false,
                          headerTintColor: color.primary,
                          headerTitleStyle: {
                                color:color.dark,
                                fontWeight: '400',
                                fontSize:defaultStyles.headerTitle.fontSize
                          },
                }}>

                
                <Stack.Screen name={constants.route.employer.maidList}  
                    component={MaidListScreen} 
                    options={{headerTitle:<ScreenHeader/>}}/>
                <Stack.Screen name={constants.route.employer.maidDetails} 
                component={MaidDetailsScreen} 
                 options={({route})=>({headerTitle:route.params.data.basicInfo.name})}
                />
                <Stack.Screen name={constants.route.employer.favoriteMaidList} 
                    component={FavoriteMaidList} 
                    options={{
                        headerTitle:(props) =>(<AppText style={defaultStyles.title}>{t("favoritMaidList")}</AppText> ),
                        headerRight:(props) =>(<ChatIcon {...props}/> )
                    }} />
        </Stack.Navigator>
    );
}

export default EmployerNavigator;