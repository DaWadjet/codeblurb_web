import { FC } from "react";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { ItemType } from "@/pages/content/dragAndDrop/DragAndDropContent";
import { SortableItem } from "@/pages/content/dragAndDrop/SortableItem";
import { cn } from "@/shadcnutils";

export const UnusedItems: FC<{
  items: ItemType[];
  className?: string;
}> = ({ items, className }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "unusedItems" });
  return (
    <SortableContext
      items={items.map((item) => item.id)}
      strategy={horizontalListSortingStrategy}
    >
      <ul
        ref={setNodeRef}
        className={cn(
          "list-none flex flex-wrap gap-5 border border-border rounded-md",
          isOver && "ring-1 ring-ring ring-offset-1",
          className
        )}
      >
        {items.map((item) => (
          <div key={item.id}>
            <SortableItem {...item} />
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-muted-foreground">All items are in use!</p>
        )}
      </ul>
    </SortableContext>
  );
};
