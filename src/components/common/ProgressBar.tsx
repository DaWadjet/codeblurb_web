import { cn } from "@/shadcnutils";
import { FC } from "react";

const ProgressBar: FC<{
  progress: number;
  shouldShowBorder?: boolean;
  className?: string;
}> = ({ shouldShowBorder = false, progress, className }) => {
  return (
    <div
      className={cn(
        "h-1.5 w-full rounded-sm",
        shouldShowBorder ? "border border-blue-900" : "",
        className
      )}
    >
      <div
        className="flex h-full justify-start rounded-sm bg-blue-900"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

export default ProgressBar;
