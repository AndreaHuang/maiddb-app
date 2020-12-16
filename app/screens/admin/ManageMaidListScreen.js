import React, { useContext, useEffect,useState } from 'react';
import {StyleSheet,Text,Alert} from 'react-native';
import { useTranslation } from 'react-i18next';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';

import constants from '../../config/constants';
import i18n from '../../config/i18n';
import defaultStyles from '../../config/styles';
import AllMaidListScreen from "./AllMaidListScreen";
import ToApproveMaidListScreen from "./ToApproveMaidListScreen";
import ToRateMaidListScreen from "./ToRateMaidListScreen";
import AppText from "../../components/AppText";


const initialLayout = { width: defaultStyles.dimension.width};
const KEY_TOAPPROVE='ToApprove'; //status is update pending for approval
const KEY_TORATE='ToRate';//status is pending
const KEY_ALL='All'; //status other than pending, for other action


const ManageMaidListScreen = (props) => {
    const {t} = useTranslation();
    // console.debug("MaidDetailsScreen route",props.route);
    const [index,setIndex] = useState(2);
    const [routes] = useState([
        {key:KEY_TOAPPROVE,title:t("toApprove")},
        {key:KEY_TORATE,title:t("toRate")},
        {key:KEY_ALL,title:t("all")}
    ]);
    const renderScene = ({ route }) => {
        switch (route.key) {
            case KEY_TOAPPROVE:
            return <ToApproveMaidListScreen {...props}/>;
            case KEY_TORATE:
            return <ToRateMaidListScreen {...props}/>
             case KEY_ALL:
            return <AllMaidListScreen {...props}/>;
        };
    }
    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: defaultStyles.colors.primary }}
            style={{ backgroundColor: defaultStyles.colors.white}}
            getLabelText={({ route }) => t(route.title)}
            renderLabel={({ route, focused, color }) => (
                <AppText style={[defaultStyles.smallTitle,focused?{color:defaultStyles.colors.primary}:null]}>
                {t(route.title)}
                </AppText>
    )}
    />
    );


    return ( 
    <TabView
    renderTabBar={renderTabBar}
    navigationState={{index,routes}}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={initialLayout}     
    />
   );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

 
export default ManageMaidListScreen;