import React, { useState } from "react";
import { Animated, FlatList,Image, View, StyleSheet } from "react-native";

import Card from "../components/Card";
import colors from "../config/color";
import defaultStyles from "../config/styles";

const width = defaultStyles.dimension.width;
function Carosel({ data }) {
  if(!data) return null;
  const [activeIndex, setAcitveIndex] = useState();
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id}
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate={"fast"}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <Card image={item} />;
          // return <Image source={{url:item}} style={{height:200,width:200}} />
        }}
      ></FlatList>
      <View style={styles.paginationContainer}>
        {data.map((item, i) => {
          let opacityValue = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i}
              style={[styles.dot, { opacity: opacityValue }]}
            />
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal:15,
    justifyContent:"center"
  },
  dot: {
    borderRadius: 4,
    height: 8,
    width: 8,
    backgroundColor: colors.primary,
    margin: 6,
  },
  paginationContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
export default Carosel;
