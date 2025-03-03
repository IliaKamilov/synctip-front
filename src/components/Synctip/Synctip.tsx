import React, { ComponentProps, FC } from "react";
import { CustomSynctipTheme } from "./SynctipTheme";
import { ThemeMode } from "@/hooks/use-theme-mode";
import { ThemeInit } from "@/init";
import { mergeDeep } from "@/helpers/merge-deep";
import { getTheme } from "@/store/theme";
import { twMerge } from "tailwind-merge";

export interface ThemeProps {
  mode?: ThemeMode;
  theme?: CustomSynctipTheme;
}

export interface SynctipProps extends ComponentProps<"div"> {
  children: React.ReactNode;
  theme?: ThemeProps;
}

export const Synctip: FC<SynctipProps> = ({
  children,
  className,
  theme: customTheme = {},
}) => {
  const theme = mergeDeep(getTheme().root, customTheme);
  return (
    <div id="root" className={twMerge(theme.main, className)}>
      <ThemeInit mode={theme?.mode} theme={theme?.theme} />
      {children}
    </div>
  );
};

Synctip.displayName = "Synctip";
