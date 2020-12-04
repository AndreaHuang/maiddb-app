import React, { useContext,useEffect,useState} from "react";
import {View, StyleSheet} from "react-native";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";


import {
  AppForm,
  AppErrorMessage,
  AppFormField,
  AppSubmitButton,
} from "../../components/forms";
import AppButton from "../../components/AppButton";
import AppLink from "../../components/AppLink";

import Screen from "../../components/Screen";
import authApi from "../../api/auth";
import useApi from "../../hooks/useApi";
import ActivityIndicator from "../../components/ActivityIndicator";

import i18n from "../../config/i18n";
import constants from "../../config/constants";
import AuthContext from "../../auth/AuthContext";
import jwtDecode from "jwt-decode";

import GoogleAppAuth from "../../auth/GoogleAppAuth";
import EmailPasswordAuth from "../../auth/EmailPasswordAuth";

const googleLogo =require("../../assets/logo/Google.png");
function LoginScreen({route,navigation}) {
    const { t } = useTranslation();
    const {user,setUser} = useContext(AuthContext);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    const [errorCode,setErrorCode]=useState("");

    //Form initialValues
    const intialValues = {
      account: route.params? route.params.id:"",
      password: "",
    };
    //Form validationScheme
    const validationScheme = Yup.object({
      account: Yup.string().email().required(t("validation.id.is.required")).label(t("account")),
      password: Yup.string()
        .required(t("validation.password.is.required"))
        .label(t("password")),
    });

 

  const handleEmailPasswordLogin= async (values)=>{
    const {account,password} = values;
    console.log("handleEmailRegistration");
        setError(false);
        setErrorCode("");
        setLoading(true);
        const loginResponse = await EmailPasswordAuth.login(account,password);
        setLoading(false);
        console.log(loginResponse);
        if(loginResponse.user){
            setUser(loginResponse.user);
        } else if(loginResponse.cancelled || loginResponse.error){
            setError(true);
            setErrorCode(loginResponse.errorCode);
        } 
}  

    const handleGoogleLogin = async ()=>{
        console.log("Google login called");
        setLoading(true);
        const loginResponse = await GoogleAppAuth.login();
        setLoading(false);
        if(loginResponse.user){
            setUser(loginResponse.user);
        } else if(loginResponse.cancelled || loginResponse.error){
            setError(true);
            setErrorCode(loginResponse.errorCode);
        } 
      
    }

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={loading} />

      <AppForm
        initialValues={intialValues}
        onSubmit={handleEmailPasswordLogin}
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

        <AppErrorMessage error={t(errorCode)} visible={error} />
        <AppSubmitButton title={t("button.login")}></AppSubmitButton>
      </AppForm>

     <AppButton title={t("button.signin.google")}
        image={googleLogo}
         onPress={handleGoogleLogin}></AppButton>
    
      <View style={styles.linksContainer}>
          <AppLink title={t("button.signup")} style={{fontSize:18}} onPress={()=>navigation.navigate(constants.route.auth.registration)}/>
          <AppLink title={t("button.forgetPassword")}  onPress={()=>navigation.navigate(constants.route.auth.resetPassword)}/>

       </View>
      
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  linksContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginHorizontal:10,
    paddingBottom:35,
    paddingTop:15,
    flexWrap:"nowrap",

    
  }
 
});
export default LoginScreen;
