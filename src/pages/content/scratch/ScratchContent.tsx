import useGoToNextContent from "@/hooks/useGoToNextContent";

import CodeEditor from "@/components/CodeEditor";
import { useViewedContent } from "@/hooks/useViewedContent";
import { useScratchSubmitMutation } from "@/network/content";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { CodeSolutionResponse } from "@/types/ApiTypes";
import { BadgeInfo, Loader2Icon, Play, WandSparklesIcon } from "lucide-react";
import { FC, useCallback } from "react";
import { toast } from "sonner";
import { useImmer } from "use-immer";

//TODO replace with response
const hints = [
  "Hello, World!",
  'Use double quotes for strings, like "abc"',

  "It is simpler than you think",
  "Type 'world' without a capital letter",
  "OMG VERY LONG HINT IT WONT FIT IN THE BOX OMG VERY LONG HINT IT WONT FIT IN THE BOX OMG VERY LONG HINT IT WONT FIT IN THE BOX",
];

const ScratchContent: FC = () => {
  const { goToNextContent, hasNextContent } = useGoToNextContent();

  const { viewedContent, courseId } = useViewedContent();
  if (
    !viewedContent?.contentType ||
    viewedContent.contentType !== "CODING" ||
    viewedContent.codingContentType !== "SCRATCH"
  ) {
    throw new Error("This component should only be used for Scratch content");
  }

  const [state, setState] = useImmer<{
    code: string;
    amountOfHintsShown: number;
    result: CodeSolutionResponse | null;
  }>({
    code: viewedContent.codeSkeleton![0],
    result: null,
    amountOfHintsShown: 0,
  });

  const { mutateAsync: submitSolution, isPending } = useScratchSubmitMutation({
    courseId,
    contentId: viewedContent.id!,
  });

  const submitResults = useCallback(async () => {
    if (isPending) return;
    const results = await submitSolution({
      codeSolution: {
        code: state.code,
      },
    });
    setState((draft) => {
      draft.result = results;
    });
    if (results.overallResult !== "ALL_PASSED") {
      toast.error("Your code did not pass all tests. Please try again!");
    } else {
      toast.success("Your code passed all tests! Good job!");
    }
  }, [state.code, setState, submitSolution, isPending]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-semibold text-3xl ">
        Scratch - {viewedContent.name}
      </h1>
      <Card>
        <CardHeader className="text-xl font-semibold">
          Task Description
        </CardHeader>
        <CardContent>{viewedContent.description}</CardContent>
      </Card>
      {!!state.amountOfHintsShown && (
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-xl">Hints</h3>
          <div className="grid place-items-center grid-cols-2 gap-4">
            {hints.slice(0, state.amountOfHintsShown).map((hint, index) => (
              <Card key={index} className="flex gap-2 items-center p-4 w-full">
                <WandSparklesIcon className="size-4 shrink-0" />
                <p>{hint}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 justify-between items-end">
          <h2 className="text-xl font-semibold">
            Write your code in the editor below
          </h2>
          <div className="flex gap-2">
            {!!hints.length && (
              <Button
                disabled={state.amountOfHintsShown >= hints.length}
                variant={
                  state.result?.overallResult !== "ALL_PASSED"
                    ? "default"
                    : "outline"
                }
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
                <Play className="mr-2 h-4 w-4" />
              )}
              Run Code!
            </Button>
          </div>
        </div>

        <CodeEditor
          initialCode={viewedContent.codeSkeleton![0]}
          onCodeChange={(value) =>
            setState((draft) => {
              draft.code = value;
            })
          }
        />
      </div>
      <Button
        variant={
          state.result?.overallResult === "ALL_PASSED" ? "default" : "ghost"
        }
        className="w-32 self-end"
        onClick={goToNextContent}
      >
        {hasNextContent ? "Next Section" : "Back To Course"}
      </Button>
    </div>
  );
};

export default ScratchContent;
