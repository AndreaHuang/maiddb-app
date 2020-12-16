import React, { useContext, useEffect,useState } from 'react';
import {StyleSheet,Text,View} from 'react-native';
import { useTranslation } from 'react-i18next';
import {AirbnbRating } from 'react-native-ratings';


import constants from '../../config/constants';
import i18n from '../../config/i18n';
import colors from '../../config/color';
import defaultStyles from '../../config/styles';

import ScrollScreen from '../../components/ScrollScreen';
import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import AppSection from "../../components/AppSection";
import ActivityIndicator from '../../components/ActivityIndicator';
import { AppErrorMessage } from '../../components/forms';
import AppRating from '../../components/AppRating';
import AppBadge from "../../components/AppBadge";
import Photo from "../../components/Photo";
import options from "../../schemas/options";

const MaidRatingScreen = ({route}) => {
    const {t} = useTranslation();
    const [ratingResult,setRatingResult] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    
    


    useEffect(()=>{
        console.debug("MaidRatingScreen useEffect called");
       const retrieveRatingResult = async()=>{
            const profile= route.params.data;
            if(!profile){
                setError("Data Error, Maid profile is missing");
                return;
            }
            if(profile.rating){
                console.debug("Rating is passed in ",profile.rating);
                return setRatingResult(profile.rating);
            }           
       }
       setLoading(true);
       retrieveRatingResult();
       setLoading(false); 

    },[]);

    if(loading){
        return <ActivityIndicator visible={loading}/>;
    } else {
    return ( 
           <ScrollScreen>
        <AppErrorMessage error={error} visible={error}/>
        {ratingResult ?
    <>
                   <View style={styles.ratingSummayContainer}>
                         <View style={styles.ratingContainer}>
                              <AirbnbRating showRating={false} count={ratingResult.summary.rating} 
                                defaultRating={ratingResult.summary.rating} size={18} 
                                selectedColor={colors.white} isDisabled={true}/>
                              <AppText style={[defaultStyles.title,styles.rating]}>{ratingResult.summary.rating}</AppText> 
                            </View>
                      
                        <AppRating label ={t("impression")} value = {ratingResult.summary.impression} disabled={true}/>
                        <AppRating label ={t("languageSkill")} value = {ratingResult.summary.languageSkill} disabled={true}/>
                        <AppRating label ={t("priorExperience")} value = {ratingResult.summary.priorExperience} disabled={true}/>
                        <AppRating label ={t("workRecord")} value = {ratingResult.summary.workRecord} disabled={true}/>
                    </View>

                    <AppSection sectionTitle={t("interview.comment")} defaultCollapsed={false} >
                        <View style={styles.interviewComment}>
                            <AppText style={defaultStyles.text}>{ratingResult.interview.comment}</AppText>
                        </View>
                    </AppSection>
                     <AppSection sectionTitle={t("interview.video")} defaultCollapsed={false}  />
                    <AppSection sectionTitle={t("langugage.assessment")} defaultCollapsed={false} >
                        <View style={styles.sectionContainer}>
                        {
                            ratingResult.languageSkill.map(
                              (item,index)=>{return( <View key={index}>
                                 <AppRating label={t(item.language)+" - "+t("listening")} value = {item.listening} disabled={true}/>
                                 <AppRating label={t(item.language)+" - "+t("speaking")} value = {item.speaking} disabled={true}/>
                                
                              </View>
                            )})
                        } 
                      </View>
                    </AppSection>
                    <AppSection sectionTitle={t("prior.experience")} defaultCollapsed={false}>
                        <View style={styles.sectionContainer}>
                        {options.maidDuties.map((item,index)=>{
                          return (<View key={index}>
                               <AppRating label={t(item)} value = {ratingResult.priorExperience[item]?ratingResult.priorExperience[item]:0} disabled={true}/>
             
                            </View>)
                        })}
                        </View>
                    </AppSection>
                    <AppSection sectionTitle={t("expection")} defaultCollapsed={false} >
                     <View style={styles.sectionContainer}>
                      <AppText>I expect to work for {ratingResult.maidExpection.workPlan} years.</AppText>
                      <AppText>My work preference are</AppText>
                      {ratingResult.maidExpection.dutyPreference?
                        ratingResult.maidExpection.dutyPreference.map((item,index)=>{
                          return(
                          <View style={styles.rowContainer}>
                            <AppBadge value={index+1}/>
                            <View >
                            <AppText style={[defaultStyles.text,styles.dutyText]}>{t(item)}</AppText> 
                            </View>
                          </View>
                          )
                        }):null}
                      </View>
                    </AppSection>
                    <AppSection sectionTitle={t("document.verification")} defaultCollapsed={false} >
                      <View  style={styles.sectionContainer}>
                        <View style={styles.rowContainer}>
                            {ratingResult.documentVerified?
                            <Photo name="check-bold" size={24} backgroundColor={defaultStyles.colors.primary}/>
                            :
                            <Photo name="close-outline" size={24} backgroundColor={defaultStyles.colors.medium}/>}
                            <AppText style={[defaultStyles.text,styles.dutyText]}>Passport</AppText>
                        </View>
                         <View style={styles.rowContainer}>
                           {ratingResult.documentVerified?
                            <Photo name="check-bold" size={24} backgroundColor={defaultStyles.colors.primary}/>
                            :
                            <Photo name="close-outline" size={24} backgroundColor={defaultStyles.colors.medium}/>}
                            <AppText style={[defaultStyles.text,styles.dutyText]}>Hong Kong Id Card</AppText>
                        </View>
                      </View>
                     
                    </AppSection>
          </>
          :
          <View style={styles.sectionContainer}>
          <AppButton title="Request Rating"/>
          <AppText>You may request Maid DB to do rating for your favored maid. </AppText>
          </View>}
         </ScrollScreen> );
    }
}
 
const styles=StyleSheet.create({
  ratingContainer:{
    marginVertical:5,
    paddingRight:20,
    backgroundColor:colors.primary,
    flexDirection:"row",
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20,
    justifyContent:"flex-end"
    
  },
  ratingSummayContainer:{
    marginLeft:20
  },
  rating:{
      marginLeft:3,
      color:colors.white
  },

  interviewComment:{
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 5,
    marginTop: 15,
    marginRight:15,
    padding:15,
    shadowColor: "#ccc",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  rowContainer:{
    flexDirection:"row",
    // justifyContent:"center"
   alignItems:"center",
   marginVertical:2
  },
  sectionContainer:{
    // marginRight:15,
    marginVertical:15,
    marginHorizontal:15,
  },

  dutyText: {
    marginHorizontal:15,
  },

})
export default MaidRatingScreen;