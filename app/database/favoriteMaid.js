import {db} from '../services/firebase';
import cache from "../utiity/Cache";
import constants from "../config/constants";

const cacheKey = constants.cache.favoriateMaidList;
const toggleFavorite = async (uid,maid_uid)=>{
      try{
        
        const ref = db.ref(favoriteMaidRef+"/"+uid);
        let favoriteList = cache.retrieve(cacheKey);
        if( favoriteList ){ 
            const originalLength = favoriteList.length;
            favoriteList.filter((x=>x!==maid_uid));
            if(originalLength ===favoriteList.length ){ //same length, means not exist before
                favoriteList.push(maid_uid);
            }   
            ref.set(favoriteList);
            cache.store(cacheKey,favoriteList);
            return; 
        } else {
            const newList =[maid_uid];
            cache.store(cacheKey,newList);
            ref.set(newList); // not need to wait for response
            return; 
        }
    } catch(error){
        console.error(error);
        return {error:true};
    }

}
const retrieveFavorite=(uid,callback)=>{
      //retrieve from cache first,then from remote
      let favoriteList = cache.retrieve(cacheKey);
      if(!favoriteList) {
          favoriteList=[];
      }
      callback(favoriteList);

      const ref = db.ref(favoriteMaidRef+"/"+uid);
      ref.on('value',(snapshot)=>{
        let value =snapshot.val();
        if(!value){
            value=[];
        }
        callback(value);
        cache.store(cacheKey,value);
      })


}
export default{
    toggleFavorite,
    retrieveFavorite
}