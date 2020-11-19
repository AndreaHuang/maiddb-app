import 'react-native-gesture-handler';
import React,{useEffect, useState} from 'react';
import AuthContext from "./app/auth/AuthContext"
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { LogBox } from 'react-native';
import firebaseAuth from "./app/auth/FirebaseAuth";

import {auth} from "./app/services/firebase";
import {AppLoading} from "expo";


LogBox.ignoreLogs=['Warning'];

export default function App() {
  const[user,setUser]=useState(null);
  const[isReady,setIsReady]=useState(false);

  const initialize=async ()=>{
    const unsubscribe = auth().onAuthStateChanged((firebaseUser)=>{
        unsubscribe();
        console.log("onAuthStateChanged in initialize ", firebaseUser);
        if(firebaseUser){
          const appUser = firebaseAuth.buildAppUser(firebaseUser);
          console.log("buildFrom buildAppUser",appUser);
          setUser(appUser);
        
        } else {
          setUser(null);
        }
        })
  }

  if(!isReady){
    return <AppLoading startAsync={initialize} onFinish={()=>setIsReady(true)}/>
  }
  

  return (
    <AuthContext.Provider value={{user,setUser}}>
      <NavigationContainer>
        {user ? <AppNavigator/> : <AuthNavigator/>}
      </NavigationContainer>
   </AuthContext.Provider>
  );
}


