import { useTheme } from "@/shadcn/ui/theme-provider";
import { cn } from "@/shadcnutils";
import { Editor } from "@monaco-editor/react";
import { FC } from "react";

const CodeEditor: FC<{
  initialCode: string;
  onCodeChange: (code: string) => void;
  className?: string;
}> = ({ initialCode, onCodeChange, className }) => {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "h-[350px] w-full overflow-hidden rounded-lg  py-2 border-border border",
        theme === "dark" ? "bg-[#1e1e1e]" : "bg-background",
        className
      )}
    >
      <Editor
        className="h-full"
        defaultLanguage="java"
        theme={theme === "dark" ? "vs-dark" : "vs-light"}
        defaultValue={initialCode}
        onChange={(value) => {
          onCodeChange(value ?? "");
        }}
        options={{
          autoIndent: "brackets",
          autoClosingBrackets: "always",
          scrollbar: { vertical: "hidden", horizontal: "hidden" },
          autoClosingQuotes: "always",
          autoClosingOvertype: "always",
          autoClosingDelete: "always",
          fontLigatures: true,
          matchBrackets: "always",
          scrollBeyondLastLine: false,
          bracketPairColorization: {
            enabled: true,
            independentColorPoolPerBracketType: true,
          },
          formatOnPaste: true,
          minimap: { enabled: false },
        }}

        // onValidate={(markers) => {
        //this does not seem to work for anyhing but typescript without a language server attached :(
        //   markers.forEach((marker) =>
        //     console.log("onValidate:", marker.message)
        //   );
        // }}
      />
    </div>
  );
};

export default CodeEditor;
