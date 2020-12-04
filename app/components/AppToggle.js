import React from 'react';
import { StyleSheet,View } from 'react-native';
import color from '../config/color';

const AppToggle = ({value,items,onChange}) => {

  return (
    <View style={styles.container}>
        {items.map((item,index)=>{
            return (
                 <TouchableOpacity key={index}
                    style={[styles.toggleButton, value === item? styles.selected:null]}
                    onPress={(item)=>onChange(item)}
                    >
                    <Text style={defaultStyles.buttonText}>{t(item)}</Text>
                </TouchableOpacity>
            )
        })}  
    </View>
  );
};
const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
    },
    toggleButton:{
        backgroundColor: colors.white,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    selected:{
        backgroundColor : color.primary
    }
})


export default AppToggle;