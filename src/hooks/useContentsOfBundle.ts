import useCourseDetailsMagicQuery from "@/hooks/useCourseDetailsMagicQuery";
import { useMemo } from "react";

const useContentsOfBundle = () => {
  const { course, isLoading } = useCourseDetailsMagicQuery();

  const returnValue = useMemo(
    () => ({
      contents: course.purchasedContents ?? [],
      isPending: isLoading,
      courseTitle: course.title,
    }),
    [course, isLoading]
  );

  return returnValue;
};
export default useContentsOfBundle;
