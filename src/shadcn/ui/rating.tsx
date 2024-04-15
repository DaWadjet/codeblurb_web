import { cn } from "@/shadcnutils";
import { Star } from "lucide-react";
import React, { useState } from "react";

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ReactElement;
  filledClassName?: string;
  emptyClassName?: string;
  initialRating?: number;
  hoverClassName?: string;
  onRatingChange?: (rating: number) => void;
}

const Ratings = ({ ...props }: RatingsProps) => {
  const {
    rating,
    totalStars = 5,
    size = 20,
    fill = true,
    Icon = <Star />,
    filledClassName = "text-foreground",
    emptyClassName = "text-muted-foreground",
    hoverClassName = "text-foreground",
    className,
    onRatingChange,
    ...rest
  } = props;

  const [hover, setHover] = useState(0);

  const fullStars = !!onRatingChange && hover > 0 ? hover : Math.floor(rating);

  return (
    <div className={cn("flex items-center", className)} {...rest}>
      {[...Array(fullStars)].map((_, i) =>
        React.cloneElement(Icon, {
          key: i,
          size: size + 4,
          className: cn(
            "px-0.5",
            fill ? "fill-current" : "fill-transparent",
            filledClassName,
            hover >= i + 1 ? hoverClassName : ""
          ),
          onMouseEnter: onRatingChange ? () => setHover(i + 1) : undefined,
          onMouseLeave: onRatingChange ? () => setHover(0) : undefined,
          onClick: onRatingChange ? () => onRatingChange(i + 1) : undefined,
        })
      )}
      {[...Array(totalStars - fullStars)].map((_, i) =>
        React.cloneElement(Icon, {
          key: i + fullStars + 1,
          size: size + 4,
          className: cn(
            "px-0.5",
            emptyClassName,
            hover >= i + fullStars + 1 ? hoverClassName : ""
          ),
          onMouseEnter: onRatingChange
            ? () => setHover(i + fullStars + 1)
            : undefined,
          onMouseLeave: onRatingChange ? () => setHover(0) : undefined,
          onClick: onRatingChange
            ? () => onRatingChange(i + fullStars + 1)
            : undefined,
        })
      )}
    </div>
  );
};
export { Ratings as Rating };
