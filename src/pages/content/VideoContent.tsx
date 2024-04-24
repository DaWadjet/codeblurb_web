import { ElementRef, FC, useCallback, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
const VideoContent: FC = () => {
  const ref = useRef<ElementRef<typeof ReactPlayer>>(null);
  const [duration, setDuration] = useState<number>(0);
  const [seen, setSeen] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const onSeen = useCallback(() => {
    if (seen) return;
    console.log("set seen");
    setSeen(true);
  }, [seen]);

  const onCompleted = useCallback(() => {
    if (completed) return;
    console.log("set completed");
    setCompleted(true);
  }, [completed]);

  const onProgress = useCallback(
    (state: OnProgressProps) => {
      if (state.playedSeconds > 1) onSeen();
      if (state.playedSeconds > duration * 0.9) onCompleted();
    },
    [duration, onSeen, onCompleted]
  );

  return (
    <div className="w-full aspect-video flex">
      <ReactPlayer
        ref={ref}
        url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
        controls
        controlsList="nodownload"
        muted={false}
        onDuration={setDuration}
        onProgress={onProgress}
        style={{
          height: "100%",
          minHeight: "100%",
          width: "100%",
          display: "flex",
          flexGrow: 1,
        }}
      />
    </div>
  );
};

export default VideoContent;
