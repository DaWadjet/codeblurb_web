import useCourseDetailsMagicQuery from "@/hooks/useCourseDetailsMagicQuery";
import { Rating } from "@/shadcn/ui/rating";
import { Separator } from "@/shadcn/ui/separator";
import dayjs from "dayjs";
import { FC } from "react";

const CourseReviewsTab: FC = () => {
  const { course } = useCourseDetailsMagicQuery();
  return (
    <div className="flex flex-col gap-5">
      {(course.ratings?.ratings ?? []).map((review) => (
        <div className="flex flex-col" key={review.createdAt}>
          <div className="flex justify-between mb-1">
            <h4 className="text-lg font-semibold">{review.username}</h4>
            <p className="text-xs text-muted-foreground">
              {dayjs(review.createdAt).format("YYYY/MM/DD")}
            </p>
          </div>
          <Rating rating={review.rating!} size={16} />
          <p className="text-base mt-3">{review.comment}</p>
          <Separator className="mt-5" />
        </div>
      ))}
      {!course.ratings?.ratings?.length && (
        <div className="flex flex-col items-center justify-center gap-4 px-5 my-20">
          <h3 className="text-xl font-semibold">No reviews found!</h3>
          <span className="text-muted-foreground text-center">
            Be the first one to review this course!
          </span>
        </div>
      )}
    </div>
  );
};

export default CourseReviewsTab;
