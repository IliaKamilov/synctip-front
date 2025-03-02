import React, { FC } from "react";
import { CustomSynctipTheme } from "./SynctipTheme";

export interface ThemeProps {
  mode?: string;
  theme?: CustomSynctipTheme;
}

export interface SynctipProps {
  children: React.ReactNode;
  theme?: ThemeProps;
}

export const Synctip: FC<SynctipProps> = ({ children }) => {
  return <>{children}</>;
};

Synctip.displayName = "Synctip";
