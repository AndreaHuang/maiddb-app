import React,{useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { TabView,TabBar } from 'react-native-tab-view';
import MaidProfileViewScreen from "./MaidProfileViewScreen";
import MaidRatingScreen from "./MaidRatingScreen";
import MaidProfileHeaderSection from "../maid/MaidProfileHeaderSection";
import { useTranslation } from 'react-i18next';
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import i18n from '../../config/i18n';
import defaultStyles from "../../config/styles";

const initialLayout = { width: defaultStyles.dimension.width };
const KEY_PROFILE='profile';
const KEY_RATING='rating';

const MaidDetailsScreen = (props) => {
    const profile = props.route.params.data;
    const {t} = useTranslation();
    console.debug("MaidDetailsScreen route",props.route);
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
<>
    <MaidProfileHeaderSection data={profile}/>
    <TabView
    renderTabBar={renderTabBar}
    navigationState={{index,routes}}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={initialLayout}
        
    /> 
    </>);
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
 
export default MaidDetailsScreen;