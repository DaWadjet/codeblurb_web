import Rating from "@/components/common/Rating";
import { FC } from "react";

const RatingSection: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-medium">Add your review!</h3>
      <Rating isInteractive />
      <textarea
        className="h-30 w-full resize-none rounded-md border border-gray-300 p-3 text-sm"
        placeholder="Share your opinions here"
      />
      <button className="flex items-center justify-center self-end rounded-lg bg-blue-500 px-4 py-2.5 leading-tight text-white transition-all duration-200 hover:bg-blue-400 hover:shadow-lg">
        Submit Rating
      </button>
    </div>
  );
};

export default RatingSection;
