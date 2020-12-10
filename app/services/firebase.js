import firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

/*Initialize the app*/
const initialize=()=>{
     if(firebase.apps.length === 0){
        console.log("initialize App")
        firebase.initializeApp(firebaseConfig);
    }
}

initialize();

export const auth=firebase.auth;
export const db = firebase.database();
