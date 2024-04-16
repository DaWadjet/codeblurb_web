import PriceTag from "@/components/Discount";
import CourseItem from "@/components/common/courses/CourseItem";
import CourseList from "@/components/common/courses/CourseList";
import { useDummyData } from "@/hooks/useDummyData";
import { BackgroundGradient } from "@/shadcn/ui/background-gradient";
import { Button } from "@/shadcn/ui/button";
import { Rating } from "@/shadcn/ui/rating";
import { Separator } from "@/shadcn/ui/separator";
import { alertDialogAtom } from "@/store/jotaiAtoms";
import { useSetAtom } from "jotai";
import { X } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

const ShoppingCartPage: FC = () => {
  const items = useDummyData().slice(0, 3);
  const showAlertDialog = useSetAtom(alertDialogAtom);
  const technologies = ["Javascript", "NodeJs"];

  return (
    <div className="flex flex-col gap-7">
      <h1 className="text-3xl font-semibold">Shopping Cart</h1>
      <div className="flex gap-10">
        <div className="flex flex-col gap-5 w-2/3 shrink-0">
          {items.map((item, index) => (
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
                      {technologies.join(", ")}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-baseline leading-none">
                        <div className="font-medium text-foreground flex gap-2 items-center">
                          4.6{" "}
                          <Rating
                            rating={4.6}
                            size={14}
                            filledClassName="text-amber-400"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          from 234 reviews
                        </p>
                      </div>
                      <PriceTag
                        originalPrice={item.price!}
                        discountedPrice={17.99}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="flex flex-col sticky flex-[3] top-24 z-50 -mt-8 h-48 w-full gap-4">
          <h2 className="font-semibold text-2xl">Total Price</h2>
          <div className="flex flex-col gap-3">
            {items.map((item, index) => (
              <div
                key={item.id + "_" + index}
                className="flex justify-between items-center gap-2"
              >
                <p className="text-ellipsis line-clamp-1">{item.title}</p>
                <PriceTag originalPrice={item.price!} discountedPrice={17.99} />
              </div>
            ))}
            <Separator />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Total</p>
            <PriceTag originalPrice={100} discountedPrice={80} />
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
        <CourseList
          items={items.map((item, index) => (
            <CourseItem course={item} key={item.id! + "_" + index} />
          ))}
          autoplay
        />
      </div>
    </div>
  );
};

export default ShoppingCartPage;
