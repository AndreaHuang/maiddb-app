import { create } from "apisauce";
import Config from "react-native-config";
const client = create({
  baseURL: Config.API_URL,
  timeout: 3000,
});

export default client;
