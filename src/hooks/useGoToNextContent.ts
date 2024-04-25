import useContentsOfBundle from "@/hooks/useContentsOfBundle";
import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useGoToNextContent = () => {
  const { contentId, courseId } = useParams<{
    contentId: string;
    courseId: string;
  }>();
  const navigate = useNavigate();
  const { contents } = useContentsOfBundle();
  const currentIndex = useMemo(
    () => contents.findIndex((content) => content.id === Number(contentId)),
    [contents, contentId]
  );
  const hasNextContent = useMemo(
    () => currentIndex < contents.length - 1,
    [currentIndex, contents]
  );

  const targetUrl = useMemo(
    () =>
      hasNextContent
        ? `/course/${courseId}/content/${contents[currentIndex + 1].id}`
        : `/course/${courseId}`,
    [hasNextContent, contents, currentIndex, courseId]
  );
  const goToNextContent = useCallback(() => {
    navigate(targetUrl, { replace: true });
  }, [navigate, targetUrl]);

  const returnValue = useMemo(
    () => ({
      goToNextContent,
      hasNextContent,
    }),
    [goToNextContent, hasNextContent]
  );
  return returnValue;
};

export default useGoToNextContent;
