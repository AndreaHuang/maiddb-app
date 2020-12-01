import React from 'react';
// import {FlatListSlider} from 'react-native-flatlist-slider';
import Gallery from 'react-native-image-gallery';
const AppImageSlider = ({data}) => {
     let items = data.map((item, i) => {
      //Loop to make image array to show in slider
      return {
        source: {
          uri: item,
        },
      };
    });
    return (  <Gallery
          style={{ maxHeight:200,flex: 1, backgroundColor: 'black' }}
          initialPage="0"
          //initial image to show
          images={items}
        />);
}
 
export default AppImageSlider;