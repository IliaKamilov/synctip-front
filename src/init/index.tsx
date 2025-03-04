import { ThemeMode } from "@/hooks/use-theme-mode";
import { CustomSynctipTheme } from "@/components/Synctip";
import { ThemeModeInit } from "./mode";
import { ThemeClientInit } from "./client";
import { ThemeServerInit } from "./server";

interface Props {
  mode?: ThemeMode;
  theme?: CustomSynctipTheme;
}

export const ThemeInit = ({ mode, theme }: Props) => {
  return (
    <>
      <ThemeModeInit mode={mode} />
      <ThemeServerInit theme={theme} />
      <ThemeClientInit theme={theme} />
    </>
  );
};
