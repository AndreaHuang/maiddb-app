import React from 'react';
import LoginScreen from "../screens/auth/LoginScreen";
import RegistrationScreen from "../screens/auth/RegistrationScreen";
import ResestPasswordScreen from "../screens/auth/ResetPasswordScreen";
import {createStackNavigator} from '@react-navigation/stack';
import constants from "../config/constants";
const Stack=createStackNavigator();
const ActivityNavigator = () => {
    return ( <Stack.Navigator>
        <Stack.Screen name={constants.route.activity.activity} component={ShortListMaidScreen} options={{ headerShown: false }}/>
    </Stack.Navigator> );
}
 
export default ActivityNavigator;