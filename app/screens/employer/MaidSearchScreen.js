import React from 'react';

import {Image,
    FlatList,
    Text,View,TouchableWithoutFeedback,TouchableOpacity,StatusBar, StyleSheet,
    Alert,} from "react-native";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import constants from "../../config/constants";
import colors from "../../config/color";
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import ActionIcon from "../../components/ActionIcon";
import ActivityIndicator from "../../components/ActivityIndicator";
import maidProfileDB from "../../database/maidProfile";
import {toggleFavorite,retrieveFavorite} from "../../database/favoriteMaid";
import {calculateAge} from "../../utiity/AgeCalculator";
import i18n from "../../config/i18n";
import AuthContext from '../../auth/AuthContext';
import ListItemSeperator from '../../components/lists/ListItemSeperator';
import SearchBox from "../../components/SearchBox";
import HeaderSection from "../ScreenHeader";


const femaleIcon=require("../../assets/female.png");
const maleIcon=require("../../assets/male.png");

const MaidSearchScreen = ({navigation}) => {
    return (<Screen style={styles.screen}> 
       
        <ActivityIndicator visible={loading} />
         
        <View style={styles.menuBar}>
            <SearchBox value={searchKeyword} onChange ={setSearchKeyword} onSearch={()=>search(searchKeyword)}
                placeholder ={t("search.a.maid.candidate")}/>
        </View>
         <FlatList
            data={data}
            keyExtractor={(item, index) => item.user_uid}
            scrollEnabled
            snapToAlignment="center"
            scrollEventThrottle={16}
            decelerationRate={"fast"}
            renderItem={({ item }) => {
                    return <MaidCard data={item} /> ;
            }}
        ></FlatList>
       </Screen>); 
}
 
export default MaidSearchScreen;{navigation}