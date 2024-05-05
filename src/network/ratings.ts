import useRefetchOnCourseStatusChange from "@/hooks/useRefetchOnCourseStatusChange";
import client from "@/network/axiosClient";
import { RatingRequest, RatingResponse } from "@/types/exportedApiTypes";
import { useMutation } from "@tanstack/react-query";
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

export const useRatingMutation = (courseId: number) => {
  const refetch = useRefetchOnCourseStatusChange(courseId);
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
      await refetch();
    },
    mutationKey: RatingKeys.ratingMutation,
  });
};
