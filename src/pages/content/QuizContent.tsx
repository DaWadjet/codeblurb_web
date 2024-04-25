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
import { QuizContentResponse } from "@/types/ApiTypes";
import { CircleCheckIcon, XCircleIcon } from "lucide-react";
import { FC, Fragment, useCallback, useMemo, useState } from "react";

const dummyQuiz: QuizContentResponse = {
  questions: [
    {
      id: 1,
      question: "What is the capital of France?",
      answers: ["Paris", "Berlin", "London", "Madrid"],
      solutionIndex: 0,
    },
    {
      id: 2,
      question: "What is the capital of Germany?",
      answers: ["Paris", "Berlin", "London", "Madrid"],
      solutionIndex: 1,
    },
    {
      id: 3,
      question: "What is the capital of the UK?",
      answers: [
        "Paris",
        "Very long answer xddd lorem ipsum dolor sit amet con anectetur nem tudom tovabb",
        "London",
        "Madrid",
      ],
      solutionIndex: 2,
    },
    {
      id: 4,
      question: "What is the capital of Spain?",
      answers: ["Paris", "Berlin", "London", "Madrid"],
      solutionIndex: 3,
    },
    {
      id: 5,
      question: "What is the capital of the UK?",
      answers: [
        "Paris",
        "Very long answer xddd lorem ipsum dolor sit amet con anectetur nem tudom tovabb",
        "London",
        "Madrid",
      ],
      solutionIndex: 2,
    },
    {
      id: 6,
      question: "What is the capital of Spain?",
      answers: ["Paris", "Berlin", "London", "Madrid"],
      solutionIndex: 3,
    },
  ],
  contentType: "QUIZ",
  status: "COMPLETED",
  id: 1,
  name: "Countries and capitals",
};

const QuizContent: FC = () => {
  const { goToNextContent, hasNextContent } = useGoToNextContent();
  const [shownQuestionIndex, setShownQuestionIndex] = useState<
    number | "NOT_STARTED" | "RESULTS"
  >("NOT_STARTED");
  const [answerIndices, setAnswerIndices] = useState<number[]>([]);

  const progress = useMemo(() => {
    if (shownQuestionIndex === "NOT_STARTED") return 0;
    if (shownQuestionIndex === "RESULTS") return 100;
    return (shownQuestionIndex / dummyQuiz.questions!.length) * 100;
  }, [shownQuestionIndex]);

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
      if (questionIndex === dummyQuiz.questions!.length - 1) {
        setShownQuestionIndex("RESULTS");
        //TODO: send answers to backend
      } else {
        setShownQuestionIndex(questionIndex + 1);
      }
    },
    []
  );

  const correctlyAnswered = useMemo(
    () =>
      dummyQuiz.questions!.reduce(
        (acc, question, index) =>
          acc + (answerIndices[index] === question.solutionIndex ? 1 : 0),
        0
      ),
    [answerIndices]
  );
  const hasWrongAnswers = useMemo(
    () => correctlyAnswered !== dummyQuiz.questions!.length,
    [correctlyAnswered]
  );

  return (
    <div className="mx-40 flex flex-col gap-4 min-h-0 h-full justify-start">
      <div className="flex gap-2 items-baseline justify-between">
        <h1 className="font-semibold text-3xl ">Quiz - {dummyQuiz.name}</h1>
        {shownQuestionIndex === "NOT_STARTED" ? (
          <span className="text-muted-foreground">
            {dummyQuiz.questions!.length} questions
          </span>
        ) : shownQuestionIndex === "RESULTS" ? null : (
          <span className="text-muted-foreground">
            Question {shownQuestionIndex + 1} of {dummyQuiz.questions!.length}
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
            <CardContent className="flex flex-col items-start h-full">
              <div className="grow" />
              <Button
                className="self-end"
                onClick={() => setShownQuestionIndex(0)}
              >
                I'm ready!
              </Button>
            </CardContent>
          </>
        )}
        {shownQuestionIndex !== "NOT_STARTED" &&
          shownQuestionIndex !== "RESULTS" && (
            <>
              <CardHeader className="text-2xl font-medium pt-4 pb-2">
                {dummyQuiz.questions![shownQuestionIndex].question}
              </CardHeader>
              <Separator />
              <ScrollArea>
                <CardContent className="flex flex-col h-full justify-between gap-2 py-4 px-3">
                  {dummyQuiz.questions![shownQuestionIndex].answers!.map(
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
        {shownQuestionIndex === "RESULTS" && (
          <>
            <CardHeader className="text-2xl font-medium pb-2 pt-4">
              Results: {correctlyAnswered}/{dummyQuiz.questions!.length}
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
                    {dummyQuiz.questions!.map((question, index) => (
                      <AccordionItem
                        value={question.id!.toString()}
                        key={question.id!.toString()}
                        className=" border-border border rounded-lg py-2.5 px-4"
                      >
                        <AccordionTrigger className="flex gap-2 items-start p-0 border-none">
                          {answerIndices[index] === question.solutionIndex ? (
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
                          <h4 className="font-medium w-full text-left text-lg">
                            {question.question}
                          </h4>
                        </AccordionTrigger>
                        <AccordionContent className="flex justify-between pt-4 pb-1 items-end gap-4 text-muted-foreground  flex-nowrap">
                          <div className="flex flex-col gap-2">
                            <h5 className="text-base text-foreground font-medium">
                              Your answer was
                            </h5>
                            <p>
                              {question.answers![answerIndices[question.id!]]}
                            </p>
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
              shownQuestionIndex === "RESULTS" && hasWrongAnswers
                ? "default"
                : "ghost"
            }
            className="w-32"
            onClick={() => {
              setShownQuestionIndex("NOT_STARTED");
              setAnswerIndices([]);
            }}
          >
            Redo Quiz
          </Button>
        )}
        {shownQuestionIndex === "RESULTS" && (
          <Button
            variant={
              shownQuestionIndex === "RESULTS" && hasWrongAnswers
                ? "ghost"
                : "default"
            }
            className="w-32"
            onClick={goToNextContent}
          >
            {hasNextContent ? "Next Section" : "Back To Course"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizContent;
