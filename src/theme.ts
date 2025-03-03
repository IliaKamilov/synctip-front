import type { SynctipTheme } from ".";
import { buttonTheme } from "./components/Button/theme";
import { cardTheme } from "./components/Card/theme";
import { dropdownTheme } from "./components/Dropdown/theme";
import {
  moonIconTheme,
  sunIconTheme,
  xMarkIconTheme,
} from "./components/Icon/theme";
import { navbarTheme } from "./components/Navbar/theme";
import { themeToggleTheme } from "./components/ThemeToggle/theme";

export const theme: SynctipTheme = {
  dropdown: dropdownTheme,
  button: buttonTheme,
  navbar: navbarTheme,
  card: cardTheme,
  theme: {
    toggle: themeToggleTheme,
  },
  icon: {
    moon: moonIconTheme,
    sun: sunIconTheme,
    xMark: xMarkIconTheme,
  },
};
