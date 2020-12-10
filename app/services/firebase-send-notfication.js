import {fcm_serverKey} from "./firebaseConfig";
import constants from "expo-constants";

export const sendPushNotification=async (nativePushNotificationToken)=>{
    console.log("constants.manifest.id",constants.manifest.id);
    console.log("sendPushNotification get called",nativePushNotificationToken);
    const body ={
                to: nativePushNotificationToken,
                priority: 'normal',
                notification: {
                    // experienceId: constants.manifest.id,
                    title: "You've got mail",
                    body: 'Hello world!',
                },
            };
    const bodyString = JSON.stringify(body);
            console.log("body",bodyString);
    try{
        const result = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `key=${fcm_serverKey}`,
            },
            body: body.json(),
        }).then(response=>response.json()).then(data=>{
            console.log(data);
            //             Object {
            //   "canonical_ids": 0,
            //   "failure": 1,
            //   "multicast_id": 1111373531323215900,
            //   "results": Array [
            //     Object {
            //       "error": "InvalidRegistration",
            //     },
            //   ],
            //   "success": 0,
            // }
        });
        
     } catch(error){
         console.error("sendPushNotification error",error);

     }
}

