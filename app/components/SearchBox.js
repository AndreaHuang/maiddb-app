import React from 'react';

import { Octicons } from '@expo/vector-icons';
import {StyleSheet,TextInput, TouchableOpacity, TouchableWithoutFeedback ,View} from 'react-native';
import colors from "../config/color";
import defaultStyles from "../config/styles";
const SearchBox = ({value,placeholder,onChange,onSearch}) => {
    return ( 
        <View style={styles.container}>
             <TouchableWithoutFeedback onPress={onSearch}>
                <Octicons name="search" size={20} color={colors.primary} />
            </TouchableWithoutFeedback>
            <TextInput style={[defaultStyles.text,styles.text]} value={value} 
                onChangeText={onChange} 
                placeholder ={placeholder}
                placeholderTextColor={colors.medium}/>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        // marginHorizontal:10,
        paddingHorizontal:10,
        paddingVertical:5,
        borderWidth:1,
        borderColor:colors.primary,
        borderRadius: 5,
        backgroundColor:colors.white
    },
    text:{
        marginHorizontal:15,
        minWidth:200
    }
})
 
export default SearchBox;