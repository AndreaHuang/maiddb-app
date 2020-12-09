import AsyncStorage from '@react-native-async-storage/async-storage';

const store = async (uid,key, value) => {
  const combinedKey=uid+"_"+key;
  try {
    await AsyncStorage.setItem(combinedKey, JSON.stringify(value));
  } catch (error) {
    console.error(`Fail to cache  ${uid}, ${key}, ${value}`, error);
  }
};

const retrieve = async (uid,key) => {
   const combinedKey=uid+"_"+key;
  try {
    let value = await AsyncStorage.getItem(combinedKey);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (error){
    console.error(`Fail to retrieve cache ${uid} ${key}`,error);
  }
};

const keys = {
  LANGUAGE: "language",
};

export default { store, retrieve, keys };
