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

const MaidProfileImageEditScreen = ({navigation}) => {
    const {user} = useContext(AuthContext);
    const { t } = useTranslation();
    const initialValue={images:[]}
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [count,setCount] = useState(0);
    const [totalCount,setTotalCount] = useState(0);
    const [downloadUrls] = useState([]);

    const segment="images";

    const updateProfile =async (images)=>{
        await maidProfileDB.updateProfile(user.uid,segment,images);
    }
    

    const onSuccess =(downloadUrl)=>{
        setLoading(false);
        console.log("upload sucessfully",downloadUrl);
        setCount(count+1);
         console.log("onError"+count);
         downloadUrls.push(downloadUrl);
        if(count ===totalCount){
         navigation.replace(constants.route.maidProfile);
         console.log("all downloadUrl", downloadUrls);
         updateProfile(downloadUrls);
        }


    }
    const onError =(error)=>{
         setLoading(false);
         setError(true);
         setErrorMessage(t(error.code))
        console.error("upload failed",error);
        setCount(count+1);
        console.log("onError"+count);
        if(count ===totalCount){
         navigation.replace(constants.route.maidProfile);
        }
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
        
        const listOfUri = values.images.map(image=>image.uri);
        setTotalCount(listOfUri.length);
        
        await storage.uploadFile(user.uid,listOfUri,onSuccess,onError);
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
                    <AppErrorMessage error={errorMessage} visible ={error}/>
                    <AppSubmitButton title={t("button.submit")} />

                    </AppForm>
                </View>
            </Screen> );
}
const styles=StyleSheet.create({
    container:{
        marginHorizontal:15
    }
})
 
export default MaidProfileImageEditScreen;