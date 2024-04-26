import { cn } from "@/shadcnutils";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { FC, PropsWithChildren } from "react";

export const DropZone: FC<
  { id: UniqueIdentifier; className?: string } & PropsWithChildren
> = ({ children, id, className }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={cn("bg-amber-500 h-10", className)}>
      {children}
    </div>
  );
};
