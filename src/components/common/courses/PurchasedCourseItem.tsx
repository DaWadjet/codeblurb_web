import { FC, useMemo } from "react";

import useUsername from "@/hooks/useUsername";
import { AspectRatio } from "@/shadcn/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { Progress } from "@/shadcn/ui/progress";
import { Rating } from "@/shadcn/ui/rating";
import { MinimalContentBundleResponse } from "@/types/ApiTypes";
import capitalize from "lodash/capitalize";
import { useNavigate } from "react-router-dom";

const PurchasedCourseItem: FC<{ course: MinimalContentBundleResponse }> = ({
  course,
}) => {
  const navigate = useNavigate();
  const username = useUsername();
  const technologies = ["Java"];
  const progress = (course?.progress ?? 0) * 100;

  const ratingOfUser = useMemo(() => {
    return course.ratings?.ratings?.find((r) => r.username == username);
  }, [course.ratings?.ratings, username]);

  return (
    <Card
      onClick={() => navigate(`/course/${course.id}`)}
      className="overflow-clip hover:border-card-foreground/40 transition-all duration-150 h-full w-full cursor-pointer justify-between flex flex-col"
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={18 / 9}>
          <img
            src={
              course?.imageUrl ??
              "https://fireship.io/courses/js/img/featured.webp"
            }
            alt={course.title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <div className="p-3">
          <CardTitle className="text-xl">{course.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <p className="text-sm text-muted-foreground">
          {technologies.join(", ")} - {capitalize(course?.skillLevel)}
        </p>
      </CardContent>

      <CardFooter className="p-3 pt-0 flex flex-col gap-2 items-start">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between items-start w-full">
          <p className="text-muted-foreground text-sm">
            {progress === 0
              ? "Start learning"
              : progress === 100
              ? "Completed"
              : `${progress}% completed`}
          </p>
          <div
            className="text-xs text-muted-foreground flex flex-col items-center"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/course/${course.id}/?tab=reviews`);
            }}
          >
            <p>{ratingOfUser ? "Your review" : "Leave a review!"}</p>
            <Rating
              rating={ratingOfUser?.rating ?? 0}
              size={10}
              onRatingChange={ratingOfUser ? undefined : () => {}}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default PurchasedCourseItem;
