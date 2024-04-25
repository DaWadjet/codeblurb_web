import { cn } from "@/shadcnutils";
import {
  NewspaperIcon as ArticleIcon,
  Code2 as CodeIcon,
  LucideMessageCircleQuestion as QuestionIcon,
  VideoIcon,
} from "lucide-react";
import { FC, memo } from "react";

const ContentTypeIcon: FC<{
  type: "CODING" | "VIDEO" | "QUIZ" | "ARTICLE" | undefined;
  className?: string;
}> = memo(({ type, className }) => {
  switch (type) {
    case "VIDEO":
      return <VideoIcon className={cn("size-5 inline-block", className)} />;
    case "ARTICLE":
      return <ArticleIcon className={cn("size-5 inline-block", className)} />;
    case "QUIZ":
      return <QuestionIcon className={cn("size-5 inline-block", className)} />;
    case "CODING":
      return <CodeIcon className={cn("size-5 inline-block", className)} />;
    default:
      return null;
  }
});
export default ContentTypeIcon;
