"use client";

import { mergeDeep } from "@/helpers/merge-deep";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { getTheme } from "@/store/theme";
import { DeepPartial } from "@/types";
import { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";
import { MoonIcon } from "@/components/Icon/Moon";
import { SunIcon } from "@/components/Icon/Sun";

export interface SynctipThemeToggle {
  root: SynctipThemeToggleRootTheme;
}

export interface SynctipThemeToggleRootTheme {
  base: string;
  icon: string;
}

export interface ThemeToggleProps extends ComponentProps<"button"> {
  theme?: DeepPartial<SynctipThemeToggle>;
}

export const ThemeToggle: FC<ThemeToggleProps> = ({
  className,
  theme: customTheme = {},
  ...props
}) => {
  const isMounted = useIsMounted();
  const { computedMode, toggleMode } = useThemeMode();

  const theme = mergeDeep(getTheme().theme.toggle, customTheme);

  return (
    <button
      type="button"
      className={twMerge(theme.root.base, className)}
      onClick={toggleMode}
      {...props}
    >
      <MoonIcon
        aria-label="Currently dark mode"
        data-active={isMounted && computedMode === "dark"}
        className={twMerge(theme.root.icon, "hidden dark:block")}
      />
      <SunIcon
        aria-label="Currently light mode"
        data-active={isMounted && computedMode === "light"}
        className={twMerge(theme.root.icon, "dark:hidden")}
      />
    </button>
  );
};

ThemeToggle.displayName = "ThemeToggle";
