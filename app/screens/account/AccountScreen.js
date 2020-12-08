import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useTranslation } from "react-i18next";


import ListItem from "../../components/lists/ListItem";
import MenuItem from "../../components/MenuItem";
import ListItemSeperator from "../../components/lists/ListItemSeperator";
import Screen from "../../components/Screen";
import colors from "../../config/color";
import Photo from "../../components/Photo";
import AppButton from "../../components/AppButton";
import firebaseAuth from "../../auth/FirebaseAuth";
import AuthContext from "../../auth/AuthContext";
import ActionIcon from "../../components/ActionIcon";
import constants from "../../config/constants";
import i18n from "../../config/i18n";

const defaultIcon = require("../../assets/icon.png");

function AccountScreen({navigation, route}) {
  const { t } = useTranslation();
  const {user,setUser} =useContext(AuthContext);
  const handleLogout=()=>{
     firebaseAuth.signout();
     setUser(null);
  }
  const navigateToMyProfiel=()=>{
    navigation.navigate(constants.route.maid.maidProfile);
  }
  const menuItems = [
    {
      title: "My Favorite",
      icon: "heart-outline",
      backgroundColor: colors.primary,
    },
    {
      title: "My Messages",
      icon: "email",
      backgroundColor: colors.secondary,
    },
  
  ];
  if(user.role==="maid"){
    menuItems.push(
        {
        title:"My Profile",
        icon:"account-details",
        backgroundColor: colors.primary,
        action:navigateToMyProfiel
      });
  }
  
  return (
    <Screen>
      <ListItem
        title={user.name}
        subTitle={user.email}
        image={
          user.photoURL
            ? { source: { url: user.photoURL } }
            : defaultIcon
        }
      />
      <ListItemSeperator style={{ height: 40 }} />
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={ListItemSeperator}
        renderItem={({ item }) => (
          <MenuItem
            title={item.title}
            iconName={item.icon}
            onPress={item.action}
            IconComponent={
              <Photo
                iconColor={colors.white}
                name={item.icon}
                size={40}
                backgroundColor={item.backgroundColor}
              />
            }
          />
        )}
      />
      <ListItemSeperator style={{ height: 20 }} />

       <MenuItem
            title={t("button.logout")}
            onPress={handleLogout}
            IconComponent={
              <Photo
                iconColor={colors.white}
                name='logout'
                size={40}
                backgroundColor={colors.danger}
              />
            }
          />
    </Screen>
  );
}
const styles = StyleSheet.create({
  myMessagesContainer: {
    // marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  myListingsContainer: {
    // marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: 10,
  },
});

export default AccountScreen;
