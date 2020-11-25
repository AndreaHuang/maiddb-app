import React,{useState} from 'react';
import {StyleSheet} from 'react-native';
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import i18n from "../config/i18n";
import color from "../config/color";
import constants from "../config/constants";

import Screen from '../components/Screen';
import AppText from "../components/AppText";

import {
  AppForm,
  AppErrorMessage,
  AppFormField,
  AppSubmitButton,
} from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";
import EmailPasswordAuth from "../auth/EmailPasswordAuth";

const ResestPasswordScreen = ({navigation}) => {
    const { t } = useTranslation();
    const [emailSent,setEmailSent] =useState(false);
    const [error,setError]=useState(false);
    const [errorCode,setErrorCode]=useState(false);
    const [loading,setLoading]=useState(false);

      const intialValues = {
        email: ""
    };
    //Form validationScheme
    const validationScheme = Yup.object({
        email: Yup.string().email().required(t("validation.id.is.required")).label(t("account"))
    });

    const handleForgetPassword= async ({email})=>{

        console.debug("handleForgetPassword");
        setEmailSent(false);
        setError(false);
        setErrorCode("");
        setLoading(true);
        const response = await EmailPasswordAuth.sendPasswordResetEmail(email);
        setLoading(false);
        console.log(response);
        if(response.success){
            setEmailSent(true);
            setTimeout(()=>{
              navigation.navigate(constants.route.login,{id:email});
            },2000)
        } else if(response.cancelled || response.error){
            setError(true);
            setErrorCode(response.errorCode);
        } 

    }
    return (     
    <Screen style={styles.container}>
      <ActivityIndicator visible={loading} />
      <AppForm
        initialValues={intialValues}
        onSubmit={handleForgetPassword}
        validationSchema={validationScheme}
      >
       {!emailSent && 
       <>
       <AppText style={{color:color.medium}}>{t("message.send-email-reset-password")}</AppText>
      
        <AppFormField
          name="email"
          keyboardType="email-address"
          placeholder={t("email")}
           autoCapitalize="none"
        ></AppFormField>

  
        <AppErrorMessage error={t(errorCode)} visible={error} />
        <AppSubmitButton title={t("button.submit")}></AppSubmitButton>
        </>
        }

         {emailSent && <AppText style={{color:color.success}}>{t("message.reset-password-email-sent")}</AppText>}

      </AppForm>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5,
  }
});
 
export default ResestPasswordScreen;