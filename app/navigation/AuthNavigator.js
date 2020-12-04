import React from 'react';
import LoginScreen from "../screens/auth/LoginScreen";
import RegistrationScreen from "../screens/auth/RegistrationScreen";
import ResestPasswordScreen from "../screens/auth/ResetPasswordScreen";
import {createStackNavigator} from '@react-navigation/stack';
import constants from "../config/constants";
const Stack=createStackNavigator();
const AuthNavigator = () => {
    return ( <Stack.Navigator>
        <Stack.Screen name={constants.route.login}component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={constants.route.registration} component={RegistrationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={constants.route.resetPassword} component={ResestPasswordScreen} options={{ headerShown: false }}/>
    </Stack.Navigator> );
}
 
export default AuthNavigator;