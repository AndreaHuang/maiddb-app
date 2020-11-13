import { AsyncStorage } from "react-native";

const store = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Fail to cache ", key, value, error);
  }
};

const retrieve = async (key) => {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch {
    console.error("Fail to cache ", key, value);
  }
};

const keys = {
  LANGUAGE: "language",
};

export default { store, retrieve, keys };
