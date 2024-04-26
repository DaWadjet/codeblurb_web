import { cn } from "@/shadcnutils";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { FC, PropsWithChildren } from "react";

export const DropZone: FC<
  { id: UniqueIdentifier; className?: string } & PropsWithChildren
> = ({ children, id, className }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex items-center justify-start h-fit w-fit min-w-32 rounded-md border border-input bg-background text-base ring-offset-background",
        className,
        isOver && "ring-2 ring-ring ring-offset-2"
      )}
    >
      {children}
    </div>
  );
};
