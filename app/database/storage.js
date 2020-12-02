import firebase from 'firebase';
import _ from "lodash";


const prefixImage="images";
const metadata ={
    contentType:"image/png",
}

const uploadFile =async (userId,originalList,onSuccess,onError) =>{
    const allPromises = [];
    const listOfUri = originalList.filter((item)=>{
        return !(!item);
    })
    const downloadUrls =Array.apply(null, Array(listOfUri.length));
    await listOfUri.forEach(async (uri,index)=>{
         if(!uri){
            return; //skip empty result;

         }
        if(_.startsWith(uri,"https://")){ //previously uploaded files;
           downloadUrls[index] = uri;
           return;
        }
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const name= new Date().getTime() +".jpg";
  
            

        const filePromise 
            = fetch(uploadUri).then(async file=>{
                                const blob = await  file.blob();
                                const snapshot = await firebase.storage().ref().child(prefixImage+"/"+userId +"/"+name).put(blob,metadata);
                                console.log("place 8");
                                const downloadUrl =await snapshot.ref.getDownloadURL();
                                downloadUrls[index] = downloadUrl;
                                return downloadUrl;
            });
        allPromises.push(filePromise);
       
    });

 
    console.debug("Place 2",allPromises.length );
    if(allPromises.length > 0) {
        Promise.all(allPromises).then((values) =>{
             onSuccess(downloadUrls);
             clearnup(uid,downloadUrls);
        },(error)=>{
             console.error("upload error",error);
             onError(error);
        });
    } else{
        console.log("no new upload");
        onSuccess(downloadUrls);
        clearnup(uid,downloadUrls);
    }
}
const clearnup =(uid,validUrls)=>{
    //TODO : need to remove the image that is not in use.
}

export default{
    uploadFile,
}