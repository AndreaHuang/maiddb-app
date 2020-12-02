import React, { useEffect,useState } from 'react';
import {FlatList,Text} from "react-native";

import Screen from '../components/Screen';
import AppText from '../components/AppText';
import ActivityIndicator from "../components/ActivityIndicator";
import maidProfileDB from "../database/maidProfile";
const MaidListScreen = () => {
    const [data,setData] = useState([]);
    const [loading,setLoading] =useState(false);
    useEffect(()=>{
        const loadList = async ()=> {
            const result = await maidProfileDB.search();
            console.debug("searchResult",result);
            setData(result);
        }
        loadList();
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
                console.debug("item",item);
                console.debug("item.basicInfo",item.basicInfo);
                    return (<>
                    <Text>{item.basicInfo.name}</Text></>);
            }}
        ></FlatList>
       </Screen>);
}
 
export default MaidListScreen;