import React, { useContext, useEffect,useState } from 'react';
import {StyleSheet,View} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Drawer} from "react-native-paper";
import {DrawerContentScrollView } from "@react-navigation/drawer";
import constants from '../config/constants';
import colors from '../config/color';
import i18n from '../config/i18n';
import defaultStyles from '../config/styles';
import AuthContext from "../auth/AuthContext";
import AppText from "../components/AppText";
import firebaseAuth from "../auth/FirebaseAuth";
import Photo from "../components/Photo";
import Icon from '../components/Icon';
import ListItem from "../components/lists/ListItem"

const iconSize = defaultStyles.bigIcon.size;
const fontSize = defaultStyles.title.fontSize;
const defaultIcon = require("../assets/female.png");

const DrawerContent = (props) => {
    const {navigation} = props
    const {t} = useTranslation();
    const {user,setUser} =useContext(AuthContext);
    const handleLogout=()=>{
        firebaseAuth.signout();
        setUser(null);
    }
    const navigateToMaidProfile=()=>{
      navigation.navigate(constants.route.stack.maid,{screen:constants.route.maid.maidProfile});
    }
    const navigateToSettingsScreen=()=>{
      navigation.navigate(constants.route.common.settings);
    }
    const navigateToFavoriteMaid=()=>{
        navigation.navigate(constants.route.stack.employer,{screen:constants.route.employer.favoriteMaidList});
  
    }
    const navigateToMaidList=()=>{
         navigation.navigate(constants.route.stack.employer,{screen:constants.route.employer.maidList});
    }
    const navigateToAdminScreen=()=>{
         navigation.navigate(constants.route.stack.admin);
            // // {screen:constants.route.admin.manageMaidList});
            // {screen:"manage"});
    }

    
    const navigateToAccountInfo=()=>{
        navigation.navigate(constants.route.common.accountInfo);
    }
    const navigateToInbox=()=>{
        navigation.navigate(constants.route.common.inbox);
    }
    return ( <View style={styles.container}>
        <DrawerContentScrollView {...props}>
            <ListItem
                title={user.displayName || user.name}
                subTitle={user.email}
                image={
                user.photoURL
                    ? { source: { url: user.photoURL } }
                    : defaultIcon
                }
            />
            <AppText>{t(user.role)}</AppText>
            <Drawer.Section style={styles.drawerSection}>
                <Drawer.Item
                        icon={()=>( <Icon
                        iconColor={colors.secondary}
                        name='account-outline'
                        size={iconSize}
                    />)} 
                    label={t("menu.updateMyAccount")}
                    onPress={navigateToAccountInfo}
                />
                <Drawer.Item
                        icon={()=>( <Icon
                        iconColor={colors.secondary}
                        name='chat-outline'
                        size={iconSize}
                    />)} 
                    label={t("menu.message")}
                    onPress={navigateToInbox}
                />
             {user.role === 'employer'?
                <>
                <Drawer.Item
                    icon={()=>( <Icon
                        iconColor={colors.primary}
                        name='home-outline'
                        size={iconSize}
                    />)} 
                    label={t("menu.maidList")}
                    onPress={navigateToMaidList}
                />
                 <Drawer.Item
                    icon={()=>( <Icon
                        iconColor={colors.primary}
                        name='heart-outline'
                        size={iconSize}
                    />)} 
                    label={t("menu.favorite")}
                    onPress={navigateToFavoriteMaid}
                />
                </>
                :null}
            </Drawer.Section>

            {user.role ==='maid'?
            <Drawer.Section style={styles.drawerSection}>
                <Drawer.Item
                            icon={()=>( <Icon
                        iconColor={colors.primary}
                        name='formate-list-checkbox'
                        size={iconSize}
                    />)} 
                    label={t("menu.profile")}
                    onPress={navigateToMaidProfile}
                />
            </Drawer.Section>
            :null}
        </DrawerContentScrollView>
         {user.role === 'admin'?
         <Drawer.Section style={styles.bottomDrawerSection}>
            <Drawer.Item  icon={()=>( <Icon
                iconColor={colors.error}
                name='apple-keyboard-command'
                size={iconSize}
              />)} 
            label={t("menu.admin")}
            onPress={navigateToAdminScreen}
            />
        </Drawer.Section>:null}

         <Drawer.Section style={styles.bottomDrawerSection}>
            <Drawer.Item  icon={()=>( <Icon
                iconColor={colors.dark}
                name='settings-outline'
                size={iconSize}
              />)} 
            label={t("menu.settings")}
            onPress={navigateToSettingsScreen}
            />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
            <Drawer.Item  icon={()=>( <Icon
                iconColor={colors.danger}
                name='exit-to-app'
                size={iconSize}
              />)} 
            label={t("button.logout")}
            onPress={handleLogout}
            />
        </Drawer.Section>
        
    </View> );
}
 
const styles=StyleSheet.create({
    bottomDrawerSection:{

    },
    container:{
        flex:1
    },
    drawerSection:{

    }
});
export default DrawerContent;