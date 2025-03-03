import { mergeDeep } from "@/helpers/merge-deep";
import { getTheme } from "@/store/theme";
import { DeepPartial } from "@/types";
import { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";

export interface Bar2Theme {
  root: Bar2RootTheme;
}

export interface Bar2RootTheme {
  base: string;
}

export interface Bar2Props extends ComponentProps<"svg"> {
  theme?: DeepPartial<Bar2Theme>;
}

export const Bar2: FC<Bar2Props> = ({
  className,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(getTheme().icon.bar2, customTheme);

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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 9h16.5m-16.5 6.75h16.5"
      />
    </svg>
  );
};
