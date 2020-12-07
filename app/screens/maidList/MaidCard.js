import React from 'react'
import {StyleSheet,TouchableOpacity,Image,View} from "react-native";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import {AirbnbRating } from 'react-native-ratings';

import AppText from "../../components/AppText";
import ActionIcon from "../../components/ActionIcon";

import defaultStyles from "../../config/styles";
import colors from "../../config/color";
import i18n from "../../config/i18n";

import {toggleFavorite} from "../../database/favoriteMaid";
import {calculateAge} from "../../utiity/AgeCalculator";
import AppRating from '../../components/AppRating';
import { AppLabelValue } from '../../components/display';


const femaleIcon=require("../../assets/female.png");
const maleIcon=require("../../assets/male.png");

const MaidCard = ({onPress,onToggleFavorite,isFavorite,data,uid,small=false,rating=4.7}) => {
    const {t} = useTranslation();
      const {basicInfo,user_uid:maid_uid} = data;
      const age = calculateAge(basicInfo.birthdate) 
     const ageToDisplay = age? age + " " + t("yearsOld")  : ""
      return (
                <TouchableOpacity onPress={onPress} style={[small?defaultStyles.smallCard: defaultStyles.Card,styles.container]}>
                        <View style={[styles.iconContainer,rating?null:{justifyContent:"flex-end"}]}>
                            {rating?
                            <View style={styles.ratingContainer}>
                              <AirbnbRating showRating={false} count={rating} defaultRating={rating} size={12} selectedColor={colors.white} isDisabled={true}/>
                              <AppText style={[defaultStyles.smallTitle,styles.rating]}>{rating}</AppText> 
                            </View>
                            :null}
                             <View style={styles.actionContainer}>
                                <ActionIcon iconName={isFavorite ?"heart" :"heart-outline"} onPress={onToggleFavorite} />
                             </View>
                        </View>
                        <View style={styles.detailsContainer}>
                            <View>
                                <Image style={styles.image} source={  
                                basicInfo.photoURL
                                ?  { url: basicInfo.photoURL } 
                                : (basicInfo.gender ==='f' ? femaleIcon:maleIcon)} />
                                <AppText numberOfLines={3} style={styles.subTitle}>
                                    {t(basicInfo.nationality)}
                                </AppText>
                                <AppText numberOfLines={3} style={styles.subTitle}>
                                    {ageToDisplay}
                                </AppText>
                            </View>
                            <View style={styles.textContainer}>
                                <AppText numberOfLines={1} style={styles.title}>
                                    {basicInfo.name}
                                </AppText>
                                 <AppText numberOfLines={3} style={styles.subTitle}>
                                    @ {t(basicInfo.currentLocation)}
                                </AppText>
                                 <AppText numberOfLines={3} style={styles.subTitle}>
                                    {t(basicInfo.currentStatus)} 
                                </AppText>
                            </View>
                        </View>
                      
        </TouchableOpacity>
       );
}
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    margin: 5,
    marginHorizontal:5,
    shadowColor: "#ccc",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    // flexDirection:"row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "contain",
    margin:10
  },
  ratingContainer:{
    marginTop:5,
    paddingRight:8,
    backgroundColor:colors.primary,
    flexDirection:"row",
    borderTopRightRadius:8,
    borderBottomRightRadius:8
    
  },
  rating:{
      marginLeft:3,
      color:colors.white

  },
  iconContainer:{
    marginRight:15,
    marginTop:5,
    flexDirection:"row",
    right:-5,
    justifyContent:"space-between",
    flexWrap:"nowrap",  
  },
  detailsContainer:{
    flexDirection:"row",
    alignItems:"center",
    marginLeft:15,
  },
  textContainer: {
    margin: 10,
    marginLeft: 20,
    flexWrap:"wrap"

  },
  title: {
    color: colors.dark,
    elevation: 5,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subTitle: {
    color: colors.dark,
    elevation: 5,
    fontSize: 12,
  },
});
export default MaidCard;