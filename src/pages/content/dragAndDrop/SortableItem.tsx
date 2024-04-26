import { cn } from "@/shadcnutils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC } from "react";

export const SortableItem: FC<{
  id: UniqueIdentifier;
  className?: string;
  value: string;
}> = ({ id, className, value }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex items-center justify-start h-8 w-fit min-w-32 rounded-md border border-input bg-background px-3 text-base ring-offset-background ",
        className,
        isDragging && "ring-2 ring-ring ring-offset-2"
      )}
    >
      {value}
    </li>
  );
};
