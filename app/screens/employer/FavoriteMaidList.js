import React, { useContext, useEffect,useState } from 'react';
import {StyleSheet,Text} from 'react-native';
import { useTranslation } from 'react-i18next';

import constants from '../../config/constants';
import i18n from '../../config/i18n';
import defaultStyles from '../../config/styles';


import {ChatIcon} from "../ScreenHeader";
import AppText from "../../components/AppText";

const FavoriteMaidList = ({navigation}) => {
    const {t} = useTranslation();
    return ( <Text>This is FavoriteMaidList</Text>);
}
 
export default FavoriteMaidList;