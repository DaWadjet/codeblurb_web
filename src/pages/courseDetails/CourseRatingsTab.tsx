import { Rating } from "@/shadcn/ui/rating";
import { Separator } from "@/shadcn/ui/separator";
import { dummyReviews } from "@/utils/dummyData";
import { FC } from "react";

const CourseReviewsTab: FC = () => {
  return (
    <div className="flex flex-col gap-5">
      {dummyReviews.map((review) => (
        <div className="flex flex-col" key={review.id}>
          <div className="flex justify-between mb-1">
            <h4 className="text-lg font-semibold">{review.name}</h4>
            <p className="text-xs text-gray-400">{review.date}</p>
          </div>
          <Rating rating={review.rating} size={16} />
          <p className="text-base mt-3">{review.comment}</p>
          <Separator className="mt-5" />
        </div>
      ))}
    </div>
  );
};

export default CourseReviewsTab;
