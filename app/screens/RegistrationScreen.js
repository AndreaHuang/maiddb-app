import React from 'react';
import {Text} from 'react-native';
import AppButton from "../components/AppButton"
import Screen from '../components/Screen';

const RegistrationScreen = () => {
    return ( <Screen>
        <Text>RegistrationScreen</Text>
        <AppButton title="Register with Google"
         onPress={()=>{}}></AppButton>
        </Screen> );
}
 
export default RegistrationScreen;