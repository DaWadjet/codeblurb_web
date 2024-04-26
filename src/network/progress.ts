import client from "@/network/axiosClient";
import { ContentKeys } from "@/network/content";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const ProgressKeys = {
  seenMutation: ["seenMutation"] as const,
  completedMutation: ["completedMutation"] as const,
} as const;

const seenMutationFn = async (contentId: number) =>
  await client.patch<void>("/seen/" + contentId);

const completedMutationFn = async (contentId: number) =>
  client.patch<void>("/completed/" + contentId);

export const useSeenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ProgressKeys.seenMutation,
    mutationFn: async (contentId: number) => {
      await seenMutationFn(contentId);
      await queryClient.refetchQueries({
        queryKey: ContentKeys.contentBundleDetailsQuery(contentId),
      });
    },
    meta: {
      showToast: false,
    },
  });
};

export const useCompletedMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ProgressKeys.completedMutation,
    mutationFn: async (contentId: number) => {
      await completedMutationFn(contentId);
      await queryClient.refetchQueries({
        queryKey: ContentKeys.contentBundleDetailsQuery(contentId),
      });
    },
    meta: {
      showToast: false,
    },
  });
};
