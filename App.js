import 'react-native-gesture-handler';
// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';

import React,{useEffect, useState} from 'react';
import AuthContext from "./app/auth/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context'

import AppNavigator from "./app/navigation/AppNavigator";
import AccountNavigator from "./app/navigation/AccountNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { LogBox } from 'react-native';
import firebaseAuth from "./app/auth/FirebaseAuth";

import {auth} from "./app/services/firebase";
import {retrieveUserProfile} from "./app/database/user";
import {AppLoading} from "expo";

enableScreens();
LogBox.ignoreLogs=['Warning'];

export default function App() {
  const[user,setUser]=useState(null);
  const[isReady,setIsReady]=useState(false);

  useEffect(()=>{
     const unsubscribe = auth().onAuthStateChanged((firebaseUser)=>{
        unsubscribe();
        // console.log("onAuthStateChanged in initialize ", firebaseUser);
        if(firebaseUser){
          const appUser = firebaseAuth.buildAppUser(firebaseUser);
          // // console.log("buildFrom buildAppUser",appUser);
          // setUser(appUser);
          retrieveUserProfile(appUser,setUser);
        
        } else {
          setUser(null);
        }
        })
      setIsReady(true);
  },[isReady]);

  if(!isReady){
    return <AppLoading/>
  }
  

  return (
    <AuthContext.Provider value={{user,setUser}}>
      <SafeAreaProvider>
        <NavigationContainer>
         {user ? <AccountNavigator/> : <AuthNavigator/>}
       </NavigationContainer> 
      </SafeAreaProvider>
   </AuthContext.Provider>
  );
}


