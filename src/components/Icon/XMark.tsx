import { mergeDeep } from "@/helpers/merge-deep";
import { getTheme } from "@/store/theme";
import { DeepPartial } from "@/types";
import { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";

export interface XMarkIconTheme {
  root: XMarkIconRootTheme;
}

export interface XMarkIconRootTheme {
  base: string;
}

interface XMarkIconProps extends ComponentProps<"svg"> {
  theme?: DeepPartial<XMarkIconTheme>;
}

export const XMarkIcon: FC<XMarkIconProps> = ({
  className,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(getTheme().icon.xMark, customTheme);

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
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};

XMarkIcon.displayName = "XMarkIcon";
