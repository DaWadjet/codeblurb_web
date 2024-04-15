import { Button } from "@/shadcn/ui/button";
import { Rating } from "@/shadcn/ui/rating";
import { Textarea } from "@/shadcn/ui/textarea";
import { FC, useState } from "react";

const RatingSection: FC = () => {
  const [rating, setRating] = useState<number>(0);
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-medium leading-none">Add your review!</h3>
      <Rating rating={rating} onRatingChange={setRating} />

      <Textarea
        className="h-36 resize-none"
        placeholder="Share your opinions with fellow learners!"
      />
      <Button className="self-end" onClick={() => console.log(rating)}>
        Submit
      </Button>
    </div>
  );
};

export default RatingSection;
