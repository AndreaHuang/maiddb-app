import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import defaultStyles from "../config/styles";
import AppText from "./AppText";
import Screen from "./Screen";
import PickerItem from "./PickerItem";

import AppButton from "./AppButton";
import i18n from "../config/i18n";

function AppPicker({
  label,
  iconName,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
}) {
   const {t}= useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const width = (100 / numberOfColumns).toFixed(0).toString() + "%";
  console.log("selectedItem",selectedItem);
  return (
    <View style={styles.container}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.valueContainer}>
          {iconName && (
            <MaterialCommunityIcons
              style={styles.icon}
              name={iconName}
              size={20}
              color={defaultStyles.colors.medium}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{t(selectedItem)}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <FlatList
            data={items}
            keyExtractor={(item) => item.label}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <View style={{ width: width }}>
                <PickerItemComponent
                  item={item}
                  onPress={() => {
                    setModalVisible(false);
                    onSelectItem(item);
                  }}
                />
              </View>
            )}
          />
        </Screen>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    marginHorizontal:15,
     alignItems:"center"
    
  },
  label:{
    flex:1
  },
  valueContainer: {
     flex:2,
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
    padding: 15,
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
});
export default AppPicker;
