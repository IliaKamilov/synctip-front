import { mergeDeep } from "@/helpers/merge-deep";
import { getTheme } from "@/store/theme";
import { DeepPartial } from "@/types";
import { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";

export interface ChevronTheme {
  root: ChevronRootTheme;
}

export interface ChevronRootTheme {
  base: string;
}

export interface ChevronProps extends ComponentProps<"svg"> {
  theme?: DeepPartial<ChevronTheme>;
  direction?: "up" | "down" | "left" | "right";
}

export const Chevron: FC<ChevronProps> = ({
  className,
  theme: customTheme = {},
  direction: initDirection = "left",
  ...props
}) => {
  const theme = mergeDeep(getTheme().icon.chevron, customTheme);

  const Path = () => {
    switch (initDirection) {
      case "down":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        );
      case "up":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        );
      case "right":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        );

      default:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        );
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={twMerge(theme.root.base, className)}
      {...props}
    >
      <Path />
    </svg>
  );
};
