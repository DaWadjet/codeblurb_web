import { cn } from "@/shadcnutils";
import { Loader2Icon } from "lucide-react";
import { FC, memo } from "react";

const BigLoader: FC<{ className?: string }> = memo(({ className }) => {
  return (
    <Loader2Icon
      className={cn(
        "size-24 animate-spin mx-auto my-auto min-h-[90vh]",
        className
      )}
    />
  );
});

export default BigLoader;
