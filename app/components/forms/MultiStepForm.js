import React,{useState,useRef, useEffect} from 'react';
import {View,Text} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import _ from "lodash";

import AppForm from './AppForm';
import i18n from "../../config/i18n";
import Stepper from "./Stepper";



import AppText from "../AppText";


const MultipleStepForm = ({items,onSubmit,initialValues}) => {
   
    const [currentStep,setCurrentStep] =useState(0);
    const [currentValue,setCurrentValue] = useState(initialValues);
    const maxSteps= items.length;

    

    const handleNext=(values,{resetForm})=>{
        setCurrentValue(currentValue=>Object.assign(currentValue,values));
        setCurrentStep(currentStep=>currentStep + 1);
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
           
           </AppForm> : null)
         }

    </View>);
}
 
export default MultipleStepForm;