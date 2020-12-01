import firebase from 'firebase';
import _ from "lodash";


const prefixImage="images";
const metadata ={
    contentType:"jpg"
}

const uploadFile =async (userId,listOfUri,onSuccess,onError) =>{

    const downloadUrls =Array.apply(null, Array(listOfUri.length));
    const allPromises = [];
    console.debug("Place 1",listOfUri);
     console.debug("Place 1",downloadUrls);
    await listOfUri.forEach(async (uri,index)=>{
         console.debug("Place 5",index);
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
                                console.log("place 7");
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
        },(error)=>{
             console.error("upload error",error);
             onError(error);
        });
    } else{
        console.debug("Place 4");
        console.log("no new upload");
        onSuccess(downloadUrls);
    }
}


export default{
    uploadFile,
}