import React from "react";
import _ from "lodash";
import {
  View,
  StyleSheet,
} from "react-native";
import colors from "../config/color";
import MultiSelectItem from "./MultiSelectItem";
function MultipleSelect({value, items, onSelect }) {
  if(!items) return null;
  return (
    <View style={styles.container}>
      {items.map((item,index) =>
        { return  <MultiSelectItem  key={index} item={item} selected={_.indexOf(value,item) > -1} onToggleItem={onSelect} /> }
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical:8,
  }
});
export default MultipleSelect;
