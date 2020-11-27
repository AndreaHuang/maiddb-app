import {db,auth} from '../services/firebase';
import maidProfileScheme from "../schemes/maidProfile";
import cache from "../utiity/Cache";
import constants from "../config/constants";

const maidProfileRef = "/maidProfile";

const createProfile= async (currentUser)=>{
    if(!currentUser) {
        return {
            error:true,
            errorCode: "uid.is.null"
        }
    }
    const uid=currentUser.uid;

    console.log("createProfile",currentUser.uid);

    const init = Object.assign({
        user_uid:uid,
        basicInfo:{
            email:currentUser.email
        }}
        ,maidProfileScheme.initialScheme);
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
    const currentUser = auth().currentUser;

    const snapshot = await(await db.ref(maidProfileRef+"/"+currentUser.uid).once('value')).val();
    
    if(snapshot){
        // console.debug("route to existing")
        console.debug("route to existing",snapshot);
        cache.store(constants.cache.maidProfile,snapshot);
        return snapshot;
    } else {
        //  console.debug("route to initProfile")
        const newProfile= createProfile(currentUser);
        cache.store(constants.cache.maidProfile,newProfile);
        return newProfile;
    }
    
}

const updateProfile = async(uid,segment,values)=>{
    try{
        const update={};
        update[segment]=values;
        // console.debug("updateProfile",update);
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
const addOrUpdateWorkHistory = async(uid,values,index)=>{
    const segment="workHistory";
    try{
        // if(index < 0) //new item
        const existing = await (await db.ref(maidProfileRef+"/"+uid+"/"+segment).once('value')).val();
        // await db.ref(maidProfileRef+"/"+uid).update(update); 
        console.debug("existing workhistor",existing);
        let array;

        if(!existing){ 
            array =[]; 
            array.push(values);
        } else {
            if(index < 0) { //new item, append
              array = existing;
              array.push(values);
            } else {
             array = existing;
             array[index] = values;
            }
        }
        const update={};
        update[segment]=array;
        await db.ref(maidProfileRef+"/"+uid).update(update);
        return {success:true}


    }catch(error){
        console.error("faile to update "+segment,error );
        return {
            error:true,
            errorCode:"message.update.failed.work.history"
        }
    }
}
const removeWorkHistory =async (uid,index) =>{
      const segment="workHistory";
    try{
        // if(index < 0) //new item
        const existing = await (await db.ref(maidProfileRef+"/"+uid+"/"+segment).once('value')).val();
        // await db.ref(maidProfileRef+"/"+uid).update(update); 
        console.debug("existing workhistor",existing);

        if(!existing || existing.length < index + 1){ 
           return {
               error:true,
               errorCode:"message.remove.failed.work.history"
           }
        }
       
        delete existing[index];
        console.debug("after delete",existing);
        const update={};
        update[segment]=existing;
        await db.ref(maidProfileRef+"/"+uid).update(update);
        return {success:true}


    }catch(error){
        console.error("faile to remove "+segment,error );
        return {
            error:true,
            errorCode:"message.remove.failed.work.history"
        }
    }
}
export default {
    retreiveOrCreateProfile,
    updateProfile,
    addOrUpdateWorkHistory,
    removeWorkHistory
    // updateBasicInfo
}