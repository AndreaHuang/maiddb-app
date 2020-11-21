/* This is for expo-client */
import * as Google from 'expo-google-app-auth';
import googleAuthConfig from "../config/googleAppAuthConfig";
import firebaseAuth from "./FirebaseAuth";

const buildAppUser =(googleUser)=>{
    return  googleUser;
}

const login = async ()=>{
    console.log("Google login called");
    try{
        const {type,accessToken,idToken,user} = 
        await Google.logInAsync(googleAuthConfig);
        if(type === 'success'){
            firebaseAuth.onSignIn({user,idToken,accessToken}); 
            return {
                user:buildAppUser(user),
                accessToken: accessToken
            }
        } else {
            return {cancelled:true}
        }
     }catch(ex){
         console.error(ex);
         return {error:true}
     }
}
export default {
    login
}