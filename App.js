import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./app/screens/TabNavigator";


export default function App() {
  return (
   <NavigationContainer>
      <TabNavigator></TabNavigator>
   </NavigationContainer>
  );
}


