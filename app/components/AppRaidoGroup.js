import * as React from 'react';
import { RadioButton } from 'react-native-paper';

import paperTheme from "../config/paperTheme";
import { useTranslation } from "react-i18next";
import i18n from "../config/i18n";


const AppRadioGroup = ({value,options,onChange}) => {
  const {t}= useTranslation();

  return (
    <RadioButton.Group onValueChange={onChange} value={value} theme={paperTheme}>
        {
            options.map((optionItem,index)=>{
                return <RadioButton.Item key={index} label={t(optionItem)} value={optionItem}/>
            })
        }
    
    </RadioButton.Group>
  );
};

export default AppRadioGroup;