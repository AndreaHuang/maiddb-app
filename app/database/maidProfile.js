import {db,auth} from '../services/firebase';
import maidProfileScheme from "../schemas/maidProfile";
import cache from "../utiity/Cache";
import constants from "../config/constants";
import { initial } from 'lodash';

const maidProfileRef = "/maidProfile";

const createProfile= async (currentUser)=>{
    if(!currentUser) {
        return {
            error:true,
            errorCode: "uid.is.null"
        }
    }
    const uid=currentUser.uid;

   

    const init = Object.assign({},maidProfileScheme.initialScheme);
    init.user_uid = uid;
    init.createdAt = new Date();
    init.basicInfo.email = currentUser.email;
    init.basicInfo.name =  currentUser.displayName;
    init.profileStatus= "DRAFT";
    console.log("createProfile",init);
    try{
        const ref =  db.ref(maidProfileRef+"/"+uid);
        await ref.set(init);
        const newUser = await((await ref.once('value')).val());
        console.debug("Created the  Maid profile in firebase database");
        
       return newUser;

    } catch(error){
        console.error(error);
        return {error:true};
    }
}
const retreiveOrCreateProfile=async ()=>{

    const currentUser = auth().currentUser;
    const uid = currentUser.uid;

    const snapshot = await(await db.ref(maidProfileRef+"/"+currentUser.uid).once('value')).val();
    
    if(snapshot){
        // console.debug("route to existing")
        // console.debug("route to existing",snapshot);
        cache.store(uid,constants.cache.maidProfile,snapshot);
        return snapshot;
    } else {
        //  console.debug("route to initProfile")
        const newProfile= createProfile(currentUser);
        cache.store(uid,constants.cache.maidProfile,newProfile);
        return newProfile;
    }

}

const updateProfile = async(uid,segment,values)=>{
    try{
        const update={};
        update[segment]=values;
        update.lastUpdatedAt=new Date();
        update.profileStatus="PENDING";
        
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
        values.lastUpdatedAt=new Date();
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
        update.lastUpdatedAt=new Date();
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
        update.lastUpdatedAt=new Date();
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


const search =async (keyword,offset,limit) =>{
    
   const snapshot = await db.ref(maidProfileRef).once('value');

//    ref.once('value', (snapshot) => {
//         snapshot.forEach((childSnapshot) => {
//             var childKey = childSnapshot.key;
//             var childData = childSnapshot.val();
//             // ...
//         });
// });

   const allPromise = [];
   const allResult = []
   snapshot.forEach((childSnapshot) =>{
    //    const value = childSnapshot.val();
    //    console.debug("value",value);
        allResult.push(childSnapshot.val());
    //    allResult.push({id:childSnapshot.key,basicInfo:{name:"test"}});
    //    const promise = childSnapshot.val().then((value)=>{
    //             allResult.push(value);
    //     });
    //     allPromise.push(promise);
   });

//    if(allPromise.length > 0 ){
//         await Promise.all(allPromise);
//         return allResult;
//    } else {
//        return allResult;
//    }
   return allResult;


}

export default {
    retreiveOrCreateProfile,
    updateProfile,
    addOrUpdateWorkHistory,
    removeWorkHistory,
    // updateBasicInfo
    search,
}