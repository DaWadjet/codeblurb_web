import { FC } from "react";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import { ItemType } from "@/pages/content/dragAndDrop/DragAndDropContent";
import { SortableItem } from "@/pages/content/dragAndDrop/SortableItem";
import { cn } from "@/shadcnutils";

export const UnusedItems: FC<{
  items: ItemType[];
  className?: string;
}> = ({ items, className }) => {
  const { setNodeRef } = useDroppable({ id: "unusedItems" });
  return (
    <SortableContext
      items={items.map((item) => item.id)}
      strategy={rectSortingStrategy}
    >
      <ul
        ref={setNodeRef}
        className={cn("px-5 py-2.5 border-border border list-none", className)}
      >
        {items.map((item) => (
          <div key={item.id}>
            <SortableItem {...item} />
          </div>
        ))}
      </ul>
    </SortableContext>
  );
};
