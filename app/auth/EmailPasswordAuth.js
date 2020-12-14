import {auth} from "../services/firebase";
import {createOrUpdateFirebaseUser} from "../database/user"

const buildAppUser =({additionalUserInfo,user})=>{
 
    return {
      email:user.email,
      name:user.displayName,
      photoURL:user.photoURL,
      providerId:additionalUserInfo.providerId,
      uid:user.uid
  }

}
const register = async (email,password)=>{

    try{
     const response = await auth().createUserWithEmailAndPassword(email, password);
     console.log("createUserWithEmailAndPassword response",response);
     createOrUpdateFirebaseUser(response);
     return {
       user:buildAppUser(response)
     }
    }catch(error) {
      return {
       error:true,
       errorCode:error.code,
       errorMessage:error.message
      };
   };
}

const login = async (email,password)=>{

    try{
     const response = await auth().signInWithEmailAndPassword(email, password);
    //  console.log("signInWithEmailAndPassword response",response);
     createOrUpdateFirebaseUser(response);
     return {
       user:buildAppUser(response)
     }
    }catch(error) {
     return {
       error:true,
       errorCode:error.code,
       errorMessage:error.message
      };
   };
}

const checkIfUserExist=(email)=>{
  return auth().getUserByEmail(email).then(() => true).catch(() => false);
}
const sendPasswordResetEmail= async (email)=>{
  try{
    // const auth = auth();
    auth().useDeviceLanguage();
    await auth().sendPasswordResetEmail(email);
    // Email sent.
    return {
      success:true
    }
  }catch(error) {
    return {
      error:true,
      errorCode:"auth/email-not-exists",
      errorMessage:error
    }
  }
}

export default{
  register,
  login,
  sendPasswordResetEmail
}