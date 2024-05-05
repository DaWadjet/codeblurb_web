import { ContentKeys } from "@/network/content";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const useRefetchOnCourseStatusChange = (courseId: number) => {
  const queryClient = useQueryClient();
  const refetch = useCallback(() => {
    return Promise.all([
      queryClient.refetchQueries({
        queryKey: ContentKeys.contentBundleDetailsQuery(courseId),
      }),
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === ContentKeys.contentBundlesQuery()[0],
      }),
      queryClient.refetchQueries({
        queryKey: ContentKeys.contentBundlesQuery({
          title: "",
          skills: null,
          sort: {
            property: "lastInteractedAt",
            ascending: false,
          },
        }),
      }),
    ]);
  }, [queryClient, courseId]);

  return refetch;
};

export default useRefetchOnCourseStatusChange;
