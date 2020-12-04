import React, { useEffect,useState } from 'react';
import {FlatList,Text,TouchableWithoutFeedback,TouchableOpacity, Alert} from "react-native";

import constants from "../../config/constants";
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import ActivityIndicator from "../../components/ActivityIndicator";
import maidProfileDB from "../../database/maidProfile";
import MaidProfileHeaderSection from "../maidProfile/MaidProfileHeaderSection";


const MaidCard =({data,onPress})=>{
   return  <TouchableOpacity onPress ={onPress}>
            <MaidProfileHeaderSection data={data}/>
   </TouchableOpacity>

}
const MaidListScreen = ({navigation}) => {
    const handleOpenMaidProfile = (maidProfile) =>{
        navigation.navigate(constants.route.main.maidDetails,{data:maidProfile});
    };

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
                    return (
                    <MaidCard data={item.basicInfo} onPress={()=>handleOpenMaidProfile(item)}/>);
            }}
        ></FlatList>
       </Screen>);
}
 
export default MaidListScreen;