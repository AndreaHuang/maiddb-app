import React,{useState,useRef, useEffect} from 'react';
import {View,StyleSheet,Text} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import _ from "lodash";

import AppForm from './AppForm';
import i18n from "../../config/i18n";
import Stepper from "./Stepper";


import AppLink from "../AppLink";
import AppSubmitButton from "./AppSubmitButton";


const MultipleStepForm = ({items,onSubmit,initialValues,onCancel}) => {
    const {t} = useTranslation();
   
    const [currentStep,setCurrentStep] = useState(0);
    const [currentValue,setCurrentValue] = useState(initialValues);
    const maxSteps= items.length;
    

    const handleNext=(values)=>{
        const newCurrentValue = _.assign(currentValue,values);
        setCurrentValue(newCurrentValue);
        setCurrentStep(currentStep + 1);
    }
    const handleBack=()=>{
        setCurrentStep(currentStep -1);
       
    }
    const isLastStep = (index)=>{
         return index === items.length -1;
    }
    const handleSubmit=(values,{resetForm})=>{
        onSubmit(Object.assign(currentValue,values));
        resetForm();
    }
    
    return ( 
    <View>
        {/* <AppText style={{fontSize:"30"}}>{t("title.edit.profile")}</AppText> */}
        {/* Stepper  */}
       {items.map((item,index)=>
           currentStep ===index
           ? 
           <AppForm  
            key={index} 
            initialValues={_.pick(currentValue,item.names)}
            validationSchema = {item.validationSchema}
            onSubmit = {isLastStep(index)? handleSubmit: handleNext}
           >
            <Stepper 
            steps={maxSteps}
            currentStep={currentStep}
            handleBack={handleBack}
             />
               {
                 item.components()
               }
            <AppSubmitButton title={isLastStep(index)? t("button.submit"): t("button.next")}/>
            <View style={styles.bottomButtonContainer}> 
                 <AppLink title={t("button.cancel")} onPress={onCancel} style={styles.cancelButton}/>
            </View>
           
           </AppForm> : null)
         }

    </View>);
}
 
const styles=StyleSheet.create({
    bottomButtonContainer:{
        alignItems:"flex-end",
        justifyContent:"flex-start"
        
    },
    cancelButton:{
        fontSize:16,
        alignContent:"flex-end",
        alignSelf:"flex-end",
        paddingRight:25,
    },


});
export default MultipleStepForm;