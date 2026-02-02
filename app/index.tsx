import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRef, useState } from "react";
import { Button } from "react-native";
import { VideoView, VideoViewRef, useVideoPlayer } from "react-native-video";

export default function Index() {
  const videoView = useRef<VideoViewRef>(null);

  const [showControls, setShowControls] = useState(false);

  const player = useVideoPlayer(
    { uri: "https://www.w3schools.com/html/mov_bbb.mp4" },
    (p) => {
      p.loop = true;
      p.play();
    },
  );

  const willExitFullscreen = () => {
    console.log("willExitFullscreen");
  };

  const onFullscreenChange = (fullscreen: boolean) => {
    console.log("onFullscreenChange", fullscreen);
    if (!fullscreen) {
      setShowControls(false);
    }
  };

  return (
    <ThemedView style={{ flex: 1, justifyContent: "center" }}>
      <ThemedText>showControls: {String(showControls)}</ThemedText>
      <VideoView
        ref={videoView}
        player={player}
        controls={showControls}
        willExitFullscreen={willExitFullscreen}
        onFullscreenChange={onFullscreenChange}
        style={{ width: "100%", aspectRatio: 16 / 9 }}
      />
      <Button
        title="Play / Pause"
        onPress={() => {
          if (player.isPlaying) {
            player.pause();
          } else {
            player.play();
          }
        }}
      />
      <Button
        title="Fullscreen"
        onPress={() => {
          setShowControls(true);
          videoView.current?.enterFullscreen();
        }}
      />
    </ThemedView>
  );
}
