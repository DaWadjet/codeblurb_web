import useCodeEditingStore from "@/store/codeEditing";
import clsxm from "@/utils/clsxm";
import { Editor } from "@monaco-editor/react";
import { FC, useCallback, useRef, useState } from "react";

const CodeEditor: FC<{
  initialCode?: string;
  language?: string;
  isReadonly?: boolean;
  className?: string;
}> = ({
  initialCode = "",
  language = "typescript",
  isReadonly = false,
  className,
}) => {
  const editorRef = useRef<unknown>(null);
  const [hasSyntaxErrors, setHasSyntaxErrors] = useState(false);
  const setValue = useCodeEditingStore(
    useCallback((state) => state.setValue, [])
  );
  const runCode = useCodeEditingStore(useCallback((state) => state.run, []));

  const getHint = useCodeEditingStore(
    useCallback((state) => state.getHint, [])
  );

  const canGetMoreHints = useCodeEditingStore(
    useCallback((state) => state.canGetMoreHints, [])
  );

  const handleEditorDidMount = (editor: unknown) => {
    editorRef.current = editor;
  };

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      if(value)
      setValue("code", value);
    },
    [setValue]
  );

  const handleEditorValidation = useCallback((markers: unknown[]) => {
    setHasSyntaxErrors(markers.length !== 0);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Solve the problem</h3>
        <div className="flex gap-2">
          <button
            className="disabled:text-grey-500 rounded-lg bg-gray-300 p-3 shadow-md hover:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100"
            onClick={runCode}
            disabled={hasSyntaxErrors}
          >
            Run code
          </button>
          <button
            className="disabled:text-grey-500 rounded-lg bg-gray-300 p-3 shadow-md hover:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100"
            disabled={!canGetMoreHints}
            onClick={getHint}
          >
            Get Hints
          </button>
        </div>
      </div>
      <div
        className={clsxm(
          "h-[500px] w-[800px] overflow-hidden rounded-lg bg-[#1e1e1e] py-2",
          className
        )}
      >
        <Editor
          className="h-full"
          wrapperProps={{}}
          language={language}
          theme="vs-dark"
          defaultValue={initialCode}
          onChange={handleEditorChange}
          options={{
            readOnly: isReadonly,
            autoIndent: "brackets",
            autoClosingBrackets: "always",
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
          onMount={handleEditorDidMount}
          onValidate={handleEditorValidation}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
