import useGoToNextContent from "@/hooks/useGoToNextContent";

import CodeEditor from "@/components/CodeEditor";
import { useViewedContent } from "@/hooks/useViewedContent";
import { useScratchSubmitMutation } from "@/network/content";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { CodeExecutionResponse } from "@/types/exportedApiTypes";
import capitalize from "lodash/capitalize";
import {
  BadgeInfo,
  CircleCheckIcon,
  CircleXIcon,
  Loader2Icon,
  Play,
  WandSparklesIcon,
  XCircleIcon,
} from "lucide-react";
import { FC, useCallback } from "react";
import { toast } from "sonner";
import { useImmer } from "use-immer";

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
    result: CodeExecutionResponse | null;
  }>({
    code: viewedContent.codeSkeleton?.join("\n") ?? "",
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
    if (results.outcome !== "PASSED") {
      if (results.compilationErrors)
        toast.error(
          "Your code did not compile! Please fix the errors and try again.",
          { duration: 5000 }
        );
      else {
        toast.error("Your code did not pass all tests. Please try again.");
      }
    } else {
      toast.success("Your code passed all tests! Good job!");
    }
  }, [state.code, setState, submitSolution, isPending]);

  const hints = viewedContent.hints ?? [];

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
              <Card key={index} className="flex gap-4 items-center p-4 w-full">
                <WandSparklesIcon className="size-4 shrink-0" />
                <p>{hint}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!!state.result?.compilationErrors && (
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-xl">Compilation Errors</h3>
          <div className="grid place-items-center grid-cols-2 gap-4">
            <Card className="flex gap-4 items-center p-4 w-full border-destructive">
              <XCircleIcon className="shrink-0 size-6 text-destructive" />
              <p>{state.result?.compilationErrors}</p>
            </Card>
          </div>
        </div>
      )}

      {state.result?.results?.length ? (
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-xl">Test Cases</h3>
          <div className="grid place-items-center grid-cols-3 gap-4">
            {(state.result?.results ?? []).map((result, index) => (
              <Card
                key={result.testCaseId}
                className="flex gap-4 items-start p-4 w-full"
              >
                {result.outcome === "FAILED" ? (
                  <CircleXIcon className="size-5 mt-0.5 shrink-0 text-destructive" />
                ) : (
                  <CircleCheckIcon className="text-green-600 size-5 mt-0.5 shrink-0" />
                )}
                <div className="flex flex-col gap-3 w-full">
                  <h3 className="font-semibold">
                    Test Case {index + 1} - {capitalize(result.outcome)}
                  </h3>
                  <div className="font-medium flex w-full gap-3 text-right items-start justify-between pr-6">
                    <span className="text-muted-foreground text-sm font-normal">
                      Input:
                    </span>
                    {viewedContent.testCases![index].input}
                  </div>
                  <div className="font-medium flex w-full gap-3 text-right items-start justify-between pr-6">
                    <span className="text-muted-foreground text-sm font-normal">
                      Expected:
                    </span>
                    {result.expected}
                  </div>
                  <div className="font-medium flex w-full gap-3 text-right items-start justify-between pr-6">
                    <span className="text-muted-foreground text-sm font-normal">
                      Actual:
                    </span>
                    {result.actual}
                  </div>
                  {!!result.errors && (
                    <div className="font-medium flex w-full gap-3 text-right items-start justify-between pr-6">
                      <span className="text-muted-foreground text-sm font-normal">
                        Errors:
                      </span>
                      {result.errors}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-xl">Test Cases</h3>
          <div className="grid place-items-center grid-cols-3 gap-4">
            {(viewedContent.testCases ?? []).map((testCase, index) => (
              <Card key={index} className="flex gap-4 items-start p-4 w-full">
                <div className="flex flex-col gap-3 w-full">
                  <h3 className="font-semibold">Test Case {index + 1}</h3>
                  <div className="font-medium flex w-full gap-3 text-right items-start justify-between pr-6">
                    <span className="text-muted-foreground text-sm font-normal">
                      Input:
                    </span>
                    {testCase.input}
                  </div>
                  <div className="font-medium flex w-full gap-3 text-right items-start justify-between pr-6">
                    <span className="text-muted-foreground text-sm font-normal">
                      Expected:
                    </span>
                    {testCase.expectedOutput}
                  </div>
                </div>
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
                  state.result?.outcome !== "PASSED" ? "default" : "outline"
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
          initialCode={viewedContent.codeSkeleton!.join("\n")}
          onCodeChange={(value) =>
            setState((draft) => {
              draft.code = value;
            })
          }
        />
      </div>
      <Button
        variant={state.result?.outcome === "PASSED" ? "default" : "ghost"}
        className="w-32 self-end"
        onClick={goToNextContent}
      >
        {hasNextContent ? "Next Section" : "Back To Course"}
      </Button>
    </div>
  );
};

export default ScratchContent;
