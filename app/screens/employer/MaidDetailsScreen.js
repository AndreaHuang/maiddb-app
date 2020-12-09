import React,{useState} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import MaidProfileViewScreen from "./MaidProfileViewScreen";
import MaidRatingScreen from "./MaidRatingScreen";

import defaultStyles from "../../config/styles";

const initialLayout = { width: defaultStyles.dimension.width };

const MaidDetailsScreen = (props) => {
    console.debug("MaidDetailsScreen route",props.route);
    const [index,setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key:"profile",title:"Maid Profile"},
        {key:"rating",title:"Rating by Maid DB"}
    ]);
    // const renderScene = SceneMap({
    //     profile:<MaidProfileViewScreen {...props}/>,
    //     rating:<MaidRatingScreen />

    // })
    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'profile':
            return <MaidProfileViewScreen {...props}/>;
            case 'rating':
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