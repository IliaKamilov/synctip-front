import { mergeDeep } from "@/helpers/merge-deep";
import { getTheme } from "@/store/theme";
import { DeepPartial } from "@/types";
import { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";
import { useDropdownContext } from "./DropdownContext";
import { XMarkIcon } from "../Icon/XMark";

export interface DropdownTriggerTheme {
  base: string;
}

export interface DropdownTriggerProps extends ComponentProps<"button"> {
  theme?: DeepPartial<DropdownTriggerTheme>;
}

export const DropdownTrigger: FC<DropdownTriggerProps> = ({
  className,
  theme: customTheme = {},
  ...props
}) => {
  const { open } = useDropdownContext();
  const theme = mergeDeep(getTheme().dropdown.trigger, customTheme);

  return (
    <button className={twMerge(theme.base, className)} {...props}>
      {open ? (
        <XMarkIcon className="size-6" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
      )}
    </button>
  );
};
