import React,{useContext} from 'react';
import {Alert, StyleSheet,View} from "react-native";
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../../auth/AuthContext';
import ActionIcon from "../../components/ActionIcon";
import AppText from "../../components/AppText";
import constants from "../../config/constants";
import defaultStyles  from "../../config/styles";

const iconSize = defaultStyles.bigIcon.size;
// const iconColor =defaultStyles.colors.white;

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
const onlineProfile=(navigation,maid_uid)=>{
  Alert.alert("Get online",maid_uid);
}
export const AdminScreenHeader = ({maid_uid,profileStatus}) => {
    const {user} = useContext(AuthContext);
    const navigation = useNavigation();

    return ( <View style={styles.container}>
                <View style={styles.leftIconContainer}>
                    <ActionIcon iconName="account-outline" size={iconSize} onPress={()=>openDrawer(navigation)}/>
                    <AppText style={styles.displayName}>{user.name || user.email}</AppText>
                    <AppText style={styles.role}>{user.role}</AppText>
                </View>
            </View> );
}

export const AdminRightHeader = ({navigation,route})=>{
    const {user} = useContext(AuthContext);
    const maid_uid = route.params.data.user_uid;
    const profileStatus = route.params.data.profileStatus;
    return (
            <View style={styles.onlyRightIconContainer}>
                 {/* {profileStatus === 'pending' ? 
                 <> */}
                 <ActionIcon  style={styles.icon} iconName="checkbox-marked-circle-outline" size={iconSize} onPress={()=>approveProfile(navigation,maid_uid)}/> 
                 <ActionIcon  style={styles.icon} iconName="close-circle-outline" size={iconSize} onPress={()=>rejectProfile(navigation,maid_uid)}/>
                 {/* </>
                 :null} */}
               
                 <ActionIcon  style={styles.icon} iconName="star-half" size={iconSize} onPress={()=>rateProfile(navigation,maid_uid)}/>
                 <ActionIcon  style={styles.icon} iconName="cloud-upload-outline" size={iconSize} onPress={()=>onlineProfile(navigation,maid_uid)}/> 
                 <ActionIcon  style={styles.icon} iconName="cloud-off-outline" size={iconSize} onPress={()=>offlineProfile(navigation,maid_uid)}/> 
                 
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
