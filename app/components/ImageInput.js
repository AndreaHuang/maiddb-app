import React, { useEffect } from "react";
import { Image, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/color";
import { Colors } from "react-native/Libraries/NewAppScreen";

function ImageInput({ imageUri = null, onChangeImage }) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    let { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) {
      alert("Permission to access camera roll is required!");
    }
  };
  const selectImage = async () => {
    if (!imageUri) {
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      console.log(pickerResult);
      if (pickerResult && pickerResult.uri) {
        onChangeImage(pickerResult.uri);
      }
      return;
    } else {
      Alert.alert("Delete", "Are you sure to delete this image ?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        {!imageUri && (
          <MaterialCommunityIcons
            name="camera"
            size={30}
            color={colors.medium}
          ></MaterialCommunityIcons>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    overflow: "hidden",
    width: 100,
  },
  image: {
    height: 100,
    width: 100,
  },
});
export default ImageInput;
