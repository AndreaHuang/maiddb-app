import React,{useState,useContext} from 'react';
import { useTranslation } from "react-i18next";
import {Alert, StyleSheet} from "react-native";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import options from "../../schemas/options";
import {AppForm,AppFormField,AppSubmitButton,AppFormToggle} from "../../components/forms";
// Who are you?
//location
import i18n from "../../config/i18n";
import constants from "../../config/constants";
import {updateUserProfile} from "../../database/user";
import AuthContext from '../../auth/AuthContext';


const AccountInitiationScreen = ({navigation}) => {
    const {t} = useTranslation();
    const {user,setUser} =useContext(AuthContext);
    console.log("user",user);
    const handleSubmit = (values)=>{
        if(values){
            updateUserProfile(user.uid,values,setUser,(error)=>{
                Alert.alert("fail to update user profile")
            });
        }
        if(values.role === "maid"){
            // navigation.navigate(constants.route.profile.maidProfile);
            navigation.reset( {
                index: 0,
                routes: [{ name: constants.route.stack.maid, params: {screen: constants.route.maid.maidProfile} }]});

        } else {
            navigation.reset( {
                index: 0,
                routes: [{ name: constants.route.stack.employer, params:{screen:constants.route.employer.maidList} }]});
        }
    }
    const initialValue={
        role:user.role,
        displayName:user.displayName,
    }
    console.debug("initialValue",initialValue);
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