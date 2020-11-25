import * as React from 'react';
import {StyleSheet,View} from "react-native";
import { useTranslation } from "react-i18next";
import { RadioButton } from 'react-native-paper';

import paperTheme from "../config/paperTheme";
import AppText from "../components/AppText";

import i18n from "../config/i18n";


const AppRadioGroup = ({value,options,onChange}) => {
  const {t}= useTranslation();

  return (
    <RadioButton.Group onValueChange={onChange} value={value} theme={paperTheme}>
        {
            options.map((optionItem,index)=>{
                // return <RadioButton.Item key={index} theme={paperTheme} label={t(optionItem)} value={optionItem}/>
                return (
                 <View style={styles.radioOptionContainer}>
                 
                  <RadioButton theme={paperTheme} value={optionItem}/>
                   <AppText>{t(optionItem)}</AppText>
                </View>
                );
            })
        }
    
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  radioOptionContainer:{
    flexDirection:"row"
  }

})

export default AppRadioGroup;