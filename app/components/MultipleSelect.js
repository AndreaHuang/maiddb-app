import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import colors from "../config/color";
import defaultStyles from "../config/styles";
import MultiSelectItem from "./MultiSelectItem";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
function MultipleSelect({ items, onSelect }) {
  console.log("test", items);
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item.key} style={styles.image}>
          <MultiSelectItem item={item} onToggleItem={onSelect} />
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {},
});
export default MultipleSelect;
