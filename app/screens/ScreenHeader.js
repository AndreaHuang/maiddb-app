import React,{useContext} from 'react';
import {StyleSheet,View} from "react-native";
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../auth/AuthContext';
import ActionIcon from "../components/ActionIcon";
import AppText from "../components/AppText";
import constants from "../config/constants";

const ScreenHeader = () => {
    const {user} = useContext(AuthContext);
    const navigation = useNavigation();
    const toFavoriteList=()=>{
        navigation.navigate(constants.route.main.favoriteMaidList,{data:user.uid});
    }
     const toProfile=()=>{
        navigation.navigate(constants.route.main.profile,{data:uid});
    }
    return ( <View style={styles.container}>
                <View style={styles.leftIconContainer}>
                    <ActionIcon iconName="account-outline" size={30} onPress={toProfile}/>
                    <AppText style={styles.displayName}>{user.name || user.email}</AppText>
                </View>
                <View style={styles.rightIconContainer}>
                    <ActionIcon iconName="heart-outline" size={28} onPress={toFavoriteList} style={styles.icon}/>
                    <ActionIcon iconName="chat-outline" size={28} style={styles.icon}/>
                </View>
            </View> );
}
const styles = StyleSheet.create({
  container: {
    // flex:1,
    width:"100%",
    alignItems: "center",
    flexDirection: "row",
    // marginRight:40,
    justifyContent:"space-between"
  },
  displayName:{
    fontSize:18,
    fontWeight:"400",
    marginLeft:4,
    alignSelf:"flex-end"
  },
  leftIconContainer:{
    // flex:3,
    flexDirection: "row",
    justifyContent:"flex-start",
    alignItems: "center",
  },
  rightIconContainer:{
    // flex:1,
    flexDirection: "row",
    justifyContent:"flex-end"
  },
  icon:{
      marginHorizontal:10
  }
});
export default  ScreenHeader;