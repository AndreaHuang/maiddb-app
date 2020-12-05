import React from "react";
import {StyleSheet,Modal,View} from "react-native";
import LottieView from "lottie-react-native";
import {Overlay } from 'react-native-elements';

import color from "../config/color";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <Overlay isVisible={visible} overlayStyle={styles.overlay} 
    fullScreen={true}>
      
    <LottieView
      autoPlay
      loop
      source={require("../assets/animations/loader.json")}
    />
    </Overlay>
  );
}
const styles=StyleSheet.create({
   overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.white,
    opacity: 0.5,
  }
})

export default ActivityIndicator;
