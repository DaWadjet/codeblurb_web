import { cn } from "@/shadcnutils";
import { FC, memo, useMemo } from "react";

const PriceTag: FC<{ originalPrice: number; discount?: boolean }> = memo(
  ({ originalPrice, discount }) => {
    const priceBeforeDiscount = useMemo(
      () => (discount ? Math.round(originalPrice * 1.2) + 9.99 : originalPrice),
      [originalPrice, discount]
    );

    return (
      <div className="flex gap-1.5 items-end">
        <p
          className={cn(
            discount
              ? "line-through text-sm text-muted-foreground"
              : "text-foreground-primary text-base font-semibold"
          )}
        >
          ${priceBeforeDiscount.toFixed(2)}
        </p>
        {!!discount && (
          <p className=" text-base font-semibold text-primary">
            ${originalPrice.toFixed(2)}
          </p>
        )}
      </div>
    );
  }
);

export default PriceTag;
