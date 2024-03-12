import LoaderSrc from "@/assets/loader.svg";
import { FC, memo } from "react";

import clsxm from "@/utils/clsxm";
import Icon from "./Icon";

const Loader: FC<{
  styles?: { containerClassName?: string; loaderClassName?: string };
}> = memo(({ styles }) => {
  return (
    <div
      className={clsxm("flex justify-center", styles?.containerClassName)}
      aria-label="Loading..."
      role="status"
      key="loader"
    >
      <Icon
        className={clsxm("h-6 w-6 animate-spin", styles?.loaderClassName)}
        src={LoaderSrc}
      />
    </div>
  );
});

export default Loader;
