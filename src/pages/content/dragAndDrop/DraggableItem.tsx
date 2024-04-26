import { cn } from "@/shadcnutils";
import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { FC } from "react";

export const DraggableItem: FC<{
  className?: string;
  id: UniqueIdentifier;
  value: string;
}> = ({ id, className, value }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
  });
  return (
    <div
      ref={setNodeRef}
      className={cn("bg-red-500", className)}
      {...attributes}
      {...listeners}
    >
      {value}
    </div>
  );
};
