import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications';
import {updateUserProfile} from "../database/user";
const GRANTED='granted';
const KEY_PUSHNOTIFICATION_TOKEN_EXPO="push_notification_token_expo";
const KEY_PUSHNOTIFICATION_TOKEN_DEVICE="push_notification_token_device";

const storePushNotificationToken=async(uid)=>{
        const deviceToken= await Notifications.getDevicePushTokenAsync();
        const expoToken = await Notifications.getExpoPushTokenAsync();

        console.debug("Device Push Notification Token", deviceToken);
        console.debug("Expo Push Notification Token", expoToken);
        
        updateUserProfile(uid,{
             KEY_PUSHNOTIFICATION_TOKEN_EXPO:expoToken,
             KEY_PUSHNOTIFICATION_TOKEN_DEVICE:deviceToken
        });
}

const _registerPushNotification=async (uid)=>{

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
    /*Check existing permission*/
   const existingPermissions= await Permissions.getAsync(Permissions.NOTIFICATIONS);
   console.debug("existingPermissions", existingPermissions);
   if(existingPermissions.status=== GRANTED){
     storePushNotificationToken(uid);
     return; 
   }
   if(existingPermissions.status!== GRANTED){ /* not granted yet, ask for permission */
        const newPermissions  = await Permissions.askAsync(Permissions.NOTIFICATIONS);  //not prompt?
        console.debug("Permissions.askAsync", newPermissions);
        if(newPermissions.status === GRANTED){
          storePushNotificationToken(uid);
        }
   }
   return;   
}


const _handleNotification =(notification)=>{
     console.log("_handleNotification",notification)

}
const _handleNotificationResponse =(response)=>{
     console.log("_handleNotificationResponse",response)
     
}
export const handlePushNotification=()=>{
     const listener1 = Notifications.addNotificationReceivedListener(_handleNotification);
     const listener2 = Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);
     return ()=>{
          listener1.remove();
          listener2.remove();
     }

}

export const foregroundPushNotification =()=>{
     Notifications.setNotificationHandler({
          handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
          }),
          });

}
export const initializePushNotification =async (uid)=>{
     _registerPushNotification(uid);
}



        //   Push Notification Token Object {
        //   "data": "ExponentPushToken[8G9G4SMGWCuYGKwIvHiYj4]",
        //   "type": "expo",
        // }
       //         sendPushNotification get called Object {
       //   "data": "9593887f2279283c25a4004753c83e45e41bab7c65249ba7c175923b7ba08ffe",
       //   "type": "ios",
       // }


//        _handleNotification Object {
//   "date": 1607611055.6043682,
//   "request": Object {
//     "content": Object {
//       "attachments": Array [],
//       "badge": null,
//       "body": "Hello world!",
//       "categoryIdentifier": "",
//       "data": Object {
//         "aps": Object {
//           "alert": Object {
//             "body": "Hello world!",
//             "launch-image": "",
//             "subtitle": "",
//             "title": "Maid DB",
//           },
//           "category": "",
//           "sound": "default",
//           "thread-id": "",
//         },
//         "experienceId": "@hyfandrea/maiddb-app",
//         "screen": "testscreen",
//       },
//       "launchImageName": "",
//       "sound": "default",
//       "subtitle": null,
//       "summaryArgument": null,
//       "summaryArgumentCount": 0,
//       "targetContentIdentifier": null,
//       "threadIdentifier": "",
//       "title": "Maid DB",
//     },
//     "identifier": "3DC291A3-6D7D-47DD-B114-08B2BA39B032",
//     "trigger": Object {
//       "class": "UNPushNotificationTrigger",
//       "type": "push",
//     },
//   },
// }

// _handleNotificationResponse Object {
//   "actionIdentifier": "expo.modules.notifications.actions.DEFAULT",
//   "notification": Object {
//     "date": 1607611055.6043682,
//     "request": Object {
//       "content": Object {
//         "attachments": Array [],
//         "badge": null,
//         "body": "Hello world!",
//         "categoryIdentifier": "",
//         "data": Object {
//           "aps": Object {
//             "alert": Object {
//               "body": "Hello world!",
//               "launch-image": "",
//               "subtitle": "",
//               "title": "Maid DB",
//             },
//             "category": "",
//             "sound": "default",
//             "thread-id": "",
//           },
//           "experienceId": "@hyfandrea/maiddb-app",
//           "screen": "testscreen",
//         },
//         "launchImageName": "",
//         "sound": "default",
//         "subtitle": null,
//         "summaryArgument": null,
//         "summaryArgumentCount": 0,
//         "targetContentIdentifier": null,
//         "threadIdentifier": "",
//         "title": "Maid DB",
//       },
//       "identifier": "3DC291A3-6D7D-47DD-B114-08B2BA39B032",
//       "trigger": Object {
//         "class": "UNPushNotificationTrigger",
//         "type": "push",
//       },
//     },
//   },
// }