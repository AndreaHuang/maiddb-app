/* This is for expo-client */
import * as Google from 'expo-google-app-auth';
import googleAuthConfig from "../config/googleAppAuthConfig";
import firebaseAuth from "./FirebaseAuth";


const login = async (callback)=>{
    console.log("Google login called");
    try{
        const {type,accessToken,idToken,refreshToken,user} = 
        await Google.logInAsync(googleAuthConfig);
        if(type === 'success'){
            firebaseAuth.onSignIn({user,idToken,accessToken}); 
            return {
                user:user,
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
const buildAppUser=(googleUser)=>{
    return {
        email:"",
        name:"",
        photoUrl:"",
        providerId:"",
    }
}
export default {
    login
}