import firebase from 'firebase';
import firebaseConfig from './FirebaseConfig';

/*Initialize the app*/
const initialize=()=>{
     if(firebase.apps.length === 0){
        console.log("initialize App")
        firebase.initializeApp(firebaseConfig);
    }
}

const signout=()=>{
  firebase.auth().signOut().then(()=> {
    // Sign-out successful.
    console.debug("logout successfully.")
  }).catch(error => {
    console.error("failed to log out",error);
  });
}
/* Utility */
const buildAppUser=(firebaseUser)=>{
    // displayName: string | null;
    // email: string | null;
    // phoneNumber: string | null;
    // photoURL: string | null;
    // providerId: string;
    // /**
    //  * The user's unique ID.
    //  */
    // uid: string;
    return {
      email:firebaseUser.email,
      name:firebaseUser.displayName,
      photoURL:firebaseUser.photoURL,
      providerId:firebaseUser.providerId
    }

}
const isUserEqual=(googleUser, firebaseUser)=>{
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
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
  const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    console.log("firebaseUser",firebaseUser);
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          idToken,
          accessToken
      );

      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential)
      .then(()=>{
        console.log("after signInWithCredential, use signin firebase");
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
      });
    } else {
      console.log('User already signed-in Firebase.');
      return;
    }
  });
}
export default {
  initialize,
  signout,
  onSignIn,
  buildAppUser
};