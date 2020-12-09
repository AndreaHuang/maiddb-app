import React, { useEffect,useState,useContext } from 'react';
import {Image,
    FlatList,
    Text,View,TouchableWithoutFeedback,TouchableOpacity,
    ScrollView, StyleSheet,
    Alert,} from "react-native";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import constants from "../../config/constants";
import colors from "../../config/color";
import defaultStyles from "../../config/styles";
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import ActionIcon from "../../components/ActionIcon";
import ActivityIndicator from "../../components/ActivityIndicator";
import maidProfileDB from "../../database/maidProfile";

import i18n from "../../config/i18n";
import AuthContext from '../../auth/AuthContext';
import ListItemSeperator from '../../components/lists/ListItemSeperator';
import SearchBox from "../../components/SearchBox";
import ScreenHeader from "../ScreenHeader";
import MaidCard from "../employer/MaidCard";
import {retrieveFavorite,toggleFavorite} from "../../database/favoriteMaid";



const AllMaidListScreen = ({navigation}) => {
    const {t} = useTranslation();
    const {user} = useContext(AuthContext);
   
    const [searchKeyword,setSearchKeyword] =useState("");
    const [favoriteList,setFavoriteList] =useState([]);
    const [ratings,setRatings]=useState([]);

   
    
    const [data,setData] = useState([]);
    const [loading,setLoading] =useState(false);
    useEffect(()=>{
        const loadMaidList = async ()=> {
            setLoading(true);
            const result = await maidProfileDB.search();
            setLoading(false);
            setData(result);
        }
        loadMaidList();
    },[])
    const search = ()=>{
        Alert.alert(searchKeyword);
    }
    const openFilterPage=()=>{
        navigation.navigate(constants.route.employer.favoriteMaidList, {data:user.uid});
    }
    const handleOpenMaidProfile = (maidProfile) =>{
      navigation.navigate(constants.route.admin.manageMaid,{data:maidProfile});
    };
    return (<Screen style={styles.container}> 
       
        <ActivityIndicator visible={loading} />
         
        <View style={styles.menuBar}>
            <SearchBox value={searchKeyword} onChange ={setSearchKeyword} onSearch={()=>search(searchKeyword)}
                placeholder ={t("search.a.maid.candidate")}
                openFilterPage={openFilterPage}/>
       </View>
    
         <FlatList
            data={data}
            keyExtractor={(item, index) => item.user_uid}
            scrollEnabled
            snapToAlignment="center"
            scrollEventThrottle={16}
            decelerationRate={"fast"}
            renderItem={({ item,index }) => {
                    return <MaidCard key={index} data={item} isFavorite={false} 
                    onPress={()=>handleOpenMaidProfile(item)}
                    rating={ratings[item.user_uid]}/> ;
            }}
        ></FlatList>
               
       </Screen>);
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:5
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
  menuBar:{
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center",
    marginTop:10
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
  sectionHeader:{
    marginLeft:20,
    marginTop:20,
    marginBottom:2,
    elevation: 5,
    fontWeight: "bold",
    shadowColor: "#ccc",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 2,
  }


});
 
export default AllMaidListScreen;