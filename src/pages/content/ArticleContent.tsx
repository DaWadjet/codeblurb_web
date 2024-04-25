import useGoToNextContent from "@/hooks/useGoToNextContent";
import { Button } from "@/shadcn/ui/button";
import { cn } from "@/shadcnutils";
import "github-markdown-css";
import { FC, useCallback } from "react";
import Markdown from "react-markdown";
import { useEffectOnce } from "react-use";
import remarkGfm from "remark-gfm";

const markdown = `
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level \`parserOptions\` property like this:

\`\`\`javascript
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
\`\`\`

- Replace \`plugin:@typescript-eslint/recommended\` to \`plugin:@typescript-eslint/recommended-type-checked\` or \`plugin:@typescript-eslint/strict-type-checked\`
- Optionally add \`plugin:@typescript-eslint/stylistic-type-checked\`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add \`plugin:react/recommended\` & \`plugin:react/jsx-runtime\` to the \`extends\` list
`;

const ArticleContent: FC = () => {
  const { goToNextContent, hasNextContent } = useGoToNextContent();
  useEffectOnce(() => {
    console.log("seen");
    //call seen
  });

  const onCompleted = useCallback(() => {
    console.log("set completed");
    goToNextContent();
  }, [goToNextContent]);

  return (
    <div className="flex flex-col gap-10">
      <div className={cn("markdown-body", "bg-background text-foreground")}>
        <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
          {markdown}
        </Markdown>
      </div>
      <Button className="w-32 self-end" onClick={onCompleted}>
        {hasNextContent ? "Next Section" : "Back To Course"}
      </Button>
    </div>
  );
};

export default ArticleContent;
