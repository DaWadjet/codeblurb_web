import useGoToNextContent from "@/hooks/useGoToNextContent";
import { Editor } from "@monaco-editor/react";

import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { useTheme } from "@/shadcn/ui/theme-provider";
import { cn } from "@/shadcnutils";
import { CodeSolutionResponse, CodingContentResponse } from "@/types/ApiTypes";
import { Play } from "lucide-react";
import { FC, useCallback, useRef, useState } from "react";

const dummyScratch: CodingContentResponse = {
  id: 1,
  codeSkeleton: [
    `public class Main {
        public static void main(String[] args) {
            // Your code here",
        }
    }`,
  ],
  codeSnippets: [],
  contentType: "CODING",
  codingContentType: "SCRATCH",
  name: "Your First Java Program",
  description:
    'Write a simple Java program that prints "Hello, World!" to the console.',
  status: "NOT_SEEN",
  testCases: [
    {
      expectedOutput: "Hello, World!",
    },
  ],
};

const dummyResults: CodeSolutionResponse = {
  results: [
    {
      actual: "Hello, World!",
      expected: "Hello, World!",
      outcome: "PASSED",
    },
  ],
  overallResult: "ALL_PASSED",
};

const ScratchContent: FC = () => {
  const { goToNextContent, hasNextContent } = useGoToNextContent();
  const { theme } = useTheme();

  const editorRef = useRef<unknown>(null);
  const [code, setCode] = useState<string | undefined>(
    dummyScratch.codeSkeleton![0]
  );

  const handleRunCode = useCallback(() => {
    console.log("Run code", code);
  }, [code]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-semibold text-3xl ">Scratch - {dummyScratch.name}</h1>
      <Card>
        <CardHeader className="text-xl font-semibold">
          Task Description
        </CardHeader>
        <CardContent>{dummyScratch.description}</CardContent>
      </Card>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 justify-between">
          <h2 className="text-xl font-semibold">
            Write your code in the editor below
          </h2>
          <Button onClick={handleRunCode} className="flex gap-2 font-semibold">
            <Play className="size-4" />
            Run Code!
          </Button>
        </div>

        <div
          className={cn(
            "h-[350px] w-full overflow-hidden rounded-lg  py-2 border-border border",
            theme === "dark" ? "bg-[#1e1e1e]" : "bg-background"
          )}
        >
          <Editor
            className="h-full"
            defaultLanguage="java"
            theme={theme === "dark" ? "vs-dark" : "vs-light"}
            defaultValue={dummyScratch.codeSkeleton![0]}
            onChange={(value) => {
              setCode(value);
            }}
            options={{
              // readOnly: isReadonly,
              autoIndent: "brackets",
              autoClosingBrackets: "always",
              scrollbar: { vertical: "hidden", horizontal: "hidden" },
              autoClosingQuotes: "always",
              autoClosingOvertype: "always",
              autoClosingDelete: "always",
              fontLigatures: true,
              matchBrackets: "always",
              bracketPairColorization: {
                enabled: true,
                independentColorPoolPerBracketType: true,
              },
              formatOnPaste: true,
              minimap: { enabled: false },
            }}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
            // onValidate={(markers) => {
            //this does not seem to work for anyhing but typescript without a language server attached :(
            //   markers.forEach((marker) =>
            //     console.log("onValidate:", marker.message)
            //   );
            // }}
          />
        </div>
      </div>
      <Button
        variant={
          dummyResults.overallResult === "ALL_PASSED" ? "default" : "ghost"
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
