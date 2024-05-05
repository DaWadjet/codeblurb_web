import useGoToNextContent from "@/hooks/useGoToNextContent";
import { useViewedContent } from "@/hooks/useViewedContent";
import { useCompletedMutation, useSeenMutation } from "@/network/progress";
import { Button } from "@/shadcn/ui/button";
import { ElementRef, FC, useCallback, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

const VideoContent: FC = () => {
  const { viewedContent, courseId } = useViewedContent();
  if (!viewedContent?.contentType || viewedContent.contentType !== "VIDEO") {
    throw new Error("This component should only be used for video content");
  }

  const { goToNextContent, hasNextContent } = useGoToNextContent();

  const ref = useRef<ElementRef<typeof ReactPlayer>>(null);
  const [duration, setDuration] = useState<number>(0);
  const [seen, setSeen] = useState<boolean>(
    viewedContent.status !== "NOT_SEEN"
  );
  const [completed, setCompleted] = useState<boolean>(
    viewedContent.status === "COMPLETED"
  );

  const { mutate: markAsSeen } = useSeenMutation({
    courseId,
    contentId: viewedContent.id!,
  });
  const { mutate: markAsCompleted } = useCompletedMutation({
    courseId,
    contentId: viewedContent.id!,
  });

  const onSeen = useCallback(() => {
    if (seen) return;
    markAsSeen();
    setSeen(true);
  }, [seen, markAsSeen]);

  const onCompleted = useCallback(() => {
    if (completed) return;
    markAsCompleted();
    setCompleted(true);
  }, [completed, markAsCompleted]);

  const onProgress = useCallback(
    (state: OnProgressProps) => {
      if (state.playedSeconds > 1) onSeen();
      if (state.playedSeconds > duration * 0.9) onCompleted();
    },
    [duration, onSeen, onCompleted]
  );

  return (
    <div className="flex flex-col gap-6 min-h-0 justify-start">
      <h1 className="font-semibold text-3xl ">Video - {viewedContent.name}</h1>
      <div className="aspect-video flex mx-5">
        <ReactPlayer
          ref={ref}
          url={viewedContent.resourceUrl}
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

      <div className="flex flex-col gap-4 items-start mx-5">
        <div className="flex justify-between w-full items-baseline">
          <h2 className="font-semibold text-xl">Section Description</h2>
          <Button
            variant={completed ? "default" : "ghost"}
            className="w-32"
            onClick={goToNextContent}
          >
            {hasNextContent ? "Next Section" : "Back To Course"}
          </Button>
        </div>
        <p className="font-medium">
          {viewedContent.description ?? "No description available"}
        </p>
      </div>
    </div>
  );
};

export default VideoContent;
