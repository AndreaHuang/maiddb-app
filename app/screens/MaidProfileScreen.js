import React from 'react';
import {Text} from 'react-native';
import { useTranslation } from "react-i18next";


import Screen from '../components/Screen';
import AppLink from "../components/AppLink";
import constants from "../config/constants";

import i18n from "../config/i18n";

const MaidProfileScreen = ({navigation}) => {
     const { t } = useTranslation();

    const navigateToEditProfile=()=>{
        navigation.replace(constants.route.editMaidProfile)
    }
    return ( <Screen>
        
        <Text> Maid Profile Screen</Text>
        <AppLink onPress = {navigateToEditProfile} title="Go to Edit"/> 
    </Screen>);
}
 
export default MaidProfileScreen;