import { mergeDeep } from "@/helpers/merge-deep";
import { getTheme } from "@/store/theme";
import { DeepPartial } from "@/types";
import { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";

export interface MoonIconTheme {
  root: MoonIconRootTheme;
}

export interface MoonIconRootTheme {
  base: string;
}

interface MoonIconProps extends ComponentProps<"svg"> {
  theme?: DeepPartial<MoonIconTheme>;
}

export const MoonIcon: FC<MoonIconProps> = ({
  className,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(getTheme().icon.moon, customTheme);

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
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  );
};

MoonIcon.displayName = "MoonIcon";
