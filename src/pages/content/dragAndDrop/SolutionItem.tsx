import { FC, memo } from "react";

const SolutionItem: FC<{ value: string }> = memo(({ value }) => {
  return (
    <div className="flex items-center justify-start h-8 w-fit min-w-32 rounded-md border border-input bg-background px-3 text-base ring-offset-background ring-2 ring-ring ring-offset-2">
      {value}
    </div>
  );
});

export default SolutionItem;
