import React from 'react';
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import {createStackNavigator} from '@react-navigation/stack';
const Stack=createStackNavigator();
const AuthNavigator = () => {
    return ( <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegistrationScreen}/>
    </Stack.Navigator> );
}
 
export default AuthNavigator;