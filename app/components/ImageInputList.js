import React, { useRef } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import ImageInput from "./ImageInput";
import { ScrollView } from "react-native-gesture-handler";
function ImageInputList({ imageUris = [], onAddImage, onRemoveImage }) {
  const scrollView = useRef();
  console.log(imageUris);
  return (
    <View>
      <ScrollView
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
        ref={scrollView}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
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
