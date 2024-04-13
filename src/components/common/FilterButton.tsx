import { cn } from "@/shadcnutils";
import { TOverflow } from "@/utils/types";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { FC, PropsWithChildren, ReactNode, useMemo, useRef } from "react";
import { useClickAway, useEvent, useKeyPressEvent, useToggle } from "react-use";

const FilterButton: FC<
  PropsWithChildren & {
    isBasic?: boolean;
    value: string;
    isDeleteIconActive?: boolean;
    clear?(): void;
    ClosedIconComponent?: ReactNode;
    OpenedIconComponent?: ReactNode;
    title?: string;
    subTitle?: string;
    className?: string;
    shouldRepositionOnOverflow?: boolean;
  }
> = ({
  value,
  ClosedIconComponent,
  OpenedIconComponent,
  title,
  isBasic = true,
  isDeleteIconActive = false,
  clear,
  children,
  subTitle,
  className,
  shouldRepositionOnOverflow = false,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useClickAway(divRef, () => setIsOpen(false));
  useKeyPressEvent("Escape", () => setIsOpen(false));
  useEvent("scroll", () => setIsOpen(false));
  const [isOpen, setIsOpen] = useToggle(false);

  const overflowData = useMemo<{
    overflow: TOverflow;
    overflowedPixels: number;
  }>(() => {
    if (
      !shouldRepositionOnOverflow ||
      divRef.current == null ||
      !isOpen ||
      buttonRef.current == null
    )
      return { overflow: "unspecified", overflowedPixels: 0 };
    const buttonRect = divRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    if (buttonRect.right > viewportWidth) {
      return {
        overflow: "right",
        overflowedPixels:
          -buttonRect.width +
          buttonRef.current.getBoundingClientRect().width +
          20,
      };
    } else {
      return { overflow: "unspecified", overflowedPixels: 0 };
    }
  }, [isOpen, divRef, shouldRepositionOnOverflow]);

  return (
    <div className="relative mb-4 w-fit select-none divide-gray-200 rounded-lg">
      <div
        ref={buttonRef}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex h-12 cursor-pointer flex-row items-center justify-between gap-x-4 rounded-lg border border-gray-200 bg-white py-3 pl-3 pr-5"
      >
        <div className="flex flex-row items-center">
          <div className="flex items-center">
            {title ? (
              <span className={isBasic ? "text-gray-200" : "pr-2 text-black"}>
                {title}
              </span>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="mr-2 flex h-6 w-6 items-center justify-center">
                      {ClosedIconComponent}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{subTitle}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="h-6 w-[1px] bg-gray-200" />
          {isDeleteIconActive ? (
            <div className="ml-2 flex flex-row items-center justify-between py-1">
              <span className="text-base font-bold">{value}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  clear!();
                }}
              >
                <FontAwesomeIcon icon={faTimes} className="ml-2" />
              </button>
            </div>
          ) : (
            <span className="pl-2 text-base font-bold">{value}</span>
          )}
        </div>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>

      {(isOpen || shouldRepositionOnOverflow) && (
        <div
          ref={divRef}
          style={
            isOpen
              ? {
                  transform: `translate(${
                    overflowData.overflowedPixels || -21
                  }px, -69px)`,
                  display: "flex",
                  flexWrap: "wrap",
                }
              : { visibility: "hidden" }
          }
          className="absolute z-[1000] flex flex-col items-start gap-4 rounded-lg border border-gray-200 bg-white p-5 drop-shadow-lg transition-all duration-200"
        >
          <div
            className={
              "flex h-12 cursor-pointer items-center justify-between gap-x-4 rounded-lg border border-blue-500 py-3 pl-3 pr-5 text-blue-500 " +
              (overflowData.overflow === "right" ? "self-end" : "")
            }
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <div className="flex flex-row items-center">
              <div className="flex flex-grow-0 flex-row items-center justify-center">
                {title ? (
                  <span className="pr-2 text-blue-500">{title}</span>
                ) : (
                  <div className="mr-2 flex h-4 w-6 items-center justify-center">
                    {OpenedIconComponent}
                  </div>
                )}
              </div>
              <div className="h-6 w-[1px] bg-gray-200" />
              <div className="ml-2 flex flex-row items-center justify-between rounded-md py-1  text-blue-500">
                <span className="text-base font-bold">{value}</span>
                {isDeleteIconActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clear!();
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} className="ml-2" />
                  </button>
                )}
              </div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          {subTitle && (
            <span className="text-xl font-semibold">{subTitle}</span>
          )}
          <div className={cn("mb-3 w-max", className)}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
