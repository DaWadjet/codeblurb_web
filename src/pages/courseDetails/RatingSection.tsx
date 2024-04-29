import useCourseDetailsMagicQuery from "@/hooks/useCourseDetailsMagicQuery";
import useUsername from "@/hooks/useUsername";
import { useRatingMutation } from "@/network/ratings";
import { Button } from "@/shadcn/ui/button";
import { Rating } from "@/shadcn/ui/rating";
import { Textarea } from "@/shadcn/ui/textarea";
import { Loader2Icon } from "lucide-react";
import { FC, useMemo, useState } from "react";

const RatingSection: FC = () => {
  const { course } = useCourseDetailsMagicQuery();
  const username = useUsername();
  const ratingOfUser = useMemo(
    () => course.ratings.ratings?.find((r) => r.username === username),
    [course.ratings, username]
  );

  const [rating, setRating] = useState<number>(ratingOfUser?.rating ?? 0);
  const [comment, setComment] = useState<string>(ratingOfUser?.comment ?? "");
  const { mutate, isPending } = useRatingMutation();

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-medium leading-none">
        {ratingOfUser ? "Your review" : "Add your review!"}
      </h3>
      <Rating
        rating={rating}
        onRatingChange={ratingOfUser ? undefined : setRating}
      />

      <Textarea
        className="h-36 resize-none"
        placeholder="Share your opinions with fellow learners!"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isPending || !!ratingOfUser}
      />
      {!ratingOfUser && (
        <Button
          className="self-end"
          onClick={() =>
            !isPending &&
            mutate({
              bundleId: Number(course.id),
              review: {
                rating,
                comment,
              },
            })
          }
        >
          {isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      )}
    </div>
  );
};

export default RatingSection;
