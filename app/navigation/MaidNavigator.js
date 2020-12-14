import React,{useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { useTranslation } from "react-i18next";

import constants from "../config/constants";
import color from "../config/color";
import defaultStyles from "../config/styles";
import i18n from "../config/i18n";


import {MaidScreenHeader} from "../screens/maid/MaidScreenHeader";
import MaidProfileScreen from '../screens/maid/MaidProfileScreen';
import MaidProfileBasicInfoEditScreen from "../screens/maid/MaidProfileBasicInfoEditScreen";
import MaidProfileWorkHistoryEditScreen from "../screens/maid/MaidProfileWorkHistoryEditScreen";
import MaidProfileImageEditScreen from "../screens/maid/MaidProfileImageEditScreen";

import AuthContext from '../auth/AuthContext';


const Stack = createStackNavigator();

const MaidNavigator=()=>{
    const { t } = useTranslation();
    const {user} = useContext(AuthContext);

     return(
        <Stack.Navigator initialRouteName={constants.route.maid.maidProfile}
                   screenOptions={{
                          headerStyle:{
                            backgroundColor:color.secondary,
                          },
                          headerTitleAlign:"left",
                          headerBackTitleVisible:false,
                          headerTintColor: color.danger,
                          headerTitleStyle: {
                                
                                color:color.dark,
                                fontWeight: '400',
                                fontSize:defaultStyles.headerTitle.fontSize
                          }
                }}>
            <Stack.Screen name={constants.route.maid.maidProfile} component={MaidProfileScreen}
                options= {(props) => ({
                        headerTitle: ()=><MaidScreenHeader {...props}/>,
                    })} 
            />
            <Stack.Screen name={constants.route.maid.editMaidProfileBasicInfo} component={MaidProfileBasicInfoEditScreen} 
                options={{ headerShown: false }}/>
            <Stack.Screen name={constants.route.maid.editWorkHistory} component={MaidProfileWorkHistoryEditScreen} 
                 options={{ headerShown: false }}/>
            
            <Stack.Screen name={constants.route.maid.editImage} component={MaidProfileImageEditScreen} 
                options={ {headerShown: false }}/> 
        </Stack.Navigator>
    );

};
export default MaidNavigator;