import React, { useContext, useEffect,useState } from 'react';
import {StyleSheet,Text,Button,View} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useTranslation } from 'react-i18next';
import constants from '../config/constants';
import i18n from '../config/i18n';
import defaultStyles from '../config/styles';
import { constant } from 'lodash';
import ProfileNavigator from './ProfileNavigator';
import InboxScreen from '../screens/InboxScreen';
import DrawerContent from "../screens/DrawerContent";
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

const AccountNavigator = () => {
    return (  
       <Drawer.Navigator initialRouteName="Home" 
            drawerContent={props=><DrawerContent {...props}/>} >
        {/* <Drawer.Screen name="Preference"  /> */}
        {/* <Drawer.Screen name={constants.route.profile.maidProfile} component={ProfileNavigator} /> */}
        {/* <Drawer.Screen name={constants.route.stack.inbox} component={InboxScreen} /> */}
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />       
      </Drawer.Navigator> );
}
 
export default AccountNavigator;