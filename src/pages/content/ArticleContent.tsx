import useGoToNextContent from "@/hooks/useGoToNextContent";
import { useViewedContent } from "@/hooks/useViewedContent";
import { Button } from "@/shadcn/ui/button";
import { cn } from "@/shadcnutils";
import "github-markdown-css";
import { FC, useCallback } from "react";
import Markdown from "react-markdown";
import { useEffectOnce } from "react-use";
import remarkGfm from "remark-gfm";

const ArticleContent: FC = () => {
  const { goToNextContent, hasNextContent } = useGoToNextContent();
  const { viewedContent } = useViewedContent();
  if (!viewedContent?.contentType || viewedContent.contentType !== "ARTICLE") {
    throw new Error("This component should only be used for Article content");
  }
  useEffectOnce(() => {
    console.log("seen");
    //call seen
  });

  const onCompleted = useCallback(() => {
    console.log("set completed");
    goToNextContent();
  }, [goToNextContent]);

  return (
    <div className="flex flex-col gap-10">
      <div className={cn("markdown-body", "bg-background text-foreground")}>
        <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
          {viewedContent.markdown}
        </Markdown>
      </div>
      <Button className="w-32 self-end" onClick={onCompleted}>
        {hasNextContent ? "Next Section" : "Back To Course"}
      </Button>
    </div>
  );
};

export default ArticleContent;
