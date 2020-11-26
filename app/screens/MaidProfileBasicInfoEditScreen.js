import React, { useEffect,useState } from 'react';
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import MultiStepForm from "../components/forms/MultiStepForm";
import Screen from "../components/Screen";
import i18n from "../config/i18n";
import constants from "../config/constants";

import { AppFormField, 
  AppFormFieldWithUnit, 
  AppFormSwitch,
  AppFormPicker,
  AppErrorMessage,
  AppFormRating,
  AppFormDatePicker
} from '../components/forms';
import maidProfileScheme from "../schemes/maidProfile";
import maidProfileDB from "../database/maidProfile";
import options from "../schemes/options";
import AppDatePicker from "../components/forms/AppFormDatePicker";


const phoneRegex = RegExp(
  /^[0-9]{8,15}$/
);

const MaidProfileBasicInfoEditScreen = ({navigation,route}) => {
  //i18n
  const { t } = useTranslation();
  const [errorMessage,setErrorMessage] =useState("");
  const [error,setError] =useState(false);
  const [loading,setLoading] =useState(false);
  const [date,setDate] =useState(new Date());
  //initialValue
  console.log("route.params.uid",route.params.uid);
  let initialValues = Object.assign({},maidProfileScheme.initialScheme.basicInfo);
  initialValues = Object.assign(initialValues,route.params.data);
  console.log("initialValues",initialValues);

 

  const items=[
    {
     names:["name","nationality","birthday","gender"],
     validationSchema:  Yup.object({
                          name: Yup.string().required(t("validation.name.is.required")).label(t("name")),
                          nationality: Yup.string()
                            .required(t("validation.nationality.is.required"))
                            .label(t("nationality")),
                          birthday: Yup.string().required(t('validation.birthday.is.required')).label(t('birthday')),
                          gender: Yup.string().required(t('validation.gender.is.required')).label(t('gender'))
                        }),
     components:()=>
       <>
          <AppFormField name="name" label={t("name")}/>
          <AppFormPicker name="gender" label={t("gender")} items={options.gender}/>
          <AppFormPicker name="nationality" items={options.nationality} label={t("nationality")} />
          {/* <AppFormField name="birthday" label={t("birthday")}/> */}
         <AppFormDatePicker name="birthday" label={t("birthday")} />
          
         
       </>
   },
  {
     names:["education", "cantonese","english","mandarin"],
     validationSchema: Yup.object({
                      education: Yup.string().required(t('validation.education.is.required')).label(t('education')),
                      cantonese: Yup.number().min(1,t('validation.cantonese.is.required')).label(t('cantonese')),
                      english: Yup.number().min(1,t('validation.english.is.required')).label(t('english')),
                      mandarin: Yup.number().min(1,t('validation.mandarin.is.required')).label(t('mandarin')),
                    }),
     components:()=>
        <>
          <AppFormPicker name="education" label={t("education")} items={options.educationLevel}/>
          <AppFormRating name="english" label={t("english")} category="languageRating" count={5} />
          <AppFormRating name="cantonese" label={t("cantonese")}  category="languageRating" count={5} />
          <AppFormRating name="mandarin" label={t("mandarin")}  category="languageRating" count={5} />
        </>
   },
   {
     names:["email","whatsapp"],
     validationSchema: Yup.object({
                      email: Yup.string().email().required(t('validation.email.is.required')).label(t('email')),
                      // whatsapp: Yup.string().required(t('validation.whatsapp.is.required')).label(t('whatsapp')),
                       whatsapp: Yup.string().matches(phoneRegex, t("validation.whatsapp.is.invalid")).required(t("validation.whatsapp.is.required"))
                    }),
     components:()=>
        <>
          <AppFormField name="email" label={t("email")}/>
          <AppFormField name="whatsapp" label={t("whatsapp")}/>
        </>
   },
    {
     names:["religion","eatPork"],
     validationSchema: Yup.object({
                        religion: Yup.string().required(t('validation.religion.is.required')).label(t('religion')),
                        eatPork: Yup.boolean().required(t('validation.eatPork.is.required')).label(t('eatPork')),
                      }),
     components:()=>
        <>
          <AppFormPicker name="religion" label={t("religion")} items={options.religion}/>
          <AppFormSwitch name="eatPork" label={t("eatPork")}/>
        </>
   },
  {
     names:["weight","height","heightUnit","weightUnit"],
     components:()=>
        <>
          <AppFormFieldWithUnit name="weight" unitName="weightUnit" units={options.weightUnit} label={t("weight")} />
          <AppFormFieldWithUnit name="height" unitName="heightUnit" units={options.heightUnit} label={t("height")}/>
        </>
   },
  ];
   const handleSubmit = async (values) => {
   
    console.log("handleSubmit");
    console.log(values);
    const uid = route.params.uid;
    console.log("uid",uid);
    const segment="basicInfo";
    const updateResponse=  await maidProfileDB.updateProfile(uid,segment,values);
    if(updateResponse.error){
      console.error("Got Error");
    }

   
    navigation.replace(constants.route.maidProfile);

  }; 
  const handleCancel =()=>{
    navigation.replace(constants.route.maidProfile);
  } 

  return (<Screen>
    <AppErrorMessage visible={error} value={errorMessage}/>
    <MultiStepForm 
    items={items} 
    initialValues={initialValues} 
    onSubmit={handleSubmit}
    onCancel={handleCancel}/>
    </Screen>  );
}
 
export default MaidProfileBasicInfoEditScreen;
