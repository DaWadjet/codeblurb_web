import useCourseDetailsMagicQuery from "@/hooks/useCourseDetailsMagicQuery";
import useItemsInCart from "@/hooks/useItemsInCart";
import { useAddItemMutation } from "@/network/shopping";
import RatingSection from "@/pages/courseDetails/RatingSection";
import { BackgroundGradient } from "@/shadcn/ui/background-gradient";
import { Button } from "@/shadcn/ui/button";
import { Progress } from "@/shadcn/ui/progress";
import { Rating } from "@/shadcn/ui/rating";

import { Loader2Icon } from "lucide-react";
import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const CourseDetailsAside: FC = () => {
  const navigate = useNavigate();
  const itemsInCart = useItemsInCart();
  const { mutate: addToCart, isPending } = useAddItemMutation();
  const { course } = useCourseDetailsMagicQuery();

  const isCourseInCart = useMemo(
    () => itemsInCart.some((item) => item === course.id),
    [itemsInCart, course.id]
  );

  const ratingDistribution = useMemo(() => {
    const ratings = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    const totalRatings = course.ratings.ratings?.length ?? 0;
    if (totalRatings === 0) {
      return [];
    }
    course.ratings.ratings?.forEach((rating) => {
      if (rating.rating === undefined) return;

      ratings[rating.rating as keyof typeof ratings] += 1;
    });

    return Object.entries(ratings)
      .map(([rating, count]) => ({
        rating: Number(rating),
        percentage: (count * 100) / totalRatings,
      }))
      .reverse();
  }, [course.ratings]);

  return (
    <aside className="sticky flex-[3] top-10 z-50 mt-2 h-48 w-full flex-col flex gap-10">
      {!course.isPurchased && (
        <BackgroundGradient effectClassName="blur-sm rounded-lg">
          {isCourseInCart ? (
            <Button
              className="w-full h-16 text-2xl font-semibold hover:bg-background"
              variant="outline"
              onClick={() => navigate("/shopping-cart")}
            >
              Checkout
            </Button>
          ) : (
            <Button
              className="w-full h-16 text-2xl font-semibold "
              onClick={() => addToCart(course.id)}
            >
              {isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                " Add To Cart"
              )}
            </Button>
          )}
        </BackgroundGradient>
      )}

      <div className="flex flex-col gap-10">
        {!!course.ratings.numberOfRatings && (
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xl font-medium">Rating Distribution</h3>
            <div className="flex items-end justify-between">
              <h6 className="font-medium text-muted-foreground">
                Course Rating: {(course.ratings.averageRating ?? 0).toFixed(2)}
              </h6>
              <p className="text-sm text-muted-foreground">
                from {course.ratings.numberOfRatings ?? 0} reviews
              </p>
            </div>
            {ratingDistribution.map(({ rating, percentage }) => (
              <div key={rating} className="flex flex-row items-center gap-3">
                <Progress value={percentage} className="h-2" />
                <Rating rating={rating} size={14} />
              </div>
            ))}
          </div>
        )}
        {course.isPurchased && <RatingSection />}
      </div>
    </aside>
  );
};

export default CourseDetailsAside;
