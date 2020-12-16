import React, { useContext } from 'react';
import {StyleSheet,View,Image} from "react-native";
import { useTranslation } from "react-i18next";

import AppSection from "../../components/AppSection";
import AppText from "../../components/AppText";
import i18n from "../../config/i18n";
import colors from "../../config/color";
import defaultStyles from "../../config/styles";
import AppLabelValue from '../../components/display/AppLabelValue';
import AppRating from '../../components/AppRating';
import AppLink from '../../components/AppLink';
import AppSwitch from '../../components/AppSwitch';
import ListItem from "../../components/lists/ListItem";
import ListItemSeperator from "../../components/lists/ListItemSeperator";
import { date } from 'yup';
import {calculateAge} from "../../utiity/AgeCalculator";
import { Whatsapp,Email } from '../../components/Linking';
import AuthContext from '../../auth/AuthContext';
import Icon from "../../components/Icon";
import AppButton from '../../components/AppButton';

const locale="zh_CN";
const femaleIcon=require("../../assets/female.png");
const maleIcon=require("../../assets/male.png");



const MaidProfileHeaderSection = ({data}) => {
    // console.log("MaidProfileHeaderSection data",data);
    const {t} = useTranslation();
    const {user} = useContext(AuthContext);
    const {basicInfo,user_uid:maid_uid}=data;
    
    const isEmployer=user.role==='employer';
    const isPremiumEmployer=user.role==='employer' && user.membership==='premium';
    const isAdmin=user.role==='admin';
    const isCurrentMaid=user.uid === maid_uid;
    const whatsapp_message = "Hi " + basicInfo.name+", I find your profile in MaidDB.";
    const email_subject= "Inquiry from MaidDB " + user.name;

    const ageToDisplay = basicInfo.birthdate? calculateAge(basicInfo.birthdate) + " " + t("yearsOld")  : ""
  

 
    const ContactSection = ()=>{
        if(isPremiumEmployer || isAdmin){
        return (
            <>
             <AppText numberOfLines={3} style={[defaultStyles.smallText,styles.premiumMessage]} >You may contact the maid by whatsapp or email.</AppText>
             <View style={styles.contactContainer}>
                <Whatsapp number={basicInfo.whatsapp} message={whatsapp_message}/>
                <Email email={basicInfo.email} subject={email_subject} />
            </View>
             </>
          )
        } else if(isEmployer && !isPremiumEmployer){
            return (
                <View>
                    <View style={styles.contactContainer}>
                        <View style={styles.rowContainer}>
                            <Icon name="whatsapp" iconColor={colors.primary}/>
                            <AppText>xxxxxxx</AppText>
                        </View>
                        <View style={styles.rowContainer}>
                            <Icon name="email-outline" iconColor={colors.primary}/>
                            <AppText>xxxxxxx</AppText>
                        </View>
                    </View>
                    <AppButton title={"Go Premium"} style={styles.button}/> 
                    <AppText numberOfLines={3} style={styles.premiumMessage} >Join our premium plan to get the contact of your favored maid.</AppText>
                 
                </View>
             
            )
        } else if(isCurrentMaid) {
          return( <View style={styles.contactContainer}>
               <View style={styles.rowContainer}>
               <Icon name="whatsapp" iconColor={colors.primary}/>
               <AppText>{basicInfo.whatsapp}</AppText>
               </View>
                <View style={styles.rowContainer}>
               <Icon name="email-outline" iconColor={colors.primary}/>
               <AppText>{basicInfo.email}</AppText>
               </View>
           </View>
          )
        } else{
            return null;
        }
       
    }

    return (
        <>
        <View style={styles.container}>
                <View style={styles.photoContainer}>
                    <Image style={styles.image} source={  
                    basicInfo.photoURL
                    ?  { url: basicInfo.photoURL } 
                    : (basicInfo.gender ==='f' ? femaleIcon:maleIcon)} />
                </View>
                <View style={styles.detailsContainer}>
                    <AppText numberOfLines={3} style={styles.title}>
                        {basicInfo.name}
                    </AppText>
                    <View style={styles.rowContainer}>
                        <AppText numberOfLines={3} style={styles.subTitle}>
                            {t(basicInfo.nationality)}
                        </AppText>
                        <AppText numberOfLines={3} style={styles.subTitle}>
                            {ageToDisplay}
                        </AppText>
                    </View>
                </View>
                

        </View>
        <ContactSection />
        </>

    


    );
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        flexDirection:"row",

    },
  photoContainer: {
    flexDirection:"row",
    alignItems:"center",
    // marginHorizontal:10,
    // paddingRight:20
  },
  rowContainer:{
      flexDirection:"row",
  },
  button:{
    marginHorizontal:15,
    paddingVertical:5

  },
  nationalityContainer:{
       flexDirection:"row",

  },

  premiumMessage:{
    marginHorizontal:35
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "contain",
    margin:10
  },
  detailsContainer:{
  
    alignItems:"flex-start",
    // justifyContent:""
    marginLeft:15,
    marginVertical:10
  },
  textContainer: {
    // margin: 10,
    // marginLeft: 20,
    flexWrap:"wrap"

  },
  title: {
    color: colors.dark,
    elevation: 5,
    fontWeight: "bold",
    // marginBottom: 5,
  },
  subTitle: {
    color: colors.dark,
    elevation: 5,
    marginRight:20
    // marginRight:15,
    // marginVertical:3
  },
  contactContainer:{
      flexDirection:"row",
      justifyContent:"space-around"
  }
});

 
export default MaidProfileHeaderSection;