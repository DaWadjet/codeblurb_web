import clsxm from "@/utils/clsxm";
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
      className={clsxm("object-contain", className)}
    />
  );
});

export default Icon;
