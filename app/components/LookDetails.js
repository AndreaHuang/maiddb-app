import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

import Card from "../components/Card";
import FeedItem from "../components/FeedItem";
import defaultStyles from "../config/styles";

function LookDetails({ look }) {
  console.log(look);
  return (
    <View style={styles.container}>
      <FeedItem
        images={look.images}
        itemId={look.id}
        title={look.title}
        subTitle={look.subTitle}
      />

      <FlatList
        data={look.breakdown}
        keyExtractor={(item, index) => item.id.toString()}
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        numColumns={2}
        decelerationRate={"fast"}
        renderItem={({ item }) => {
          return (
            <Card
              image={item.image}
              title={item.title}
              subTitle={item.subTitle}
              width={defaultStyles.dimension.width * 0.5}
              height={defaultStyles.card.itemHeight * 0.6}
            />
          );
        }}
      />
    </View>
    //same carosel view
    //seperate item price/size/brand/name/ add to bag
    //similar looks, other related link
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default LookDetails;
