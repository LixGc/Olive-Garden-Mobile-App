import * as React from "react";
import { Video } from "expo-av"
export const Videos = () => {
    const videoSources = [
        "https://media.olivegarden.com/images/site/ext/pages/_promotions/video/mobile_OGcomREV_Part1_1.mp4",
        "https://media.olivegarden.com/images/site/ext/pages/_promotions/video/mobile_OGcomREV_Part2_1.mp4",
        "https://media.olivegarden.com/images/site/ext/pages/_promotions/video/mobile_OGcomREV_Part3_1.mp4",
        "https://media.olivegarden.com/images/site/ext/pages/_promotions/video/mobile_OGcomREV_Part4_1.mp4",
        "https://media.olivegarden.com/images/site/ext/pages/_promotions/video/mobile_OGcomREV_Part5_1.mp4",
        "https://media.olivegarden.com/images/site/ext/pages/_promotions/video/mobile_OGcomREV_Part6_1.mp4",
      ];
      const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
      const onPlaybackStatusUpdate = (status) => {
        if (status.didJustFinish) {
          if (currentVideoIndex + 1 < videoSources.length) {
            setCurrentVideoIndex(currentVideoIndex + 1);
          } else {
            setCurrentVideoIndex(0);
          }
        }
      };
    return(
        <Video
        style={{ width: "100%", height: "100%",flex: 10 }}
        source={{ uri: videoSources[currentVideoIndex] }}
        isLooping
        resizeMode="cover"
        shouldPlay
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
    )
}