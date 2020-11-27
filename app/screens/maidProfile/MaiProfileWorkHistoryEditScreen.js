import React, { useContext } from 'react';

import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import AppLink from "../../components/AppLink";
import {AppForm,AppFormPicker,AppFormDatePicker,AppSubmitButton, AppFormSwitch} from "../../components/forms";
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
  let initialValues = Object.assign({},maidProfileScheme.workHistoryInitialScheme);
  if(route.params.data){
    initialValues = Object.assign(initialValues,route.params.data);
  }
  const index = route.params.index;

  console.log("initialValues",initialValues);
  console.log("index",index);

  const validationSchme=Yup.object({
      startDate:Yup.string().required(t("validation.startDate.is.required")).label(t("startDate")),
      endDate:Yup.string().label(t("endDate")),
      isCurrentJob:Yup.boolean().label("isCurrentJob"),
      location:Yup.string().required(t("validation.location.is.required")).label(t("location")),
      // duties:Yup.array().label(t("duties")),
    //   employer:Yup.string().label(t("employer")),
    // employer:"",
    // details:"",
    // reasongOfLeaving:""

  })
  const handleCancel =()=>{
    navigation.replace(constants.route.maidProfile);
  }
  const handleSubmit = async (values)=>{
    console.log("handleSubmit",values);
    maidProfileDB.addOrUpdateWorkHistory(user.uid,values,index);
    navigation.replace(constants.route.maidProfile);
  } 
    return ( 
    <Screen>
        <AppForm initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchme}>
        
            <AppFormDatePicker name="startDate" label={t("startDate")}/>
            <AppFormDatePicker name="endDate" label={t("endDate")} />
            <AppFormSwitch name="isCurrentJob" label={t("isCurrentJob")} />
            <AppFormPicker name="location" label={t("location")} items={options.location} />

            <AppSubmitButton title={t("button.submit")}/>
            <AppLink onPress={handleCancel}/>
        </AppForm>
     </Screen> );
}
 
export default WorkHistoryEditScreen;