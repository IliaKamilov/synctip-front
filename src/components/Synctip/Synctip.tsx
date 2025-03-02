import React, { FC } from "react";
import { CustomSynctipTheme } from "./SynctipTheme";
import { ThemeMode } from "@/hooks/use-theme-mode";
import { ThemeInit } from "@/store/theme/init";

export interface ThemeProps {
  mode?: ThemeMode;
  theme?: CustomSynctipTheme;
}

export interface SynctipProps {
  children: React.ReactNode;
  theme?: ThemeProps;
}

export const Synctip: FC<SynctipProps> = ({ children, theme }) => {
  return (
    <>
      <ThemeInit mode={theme?.mode} theme={theme?.theme} />
      {children}
    </>
  );
};

Synctip.displayName = "Synctip";
