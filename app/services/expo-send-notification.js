import {sendPushNotification}  from "../api/expoPushApi";

export const sendNotification =(expoToken)=>{
    

    const request= {
    "to": expoToken,
    "sound": "default",
    "body": "Hello world!",
    "title":"Maid DB",
    "data":{
        "screen":"testscreen"
    }
  }

    sendPushNotification(request);
}