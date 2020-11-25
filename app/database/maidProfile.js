import {db,auth} from '../services/firebase';
import maidProfileScheme from "../schemes/maidProfile";
import cache from "../utiity/Cache";
import constants from "../config/constants";

const maidProfileRef = "/maidProfile";

const createProfile= async (uid)=>{
    if(!uid) {
        return {
            error:true,
            errorCode: "uid.is.null"
        }
    }
    console.log("createProfile",uid);

    const init = Object.assign({user_uid:uid},maidProfileScheme.initialScheme);
    try{
        const newUser = await db.ref(maidProfileRef+"/"+uid).set(init);
        console.debug("Created the  Maid profile in firebase database",newUser);
        
       return newUser.val();

    } catch(error){
        console.error(error);
        return {error:true};
    }
    
}
const retreiveOrCreateProfile=async ()=>{
    const uid = auth().currentUser.uid;

    const snapshot =await(await db.ref(maidProfileRef+"/"+uid).once('value')).val();
    
    if(snapshot){
        console.debug("route to existing")
        cache.store(constants.cache.maidProfile,snapshot);
        return snapshot;
    } else {
         console.debug("route to initProfile")
        const newProfile= createProfile(uid);
        cache.store(constants.cache.maidProfile,newProfile);
        return newProfile;
    }
    
}

const updateProfile = async(uid,segment,values)=>{
    try{
        const update={};
        update[segment]=values;
        console.debug("updateProfile",update);
        await db.ref(maidProfileRef+"/"+uid).update(update);
        
        return {success:true}
    } catch(error){
        console.error("faile to update "+segment,error );
        return {
            error:true,
            errorCode:"message.update.failed.maid.profile"
        }
    }
   

}
export default {
    retreiveOrCreateProfile,
    updateProfile
    // updateBasicInfo
}