// import firebase from 'firebase';
// import firebaseConfig from '../services/firebaseConfig';
import {auth,db} from '../services/firebase';
import {saveOrUpdateFirebaseUser} from "../database/user"


const signout=()=>{
  auth().signOut().then(()=> {
    // Sign-out successful.
    console.debug("logout successfully.")
  }).catch(error => {
    console.error("failed to log out",error);
  });
}
/* Utility */
const buildAppUser=(firebaseUser)=>{
    return {
      email:firebaseUser.email,
      name:firebaseUser.displayName,
      photoURL:firebaseUser.photoURL,
      providerId:firebaseUser.providerId,
      uid:firebaseUser.uid
    }

}
const isUserEqual=(googleUser, firebaseUser)=>{
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.id) {
        return true;
      }
    }
  }
  return false;
}

const onSignIn = ({user: googleUser,idToken,accessToken})=> {
 
  console.log('onSignIn called');
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    console.log("firebaseUser",firebaseUser);
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = auth.GoogleAuthProvider.credential(
          idToken,
          accessToken
      );

      // Sign in with credential from the Google user.
      auth().signInWithCredential(credential)
      .then((firebaseLoginResult)=>{
        console.log("after signInWithCredential, use signin firebase");
        saveOrUpdateFirebaseUser(firebaseLoginResult);
         /*This is callback after login firebase */
         return;
      })
      .catch(error =>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        return ({
          error:true,
          errorCode:error.code,
          errorMessage:error.message
        })
      });
    } else {
      console.log('User already signed-in Firebase.');
      return;
    }
  });
}
export default {
  signout,
  onSignIn,
  buildAppUser
};