import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shadcn/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/ui/pagination";

import useGoToNextContent from "@/hooks/useGoToNextContent";
import { useViewedContent } from "@/hooks/useViewedContent";
import { useQuizSolutionSubmissionMutation } from "@/network/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/ui/accordion";
import { Progress } from "@/shadcn/ui/progress";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Separator } from "@/shadcn/ui/separator";
import { cn } from "@/shadcnutils";
import { QuizSolutionResponse } from "@/types/ApiTypes";
import { CircleCheckIcon, Loader2Icon, Send, XCircleIcon } from "lucide-react";
import { FC, Fragment, useCallback, useMemo, useState } from "react";

const QuizContent: FC = () => {
  const { viewedContent } = useViewedContent();
  if (!viewedContent?.contentType || viewedContent.contentType !== "QUIZ") {
    throw new Error("This component should only be used for quiz content");
  }
  const { mutateAsync: submitQuiz, isPending } =
    useQuizSolutionSubmissionMutation(viewedContent.id!);
  const [solution, setSolution] = useState<QuizSolutionResponse | null>(null);
  const { goToNextContent, hasNextContent } = useGoToNextContent();

  const [shownQuestionIndex, setShownQuestionIndex] = useState<
    number | "NOT_STARTED" | "BEFORE_SUBMIT"
  >("NOT_STARTED");
  const [answerIndices, setAnswerIndices] = useState<number[]>([]);

  const progress = useMemo(() => {
    if (shownQuestionIndex === "NOT_STARTED") return 0;
    if (shownQuestionIndex === "BEFORE_SUBMIT") return 100;
    return (shownQuestionIndex / viewedContent.questions!.length) * 100;
  }, [shownQuestionIndex, viewedContent.questions]);

  const indicesAnswered = useMemo(() => {
    if (shownQuestionIndex === "NOT_STARTED") return [];
    else return answerIndices;
  }, [shownQuestionIndex, answerIndices]);

  const answerQuestion = useCallback(
    ({
      questionIndex,
      answerIndex,
    }: {
      questionIndex: number;
      answerIndex: number;
    }) => {
      setAnswerIndices((prev) => {
        const newIndices = [...prev];
        newIndices[questionIndex] = answerIndex;
        return newIndices;
      });
      if (questionIndex === viewedContent.questions!.length - 1) {
        setShownQuestionIndex("BEFORE_SUBMIT");
      } else {
        setShownQuestionIndex(questionIndex + 1);
      }
    },
    [viewedContent.questions]
  );

  const submitResults = useCallback(async () => {
    const results = await submitQuiz({
      quizSolution: {
        solutions: viewedContent.questions!.map((question, index) => ({
          questionId: question.id!,
          answerIndex: answerIndices[index],
        })),
      },
    });
    setSolution(results!);
  }, [submitQuiz, viewedContent.questions, answerIndices]);

  const correctlyAnswered = useMemo(
    () => solution?.correctAnswerQuestionIds?.length ?? 0,
    [solution]
  );

  return (
    <div className="mx-40 flex flex-col gap-4 min-h-0 h-full justify-start">
      <div className="flex gap-2 items-baseline justify-between">
        <h1 className="font-semibold text-3xl ">Quiz - {viewedContent.name}</h1>
        {shownQuestionIndex === "NOT_STARTED" ? (
          <span className="text-muted-foreground">
            {viewedContent.questions!.length} questions
          </span>
        ) : shownQuestionIndex === "BEFORE_SUBMIT" ? null : (
          <span className="text-muted-foreground">
            Question {shownQuestionIndex + 1} of{" "}
            {viewedContent.questions!.length}
          </span>
        )}
      </div>
      {shownQuestionIndex === "NOT_STARTED" ? (
        <div className="h-4" />
      ) : (
        <Progress value={progress} className="shrink-0 h-3" />
      )}
      <Card className="h-[500px] flex flex-col justify-start">
        {shownQuestionIndex === "NOT_STARTED" && (
          <>
            <CardHeader>
              <h2 className="text-2xl font-medium">Let the quiz begin!</h2>
            </CardHeader>
            <CardContent className="flex flex-col items-start h-full gap-4">
              {!!viewedContent.shortDescription && (
                <p className="text-lg">{viewedContent.shortDescription}</p>
              )}
              <div className="grow" />

              <p className="text-lg text-muted-foreground">
                Answer the following questions to test your knowledge of the
                section.
              </p>

              <Button
                className="self-end mt-6"
                onClick={() => setShownQuestionIndex(0)}
              >
                I'm ready!
              </Button>
            </CardContent>
          </>
        )}
        {shownQuestionIndex !== "NOT_STARTED" &&
          shownQuestionIndex !== "BEFORE_SUBMIT" &&
          !solution && (
            <>
              <CardHeader className="text-2xl font-medium pt-4 pb-2">
                {viewedContent.questions![shownQuestionIndex].question}
              </CardHeader>
              <Separator />
              <ScrollArea>
                <CardContent className="flex flex-col h-full justify-between gap-2 py-4 px-3">
                  {viewedContent.questions![shownQuestionIndex].answers!.map(
                    (answer, index, arr) => (
                      <Fragment key={index}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full font-medium py-6 whitespace-normal text-lg",
                            answerIndices[shownQuestionIndex] === index
                              ? "bg-accent/70 text-accent-foreground"
                              : ""
                          )}
                          onClick={() =>
                            answerQuestion({
                              questionIndex: shownQuestionIndex,
                              answerIndex: index,
                            })
                          }
                        >
                          {answer}
                        </Button>
                        {index < arr.length - 1 && <Separator />}
                      </Fragment>
                    )
                  )}
                </CardContent>
              </ScrollArea>
              <div className="grow" />
              <Separator />
              <CardFooter className="flex flex-col gap-4 w-full items-center p-4">
                <Pagination className="px-20">
                  <PaginationContent className="flex justify-between w-full">
                    {shownQuestionIndex > 0 ? (
                      <PaginationItem className="w-28">
                        <PaginationPrevious
                          onClick={() =>
                            setShownQuestionIndex(shownQuestionIndex - 1)
                          }
                        />
                      </PaginationItem>
                    ) : (
                      <div className="w-28" />
                    )}
                    <div className="flex items-center justify-center gap-1">
                      {indicesAnswered.length < 4
                        ? [...indicesAnswered, "current"].map((_, index) => (
                            <PaginationItem key={index}>
                              <PaginationLink
                                isActive={index === shownQuestionIndex}
                                onClick={() => setShownQuestionIndex(index)}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))
                        : [
                            ...indicesAnswered.slice(0, 2),
                            "ellipsis",
                            ...indicesAnswered.slice(-1),
                            "current",
                          ].map((item, index) => (
                            <PaginationItem key={index}>
                              {item !== "ellipsis" ? (
                                <PaginationLink
                                  isActive={item === "current"}
                                  onClick={() => setShownQuestionIndex(index)}
                                >
                                  {index +
                                    1 +
                                    (shownQuestionIndex >= 4 && index > 2
                                      ? shownQuestionIndex - 4
                                      : 0)}
                                </PaginationLink>
                              ) : (
                                <PaginationEllipsis />
                              )}
                            </PaginationItem>
                          ))}
                    </div>

                    {shownQuestionIndex < answerIndices.length ? (
                      <PaginationItem>
                        <PaginationNext
                          className="w-28"
                          onClick={() =>
                            setShownQuestionIndex(shownQuestionIndex + 1)
                          }
                        />
                      </PaginationItem>
                    ) : (
                      <div className="w-28" />
                    )}
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </>
          )}
        {shownQuestionIndex === "BEFORE_SUBMIT" && !solution && (
          <>
            <CardHeader className="text-2xl font-medium pb-2 pt-4">
              Your Answers
            </CardHeader>
            <Separator />
            <ScrollArea>
              <CardContent className="flex flex-col items-start h-full pt-4">
                <div className="flex flex-col gap-2 w-full">
                  <Accordion
                    type="multiple"
                    className="flex w-full flex-col gap-3"
                  >
                    {viewedContent.questions!.map((question, index) => (
                      <AccordionItem
                        value={question.id!.toString()}
                        key={question.id!.toString()}
                        className=" border-border border rounded-lg py-2.5 px-4"
                      >
                        <AccordionTrigger className="flex gap-2 items-start p-0 border-none">
                          <h4 className="font-medium w-full text-left text-lg">
                            {question.question}
                          </h4>
                        </AccordionTrigger>
                        <AccordionContent className="flex justify-between pt-4 pb-1 items-end gap-4 text-muted-foreground  flex-nowrap">
                          <div className="flex flex-col gap-1">
                            <h5 className="text-base  font-medium">
                              Your answer is
                            </h5>
                            <p className="text-lg text-foreground">
                              {question.answers![answerIndices[index]]}
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </CardContent>
            </ScrollArea>
            <div className="grow" />
            <Separator />
            <CardFooter className="flex justify-end w-full p-4">
              <Button
                onClick={submitResults}
                className="text-base font-semibold"
              >
                {isPending ? (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="size-4 mr-2" />
                )}
                Submit!
              </Button>
            </CardFooter>
          </>
        )}
        {!!solution && (
          <>
            <CardHeader className="text-2xl font-medium pb-2 pt-4">
              Results: {correctlyAnswered}/{viewedContent.questions!.length}
            </CardHeader>
            <Separator />
            <ScrollArea>
              <CardContent className="flex flex-col items-start h-full pt-4">
                <div className="flex flex-col gap-2 w-full">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-3"
                  >
                    {viewedContent.questions!.map((question, index) => (
                      <AccordionItem
                        value={question.id!.toString()}
                        key={question.id!.toString()}
                        className="border-border border rounded-lg py-2.5 px-4"
                      >
                        <div className="flex gap-3 items-start w-full">
                          {solution.correctAnswerQuestionIds?.includes(
                            question.id!
                          ) ? (
                            <CircleCheckIcon
                              size={24}
                              className="text-green-600"
                            />
                          ) : (
                            <XCircleIcon
                              size={24}
                              className="text-destructive"
                            />
                          )}
                          <AccordionTrigger className="p-0 border-none">
                            <h4 className="font-medium text-left text-lg">
                              {question.question}
                            </h4>
                          </AccordionTrigger>
                        </div>

                        <AccordionContent className="flex justify-between pt-4 pb-1 items-end gap-4 text-muted-foreground  flex-nowrap">
                          <div className="flex flex-col gap-1">
                            <h5 className="text-base text-foreground font-medium">
                              Your answer was
                            </h5>
                            <p>{question.answers![answerIndices[index]]}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </CardContent>
            </ScrollArea>
          </>
        )}
      </Card>
      <div className="w-full flex items-center justify-center gap-4">
        {shownQuestionIndex !== "NOT_STARTED" && (
          <Button
            variant={
              solution && solution.incorrectSolutions!.length > 0
                ? "default"
                : "ghost"
            }
            className="w-32"
            onClick={() => {
              setShownQuestionIndex("NOT_STARTED");
              setAnswerIndices([]);
              setSolution(null);
            }}
          >
            Redo Quiz
          </Button>
        )}
        <Button
          variant={!solution?.incorrectSolutions?.length ? "ghost" : "default"}
          className="w-32"
          onClick={goToNextContent}
        >
          {hasNextContent ? "Next Section" : "Back To Course"}
        </Button>
      </div>
    </div>
  );
};

export default QuizContent;
