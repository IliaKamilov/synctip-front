/**
 * @file src\components\Card\Card.tsx
 * @description Card component implementation
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 02/03/2025
 * @license MIT
 * @version 1.0.0
 */

import { mergeDeep } from "@/helpers/merge-deep";
import { getTheme } from "@/store/theme";
import { DeepPartial } from "@/types";
import { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";

export interface SynctipCardTheme {
  root: SynctipCardRootTheme;
}

export interface SynctipCardRootTheme {
  base: string;
}

export interface CardProps extends ComponentProps<"div"> {
  theme?: DeepPartial<SynctipCardTheme>;
}

export const Card: FC<CardProps> = ({
  children,
  className,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(getTheme().card, customTheme);

  return (
    <div className={twMerge(theme.root.base, className)} {...props}>
      {children}
    </div>
  );
};
