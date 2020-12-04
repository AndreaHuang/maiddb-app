import React,{useState,useContext} from 'react';
import { useTranslation } from "react-i18next";
import {StyleSheet} from "react-native";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import options from "../../schemes/options";
import {AppForm,AppFormField,AppSubmitButton,AppFormToggle} from "../../components/forms";
// Who are you?
//location
import i18n from "../../config/i18n";
import constants from "../../config/constants";
import {updateUserRole} from "../../database/user";
import AuthContext from '../../auth/AuthContext';
import { Alert } from 'react-native';

const AccountInitiationScreen = ({navigation}) => {
    const {t} = useTranslation();
    const {user} =useContext(AuthContext);
    const handleSubmit = (values)=>{
        Alert.alert(values.role);
        if(values.role){
            updateUserRole(user.uid,values.role);
        }
        if(values.role === "maid"){
            navigation.navigate(constants.route.maidProfile);
        } else {
            navigation.navigate(constants.route.maidList);
        }
    }
    const initialValue={
        role:"",
        displayName:"",
    }
    const validationScheme=Yup.object({
        role: Yup.string().required(t("validation.role.is.required")),
        displayName:Yup.string().required(t("validation.displayName.is.required")),
    });

    return (<Screen style={styles.container}>
       <AppForm 
        initialValues={initialValue} 
        validationSchema={validationScheme}
        onSubmit = {handleSubmit} >
            <AppFormField name="displayName" label={t("displayName")}/>
            <AppFormToggle name="role" items={options.role} label={t("role")}/>
            <AppSubmitButton title={t("button.next")} />
       </AppForm>
    </Screen>);
}
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  }
});
export default AccountInitiationScreen;