"use client";

import { CustomSynctipTheme } from "@/components/Synctip";
import { setTheme } from "../store/theme";

interface Props {
  theme?: CustomSynctipTheme;
}

export function ThemeClientInit({ theme }: Props) {
  setTheme(theme);

  return null;
}
