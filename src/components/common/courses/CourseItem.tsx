import { ShoppingCart } from "lucide-react";
import { FC, useMemo } from "react";

import PriceTag from "@/components/common/courses/PriceTag";
import useItemsInCart from "@/hooks/useItemsInCart";
import { useAddItemMutation, useDeleteItemMutation } from "@/network/shopping";
import { AspectRatio } from "@/shadcn/ui/aspect-ratio";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Rating } from "@/shadcn/ui/rating";
import { alertDialogAtom } from "@/store/jotaiAtoms";
import { ShoppingItemResponse } from "@/types/exportedApiTypes";
import { useSetAtom } from "jotai";
import capitalize from "lodash/capitalize";
import { Loader2Icon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseItem: FC<{ course: ShoppingItemResponse }> = ({ course }) => {
  const navigate = useNavigate();
  const showAlertDialog = useSetAtom(alertDialogAtom);
  const itemsInCart = useItemsInCart();
  const isAlreadyInCart = useMemo(
    () => itemsInCart.includes(course.id!),
    [itemsInCart, course.id]
  );
  const { mutate: addToCart, isPending: isAddPending } = useAddItemMutation();
  const {
    mutation: { mutate: removeFromCart, isPending: isRemovePending },
  } = useDeleteItemMutation();

  const technologies = ["Java"];

  return (
    <Card
      onClick={() => navigate(`/course/${course.id}`)}
      data-test="course-card"
      className="overflow-clip hover:border-muted-foreground transition-all duration-150 h-full w-full cursor-pointer justify-between flex flex-col"
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={18 / 9}>
          {course.contentBundle?.imageUrl ? (
            <img
              src={course.contentBundle!.imageUrl}
              alt={course.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-accent flex items-center justify-center">
              <p className="text-base text-muted-foreground">
                No image available
              </p>
            </div>
          )}
        </AspectRatio>
        <div className="p-3">
          <CardTitle className="text-xl">{course.title}</CardTitle>
        </div>
        <Button
          variant="outline"
          data-test="cart-toggle-button"
          data-in-cart={isAlreadyInCart}
          className="absolute border-muted size-9 p-2 top-0 right-1.5"
          onClick={(e) => {
            e.stopPropagation();
            if (isAddPending || isRemovePending) return;
            if (isAlreadyInCart) {
              showAlertDialog({
                title: "Remove Item",
                message:
                  "Are you sure you want to remove this item from the cart?",
                onConfirm: () => removeFromCart(course.id!),
              });
            } else {
              addToCart(course.id!);
            }
          }}
        >
          {isAddPending || isRemovePending ? (
            <>
              <Loader2Icon className="text-foreground animate-spin" />
              <span className="sr-only">Loading</span>
            </>
          ) : isAlreadyInCart ? (
            <>
              <X className="text-foreground" />
              <span className="sr-only">Remove from cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="text-foreground" />
              <span className="sr-only">Add to cart</span>
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="p-3 pt-0 flex flex-col gap-0.5">
        <p className="text-sm text-muted-foreground">
          {technologies.join(", ")} -{" "}
          {capitalize(course.contentBundle?.skillLevel)}
        </p>
        <div className="text-sm text-muted-foreground flex justify-between items-center">
          <div className="flex items-center">
            <Rating rating={course.ratings?.averageRating ?? 0} size={12} />
            <p className="text-muted-foreground">
              ({course.ratings?.numberOfRatings ?? 0})
            </p>
          </div>

          <PriceTag originalPrice={course.price!} />
        </div>
      </CardContent>
    </Card>
  );
};
export default CourseItem;
