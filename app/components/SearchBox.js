import React from 'react';

import { AntDesign } from '@expo/vector-icons';

import {StyleSheet,TextInput, TouchableWithoutFeedback ,View} from 'react-native';
import colors from "../config/color";
import defaultStyles from "../config/styles";

const SearchBox = ({value,placeholder,onChange,onSearch,openFilterPage}) => {
    return ( 
        <>
        <View style={styles.container}>
             <TouchableWithoutFeedback onPress={onSearch}>
                <AntDesign name="search1" size={defaultStyles.icon.size} color={colors.primary} />
            </TouchableWithoutFeedback>
            <TextInput style={[defaultStyles.text,styles.text]} value={value} 
                onChangeText={onChange} 
                placeholder ={placeholder}
                placeholderTextColor={colors.medium}/>
            
        </View>
        {openFilterPage?
        <View style={[styles.container,styles.filterIcon]}>
   
           <TouchableWithoutFeedback onPress={openFilterPage}>
                <AntDesign name="menufold" size={defaultStyles.icon.size} color={colors.primary}/>
            </TouchableWithoutFeedback>
         </View>
         :null
        }
        </>
    );
}

const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
     
        paddingHorizontal:10,
        paddingVertical:15,
        // borderWidth:2,
        // borderColor:colors.primary,
        borderRadius: 5,
        backgroundColor:colors.white,
        shadowColor: "#ccc",
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,

    },
    text:{
        marginHorizontal:15,
        minWidth:200
    },
    filterIcon:{
      minWidth:50,
      marginLeft:15,
      justifyContent: "center",
      alignItems:"center",
  },
})
 
export default SearchBox;