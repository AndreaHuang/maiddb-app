import React, { useContext, useEffect,useState } from 'react';
import {StyleSheet,Text,Button,View} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useTranslation } from 'react-i18next';
import constants from '../config/constants';
import i18n from '../config/i18n';
import defaultStyles from '../config/styles';

import AccountInitiationScreen from "../screens/common/AccountInitiationScreen";
import AccountScreen from "../screens/common/AccountScreen";

import InboxScreen from '../screens/common/InboxScreen';
import DrawerContent from "../screens/DrawerContent";

import AuthContext from '../auth/AuthContext';
import MaidNavigator from './MaidNavigator';
import EmployerNavigator from './EmployerNavigator';
import SettingsScreen from '../screens/common/SettingsScreen';
import {profileIsNotCompleted} from "../schemas/user";

const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.openDrawer()} title="Go back home" />
    </View>
  );
}

const AppNavigator = () => {
  const{user} = useContext(AuthContext);
    return (  
       <Drawer.Navigator
            drawerContent={props=><DrawerContent {...props}/>} >
       {profileIsNotCompleted(user) ? 
        <Drawer.Screen name={constants.route.common.accountInitialization} component={AccountInitiationScreen} />
        :null}    
           {/* <Drawer.Screen name={constants.route.profile.maidProfile} component={ProfileNavigator} /> */}
        {/* <Drawer.Screen name={constants.route.stack.inbox} component={InboxScreen} /> */}
        
        {(!user.profile ||  user.profile ===maid )?
        <Drawer.Screen name={constants.route.stack.maid} component={MaidNavigator} />  : null}
        {(!user.profile ||  user.profile ===employer )?
        <Drawer.Screen name={constants.route.stack.employer} component={EmployerNavigator} /> :null}

        <Drawer.Screen name={constants.route.common.accountInfo} component={AccountScreen}  />
        <Drawer.Screen name={constants.route.common.settings} component={SettingsScreen}  />
        <Drawer.Screen name={constants.route.common.inbox} component={InboxScreen}  />
      
      </Drawer.Navigator> );
}
 
export default AppNavigator;