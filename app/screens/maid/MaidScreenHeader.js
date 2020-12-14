import React,{useContext} from 'react';
import {Alert, StyleSheet,View} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

import AuthContext from '../../auth/AuthContext';
import ActionIcon from "../../components/ActionIcon";
import AppText from "../../components/AppText";
import constants from "../../config/constants";
import defaultStyles  from "../../config/styles";

const iconSize = defaultStyles.bigIcon.size;
const iconColor =defaultStyles.colors.danger;

const toFavoriteList=(navigation,uid)=>{

    navigation.navigate(constants.route.employer.favoriteMaidList,{data:uid});
}
const openDrawer=(navigation)=>{
  navigation.openDrawer();
    // navigation.navigate(constants.route.stack.account,{data:uid});
}
const toChatScreen=(navigation,uid)=>{
   navigation.navigate(constants.route.common.inbox,{data:uid});

}
const approveProfile=(navigation,maid_uid)=>{
  Alert.alert("Approve",maid_uid);
}
const rejectProfile=(navigation,maid_uid)=>{
  Alert.alert("Reject",maid_uid);
}
const rateProfile=(navigation,maid_uid)=>{
  Alert.alert("Rate",maid_uid);
}
const offlineProfile=(navigation,maid_uid)=>{
  Alert.alert("Take Offline",maid_uid);
}
const notinMarket=(navigation,maid_uid)=>{
  Alert.alert("Get online",maid_uid);
}
export const MaidScreenHeader = ({maid_uid,profileStatus}) => {
    const {user} = useContext(AuthContext);
    const navigation = useNavigation();
    const route= useRoute();

    return ( <View style={styles.container}>
                <View style={styles.leftIconContainer}>
                    <ActionIcon iconName="account-outline" size={iconSize} iconColor={iconColor} onPress={()=>openDrawer(navigation)}/>
                    <AppText style={styles.displayName}>{user.displayName} {user.email}</AppText>
                    <AppText style={styles.role}>{user.role}</AppText>
                </View>
                <MaidRightHeader navigation={navigation} route={route}/>
            </View> );
}

export const MaidRightHeader = ({navigation,route})=>{
      const {user} = useContext(AuthContext);
    return (
            <View style={styles.onlyRightIconContainer}>
                 <ActionIcon iconColor={iconColor} style={styles.icon} iconName="checkbox-marked-circle-outline" size={iconSize} onPress={()=>notinMarket(navigation,user.uid)}/> 
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
  role:{
     marginLeft:4,
     fontWeight:"bold",
    color:defaultStyles.colors.danger,
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
