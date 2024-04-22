import client from "@/network/axiosClient";
import { useMutation } from "@tanstack/react-query";
export const ProgressKeys = {
  seenMutation: ["seenMutation"] as const,
  completedMutation: ["completedMutation"] as const,
} as const;

const seenMutationFn = async (contentId: number) => {
  const response = await client.patch<void>("/seen/" + contentId);
  console.log(response.data);
  return response.data;
};

const completedMutationFn = async (contentId: number) => {
  const response = await client.patch<void>("/completed/" + contentId);
  console.log(response.data);
  return response.data;
};

export const useSeenMutation = () => {
  return useMutation({
    mutationKey: ProgressKeys.seenMutation,
    mutationFn: seenMutationFn,
    meta: {
      showToast: false,
    },
  });
};

export const useCompletedMutation = () => {
  return useMutation({
    mutationKey: ProgressKeys.completedMutation,
    mutationFn: completedMutationFn,
    meta: {
      showToast: false,
    },
  });
};
