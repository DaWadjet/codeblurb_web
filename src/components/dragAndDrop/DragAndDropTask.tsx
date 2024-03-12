import { reorder } from "@/components/dragAndDrop/reorder";
import { FC, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const DragAndDropTask: FC = () => {
  const [allPossibleNumbers, setAllPossibleNumbers] = useState([1, 2, 3, 4, 5]);
  const [solutionNumbers, setSolutionNumbers] = useState([6, 7, 8, 9, 10]);

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        console.log(destination, source);
        if (!destination) {
          return;
        }

        const current = (
          source.droppableId === "solution"
            ? solutionNumbers
            : allPossibleNumbers
        ).slice();
        const target = current[source.index];

        const next = (
          destination.droppableId === "solution"
            ? solutionNumbers
            : allPossibleNumbers
        ).slice();
        if (source.droppableId === destination.droppableId) {
          const reordered = reorder(current, source.index, destination.index);
          if (source.droppableId === "solution") {
            setSolutionNumbers(reordered);
          } else {
            setAllPossibleNumbers(reordered);
          }
        } else {
          current.splice(source.index, 1);
          next.splice(destination.index, 0, target);
          if (source.droppableId === "all") {
            setSolutionNumbers(next);
            setAllPossibleNumbers(current);
          } else {
            setSolutionNumbers(current);

            setAllPossibleNumbers(next);
          }
        }
      }}
    >
      <div className="w-full bg-amber-200">
        <Droppable
          droppableId={"solution"}
          direction="horizontal"
          isCombineEnabled={false}
        >
          {(dropProvided) => (
            <div {...dropProvided.droppableProps}>
              <div ref={dropProvided.innerRef} className="flex  p-5">
                {solutionNumbers.map((number, index) => (
                  <Draggable
                    shouldRespectForcePress
                    key={number}
                    draggableId={
                      number.toString() + "solution" + index.toString()
                    }
                    index={index}
                  >
                    {(dragProvided) => (
                      <div
                        {...dragProvided.dragHandleProps}
                        {...dragProvided.draggableProps}
                        ref={dragProvided.innerRef}
                      >
                        <div className="h-5 bg-green-500 px-3">{number}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {dropProvided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
        <Droppable
          droppableId={"all"}
          direction="horizontal"
          isCombineEnabled={false}
        >
          {(dropProvided) => (
            <div {...dropProvided.droppableProps}>
              <div ref={dropProvided.innerRef} className="flex p-5">
                {allPossibleNumbers.map((number, index) => (
                  <Draggable
                    key={number}
                    draggableId={number.toString() + "all" + index.toString()}
                    index={index}
                  >
                    {(dragProvided) => (
                      <div
                        {...dragProvided.dragHandleProps}
                        {...dragProvided.draggableProps}
                        ref={dragProvided.innerRef}
                      >
                        <div className="h-5 bg-red-500 px-3">{number}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {dropProvided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
export default DragAndDropTask;
