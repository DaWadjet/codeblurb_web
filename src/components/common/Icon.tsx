import { cn } from "@/shadcnutils";
import { FC, memo } from "react";

const Icon: FC<{
  src: string;
  className?: string;
  alt?: string;
  onClick?(): void;
}> = memo(({ src, className, alt, onClick }) => {
  return (
    <img
      onClick={onClick}
      src={src}
      alt={alt ?? "icon"}
      className={cn("object-contain", className)}
    />
  );
});

export default Icon;
