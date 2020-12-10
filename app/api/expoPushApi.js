import { create } from "apisauce";
// import Config from "react-native-config";
import config from "../config/env";

const endpoint = "/push/send";

const header = {
    host: "exp.host",
    accept: "application/json",
    'accept-encoding': "gzip, deflate",
    'content-type': "application/json"
}

const client = create({
  baseURL: config.PUSH_API,
  headers: header,
  timeout: 3000,
});



export const sendPushNotification=async (request)=>{
    const response = await client.post(endpoint, request);
    console.debug("sendPushNotification response",response);
}