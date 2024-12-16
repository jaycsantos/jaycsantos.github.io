import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cl(...classes: (string | undefined)[]) {
  return twMerge(clsx(classes));
}