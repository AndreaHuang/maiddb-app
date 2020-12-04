import React, { useState } from "react";
import { Animated, Modal,View, StyleSheet } from "react-native";

import constants from "expo-constants";
import Carosel from "./Carosel";
import colors from "../config/color";
import defaultStyles from "../config/styles";

const width = defaultStyles.dimension.width;
const screenHeight = defaultStyles.dimension.height;

function CaroselWithModal({ data }) {
  if(!data) {return null;}
  const [modalVisible,setModalVisible] = useState(false);
  return (
      <>
      <Carosel data={data} onPress={()=>setModalVisible(true)}/>
      <Modal
          animationType="slide"
          // transparent={true}
          visible={modalVisible}
          presentationStyle="fullScreen">
          <View style={[styles.modalModal,{marginTop: constants.statusBarHeight}]}>
              <Carosel data={data} onPress={()=>setModalVisible(false)} 
              cardStyle={{height:screenHeight  - 60 - constants.statusBarHeight }}/>  
          </View>
      </Modal>
    </>
  )};
const styles = StyleSheet.create({
 modalModal:{
   alignSelf:"center",
   justifyContent:"center",
   marginBottom:15
 }
});
export default CaroselWithModal;
