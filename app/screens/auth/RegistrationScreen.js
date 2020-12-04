import React,{useState,useContext} from 'react';
import {StyleSheet,View} from 'react-native';

import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import i18n from "../../config/i18n";
import constants from "../../config/constants";
import Screen from '../../components/Screen';
import {
  AppForm,
  AppErrorMessage,
  AppFormField,
  AppSubmitButton,
} from "../../components/forms";
import AppLink from "../../components/AppLink";
import ActivityIndicator from "../../components/ActivityIndicator";
import EmailPasswordAuth from "../../auth/EmailPasswordAuth";
import AuthContext from '../../auth/AuthContext';


const RegistrationScreen = ({navigation}) => {
    const { t } = useTranslation();
    const {user,setUser} = useContext(AuthContext);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    const [errorCode,setErrorCode]=useState("");
    const intialValues = {
        account: "",
        password: "",
        passwordConfirmation:""
    };
    //Form validationScheme
    const validationScheme = Yup.object({
        account: Yup.string().email().required(t("validation.id.is.required")).label(t("account")),
        password: Yup.string()
        .required(t("validation.password.is.required"))
        .label(t("password")),
        passwordConfirmation: Yup.ref('password')
        //  .required(t("validation.password.mustmatch"))
        // .label(t("passwordConfirmation"))
    });

    const handleEmailRegistration= async (values)=>{
        console.log("handleEmailRegistration");
        setError(false);
        setErrorCode("");
        setLoading(true);
        const registrationResponse = await EmailPasswordAuth.register(values.account,values.password,"");
        setLoading(false);
        console.log(registrationResponse);
        if(registrationResponse.user){
            setUser(registrationResponse.user);
        } else if(registrationResponse.cancelled || registrationResponse.error){
            setError(true);
            setErrorCode(registrationResponse.errorCode);
        } 
  }
    return (     
    <Screen style={styles.container}>
      <ActivityIndicator visible={loading} />

      <AppForm
        initialValues={intialValues}
        onSubmit={handleEmailRegistration}
        validationSchema={validationScheme}
      >
        <AppFormField
          name="account"
          keyboardType="email-address"
          placeholder={t("account")}
          autoCapitalize="none"
          label={t("account")}
        ></AppFormField>

        <AppFormField
          name="password"
          placeholder={t("password")}
          secureTextEntry
          textAlign="left"
          label={t("password")}
        ></AppFormField>

        <AppFormField
          name="passwordConfirmation"
          placeholder={t("passwordConfirmation")}
          secureTextEntry
          textAlign="left"
           label={t("password")}
        ></AppFormField>

        <AppErrorMessage error={t(errorCode)} visible={error} />
        <AppSubmitButton title={t("button.signup")}></AppSubmitButton>
      </AppForm>
      <View style={styles.linksContainer}>
          <AppLink title={t("button.cancel")} onPress={()=>navigation.navigate(constants.route.auth.login)}/>
       </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  linksContainer:{
    flexDirection:"row",
    justifyContent:"flex-end",
    marginHorizontal:15,
    paddingBottom:35,
    paddingTop:15,
    flexWrap:"nowrap",

    
  }
});
 
export default RegistrationScreen;