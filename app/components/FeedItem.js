import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Carosel from "./Carosel";
import ActionIcon from "./ActionIcon";
import colors from "../config/color";
import AppText from "./AppText";

function FeedItem({ images, itemId, title, subTitle }) {
  return (
    <View style={styles.container}>
      <Carosel data={images}></Carosel>
      <View styles={styles.detailsContainer}>
        <View style={styles.iconContainer}>
          <ActionIcon iconName="heart-outline" onPress={() => {}} />
          <ActionIcon iconName="purse-outline" onPress={() => {}} />
          <ActionIcon iconName="telegram" onPress={() => {}} />
        </View>
      </View>
      <View style={styles.textContainer}>
        {title && (
          <AppText numberOfLines={1} style={styles.title}>
            {title}
          </AppText>
        )}
        {subTitle && (
          <AppText numberOfLines={3} style={styles.subTitle}>
            {subTitle}
          </AppText>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  iconContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  detailsContainer: {
    flexDirection: "row",
    marginLeft: 15,
  },
  textContainer: {
    flex: 8,
    marginLeft: 15,
    marginRight: 20,
  },
  title: {
    color: colors.dark,
    elevation: 5,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subTitle: {
    color: colors.medium,
    elevation: 5,
    fontSize: 14,
  },
});
export default FeedItem;
