import useGoToNextContent from "@/hooks/useGoToNextContent";
import { useViewedContent } from "@/hooks/useViewedContent";
import { useCompletedMutation, useSeenMutation } from "@/network/progress";
import { Button } from "@/shadcn/ui/button";
import { FC, useCallback, useState } from "react";
import Markdown from "react-markdown";
import { useEffectOnce } from "react-use";
import remarkGfm from "remark-gfm";

const ArticleContent: FC = () => {
  const { goToNextContent, hasNextContent } = useGoToNextContent();
  const { viewedContent } = useViewedContent();

  const { mutate: markAsSeen } = useSeenMutation();
  const { mutate: markAsCompleted } = useCompletedMutation();

  if (!viewedContent?.contentType || viewedContent.contentType !== "ARTICLE") {
    throw new Error("This component should only be used for Article content");
  }

  const [seen, setSeen] = useState<boolean>(
    viewedContent.status !== "NOT_SEEN"
  );
  const [completed, setCompleted] = useState<boolean>(
    viewedContent.status === "COMPLETED"
  );

  useEffectOnce(() => {
    if (!seen) {
      markAsSeen(viewedContent.id!);
      setSeen(true);
    }
  });

  const onCompleted = useCallback(() => {
    if (!completed) {
      markAsCompleted(viewedContent.id!);
      setCompleted(true);
    }
    goToNextContent();
  }, [completed, markAsCompleted, viewedContent.id, goToNextContent]);

  return (
    <div className="flex flex-col gap-10">
      <div className="prose dark:prose-invert">
        <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
          {viewedContent.markdownText}
        </Markdown>
      </div>
      <Button className="w-32 self-end" onClick={onCompleted}>
        {hasNextContent ? "Next Section" : "Back To Course"}
      </Button>
    </div>
  );
};

export default ArticleContent;
