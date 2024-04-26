import { DraggableItem } from "@/pages/content/dragAndDrop/DraggableItem";
import { DropZone } from "@/pages/content/dragAndDrop/Dropzone";
import { UnusedItems } from "@/pages/content/dragAndDrop/UnusedItems";
import { Card, CardContent } from "@/shadcn/ui/card";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  UniqueIdentifier,
  rectIntersection,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { FC, useState } from "react";

const items: ItemType[] = [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
].map((value, index) => ({ id: index + 1, value }));

const dropZones = [
  "dropZone0",
  "dropZone1",
  "dropZone2",
  "dropZone3",
  "dropZone4",
] as const;

export interface ItemType {
  id: UniqueIdentifier;
  value: string;
}

const DragAndDropContent: FC = () => {
  const [activeItem, setActiveItem] = useState<ItemType | null>(null);
  const [activeItemOrigin, setActiveItemOrigin] = useState<string | null>(null);
  const [solutions, setSolutions] = useState<{
    [key: string]: ItemType | null;
  }>({
    dropZone0: null,
    dropZone1: null,
    dropZone2: null,
    dropZone3: null,
    dropZone4: null,
  });

  const [unusedItems, setUnusedItems] = useState<ItemType[]>(items);

  console.log(activeItem);
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setActiveItem(null);
      setActiveItemOrigin(null);
      return;
    }
    //handle case when there is already an item inside the dropzone
    if (over.id in solutions) {
      //if there is an item in the dropzone, put it back to the unused items
      if (solutions[over.id]) {
        const overItem = { ...solutions[over.id]! };
        setUnusedItems((prev) => [...prev, overItem]);
      }
      //if the active item is already present at another solution, move it
      if (activeItemOrigin) {
        setSolutions((prev) => ({
          ...prev,
          [over.id]: activeItem,
          [activeItemOrigin]: null,
        }));
      } else {
        setSolutions((prev) => ({
          ...prev,
          [over.id]: activeItem,
        }));
      }

      setUnusedItems((prev) => prev.filter((x) => x.id !== active.id));
    } else {
      if (
        activeItem !== null &&
        !unusedItems.find((x) => x.id === activeItem.id)
      )
        setUnusedItems([...unusedItems, activeItem]);
    }

    setActiveItem(null);
    setActiveItemOrigin(null);
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    const active_indx = unusedItems.findIndex((x) => x.id === active.id);

    if (!over) {
      if (activeItemOrigin === null) return;
      if (active_indx === -1) return;
      setUnusedItems(unusedItems.filter((x) => x.id !== active.id));
      return;
    }

    if (over.id !== "unusedItems" && activeItemOrigin !== null) {
      if (active_indx === -1) return;
      setUnusedItems(unusedItems.filter((x) => x.id !== active.id));
      return;
    }

    const over_indx = unusedItems.findIndex((x) => x.id === over.id);

    if (active_indx !== -1 && over_indx !== -1) {
      if (active_indx === over_indx) return;
      setUnusedItems(arrayMove(unusedItems, active_indx, over_indx));
    } else if (
      over.id === "unusedItems" &&
      active_indx === -1 &&
      !!activeItemOrigin
    ) {
      const valueFromSolution = solutions[activeItemOrigin];
      if (!valueFromSolution) return;
      setUnusedItems([...unusedItems, valueFromSolution]);
      setSolutions((prev) => ({
        ...prev,
        [activeItemOrigin]: null,
      }));
    }
  };

  return (
    <div>
      <h1>Drag and drop</h1>
      <DndContext
        onDragStart={({ active }) => {
          console.log(active);
          const solutionValue =
            Object.entries(solutions).find(
              ([, value]) => value?.id === active.id
            ) ?? null;
          if (solutionValue) {
            setActiveItemOrigin(solutionValue[0]);
          } else {
            // setActiveItemOrigin("unusedItems");
          }

          setActiveItem(items.find((item) => item.id === active.id) ?? null);
        }}
        onDragOver={onDragOver}
        onDragCancel={() => {
          setActiveItem(null);
          setActiveItemOrigin(null);
        }}
        onDragEnd={handleDragEnd}
        collisionDetection={rectIntersection}
      >
        <Card>
          <CardContent className="p-6 wrap flex w-full flex-wrap items-start justify-start gap-x-0.5 gap-y-2 min-h-64">
            {items.map((_, index) => (
              <div key={index} className="flex gap-0.5 items-end h-7">
                <span className="text-base">Bonjour{index}</span>
                {index !== items.length - 1 && (
                  <DropZone className="h-10 w-56" id={dropZones[index]}>
                    {solutions[dropZones[index]] ? (
                      <DraggableItem {...solutions[dropZones[index]]!} />
                    ) : (
                      "Drop here"
                    )}
                  </DropZone>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
        <UnusedItems items={unusedItems} className="h-40 w-full bg-amber-500" />

        <DragOverlay>
          {activeItem && (
            <div className="bg-red-500 h-10 w-56">{activeItem.value}</div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default DragAndDropContent;
