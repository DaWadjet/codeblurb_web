import useContentsOfBundle from "@/hooks/useContentsOfBundle";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const contentTypePossibilities = [
  "VIDEO",
  "QUIZ",
  "SCRATCH",
  "DRAG_AND_DROP",
  "FILL_THE_GAP",
  "ARTICLE",
] as const;

export type ContentType = (typeof contentTypePossibilities)[number];

export function useViewedContent() {
  const { contentId } = useParams<{
    contentId: string;
  }>();

  const { contents, isPending, courseTitle, courseId } = useContentsOfBundle();

  const viewedContent = useMemo(() => {
    const content = contents.find((item) => item.id === Number(contentId));
    if (!content) return null;

    return content;
  }, [contents, contentId]);

  const returnValue = useMemo(
    () => ({
      viewedContent,
      isPending,
      courseTitle,
      courseId,
    }),
    [viewedContent, isPending, courseTitle, courseId]
  );

  return returnValue;
}
