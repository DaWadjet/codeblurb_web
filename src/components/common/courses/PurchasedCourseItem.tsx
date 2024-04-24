import { FC } from "react";

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
import { ShoppingItemResponse } from "@/types/ApiTypes";
import capitalize from "lodash/capitalize";
import { useNavigate } from "react-router-dom";

const PurchasedCourseItem: FC<{ course: ShoppingItemResponse }> = ({
  course,
}) => {
  const navigate = useNavigate();
  const technologies = ["Java"];

  return (
    <Card
      onClick={() => navigate(`/course/${course.id}`)}
      className="overflow-clip hover:border-card-foreground/40 transition-all duration-150 h-full w-full cursor-pointer justify-between flex flex-col"
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={18 / 9}>
          <img
            src={
              course.contentBundle?.imageUrl ??
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
          {technologies.join(", ")} -{" "}
          {capitalize(course.contentBundle?.skillLevel)}
        </p>
      </CardContent>

      <CardFooter className="p-3 pt-0 flex flex-col gap-2 items-start">
        <Progress value={course.contentBundle?.progress} className="h-2" />
        <div className="flex justify-between items-start w-full">
          <p className="text-muted-foreground text-sm">
            {course?.contentBundle?.progress
              ? "Start learning"
              : course.contentBundle?.progress === 100
              ? "Completed"
              : `${course.contentBundle?.progress ?? 0}% completed`}
          </p>
          <div
            className="text-xs text-muted-foreground flex flex-col items-center"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/course/${course.id}/?tab=reviews`);
            }}
          >
            <p>Leave your rating</p>
            <Rating
              rating={0}
              size={10}
              filledClassName="text-amber-500"
              hoverClassName="text-amber-300"
              onRatingChange={() => {}}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default PurchasedCourseItem;
