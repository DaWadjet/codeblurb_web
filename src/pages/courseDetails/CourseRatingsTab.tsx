import useCourseDetailsMagicQuery from "@/hooks/useCourseDetailsMagicQuery";
import { Rating } from "@/shadcn/ui/rating";
import { Separator } from "@/shadcn/ui/separator";
import { FC } from "react";

const CourseReviewsTab: FC = () => {
  const { course } = useCourseDetailsMagicQuery();
  return (
    <div className="flex flex-col gap-5">
      {(course.ratings?.ratings ?? []).map((review) => (
        <div className="flex flex-col" key={review.createdAt}>
          <div className="flex justify-between mb-1">
            <h4 className="text-lg font-semibold">{review.username}</h4>
            <p className="text-xs text-gray-400">{review.createdAt}</p>
          </div>
          <Rating rating={review.rating!} size={16} />
          <p className="text-base mt-3">{review.comment}</p>
          <Separator className="mt-5" />
        </div>
      ))}
    </div>
  );
};

export default CourseReviewsTab;
