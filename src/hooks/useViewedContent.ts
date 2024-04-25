import useContentsOfBundle from "@/hooks/useContentsOfBundle";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const useViewedContent = () => {
  const { contentId } = useParams<{
    contentId: string;
  }>();

  const { contents, isPending, courseTitle } = useContentsOfBundle();

  const viewedContent = useMemo(
    () => contents.find((item) => item.id === Number(contentId)),
    [contents, contentId]
  );

  const returnValue = useMemo(
    () => ({
      viewedContent,
      isPending,
      courseTitle,
    }),
    [viewedContent, isPending, courseTitle]
  );

  return returnValue;
};

export default useViewedContent;
