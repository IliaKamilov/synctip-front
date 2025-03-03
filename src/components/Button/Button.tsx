import { mergeDeep } from "@/helpers/merge-deep";
import { getTheme } from "@/store/theme";
import { DeepPartial } from "@/types";
import { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonTheme {
  base: string;
}

export interface ButtonProps extends ComponentProps<"button"> {
  theme?: DeepPartial<ButtonTheme>;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(getTheme().button, customTheme);

  return (
    <button className={twMerge(theme.base, className)} {...props}>
      {children}
    </button>
  );
};
