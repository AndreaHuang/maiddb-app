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
          {imageUris.map((imageItem,index) => (
            <View key={index} style={styles.image}>
              <ImageInput
                imageUri={imageItem.uri}
                onChangeImage={() => onRemoveImage(imageItem)}
              />
            </View>
          ))}
          <ImageInput onChangeImage={(imageItem) => onAddImage(imageItem)} />
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
