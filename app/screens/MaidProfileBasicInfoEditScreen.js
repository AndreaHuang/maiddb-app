import React, { useEffect,useState } from 'react';
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import MultiStepForm from "../components/forms/MultiStepForm";
import Screen from "../components/Screen";
import i18n from "../config/i18n";
import constants from "../config/constants";

import { AppFormField, AppFormFieldWithUnit, AppSubmitButton,AppFormSwitch, AppErrorMessage
  // ,AppFormRadioGroup
} from '../components/forms';
import AppText  from '../components/AppText';
import AppButton  from '../components/AppButton';
import maidProfileScheme from "../schemes/maidProfile";
import maidProfileDB from "../database/maidProfile";
import options from "../schemes/options";




const MaidProfileBasicInfoEditScreen = ({navigation,route}) => {
  //i18n
  const { t } = useTranslation();
  const [errorMessage,setErrorMessage] =useState("");
  const [error,setError] =useState(false);
  const [loading,setLoading] =useState(false);
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
          <AppFormSwitch name="gender" label={t("gender")}/>
          <AppFormSwitch name="nationality" label={t("nationality")} options={options.nationality}/>
          <AppFormField name="birthday" label={t("birthday")}/>
          <AppButton title={t("button.cancel")} onPress={cancelEdit}/>
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
          <AppFormField name="religion" label={t("religion")}/>
          <AppFormSwitch name="eatPork" label={t("eatPork")}/>
          <AppButton title={t("button.cancel")} onPress={cancelEdit}/>
        </>
   },
  {
     names:["weight","height"],
     components:()=>
        <>
          <AppFormFieldWithUnit name="weight" label={t("weight")} />
          <AppFormFieldWithUnit name="height" label={t("height")}/>
          <AppButton title={t("button.cancel")} onPress={cancelEdit}/>
        </>
   },
   {
     names:["email","whatsapp"],
     validationSchema: Yup.object({
                      email: Yup.string().required(t('validation.email.is.required')).label(t('email')),
                      whatsapp: Yup.string().required(t('validation.whatsapp.is.required')).label(t('whatsapp')),
                    }),
     components:()=>
        <>
          <AppFormField name="email" label={t("email")}/>
          <AppFormField name="whatsapp" label={t("whatsapp")}/>
          <AppSubmitButton title={t("button.submit")}/>
        </>
   }
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
  const cancelEdit =()=>{
    navigation.replace(constants.route.maidProfile);
  } 

  return (<Screen>
    <AppErrorMessage visible={error} value={errorMessage}/>
    <MultiStepForm 
    items={items} 
    initialValues={initialValues} 
    onSubmit={handleSubmit}/>
    </Screen>  );
}
 
export default MaidProfileBasicInfoEditScreen;
