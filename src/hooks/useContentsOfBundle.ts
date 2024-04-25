import useCourseDetailsQuery from "@/hooks/useCourseDetailsQuery";
import { useMemo } from "react";

const useContentsOfBundle = () => {
  const { data, isPending } = useCourseDetailsQuery();
  const contents = useMemo(
    () => [
      ...(data?.includedCodings ?? []),
      ...(data?.includedVideos ?? []),
      ...(data?.includedQuizzes ?? []),
    ],
    [data]
  );
  const returnValue = useMemo(
    () => ({
      contents,
      isPending,
      courseTitle: data?.title ?? "",
    }),
    [contents, isPending, data?.title]
  );

  return returnValue;
};
export default useContentsOfBundle;
