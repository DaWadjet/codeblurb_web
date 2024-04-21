import client from "@/network/axiosClient";
import { RatingRequest, RatingResponse } from "@/types/ApiTypes";
import { useMutation } from "@tanstack/react-query";

export const RatingKeys = {
  ratingMutation: ["rating"] as const,
} as const;

const ratingMutationFn = async ({
  bundleId,
  review,
}: {
  review: RatingRequest;
  bundleId: number;
}) => {
  const response = await client.post<RatingResponse>(
    "/content/ratings/" + bundleId,
    review
  );
  return response.data;
};

export const useRatingMutation = () => {
  return useMutation({
    mutationFn: ratingMutationFn,
    mutationKey: RatingKeys.ratingMutation,
  });
};
