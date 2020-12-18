import React from 'react';
import { Video } from 'expo-av';
const AppExpoAVPlayer = () => {
    return ( <Video
  source={{ uri: 'https://www.youtube.com/watch?v=rl3pTLWQ8J0' }}
  rate={1.0}
  volume={10.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay={false}
  isLooping={false}
  useNativeControls
  style={{ width: 300, height: 300 }}
/> );
}
 
export default AppExpoAVPlayer;