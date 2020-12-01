import React, { useRef } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import ImageInput from "./ImageInput";
import { ScrollView } from "react-native-gesture-handler";
function ImageInputList({ imageUris = [], onAddImage, onRemoveImage }) {
  const scrollView = useRef();
  return (
    <View>
      <ScrollView
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
        ref={scrollView}
      >
        <View style={styles.container}>
          {imageUris.map((imageUri,index) => (
            <View key={index} style={styles.image}>
              <ImageInput
                imageUri={imageUri}
                onChangeImage={() => onRemoveImage(imageUri)}
              />
            </View>
          ))}
          <ImageInput onChangeImage={(imageUri) => onAddImage(imageUri)} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    marginRight: 5,
  },
});
export default ImageInputList;
