import { FC } from "react";

import { AspectRatio } from "@/shadcn/ui/aspect-ratio";
import { Card, CardFooter, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Progress } from "@/shadcn/ui/progress";
import { Ratings } from "@/shadcn/ui/rating";
import { ShoppingItemResponse } from "@/types/ApiTypes";
import { useNavigate } from "react-router-dom";

const PurchasedCourseItem: FC<{ course: ShoppingItemResponse }> = ({
  course,
}) => {
  const navigate = useNavigate();
  const progress: number = 50;

  return (
    <Card
      onClick={() => navigate(`/course/${course.id}`)}
      className="overflow-clip hover:border-card-foreground/40 transition-all duration-150 h-full w-full cursor-pointer justify-between flex flex-col"
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={"https://fireship.io/courses/js/img/featured.webp"}
            alt={course.title}
          />
        </AspectRatio>
        <div className="p-4 pb-2">
          <CardTitle className="text-xl">
            {course.title +
              (course.id! % 2 === 0 ? " longer text to see how it fits" : "")}
          </CardTitle>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pb-2 pt-0 flex flex-col gap-2 items-start">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between items-start w-full">
          <p className="text-muted-foreground text-sm">
            {progress === 0
              ? "Start learning"
              : progress === 100
              ? "Completed"
              : `${progress}% completed`}
          </p>
          <div className="text-xs text-muted-foreground flex flex-col items-center">
            <p>Leave your rating</p>
            <Ratings
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
