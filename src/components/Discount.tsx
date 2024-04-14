import { cn } from "@/shadcnutils";
import { FC } from "react";

const PriceTag: FC<{ originalPrice: number; discountedPrice?: number }> = ({
  originalPrice,
  discountedPrice,
}) => {
  return (
    <div className="flex gap-1.5 items-end">
      <p
        className={cn(
          discountedPrice
            ? "line-through text-sm text-muted-foreground"
            : "text-foreground-primary text-base font-semibold"
        )}
      >
        ${originalPrice}
      </p>
      {!!discountedPrice && (
        <p className=" text-base font-semibold text-primary">
          ${discountedPrice}
        </p>
      )}
    </div>
  );
};

export default PriceTag;
