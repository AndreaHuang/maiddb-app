import {db} from '../services/firebase';
import cache from "../utiity/Cache";
import constants from "../config/constants";

const cacheKey = constants.cache.favoriteMaidList;
const favoriteMaidRef="favoriteMaid";
export const toggleFavorite = async (uid,maid_uid,callback)=>{
      try{
        let favoriteList = await cache.retrieve(cacheKey);
        if( favoriteList ){ 
            const originalLength = favoriteList.length;
            favoriteList = favoriteList.filter(x=> {
                return x && !(x == maid_uid);
            } 
                );
             console.log("favoriteList after filtering Cache",favoriteList);
            if(originalLength ===favoriteList.length ){ //same length, means not exist before
                favoriteList.push(maid_uid);
            }   
        } else {
            favoriteList =[maid_uid];
        }

        cache.store(cacheKey,favoriteList);
        if(callback){
            callback(favoriteList);
        }
        db.ref(favoriteMaidRef+"/"+uid).set(favoriteList);// not need to wait for response
        return; 
    } catch(error){
        console.error("failure of toggleFavorite",error);
        return {error:true};
    }

}
export const retrieveFavorite= async (uid,callback)=>{
      //retrieve from cache first,then from remote
      let favoriteList = await cache.retrieve(cacheKey);
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
        cache.store(cacheKey,value);
        callback(value);
      })


}
// export default{
//     toggleFavorite,
//     retrieveFavorite
// }