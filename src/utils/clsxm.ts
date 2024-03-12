import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function clsxm(...classes: Array<string | undefined>) {
  return twMerge(clsx(...classes));
}
