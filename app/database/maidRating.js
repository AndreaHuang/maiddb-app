import {db,auth} from '../services/firebase';
import {initialScheme} from "../schemas/maidRating";
import cache from "../utiity/Cache";
import constants from "../config/constants";

const maidProfileRef = "/maidProfile";
const maidRating= "/rating";
const createRating= async (maid_uid)=>{
    if(!maid_uid) {
        return {
            error:true,
            errorCode: "uid.is.null"
        }
    }
   

    const init = Object.assign({},initialScheme);
    init.maid_uid = maid_uid;
    init.createdAt = new Date();
    // init.basicInfo.email = currentUser.email;
    // init.basicInfo.name =  currentUser.displayName;
    // init.profileStatus= "DRAFT";
    console.log("createRating",init);
    try{
        const ref =  db.ref(maidProfileRef+"/"+maid_uid+"/"+maidRating);
        await ref.set(init);
        const newRating = await((await ref.once('value')).val());
        console.debug("Created the  Maid Rating in firebase database");
        
       return newRating;

    } catch(error){
        console.error(error);
        return {error:true};
    }
}
export const retreiveOrCreateRating=async (maid_uid)=>{

   if(!maid_uid) {
        return {
            error:true,
            errorCode: "uid.is.null"
        }
    }

    const snapshot = await(await db.ref(maidProfileRef+"/"+maid_uid+"/"+maidRating).once('value')).val();
    
    if(snapshot){
        // console.debug("route to existing")
        // console.debug("route to existing",snapshot);
        // cache.store(uid,constants.cache.maidProfile,snapshot);
        return snapshot;
    } else {
        //  console.debug("route to initProfile")
        const newProfile= createRating(maid_uid);
        // cache.store(uid,constants.cache.maidProfile,newProfile);
        return newProfile;
    }

}
