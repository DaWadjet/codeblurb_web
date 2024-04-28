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
    meta: {
      successMessage: "Rating submitted",
    },
    mutationFn: async (props: RatingProps) => {
      await ratingMutationFn({
        bundleId: props.bundleId,
        review: {
          rating: props.review.rating,
          comment:
            props.review.comment || "Note: No review was provided by the user.",
        },
      });
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ContentKeys.contentBundleDetailsQuery(props.bundleId),
        }),
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === ContentKeys.contentBundlesQuery()[0],
        }),
      ]);
    },
    mutationKey: RatingKeys.ratingMutation,
  });
};
