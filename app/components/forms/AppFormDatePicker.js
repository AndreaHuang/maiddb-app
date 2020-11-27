import React ,{useState} from 'react';
import { StyleSheet,TouchableWithoutFeedback,View } from 'react-native';
// import DateTimePicker  from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { AntDesign } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";

import defaultStyles from "../../config/styles";
import AppText from "../AppText"
import AppErrorMessage from './AppErrorMessage';
import i18n from "../config/i18n";



const AppFormDatePicker = ({name,label,locale="en_GB"}) => {
    const {t} =useTranslation();
    const {values,errors,touched,setFieldValue,setFieldTouched} = useFormikContext();
    const [visible,setVisible] =useState(false);
    const handleConfirm =(date)=>{
            console.log(date.toDateString());
            setVisible(false);

            setFieldValue(name,date.toDateString());

    }
    const handleOpen=()=>{
        setVisible(true);
        setFieldTouched(name)
    }
    return (
        <>
        <View style={styles.container} >
            <AppText style={styles.label}>{label}</AppText>
            <TouchableWithoutFeedback onPress={handleOpen}>
                <View style={styles.valueContainer}>
                    <AntDesign
                        style={styles.icon}
                        name="calendar"
                        size={20}
                        color={defaultStyles.colors.medium}
                        /> 
                    {values[name] ?
                     <AppText style={styles.text}>{values[name]}</AppText>
                     :
                    <AppText style={styles.placeholder}>{label}</AppText>}
                </View>
            </TouchableWithoutFeedback>
                    <DateTimePickerModal
                        isVisible={visible}
                        headerTextIOS ={t("label.pick.date")}
                        cancelTextIOS={t("label.cancel.date")}
                        confirmTextIOS={t("label.confirm.date")}
                        value={new Date(values[name])}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={()=>setVisible(false)}
                        locale={locale}
                    />
       </View>
       <AppErrorMessage error={errors[name]} visible={touched[name]}/>
       </>
    )


}
 const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginHorizontal:15
    },
    icon: {
        marginRight: 10,
    },
    label:{
        flex:1
    },
    valueContainer: {
        flex:2,
        flexDirection: "row",
        width: "100%",
        marginVertical: 10,
        padding: 15,
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        alignItems: "center",
    },
     placeholder: {
        color: defaultStyles.colors.medium,
        flex: 1,
  },
 })
export default AppFormDatePicker;