import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";
function FeedList({ feeds }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={feeds}
        keyExtractor={(item, index) => item.id.toString()}
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate={"fast"}
        renderItem={({ item }) => {
          return (
            <FeedItem
              images={item.images}
              itemId={item.id}
              title={item.title}
              subTitle={item.subTitle}
            />
          );
        }}
      ></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
});
export default FeedList;
