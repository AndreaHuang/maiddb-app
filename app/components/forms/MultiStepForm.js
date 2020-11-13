import React,{useState} from 'react';
import {View,Text} from "react-native";
import AppForm from './AppForm';
import MobileStepper from '@material-ui/core/MobileStepper';
import { useTranslation } from "react-i18next";
import i18n from "../../config/i18n";

import _ from "lodash";
import AppSubmitButton from './AppSubmitButton';
import AppButton from "../AppButton";



const MultipleStepForm = ({items,onSubmit,initialValues}) => {
    const { t } = useTranslation();
    const [errors,setErrors]=useState({});
    const [currentStep,setCurrentStep] =useState(0);
    const handleNext=()=>{
        setCurrentStep(currentStep + 1);
    }
    const handleBack=()=>{
         setCurrentStep(currentStep -1);
    }
    const isLastStep = (index)=>{
    return index === items.length -1;
    }
    return ( 
    <View>
        {/* Stepper  */}
       {items.map((item,index)=>
           currentStep ===index ? 
           <AppForm  
            key={index} 
            initialValues={_.pick(initialValues,item.names)}
            validationSchema = {item.validationSchema}
            onSubmit = {isLastStep(index)? onSubmit: handleNext}
           >
               {
                 item.components()
               }
              {index > 0 ? <AppButton title={t("button.back")} onPress={handleBack} /> :null}
              <AppSubmitButton title={isLastStep(index)? t("button.submit"):t("button.next")}/>
           </AppForm> : null)
         }
    </View>);
}
 
export default MultipleStepForm;