import useGoToNextContent from "@/hooks/useGoToNextContent";
import { useViewedContent } from "@/hooks/useViewedContent";
import { useCodeQuizSolutionMutation } from "@/network/content";
import { DraggableItem } from "@/pages/content/dragAndDrop/DraggableItem";
import { DropZone } from "@/pages/content/dragAndDrop/Dropzone";
import SolutionItem from "@/pages/content/dragAndDrop/SolutionItem";
import { UnusedItems } from "@/pages/content/dragAndDrop/UnusedItems";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { cn } from "@/shadcnutils";
import { CodeQuizSolutionResponse } from "@/types/exportedApiTypes";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  UniqueIdentifier,
  rectIntersection,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { uniqBy } from "lodash";
import { BadgeInfo, Loader2Icon, Send, WandSparklesIcon } from "lucide-react";
import { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useImmer } from "use-immer";

export interface ItemType {
  id: UniqueIdentifier;
  value: string;
}

const DragAndDropContent: FC = () => {
  const { viewedContent, courseId } = useViewedContent();

  if (
    !viewedContent?.contentType ||
    viewedContent.contentType !== "CODING" ||
    viewedContent.codingContentType !== "DRAG_AND_DROP"
  ) {
    throw new Error(
      "This component should only be used for Drag & Drop content"
    );
  }
  const { goToNextContent, hasNextContent } = useGoToNextContent();

  const dropZones = useMemo(
    () =>
      Array.from(
        { length: viewedContent.codeSkeleton!.length - 1 },
        (_, index) => `dropZone${index}`
      ),
    [viewedContent.codeSnippets]
  );

  const { mutateAsync: submitSolution, isPending } =
    useCodeQuizSolutionMutation({
      courseId,
      contentId: viewedContent.id!,
    });
  const [state, setState] = useImmer<{
    result: CodeQuizSolutionResponse | null;
    amountOfHintsShown: number;
  }>({
    result: null,
    amountOfHintsShown: 0,
  });

  //DnD-related
  const [activeItem, setActiveItem] = useState<ItemType | null>(null);
  const [activeItemOrigin, setActiveItemOrigin] = useState<string | null>(null);
  const [solutions, setSolutions] = useState<{
    [key: string]: ItemType | null;
  }>(Object.fromEntries(dropZones.map((zone) => [zone, null])));

  const codeSnippetItems = useMemo(() => {
    return viewedContent.codeSnippets!.map((value, index) => ({
      id: index + 1,
      value,
    }));
  }, [viewedContent.codeSnippets]);
  const [unusedItems, setUnusedItems] = useState<ItemType[]>(codeSnippetItems);

  useEffect(() => {
    setState((draft) => {
      draft.result = null;
    });
  }, [solutions, setState]);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (
      !over ||
      (over.id in solutions && solutions[over.id]?.id === active.id)
    ) {
      setActiveItem(null);
      setActiveItemOrigin(null);
      return;
    }

    if (over.id in solutions) {
      if (solutions[over.id]) {
        const overItem = { ...solutions[over.id]! };
        setUnusedItems((prev) => [...prev, overItem]);
      }

      if (activeItemOrigin && activeItemOrigin !== "unusedItems") {
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
      if (activeItem !== null) {
        if (activeItemOrigin && activeItemOrigin !== "unusedItems")
          setSolutions((prev) => ({
            ...prev,
            [activeItemOrigin]: null,
          }));
        setUnusedItems((prev) => uniqBy([...prev, activeItem], "id"));
      }
    }

    setActiveItem(null);
    setActiveItemOrigin(null);
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;

    const activeIndex = unusedItems.findIndex((x) => x.id === active.id);
    const overIndex = unusedItems.findIndex((x) => x.id === over.id);
    if (activeIndex === overIndex) return;

    if (activeIndex !== -1 && overIndex !== -1) {
      setUnusedItems((prev) => arrayMove(prev, activeIndex, overIndex));
    }
  };

  const submitResults = useCallback(async () => {
    if (isPending) return;
    const solutionsInOrder = Object.entries(solutions).map(
      ([, value]) => value?.value ?? ""
    );

    const results = await submitSolution({
      codeSolution: {
        solutionsInOrder,
      },
    });
    setState((draft) => {
      draft.result = results;
    });
    if (results.incorrectSolutions?.length) {
      toast.error("Some answers are incorrect");
    } else {
      toast.success("All answers are correct! Good job!");
    }
  }, [solutions, setState, submitSolution, isPending]);

  const passed = useMemo(
    () => !state.result?.incorrectSolutions?.length,
    [state.result?.incorrectSolutions?.length]
  );

  const hints = viewedContent.hints ?? [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-semibold text-3xl ">
        Drag & Drop - {viewedContent.name}
      </h1>
      <Card>
        <CardHeader className="text-xl font-semibold">
          Task Description
        </CardHeader>
        <CardContent>
          {viewedContent.description || viewedContent.shortDescription}
        </CardContent>
      </Card>
      {!!state.amountOfHintsShown && (
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-xl">Hints</h3>
          <div className="grid place-items-center grid-cols-2 gap-4">
            {hints.slice(0, state.amountOfHintsShown).map((hint, index) => (
              <Card key={index} className="flex gap-4 items-center p-4 w-full">
                <WandSparklesIcon className="size-4 shrink-0" />
                <p>{hint}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-4 justify-between items-end">
        <h2 className="text-xl font-semibold">
          Drag the items from below to their places
        </h2>
        <div className="flex gap-2">
          {!!hints.length && (
            <Button
              disabled={state.amountOfHintsShown >= hints.length}
              variant={!passed ? "default" : "outline"}
              onClick={() =>
                setState((draft) => {
                  draft.amountOfHintsShown += 1;
                })
              }
              className="flex font-semibold transition-all"
            >
              <BadgeInfo className="size-4 mr-2" />
              {state.amountOfHintsShown >= hints.length
                ? "No more hints"
                : "Show hint"}
            </Button>
          )}
          <Button onClick={submitResults} className="flex font-semibold">
            {isPending ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="size-4 mr-2" />
            )}
            Submit solution
          </Button>
        </div>
      </div>
      <DndContext
        onDragStart={({ active }) => {
          const solutionValue =
            Object.entries(solutions).find(
              ([, value]) => value?.id === active.id
            ) ?? null;
          if (solutionValue) {
            setActiveItemOrigin(solutionValue[0]);
          } else {
            setActiveItemOrigin("unusedItems");
          }
          setActiveItem(
            codeSnippetItems.find((item) => item.id === active.id) ?? null
          );
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
          <CardContent className="p-6 flex w-full flex-wrap items-start justify-start gap-x-1 gap-y-2 min-h-64 basis-full">
            {viewedContent.codeSkeleton!.map((_, index) => (
              <Fragment key={index}>
                <p className="text-base h-8 flex items-end pb-0.5">
                  {viewedContent.codeSkeleton![index]}
                </p>
                {index < dropZones.length && (
                  <DropZone
                    className={cn(
                      "min-h-8",
                      state.result?.incorrectSolutions?.find(
                        (s) => s.incorrectSolutionIndex === index
                      ) && "border-destructive border-2",
                      state.result?.correctAnswerIndices?.includes(index) &&
                        "border-green-600 border-2"
                    )}
                    id={dropZones[index]}
                  >
                    {solutions[dropZones[index]] ? (
                      <DraggableItem {...solutions[dropZones[index]]!} />
                    ) : (
                      <span className="px-3">...</span>
                    )}
                  </DropZone>
                )}
              </Fragment>
            ))}
          </CardContent>
        </Card>
        <div className="flex flex-col gap-3">
          <h4 className="text-xl font-semibold">Possible Solutions</h4>
          <UnusedItems items={unusedItems} className="p-6 transition-all" />
        </div>

        <DragOverlay>
          {activeItem && <SolutionItem value={activeItem.value} />}
        </DragOverlay>
      </DndContext>
      <div className="flex self-end gap-2 items-center">
        <Button
          className="w-32"
          variant="ghost"
          onClick={() => {
            setSolutions(
              Object.fromEntries(dropZones.map((zone) => [zone, null]))
            );
            setUnusedItems(codeSnippetItems);
            setState((draft) => {
              draft.result = null;
              draft.amountOfHintsShown = 0;
            });
          }}
        >
          Reset Task
        </Button>
        <Button
          variant={passed && state.result ? "default" : "ghost"}
          className="w-32"
          onClick={goToNextContent}
        >
          {hasNextContent ? "Next Section" : "Back To Course"}
        </Button>
      </div>
    </div>
  );
};

export default DragAndDropContent;
