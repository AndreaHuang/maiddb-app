import React, { useContext,useState } from 'react';

import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import AppLink from "../../components/AppLink";
import {AppFormPicker,AppFormDatePicker,AppErrorMessage, 
  AppFormSwitch,AppFormMultipleSelect,MultiStepForm} from "../../components/forms";
import i18n from "../../config/i18n";
import constants from "../../config/constants";
import options from "../../schemes/options"
import maidProfileScheme from "../../schemes/maidProfile";
import maidProfileDB from "../../database/maidProfile";
import AuthContext from '../../auth/AuthContext';

const WorkHistoryEditScreen = ({navigation,route}) => {
  const {user} = useContext(AuthContext);
   //i18n
   const { t } = useTranslation();
   const [error,setError] = useState(false);
   const [errorMessage,setErrorMessage] = useState("");
  let initialValues = Object.assign({},maidProfileScheme.workHistoryInitialScheme);
  if(route.params.data){
    initialValues = Object.assign(initialValues,route.params.data);
  }
  const index = route.params.index;

  console.log("initialValues",initialValues);
  console.log("index",index);

  const handleCancel =()=>{
    navigation.replace(constants.route.maidProfile);
  }
  const handleSubmit = async (values)=>{
    console.log("handleSubmit",values);
    maidProfileDB.addOrUpdateWorkHistory(user.uid,values,index);
    navigation.replace(constants.route.maidProfile);
  } 
  const items=[
   {
     names:["startDate","endDate","isCurrentJob","location","reasonOfLeaving"],
     validationSchema: Yup.object({
                        startDate:Yup.string().required(t("validation.startDate.is.required")).label(t("startDate")),
                         endDate:Yup.string().label(t("endDate")),
                        isCurrentJob:Yup.boolean().label("isCurrentJob"),
                        location:Yup.string().required(t("validation.location.is.required")).label(t("location")),
                        reasonOfLeaving:Yup.string().label(t("reasonOfLeaving")),
                      }),
     components:()=>
        <>
            <AppFormDatePicker name="startDate" label={t("startDate")}/>
            <AppFormDatePicker name="endDate" label={t("endDate")} />
            <AppFormSwitch name="isCurrentJob" label={t("isCurrentJob")} />
            <AppFormPicker name="location" label={t("location")} items={options.location} />
            <AppFormPicker name="reasonOfLeaving" label={t("reasonOfLeaving")} items={options.reasonOfLeaving} />
        </>
   },{
      names:["duties"],
     validationSchema: Yup.object({
                      duties:Yup.array().required(t("validation.duties.is.required")).label(t("duties")),
                      }),
     components:()=>
        <>
            <AppFormMultipleSelect name="duties" label={t("duties")} items={options.maidDuties}/>
        </>

   }
  ]
    return ( 
    <Screen>
            <AppErrorMessage visible={error} value={errorMessage}/>
            <MultiStepForm 
            items={items} 
            initialValues={initialValues} 
            onSubmit={handleSubmit}
            onCancel={handleCancel}/>

     </Screen> );
}
 
export default WorkHistoryEditScreen;