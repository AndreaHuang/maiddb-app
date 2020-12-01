import firebase from 'firebase';
import _ from "lodash";


const prefixImage="images";


const uploadFile =async (userId,listOfUri,onSuccess,onError) =>{


    const metadata ={
        contentType:"jpg"
    }
    listOfUri.forEach(async (uri)=>{
        if(_.startsWith(uri,"https://")){ //previously uploaded files;
            onSuccess(uri);
        }
        let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        let name= new Date().getTime() +".jpg";
        const uploaded = await fetch(uploadUri);
        const blob = await uploaded.blob();
        
       const uploadTask= firebase.storage().ref()
        // storage().ref()
        .child(prefixImage+"/"+userId +"/"+name).put(blob,metadata);
        

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        //     switch (snapshot.state) {
        //         case firebase.storage.TaskState.PAUSED: // or 'paused'
        //         console.log('Upload is paused');
        //         break;
        //         case firebase.storage.TaskState.RUNNING: // or 'running'
        //         console.log('Upload is running');
        //         break;
        //     }
        }, function(error) {
            onError(error);
            // // A full list of error codes is available at
            // // https://firebase.google.com/docs/storage/web/handle-errors
            // switch (error.code) {
            //     case 'storage/unauthorized':
            //     // User doesn't have permission to access the object
            //     break;
            //     case 'storage/canceled':
            //     // User canceled the upload
            //     break;
            //     case 'storage/unknown':
            //     // Unknown error occurred, inspect error.serverResponse
            //     break;
                
            // }
        }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(onSuccess);
        });

    });
}


export default{
    uploadFile,
}