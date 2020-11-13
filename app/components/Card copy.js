import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";

import colors from "../config/color";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";

function Card({
  image,
  title,
  subTitle,
  width = defaultStyles.dimension.width,
  height = defaultStyles.card.itemHeight,
}) {
  console.log(width, height);
  const dimension = { height: height, width: width - 20 };
  return (
    <View style={[styles.container, dimension]}>
      <Image
        style={[styles.image, dimension]}
        source={{ uri: image.url }}
      ></Image>
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
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  image: {
    borderRadius: 10,
    resizeMode: "contain",
  },
  textContainer: {
    //position: "absolute",
    bottom: 10,
    margin: 10,
    left: 5,
  },
  title: {
    color: colors.white,
    elevation: 5,
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 2,
    marginBottom: 5,
  },
  subTitle: {
    color: colors.white,
    elevation: 5,
    fontSize: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
});
export default Card;
