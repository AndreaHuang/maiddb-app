import React from 'react';
import { Switch } from 'react-native-paper';
import paperTheme from "../config/paperTheme";

const AppSwitch = ({value=false,onChange}) => {
    return ( <Switch value ={value} onValueChange={onChange} theme={paperTheme}/>);
}
export default AppSwitch;