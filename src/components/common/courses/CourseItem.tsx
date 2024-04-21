import { ShoppingCart } from "lucide-react";
import { FC } from "react";

import PriceTag from "@/components/PriceTag";
import { AspectRatio } from "@/shadcn/ui/aspect-ratio";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Rating } from "@/shadcn/ui/rating";
import { ShoppingItemResponse } from "@/types/ApiTypes";
import capitalize from "lodash/capitalize";
import { useNavigate } from "react-router-dom";

const CourseItem: FC<{ course: ShoppingItemResponse }> = ({ course }) => {
  const navigate = useNavigate();
  const technologies = ["Java"];

  //TODO level could be displayed on the bottomright of the image

  return (
    // <BackgroundGradient
    //   containerClassName="w-full h-full rounded-lg"
    //   className="grow w-full h-full rounded-lg"
    //   effectClassName="rounded-lg overflow-clip opacity-0 blur-sm"
    // >

    <Card
      onClick={() => navigate(`/course/${course.id}`)}
      className="overflow-clip hover:border-muted-foreground transition-all duration-150 h-full w-full cursor-pointer justify-between flex flex-col"
    >
      <CardHeader className="p-0 relative">
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
        <Button
          variant="outline"
          className="absolute border-muted size-9 p-2 top-0 right-1.5"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Add to cart");
          }}
        >
          <ShoppingCart className="text-foreground" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </CardHeader>
      <CardContent className="p-3 pt-0 flex flex-col gap-0.5">
        <p className="text-sm text-muted-foreground">
          {technologies.join(", ")} -{" "}
          {capitalize(course.contentBundle?.skillLevel)}
        </p>
        <div className="text-sm text-muted-foreground flex justify-between items-center">
          <div className="flex items-center">
            <Rating
              rating={course.ratings?.averageRating ?? 0}
              size={12}
              filledClassName="text-amber-500"
            />
            <p className="text-muted-foreground">
              ({course.ratings?.numberOfRatings ?? 0})
            </p>
          </div>

          <PriceTag
            originalPrice={course.price!}
            discount={course.id! % 2 === 0}
          />
        </div>
      </CardContent>
    </Card>

    // </BackgroundGradient>
  );
};
export default CourseItem;
