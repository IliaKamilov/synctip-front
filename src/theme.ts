import type { SynctipTheme } from ".";
import { cardTheme } from "./components/Card/theme";
import { moonIconTheme, sunIconTheme } from "./components/Icon/theme";
import { themeToggleTheme } from "./components/ThemeToggle/theme";

export const theme: SynctipTheme = {
  card: cardTheme,
  theme: {
    toggle: themeToggleTheme,
  },
  icon: {
    moon: moonIconTheme,
    sun: sunIconTheme,
  },
};
