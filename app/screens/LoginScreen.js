import React, { useContext,useState} from "react";
import {
  Keyboard,
  Modal,
  StyleSheet,
  TextInput,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';

import {
  AppForm,
  AppErrorMessage,
  AppFormField,
  AppSubmitButton,
} from "../components/forms";
import AppButton from "../components/AppButton";
import Card from "../components/Card";
import Screen from "../components/Screen";
import Carosel from "../components/Carosel";
import FeedItem from "../components/FeedItem";

import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import ActivityIndicator from "../components/ActivityIndicator";

import i18n from "../config/i18n";
import AuthContext from "../auth/AuthContext";
import jwtDecode from "jwt-decode";

import GoogleAppAuth from "../auth/GoogleAppAuth";

function LoginScreen({navigation}) {
  const {user,setUser} = useContext(AuthContext);
  const [loginLoading,setLoginLoading] = useState(false);
  const [loginFailed,setLoginFailed]=useState(false);
  //i18n
  const { t } = useTranslation();
  //Form initialValues
  const intialValues = {
    id: "",
    password: "",
  };
  //Form validationScheme
  const validationScheme = Yup.object({
    id: Yup.string().required(t("validation.id.is.required")).label(t("id")),
    password: Yup.string()
      .required(t("validation.password.is.required"))
      .label(t("password")),
  });
  //API & Form Submit
  let login=useApi(authApi.login);
  const handleSubmit = async (values) => {
 
    const requestBody={
      email:values.id,
      password:values.password
    }

    await login.request(requestBody);
    if(login.error){
      return setLoginFailed(true);
    }
    //extract the token
    if(!login.data){
      console.log("No token is returned");
      return setLoginFailed(true);
    }
    const token = login.data;

    //save the token

    //set the token
    try{
      console.log(token);
      const decoded = await jwtDecode(token);
      if(decoded){
         console.log(decoded);
        // authContext.setUser(decoded);
      } 
    }catch(ex){
      console.log("hit error",ex);
    }
  
 
    // navigation.navigate("Account");
    
  };

const handleGoogleLogin = async ()=>{
    console.log("Google login called");
    setLoginLoading(true);
    const loginResponse = await GoogleAppAuth.login();
    setLoginLoading(false);
    if(loginResponse.user){
        setUser(loginResponse.user);
    } else if(loginResponse.cancelled || loginResponse.error){
        navigation.navigate("loginScreen");
    } 
   
}

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={login.loading || loginLoading} />

      <AppForm
        initialValues={intialValues}
        onSubmit={handleSubmit}
        validationSchema={validationScheme}
      >
        <AppFormField
          name="id"
          keyboardType="email-address"
          placeholder={t("id")}
           autoCapitalize="none"
        ></AppFormField>

        <AppFormField
          name="password"
          placeholder={t("password")}
          secureTextEntry
          style={styles.password}
          textAlign="left"
        ></AppFormField>

        <AppErrorMessage error={t("api.error.login")} visible={login.error} />
        <AppSubmitButton title={t("button.login")}></AppSubmitButton>

        <AppButton title="Login with Google"
        image={require('../assets/logo/Google.png')}
         onPress={handleGoogleLogin}></AppButton>
      </AppForm>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  password: {
    flex: 1,
    fontSize: 18,
  },
});
export default LoginScreen;
