import PriceTag from "@/components/PriceTag";
import CourseItem from "@/components/common/courses/CourseItem";
import CourseList from "@/components/common/courses/CourseList";
import {
  useAvailableShoppingItemsQuery,
  useShoppingCartQuery,
} from "@/network/shopping";
import { BackgroundGradient } from "@/shadcn/ui/background-gradient";
import { Button } from "@/shadcn/ui/button";
import { Rating } from "@/shadcn/ui/rating";
import { Separator } from "@/shadcn/ui/separator";
import { alertDialogAtom } from "@/store/jotaiAtoms";
import { useSetAtom } from "jotai";
import capitalize from "lodash/capitalize";
import { Loader2Icon, X } from "lucide-react";
import { FC, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

const ShoppingCartPage: FC = () => {
  const navigate = useNavigate();
  const { data } = useShoppingCartQuery();
  const cartItems = useMemo(() => data?.shoppingItems ?? [], [data]);
  const totalPrice = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price!, 0),
    [cartItems]
  );

  const { data: newData, isPending } = useAvailableShoppingItemsQuery({
    title: "",
    skills: null,
    sort: {
      property: "releaseDate",
      ascending: false,
    },
  });
  const showAlertDialog = useSetAtom(alertDialogAtom);
  const technologies = ["Java"];

  return (
    <div
      className="flex flex-col gap-7"
      style={{ minHeight: "calc(100vh - 140px)" }}
    >
      <h1 className="text-3xl font-semibold">Shopping Cart</h1>
      <div className="flex gap-10 grow">
        <div className="flex flex-col gap-5 w-2/3 shrink-0">
          {cartItems.map((item, index) => (
            <div key={item.id + "_" + index} className="w-full">
              <Separator className="mb-5" />
              <div className="flex gap-4">
                <img
                  src={"https://fireship.io/courses/js/img/featured.webp"}
                  className="object-cover h-36"
                  style={{ aspectRatio: "14/9" }}
                />
                <div className="flex flex-col gap-1 items-stretch justify-between w-full py-1">
                  <div className="flex justify-between gap-2 items-start">
                    <Button variant="link" className="p-0">
                      <Link
                        to={`/course/${item.id}`}
                        className="text-2xl font-semibold"
                      >
                        {item.title}
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="rounded-full size-9 p-0"
                      onClick={() =>
                        showAlertDialog({
                          title: "Remove Item",
                          message:
                            "Are you sure you want to remove this item from the cart?",
                          onConfirm: () => console.log("triggered"),
                        })
                      }
                    >
                      <X size={20} />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">
                      {technologies.join(", ")} -{" "}
                      {capitalize(item.contentBundle?.skillLevel)}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-baseline leading-none">
                        <div className="font-medium text-foreground flex gap-2 items-center">
                          {item.ratings?.averageRating ?? 0}{" "}
                          <Rating
                            rating={item.ratings?.averageRating ?? 0}
                            size={14}
                            filledClassName="text-amber-400"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          from {item.ratings?.numberOfRatings ?? 0} reviews
                        </p>
                      </div>
                      <PriceTag originalPrice={item.price!} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {cartItems.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 my-20">
              <h3 className="text-xl font-semibold">Your cart is empty</h3>
              <span className="text-muted-foreground">
                Check out our collection on the{" "}
                <Button
                  variant="link"
                  className="p-0 text-base"
                  onClick={() => navigate("/explore")}
                >
                  Expore page
                </Button>{" "}
                to find your next course.
              </span>
            </div>
          )}
        </div>
        <aside className="flex flex-col sticky flex-[3] top-24 z-50 -mt-8 h-48 w-full gap-4">
          <h2 className="font-semibold text-2xl">Total Price</h2>
          <div className="flex flex-col gap-3">
            {cartItems.map((item, index) => (
              <div
                key={item.id + "_" + index}
                className="flex justify-between items-center gap-2"
              >
                <p className="text-ellipsis line-clamp-1">{item.title}</p>
                <PriceTag originalPrice={item.price!} />
              </div>
            ))}
            <Separator />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Total</p>
            <PriceTag originalPrice={totalPrice} />
          </div>
          <BackgroundGradient effectClassName="blur-sm rounded-lg">
            <Button
              className="w-full h-14 leadng-none text-2xl font-semibold hover:bg-background"
              variant="outline"
            >
              Checkout
            </Button>
          </BackgroundGradient>
        </aside>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">You Might Also Like</h2>
        {isPending ? (
          <Loader2Icon className="size-24 animate-spin mx-auto my-auto h-72" />
        ) : (
          <CourseList
            items={(newData?.items ?? []).map((item) => (
              <CourseItem course={item!} key={item!.id} />
            ))}
            autoplay
          />
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;
