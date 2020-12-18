import React, { useContext, useEffect,useState } from 'react';
import {StyleSheet,Text,Alert} from 'react-native';
import { useTranslation } from 'react-i18next';
import constants from '../../config/constants';
import i18n from '../../config/i18n';
import defaultStyles from '../../config/styles';
import maidProfileScheme from "../../schemas/maidProfile";
import maidProfileDB from "../../database/maidProfile";
import options from "../../schemas/options";

import { 
    AppForm,
    AppFormField, 
  AppFormFieldWithUnit, 
  AppFormSwitch,
  AppFormPicker,
  AppErrorMessage,
  AppFormRating,
  AppFormDatePicker,
  AppSubmitButton
} from '../../components/forms';
import ScrollScreen from "../../components/ScrollScreen";
import AppText from "../../components/AppText";
import ActivityIndicator from '../../components/ActivityIndicator';
import { retreiveOrCreateRating ,updateRating} from '../../database/maidRating';
import ListItemSeperator from '../../components/lists/ListItemSeperator';
import AppSection from '../../components/AppSection';
import AuthContext from '../../auth/AuthContext';


const segment={
    summary:"summary",
    interview:"interview",
    priorExperience:"priorExperience",
    maidExpection:"maidExpection",
    languageSkill:"languageSkill"
}


const MaidRatingEditScreen = ({navigation,route}) => {
     //i18n
  const { t } = useTranslation();
  const {user} = useContext(AuthContext);
  const [ratingResult,setRatingResult] = useState(null);
  const [error,setError] =useState(false);
  const [loading,setLoading] =useState(false);
  const maid_uid = route.params.maid_uid;

  
  useEffect(()=>{
        console.debug("MaidRatingEditScreen useEffect called");
       const retrieveRatingResult = async()=>{
            const profile= route.params.data;
            if(profile && profile.rating){
                console.debug("Rating is passed in ",profile.rating);
                return setRatingResult(profile.rating);
            }
            const maid_uid = route.params.maid_uid;
            if(maid_uid){
                const response = await retreiveOrCreateRating(maid_uid);
                if(response.error){
                    setError(t(rating.errorCode));
                    return;
                } else{
                     console.debug("Rating is retrieved from db  ",response);
                    return setRatingResult(response);
                }
                
            }      
       }
       setLoading(true);
       retrieveRatingResult();
       setLoading(false); 

    },[]);

   if(loading){
        return <ActivityIndicator visible={loading}/>;
    }
const handleSubmit=(values)=>{
      console.log(options.maidDuties);
      console.log("submit",values);
    //   Alert.alert(values);
  }
  const handleSubmit_Summary=(values)=>{
      console.log("handleSubmit_Summary",values);
      updateRating (maid_uid,user.uid,segment.summary,values);
      Alert.alert("Rating Summary is saved");
  }
  const handleSubmit_Language=(values)=>{
      console.log("handleSubmit_Lanuage",values);
      updateRating (maid_uid,user.uid,segment.languageSkill,values);
      Alert.alert("Language Rating is saved");
  }
 const handleSubmit_MaidExpection=(values)=>{
      console.log("handleSubmit_MaidExpection",values);
      updateRating (maid_uid,user.uid,segment.maidExpection,values);
      Alert.alert("Maid Expection is saved");
  }
  const handleSubmit_PriorExperience=(values)=>{
      console.log("handleSubmit_PriorExperience",values);
      updateRating (maid_uid,user.uid,segment.priorExperience,values);
      Alert.alert("Rating of Prior Experience is saved");
  }
 const handleSubmit_Interview=(values)=>{
      console.log("handleSubmit_Interview",values);
      updateRating (maid_uid,user.uid,segment.interview,values);
      Alert.alert("Interview data is saved");
  }

  let initialValues = Object.assign({},maidProfileScheme.initialScheme.basicInfo);
  initialValues = Object.assign(initialValues,route.params.data);

    return ( <ScrollScreen>
        <AppErrorMessage error={error} visible={error}/>
          {ratingResult ?
          
     
            <>
            <AppSection sectionTitle={t("interview")} defaultCollapsed={false}>
            <AppForm 
                initialValues={ratingResult[segment.interview]}
                onSubmit={handleSubmit_Interview}>
                    <AppFormSwitch name="documentVerified" label={t("documentVerified")}/>
                    <AppFormField name="comment" label={t("comment")} />
                    <AppFormField name="video" label={t("video")} />
                <AppSubmitButton title={t("button.save")} />
               
            </AppForm>
            </AppSection>
            <AppSection sectionTitle={t("languageSkill")}>
             <AppForm 
                initialValues={ratingResult[segment.languageSkill]}
                onSubmit={handleSubmit_Language}>
                  
                <AppFormRating label={t("english")+" - "+t("listening")} name = "english.listening"/>
                <AppFormRating label={t("english")+" - "+t("speaking")} name = "english.speaking" />
                <AppFormRating label={t("cantonese")+" - "+t("listening")} name = "cantonese.listening" />
                <AppFormRating label={t("cantonese")+" - "+t("speaking")} name = "cantonese.speaking" />
                <AppFormRating label={t("mandarin")+" - "+t("listening")} name ="mandarin.listening" />
                <AppFormRating label={t("mandarin")+" - "+t("speaking")} name = "mandarin.speaking" />

                <AppSubmitButton title={t("button.save")} />
            </AppForm>
            </AppSection>
             <AppSection sectionTitle={t("priorExpereince")} defaultCollapsed={false}>
                <AppForm 
                    initialValues={ratingResult[segment.priorExperience]}
                    onSubmit={handleSubmit_PriorExperience}>
                       
                                {
                                    options.maidDuties.map((item,index)=> {return   (<AppFormRating key={index} label={t(item)} name = {item} />)
                                    })
                                }
                    <AppSubmitButton title={t("button.save")} />
                    
                </AppForm>
            </AppSection>
             <AppSection sectionTitle={t("maidExpection")} defaultCollapsed={false}>
                <AppForm 
                    initialValues={ratingResult[segment.maidExpection]}
                    onSubmit={handleSubmit_MaidExpection}>
                        <AppFormPicker name="workPlan" label={t("workPlan")} items={options.workPlan}/>
                        <AppFormPicker name="preference_1" label={t("preference_1")} items={options.maidDuties}/>
                        <AppFormPicker name="preference_2" label={t("preference_2")} items={options.maidDuties}/>
                        <AppFormPicker name="preference_3" label={t("preference_3")} items={options.maidDuties}/>
                        <AppFormPicker name="preference_4" label={t("preference_4")} items={options.maidDuties}/>
        
                    <AppSubmitButton title={t("button.save")} />
                </AppForm>
            </AppSection>
            <AppSection sectionTitle={t("summary")}>
            <AppForm 
                initialValues={ratingResult.summary}
                onSubmit={handleSubmit_Summary}>
                    <AppFormRating name="impression" label={t("impression")}  category="languageRating" count={5} />
                    <AppFormRating name="languageSkill" label={t("languageSkill")}  category="languageRating"  count={5} />
                    <AppFormRating name="priorExperience" label={t("priorExperience")} category="languageRating"   count={5} />
                    <AppFormRating name="workRecord" label={t("workRecord")} category="languageRating"   count={5} />
                    <AppFormField name="rating" label={t("rating")} keyboardType = 'numeric'/>
                <AppSubmitButton title={t("button.save")} />
            </AppForm>
            </AppSection>
            </>
            :null}
    </ScrollScreen> );
}
 
export default MaidRatingEditScreen;