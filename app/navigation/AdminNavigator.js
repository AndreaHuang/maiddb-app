import React,{useContext} from "react";

import { createStackNavigator } from '@react-navigation/stack';


import color from "../config/color";
import ManageMaidListScreen from "../screens/admin/ManageMaidListScreen";
import MaidDetailsScreen from "../screens/employer/MaidDetailsScreen";

import {AdminScreenHeader,AdminRightHeader} from "../screens/admin/AdminScreenHeader";

import constants from "../config/constants";
import i18n from "../config/i18n";
import defaultStyles from "../config/styles";
import {ChatIcon} from "../screens/ScreenHeader";
import AppText from "../components/AppText";
import { useTranslation } from "react-i18next";
                  


const Stack = createStackNavigator();
const AdminNavigator=(props)=>{
      const {t}=useTranslation();
    return(
        <Stack.Navigator initialRouteName={constants.route.admin.manageMaidList}
            screenOptions={{
                          headerStyle:{
                            backgroundColor:"cyan",
                          },
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
                    options={{headerTitle:<AdminScreenHeader/>}}/>
                <Stack.Screen name={constants.route.admin.manageMaid}  
                    component={MaidDetailsScreen} 
                    options= {(props) => ({
                        headerRight: ()=><AdminRightHeader {...props}/>,
                        headerTitle: props.route.params.data.basicInfo.name})} 
                />


        </Stack.Navigator>
    );
}

export default AdminNavigator;