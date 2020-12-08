import React,{useState} from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import constants from "expo-constants";
import defaultStyles from "../config/styles";

const {deviceHeight} = defaultStyles.dimension.height;
function ScrollScreen({ children, style }) {
  // const [screenHeight,setScreenHeight] = useState(0);
  const [scrollEnabled,setScrollEnabled] =useState(false);
  const onContentSizeChange =(contentHeight,contentWidth)=>{
    // setScreenHeight(contentHeight);
    setScrollEnabled(contentHeight > deviceHeight);
  }
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <ScrollView style={styles.view} contentContainerStyle ={styles.scrollView} scrollEnabled={true} onContentSizeChange={onContentSizeChange}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}
  
const styles = StyleSheet.create({
  screen: {
    // top: - constants.statusBarHeight,
    marginTop:-30,
    paddingTop:0,
    flex: 1,
  },
  view: {
    flex: 1,
  },
  scrollView:{
    flexGrow:1
  }
});
export default ScrollScreen;
