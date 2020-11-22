import React from 'react';
import { Animated, View, StyleSheet,TouchableOpacity,Text } from "react-native";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons"
import { useFormikContext } from "formik";

import defaultStyles from "../../config/styles";
import color from "../../config/color";
import AppButton from "../AppButton";

import i18n from "../../config/i18n";


const width = defaultStyles.dimension.width;
const scrollX = new Animated.Value(0);
let position = Animated.divide(scrollX, width);

const stepperEvent = ()=>{Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          { useNativeDriver: false }
        )}
const Stepper = ({steps,currentStep, handleBack}) => {
  
    const { t } = useTranslation();
    const array = Array.from(Array(steps),(value,index)=>index);
    const {submitForm} = useFormikContext();
    const isLastStep = (index)=>{
        return index === steps -1;
    }
    const isFirstStep = (index) =>{
        return index === 0;
    }
    const ButtonPlaceHolder=()=>{
        return <View style={styles.stepperButtonPlaceHolder}></View>
    }
    const NextButton=({size=18}) => {
    return (
        <TouchableOpacity
        style={[styles.stepperButton,  styles.stepperNextButton]}
        onPress={submitForm}
        >
        <Text style={[defaultStyles.text,styles.stepperButtonText,{fontSize:size}]}>{t("button.next")}</Text>
        <AntDesign name="right" size={size} color={color.primary} />
        </TouchableOpacity>
    );
    }
    const BackButton=({ onPress, size=18}) => {
    return (
        <TouchableOpacity
        style={[styles.stepperButton, styles.stepperBackButton]}
        onPress={onPress}
        >
        <AntDesign name="left" size={size} color={color.primary} />
        <Text style={[defaultStyles.text,styles.stepperButtonText,{fontSize:size}]}>{t("button.back")}</Text>
    
        </TouchableOpacity>
    );
    }

   

    return ( 
        <View style={styles.stepperContainer}>
           
           {isFirstStep(currentStep)? <ButtonPlaceHolder/>: <BackButton onPress={handleBack} />}
            <View style={styles.stepperDotContainer}>
        
             {array.map((item, i) => {
                let opacityValue = currentStep === i? 1: 0.2;
                return (
                    <Animated.View
                    key={i}
                    style={[styles.dot, { opacity: opacityValue }]}
                    />
                );
                })}
    
             </View>
            {isLastStep(currentStep)? <ButtonPlaceHolder/>: <NextButton/> }
      </View>
     );
}




const styles = StyleSheet.create({

  dot: {
    borderRadius: 4,
    height: 8,
    width: 8,
    backgroundColor: color.primary,
    marginHorizontal: 4,
  },

 stepperButtonPlaceHolder: {
   flex:1
  },
  stepperButton:{
      flexDirection:"row",
      alignItems:"center"
  },
  stepperButtonText:{
    color: color.primary,
  },
  stepperNextButton:{
      alignSelf:"flex-end",
      paddingRight: 10,
      flex:1
  },
  stepperBackButton:{
      alignSelf:"flex-start",
      paddingLeft: 10,
      flex:1

  },
  stepperContainer: {
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center", 
    paddingVertical:10

  },
  stepperDotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    flex:3
  },
});
 
export default Stepper;