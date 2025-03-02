"use client";

import { ThemeMode, useThemeMode } from "@/hooks/use-theme-mode";
import { setThemeMode } from "..";

interface Props {
  mode?: ThemeMode;
}

export function ThemeModeInit({ mode }: Props) {
  if (mode) setThemeMode(mode);

  useThemeMode();

  return null;
}
