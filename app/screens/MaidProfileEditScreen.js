import React from 'react';
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { View, StyleSheet, FlatList } from "react-native";

import MultiStepForm from "../components/forms/MultiStepForm";
import Screen from "../components/Screen";
import i18n from "../config/i18n";
import { AppFormField } from '../components/forms';



const MaidProfileEditScreen = () => {
  //i18n
  const { t } = useTranslation();
  const initialValues={
    name:"",
    nationality:"",
    birthday:""

 };

   const items=[{
     names:["name","nationality"],
     validationSchema:  Yup.object({
    name: Yup.string().required(t("validation.name.is.required")).label(t("name")),
    nationality: Yup.string()
      .required(t("validation.nationality.is.required"))
      .label(t("nationality")) }),
     components:()=>
       <>
        <AppFormField name="name" label={t("name")}/>
         <AppFormField name="nationality" label={t("nationality")}/>
       </>
   },
  {
     names:["birthday"],
     validationScheme: Yup.object({
    birthday: Yup.string().required(t('validation.birthday.is.required')).label(t('birthday')),
  }),
     components:()=>
        <AppFormField name="birthday" label={t("birthday")}/>
   }];
   const handleSubmit = (values, { resetForm }) => {
    login.request(values);
    resetForm();
  };

  return (<Screen>
    <MultiStepForm 
    items={items} 
    initialValues={initialValues} 
    onSubmit={handleSubmit}/>
    </Screen>  );
}
 
export default MaidProfileEditScreen;

// name
// nationality
// date of birth
// family
// own baby
// trainning
// working experience
// current location
// pic
// video
// description
// email,what's app
// preference