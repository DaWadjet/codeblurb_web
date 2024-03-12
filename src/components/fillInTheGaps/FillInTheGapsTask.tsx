import clsxm from "@/utils/clsxm";
import { FC, Fragment, memo, useCallback } from "react";
import { useImmer } from "use-immer";

const FillInTheGapsTask: FC<{ textParts: string[]; solutions: string[] }> =
  memo(({ textParts, solutions }) => {
    const [answers, setAnswers] = useImmer<{
      [key: number]: {
        answer: string;
        status: "unknown" | "correct" | "incorrect";
      };
    }>({
      ...Array.from({ length: textParts.length - 1 }, () => ({
        answer: "a",
        status: "unknown",
      })),
    });

    const evaluateSolution = useCallback(() => {
      console.log("evaluate", answers);

      setAnswers((draft) => {
        for (const key of Object.keys(answers)) {
          if (answers[+key].answer === solutions[+key]) {
            draft[+key].status = "correct";
          } else {
            draft[+key].status = "incorrect";
          }
        }
      });
    }, [answers, setAnswers, solutions]);

    console.log(answers);

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Fill in the gaps</h3>
          <div className="flex gap-2">
            <button
              className="disabled:text-grey-500 rounded-lg bg-gray-300 p-3 shadow-md hover:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100"
              onClick={evaluateSolution}
              disabled={Object.values(answers).some((answer) => !answer.answer)}
            >
              Evaluate task
            </button>
          </div>
        </div>
        <div className="wrap flex w-full flex-wrap items-center justify-start gap-2">
          {textParts.map((text, index) => (
            <Fragment key={index}>
              <span className="text-base">{text}</span>
              {index !== textParts.length - 1 && (
                <input
                  value={answers[index].answer}
                  className={clsxm(
                    "inline-block h-7 w-24 rounded-md border-2 p-2 focus:border-blue-500",
                    answers[index].status === "incorrect"
                      ? "border-red-600 bg-red-200"
                      : answers[index].status === "correct"
                      ? "border-green-500 bg-green-200"
                      : "border border-gray-600"
                  )}
                  onChange={(e) =>
                    setAnswers((draft) => {
                      draft[index] = {
                        answer: e.target.value,
                        status: "unknown",
                      };
                    })
                  }
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    );
  });

export default FillInTheGapsTask;
