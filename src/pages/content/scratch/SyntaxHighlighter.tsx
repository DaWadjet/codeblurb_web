import { cn } from "@/shadcnutils";
import { useMonaco } from "@monaco-editor/react";
import { ElementRef, FC, useEffect, useRef } from "react";

const SyntaxHighlighter: FC<{
  code?: string;
  language?: string;
  className?: string;
}> = ({ code = "", language = "java", className }) => {
  const monaco = useMonaco();
  const codeRef = useRef<ElementRef<"code">>(null);

  useEffect(() => {
    if (monaco?.editor && codeRef.current) {
      monaco.editor
        .colorize(code, language, {
          tabSize: 2,
        })
        .then((html) => (codeRef.current!.innerHTML = html));
    }
  }, [monaco?.editor, code, language]);

  return (
    <code ref={codeRef} className={cn("tracking-tight", className)}></code>
  );
};

export default SyntaxHighlighter;
