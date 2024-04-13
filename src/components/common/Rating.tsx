import { cn } from "@/shadcnutils";
import { FC, useState } from "react";

const starArray = [1, 2, 3, 4, 5] as const;
const Rating: FC<{
  rating?: number;
  isInteractive?: boolean;
  starSize?: number;
}> = ({ rating: initialRating = 0, isInteractive = false, starSize = 40 }) => {
  const [rating, setRating] = useState(Math.round(initialRating));
  const [hover, setHover] = useState(Math.round(initialRating));
  return (
    <div>
      {starArray.map((index) => (
        <button
          type="button"
          disabled={!isInteractive}
          key={index}
          className={cn(
            "border-none bg-transparent outline-none",
            index <= (hover || rating) ? "text-amber-500" : "text-gray-400"
          )}
          onClick={() => setRating(index)}
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(rating)}
        >
          <span style={{ fontSize: `${starSize}px` }}>&#9733;</span>
        </button>
      ))}
    </div>
  );
};

export default Rating;
