import useGoToNextContent from "@/hooks/useGoToNextContent";
import { useViewedContent } from "@/hooks/useViewedContent";
import { useCodeQuizSolutionMutation } from "@/network/content";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { Input } from "@/shadcn/ui/input";
import { cn } from "@/shadcnutils";
import { CodeQuizSolutionResponse } from "@/types/ApiTypes";
import { BadgeInfo, Loader2Icon, Send, WandSparklesIcon } from "lucide-react";
import { FC, useCallback, useMemo } from "react";
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

const FillInTheGapsContent: FC = () => {
  const { viewedContent } = useViewedContent();

  if (
    !viewedContent?.contentType ||
    viewedContent.contentType !== "CODING" ||
    viewedContent.codingContentType !== "FILL_THE_GAP"
  ) {
    throw new Error(
      "This component should only be used for Fill In The Gaps content"
    );
  }
  const { goToNextContent, hasNextContent } = useGoToNextContent();
  const { mutateAsync: submitSolution, isPending } =
    useCodeQuizSolutionMutation(viewedContent.id!);

  const [state, setState] = useImmer<{
    result: CodeQuizSolutionResponse | null;
    answers: string[];
    amountOfHintsShown: number;
  }>({
    result: null,
    amountOfHintsShown: 0,
    answers: Array.from(
      { length: viewedContent.codeSkeleton!.length - 1 },
      () => ""
    ),
  });

  const submitResults = useCallback(async () => {
    const results = await submitSolution({
      codeSolution: {
        solutionsInOrder: state.answers,
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
  }, [state.answers, setState, submitSolution]);

  const passed = useMemo(
    () => !state.result?.incorrectSolutions?.length,
    [state.result?.incorrectSolutions?.length]
  );

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-semibold text-3xl ">
        Fill In The Gaps - {viewedContent.name}
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
            Solve the exercise by filling in the gaps
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
        <Card>
          <CardContent className="p-6 wrap flex w-full flex-wrap items-start justify-start gap-x-0.5 gap-y-2 min-h-64">
            {viewedContent.codeSkeleton?.map((text, index) => (
              <div key={index} className="flex gap-0.5 items-end h-7">
                <code className="text-base pb-[1px]">{text}</code>
                {index !== viewedContent.codeSkeleton!.length - 1 && (
                  <Input
                    value={state.answers[index] || ""}
                    onChange={(e) => {
                      setState((draft) => {
                        draft.answers[index] = e.target.value;
                        if (
                          state.result?.incorrectSolutions?.length &&
                          state.result?.incorrectSolutions?.find(
                            (s) => s.incorrectSolutionIndex === index
                          )
                        ) {
                          draft.result!.incorrectSolutions =
                            state.result?.incorrectSolutions?.filter((s) => {
                              return s.incorrectSolutionIndex !== index;
                            });
                        }
                        if (
                          state.result?.correctAnswerIndices?.length &&
                          state.result?.correctAnswerIndices?.includes(index)
                        ) {
                          draft.result!.correctAnswerIndices =
                            draft.result?.correctAnswerIndices?.filter(
                              (i) => i !== index
                            );
                        }
                      });
                    }}
                    style={{
                      minWidth: "96px",
                      maxWidth: "224px",
                      width: state.answers[index]
                        ? `${Math.max(
                            80,
                            Math.min(208, state.answers[index].length * 10.5)
                          )}px`
                        : "96px",
                    }}
                    className={cn(
                      "focus-visible:ring-offset-0 h-7 px-2 font-mono",
                      state.result?.incorrectSolutions?.find(
                        (s) => s.incorrectSolutionIndex === index
                      ) && "border-destructive border-2 focus-visible:ring-0",
                      state.result?.correctAnswerIndices?.includes(index) &&
                        "border-green-600 border-2 focus-visible:ring-0"
                    )}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Button
          variant={passed && state.result ? "default" : "ghost"}
          className="w-32 self-end"
          onClick={goToNextContent}
        >
          {hasNextContent ? "Next Section" : "Back To Course"}
        </Button>
      </div>
    </div>
  );
};

export default FillInTheGapsContent;
