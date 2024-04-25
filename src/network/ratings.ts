import client from "@/network/axiosClient";
import { ContentKeys } from "@/network/content";
import { RatingRequest, RatingResponse } from "@/types/ApiTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type RatingProps = {
  review: RatingRequest;
  bundleId: number;
};
export const RatingKeys = {
  ratingMutation: ["rating"] as const,
} as const;

const ratingMutationFn = async ({ bundleId, review }: RatingProps) => {
  const response = await client.post<RatingResponse>(
    "/content/ratings/" + bundleId,
    review
  );
  return response.data;
};

export const useRatingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (props: RatingProps) => {
      await ratingMutationFn(props);
      await queryClient.refetchQueries({
        queryKey: ContentKeys.contentBundleDetailsQuery(props.bundleId),
      });
    },
    mutationKey: RatingKeys.ratingMutation,
  });
};
