import React,{useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { TabView } from 'react-native-tab-view';
import MaidProfileViewScreen from "./MaidProfileViewScreen";
import MaidRatingScreen from "./MaidRatingScreen";

import defaultStyles from "../../config/styles";

const initialLayout = { width: defaultStyles.dimension.width };
const KEY_PROFILE='profile';
const KEY_RATING='rating';

const MaidDetailsScreen = (props) => {
    // console.debug("MaidDetailsScreen route",props.route);
    const [index,setIndex] = useState(0);
    const [routes] =useState([
        {key:KEY_PROFILE,title:"Maid Profile"},
        {key:KEY_RATING,title:"Rating by Maid DB"}
    ]);
    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case KEY_PROFILE:
            return <MaidProfileViewScreen {...props}/>;
            case KEY_RATING:
            return <MaidRatingScreen {...props}/>
        }
        };
    return ( <TabView
    navigationState={{index,routes}}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={initialLayout}
        
    /> );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
 
export default MaidDetailsScreen;