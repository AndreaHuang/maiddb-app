import { create } from "apisauce";
// import Config from "react-native-config";
import config from "../config/env";

console.log("URL:",config.API_URL);
const client = create({
  baseURL: config.API_URL,
  timeout: 3000,
});

export default client;
