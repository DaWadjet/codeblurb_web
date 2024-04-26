import { cn } from "@/shadcnutils";
import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { FC } from "react";

export const DraggableItem: FC<{
  className?: string;
  id: UniqueIdentifier;
  value: string;
}> = ({ id, className, value }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex items-center justify-start h-8 w-fit min-w-32 rounded-md border border-input bg-background px-3 text-base ring-offset-background ",
        className,
        isDragging && "ring-2 ring-ring ring-offset-2"
      )}
      {...attributes}
      {...listeners}
    >
      {value}
    </div>
  );
};
