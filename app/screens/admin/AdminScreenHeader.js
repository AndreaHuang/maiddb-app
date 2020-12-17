import React,{useContext} from 'react';
import {Alert, StyleSheet,View} from "react-native";
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../../auth/AuthContext';
import ActionIcon from "../../components/ActionIcon";
import AppText from "../../components/AppText";
import constants from "../../config/constants";
import defaultStyles  from "../../config/styles";
import maidProfile from "../../database/maidProfile";

const iconSize = defaultStyles.bigIcon.size;
// const iconColor =defaultStyles.colors.white;

const toFavoriteList=(navigation,uid)=>{

    navigation.navigate(constants.route.employer.favoriteMaidList,{data:uid});
}
const openDrawer=(navigation)=>{
  navigation.openDrawer();
    // navigation.navigate(constants.route.stack.account,{data:uid});
}

const approveProfile=(navigation,maid_uid,admin_uid)=>{
  maidProfile.manageProfile(maid_uid,admin_uid,constants.profileStatus.approved,(updatedProfile)=>{
    console.log("approveProfile updatedProfile",updatedProfile)
  });
  navigation.goBack();
}
const rejectProfile=(navigation,maid_uid,admin_uid)=>{
  maidProfile.manageProfile(maid_uid,admin_uid,constants.profileStatus.rejected,(updatedProfile)=>{
    console.log("rejectProfile updatedProfile",updatedProfile)
  });
  navigation.goBack();
}
const rateProfile=(navigation,maid_uid)=>{
  navigation.navigate(constants.route.admin.rateMaid,{maid_uid:maid_uid})
}
const offlineProfile=(navigation,maid_uid,admin_uid)=>{
    maidProfile.manageProfile(maid_uid,admin_uid,constants.profileStatus.offline,(updatedProfile)=>{
    console.log("offlineProfile updatedProfile",updatedProfile)
  });
  navigation.goBack();
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
                 <ActionIcon  style={styles.icon} iconName="checkbox-marked-circle-outline" size={iconSize} onPress={()=>approveProfile(navigation,maid_uid,user.uid)}/> 
                 <ActionIcon  style={styles.icon} iconName="close-circle-outline" size={iconSize} onPress={()=>rejectProfile(navigation,maid_uid,user.uid)}/>
                 <ActionIcon  style={styles.icon} iconName="cloud-off-outline" size={iconSize} onPress={()=>offlineProfile(navigation,maid_uid,user.uid)}/> 

                  <ActionIcon  style={styles.icon} iconName="star-half" size={iconSize} onPress={()=>rateProfile(navigation,maid_uid)}/>
                 
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
