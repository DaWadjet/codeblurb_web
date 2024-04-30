import client from "@/network/axiosClient";
import { ContentKeys } from "@/network/content";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const ProgressKeys = {
  seenMutation: ["seenMutation"] as const,
  completedMutation: ["completedMutation"] as const,
} as const;

const seenMutationFn = async (contentId: number) =>
  await client.patch<void>("/content/progress/seen/" + contentId);

const completedMutationFn = async (contentId: number) =>
  client.patch<void>("/content/progress/completed/" + contentId);

export const useSeenMutation = ({
  contentId,
  courseId,
}: {
  contentId: number;
  courseId: number;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ProgressKeys.seenMutation,
    mutationFn: async () => {
      await seenMutationFn(contentId);
      queryClient.refetchQueries({
        queryKey: ContentKeys.contentBundleDetailsQuery(courseId),
      });
    },
    meta: {
      showToast: false,
    },
  });
};

export const useCompletedMutation = ({
  contentId,
  courseId,
}: {
  contentId: number;
  courseId: number;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ProgressKeys.completedMutation,
    mutationFn: async () => {
      await completedMutationFn(contentId);
      queryClient.refetchQueries({
        queryKey: ContentKeys.contentBundleDetailsQuery(courseId),
      });
    },
    meta: {
      showToast: false,
    },
  });
};
