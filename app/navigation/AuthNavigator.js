import React from 'react';
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import ResestPasswordScreen from "../screens/ResetPasswordScreen";
import {createStackNavigator} from '@react-navigation/stack';
import constants from "../config/constants";
const Stack=createStackNavigator();
const AuthNavigator = () => {
    return ( <Stack.Navigator>
        <Stack.Screen name={constants.route.login}component={LoginScreen}/>
        <Stack.Screen name={constants.route.registration} component={RegistrationScreen}/>
        <Stack.Screen name={constants.route.resetPassword} component={ResestPasswordScreen}/>
    </Stack.Navigator> );
}
 
export default AuthNavigator;