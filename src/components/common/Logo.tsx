import { TerminalIcon } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

const Logo: FC = () => {
  return (
    <Link
      to="/"
      className="flex gap-1 items-center hover:text-muted-foreground transition-colors duration-200"
    >
      <TerminalIcon className="w-8 h-8" />
      <h1 className="font-semibold tracking-tight leading-none text-xl">
        CodeBlurb
      </h1>
    </Link>
  );
};

export default Logo;
