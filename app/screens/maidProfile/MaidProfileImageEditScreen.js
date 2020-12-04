import React, { useContext,useMemo,useState } from 'react';
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import i18n from "../../config/i18n";

import Screen from "../../components/Screen";
import {AppFormImagePicker,AppForm,AppSubmitButton, AppErrorMessage} from "../../components/forms";
import storage from "../../database/storage";
import AuthContext from '../../auth/AuthContext';
import ActivityIndicator from "../../components/ActivityIndicator";
import constants from '../../config/constants';
import maidProfileDB from "../../database/maidProfile";

const MaidProfileImageEditScreen = ({navigation,route}) => {
    const {user} = useContext(AuthContext);
    const { t } = useTranslation();
    let initialValue= {images:[]}
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");

    const segment="images";

    if(route.params.data){
        initialValue ={images:route.params.data}
    }


    const updateProfile =async (images)=>{
        await maidProfileDB.updateProfile(user.uid,segment,images); 
        setLoading(false);
        navigation.replace(constants.route.profile.maidProfile);
    }
    const handleError=(error)=>{
            setLoading(false);
            setErrorMessage(t(error.errorCode));
            setError(true);
            return;
    }

    const handleSubmit = async (values)=>{
        console.log("MaidProfileImageEditScreen handleSubmit",values);
        if(!values.images){
            setErrorMessage(t("validation.images.is.required"));
            setError(true);
            return;
        }
        setErrorMessage("");
        setError(false);
        setLoading(true);
    
        storage.uploadFile(user.uid,values.images,updateProfile,handleError);
    }
    const validationSchema =Yup.array();

    return (<Screen>
               <ActivityIndicator visible={loading} />
                <View style={styles.container}>
                    <AppForm
                    initialValues={initialValue}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>

                    <AppFormImagePicker name="images"/>
                    <AppSubmitButton title={t("button.submit")} />
                    <AppErrorMessage error={errorMessage} visible ={error}/>

                    </AppForm>
                </View>
            </Screen> );
}
const styles = StyleSheet.create({
    container:{

    }
})
export default MaidProfileImageEditScreen;