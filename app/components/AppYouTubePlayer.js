import React from 'react';
import YouTube from 'react-native-youtube';
const AppYouTubePlayer = () => {
    return ( <YouTube
  apiKey ='AIzaSyCQqgTSGxnlZAzSFvg7J0XB91TJhsNpndk'
  videoId="rl3pTLWQ8J0"
  play
  fullscreen
  loop
  onReady={e => this.setState({ isReady: true })}
  onChangeState={e => this.setState({ status: e.state })}
  onChangeQuality={e => this.setState({ quality: e.quality })}
  onError={e => this.setState({ error: e.error })}
  style={{ alignSelf: 'stretch', height: 300 }}
/> );
}
 
export default AppYouTubePlayer;