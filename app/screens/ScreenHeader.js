import React,{useContext} from 'react';
import {StyleSheet,View} from "react-native";
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../auth/AuthContext';
import ActionIcon from "../components/ActionIcon";
import AppText from "../components/AppText";
import constants from "../config/constants";
import defaultStyles  from "../config/styles";

const iconSize = defaultStyles.bigIcon.size;
// const iconColor =defaultStyles.colors.white;

const toFavoriteList=(navigation,uid)=>{

    navigation.navigate(constants.route.employer.favoriteMaidList,{data:uid});
}
const toAccount=(navigation,uid)=>{
  navigation.openDrawer();
    // navigation.navigate(constants.route.stack.account,{data:uid});
}
const toChatScreen=(navigation,uid)=>{
   navigation.navigate(constants.route.common.inbox,{data:uid});

}
const ScreenHeader = () => {
    const {user} = useContext(AuthContext);
    const navigation = useNavigation();

    return ( <View style={styles.container}>
                <View style={styles.leftIconContainer}>
                    <ActionIcon iconName="account-outline" size={iconSize} onPress={()=>toAccount(navigation,user.uid)}/>
                    <AppText style={styles.displayName}>{user.name || user.email}</AppText>
                </View>
                <View style={styles.rightIconContainer}>
                    <ActionIcon  iconName="heart-outline" size={iconSize} onPress={()=>toFavoriteList(navigation,user.uid)} style={styles.icon}/>
                    <ActionIcon  iconName="chat-outline" size={iconSize} onPress={()=>toChatScreen(navigation,user.uid)} style={styles.icon} />
                </View>
            </View> );
}
export const favoriteIcon =()=>{
    const {user} = useContext(AuthContext);
    const navigation = useNavigation();
    return (<View style={styles.onlyRightIconContainer}>
              <ActionIcon iconName="heart-outline" size={iconSize} onPress={()=>toFavoriteList(navigation,user.uid)}/>
          </View>);
}
export const ChatIcon = ()=>{
    const {user} = useContext(AuthContext);
    const navigation = useNavigation();
    return (
            <View style={styles.onlyRightIconContainer}>
                <ActionIcon iconName="chat-outline" size={iconSize} onPress={()=>toChatScreen(navigation,user.uid)}/>
            </View>
          );
}
const styles = StyleSheet.create({
  container: {
    // flex:1,
    width:"100%",
    alignItems: "center",
    flexDirection: "row",
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
    justifyContent:"flex-end",
    alignItems:"center",
  },
  onlyRightIconContainer:{
    // flex:1,
    flexDirection: "row",
    justifyContent:"flex-end",
    alignItems:"center",
    marginHorizontal:25
  },
  icon:{
      marginHorizontal:10
  }
});

export default ScreenHeader;