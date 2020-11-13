import React from "react";
import { View, Image, StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "../config/color";

function Card({ title, subTitle, image }) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={image} />
      <View style={styles.detailsContainer}>
        <AppText numberOfLines={1} style={styles.title}>
          {title}
        </AppText>
        <AppText numberOfLines={2} style={styles.subTitle}>
          {subTitle}
        </AppText>
      </View>
    </View>
  );
}
export default Card;
const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    margin: 15,
    overflow: "hidden",
    marginBottom: 5,
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 5,
  },
});
