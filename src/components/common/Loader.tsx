import LoaderSrc from "@/assets/loader.svg";
import { FC } from "react";

import { cn } from "@/shadcnutils";
import Icon from "./Icon";

const Loader: FC<{
  styles?: { containerClassName?: string; loaderClassName?: string };
}> = ({ styles }) => {
  return (
    <div
      className={cn("flex justify-center", styles?.containerClassName)}
      aria-label="Loading..."
      role="status"
      key="loader"
    >
      <Icon
        className={cn("h-6 w-6 animate-spin", styles?.loaderClassName)}
        src={LoaderSrc}
      />
    </div>
  );
};

export default Loader;
