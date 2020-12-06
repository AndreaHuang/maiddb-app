import React, { useEffect,useState,useContext } from 'react';
import {Image,
    FlatList,
    Text,View,TouchableWithoutFeedback,TouchableOpacity, StyleSheet,Alert} from "react-native";
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

const femaleIcon=require("../../assets/female.png");
const maleIcon=require("../../assets/male.png");



const MaidListScreen = ({navigation}) => {
    const {t} = useTranslation();
    const {user} = useContext(AuthContext);
    const handleOpenMaidProfile = (maidProfile) =>{
        navigation.navigate(constants.route.main.maidDetails,{data:maidProfile});
    };
    const [favoriteList,setFavoriteList] =useState([]);
    useEffect(()=>{
       const init = async ()=>{await retrieveFavorite(user.uid,setFavoriteList)};
       init();
    },[])
    
     

    const MaidCard =({data})=>{
        const {basicInfo,user_uid:maid_uid} = data;
        return  <TouchableOpacity onPress={()=>handleOpenMaidProfile(data)} style={styles.container}>
                        <Image style={styles.image} source={  
                            basicInfo.photoURL
                            ?  { url: basicInfo.photoURL } 
                            : (basicInfo.gender ==='f' ? femaleIcon:maleIcon)} />
                       
                        <View style={styles.textContainer}>
                            <AppText numberOfLines={1} style={styles.title}>
                                {basicInfo.name}
                            </AppText>
                            <AppText numberOfLines={3} style={styles.subTitle}>
                                {t(basicInfo.nationality)}  {calculateAge(basicInfo.birthdate) }
                            </AppText>
                        </View>
                       <View style={styles.iconContainer}>
                        {_.includes(favoriteList,maid_uid) ?
                         <ActionIcon iconName="heart" onPress={() => {toggleFavorite(user.uid, maid_uid,setFavoriteList)}} />
                         :
                        <ActionIcon iconName="heart-outline" onPress={() => {toggleFavorite(user.uid,maid_uid,setFavoriteList)}} />}
                    </View>
        </TouchableOpacity>

        }

    const [data,setData] = useState([]);
    const [loading,setLoading] =useState(false);
    useEffect(()=>{
        const loadMaidList = async ()=> {
            setLoading(true);
            const result = await maidProfileDB.search();
            setLoading(false);
            console.debug("searchResult",result);
            setData(result);
        }
        loadMaidList();
    },[])
    return (<Screen> 
        <ActivityIndicator visible={loading} />
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
 
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
  },
  iconContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  detailsContainer: {
       flexDirection: "row",
    marginLeft: 15,
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    marginTop: 10,
    justifyContent: "center",
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
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },


});
export default MaidListScreen;