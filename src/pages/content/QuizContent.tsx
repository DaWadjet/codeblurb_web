import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcn/ui/breadcrumb";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/ui/pagination";
import { Progress } from "@/shadcn/ui/progress";
import { QuizContentResponse } from "@/types/ApiTypes";
import { FC, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

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
      answers: ["Paris", "Berlin", "London", "Madrid"],
      solutionIndex: 2,
    },
    {
      id: 4,
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
  const { courseId } = useParams<{ courseId: string; contentId: string }>();
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
    if (shownQuestionIndex === "RESULTS") return answerIndices;
    return answerIndices.slice(0, shownQuestionIndex);
  }, [shownQuestionIndex, answerIndices]);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/my-courses">My Courses</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/courses/${courseId}`}>
              TODO get name
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{dummyQuiz.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mx-40 flex flex-col gap-10 min-h-0 justify-stretch">
        <h1 className="font-semibold text-3xl ">Quiz - {dummyQuiz.name}</h1>
        <Progress value={progress} />
        <Card className="min-h-[400px] flex flex-col justify-between">
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
                <CardHeader>
                  <h2 className="text-2xl font-medium">
                    {dummyQuiz.questions![shownQuestionIndex].question}
                  </h2>
                </CardHeader>
                <CardContent className="flex flex-col items-start gap-4 h-full">
                  {dummyQuiz.questions![shownQuestionIndex].answers!.map(
                    (answer, index) => (
                      <Button
                        key={index}
                        className="w-full"
                        onClick={() => {
                          setAnswerIndices([...answerIndices, index]);
                          if (
                            shownQuestionIndex ===
                            dummyQuiz.questions!.length - 1
                          ) {
                            setShownQuestionIndex("RESULTS");
                          } else {
                            setShownQuestionIndex(shownQuestionIndex + 1);
                          }
                        }}
                      >
                        {answer}
                      </Button>
                    )
                  )}
                  <Pagination>
                    <PaginationContent>
                      {shownQuestionIndex > 0 && (
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setShownQuestionIndex(shownQuestionIndex - 1)
                            }
                          />
                        </PaginationItem>
                      )}
                      {indicesAnswered.map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            onClick={() => setShownQuestionIndex(index)}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      {/* <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem> */}

                      {shownQuestionIndex < answerIndices.length && (
                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setShownQuestionIndex(shownQuestionIndex + 1)
                            }
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </CardContent>
              </>
            )}
        </Card>
      </div>
    </>
  );
};

export default QuizContent;
