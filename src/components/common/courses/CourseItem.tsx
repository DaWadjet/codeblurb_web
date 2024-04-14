import { ShoppingCart } from "lucide-react";
import { FC } from "react";

import PriceTag from "@/components/Discount";
import { AspectRatio } from "@/shadcn/ui/aspect-ratio";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Ratings } from "@/shadcn/ui/rating";
import { ShoppingItemResponse } from "@/types/ApiTypes";
import { useNavigate } from "react-router-dom";

const CourseItem: FC<{ course: ShoppingItemResponse }> = ({ course }) => {
  const navigate = useNavigate();

  return (
    // <BackgroundGradient
    //   containerClassName="w-full h-full rounded-lg"
    //   className="grow w-full h-full rounded-lg"
    //   effectClassName="rounded-lg overflow-clip opacity-0 blur-sm"
    // >

    <Card
      onClick={() => navigate(`/course/${course.id}`)}
      className="overflow-clip hover:border-card-foreground/40 transition-all duration-150 h-full w-full cursor-pointer justify-between flex flex-col"
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={"https://fireship.io/courses/js/img/featured.webp"}
            alt={course.title}
          />
        </AspectRatio>
        <div className="p-4">
          <CardTitle className="text-2xl">
            {course.title +
              (course.id! % 2 === 0 ? "longer text to see how it fits" : "")}
          </CardTitle>
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
      <CardContent className="p-4 pt-0">
        <div className="text-sm text-muted-foreground flex justify-between items-center">
          <div className="flex items-center">
            <Ratings
              rating={4.3}
              size={12}
              filledClassName="text-amber-500"
              hoverClassName="text-amber-300"
            />
            <p className="text-muted-foreground">(5)</p>
          </div>

          <PriceTag originalPrice={course.price!} discountedPrice={12} />
        </div>
      </CardContent>
    </Card>

    // </BackgroundGradient>
  );
};
export default CourseItem;
