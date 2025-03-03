import type { SynctipTheme } from ".";
import { avatarTheme } from "./components/Avatar/theme";
import { buttonTheme } from "./components/Button/theme";
import { cardTheme } from "./components/Card/theme";
import { drawerTheme } from "./components/Drawer/theme";
import { dropdownTheme } from "./components/Dropdown/theme";
import {
  Bar2IconTheme,
  chevronTheme,
  moonIconTheme,
  sunIconTheme,
  xMarkIconTheme,
} from "./components/Icon/theme";
import { modalTheme } from "./components/Modal/theme";
import { navbarTheme } from "./components/Navbar/theme";
import { spinnerTheme } from "./components/Spinner/theme";
import { themeToggleTheme } from "./components/ThemeToggle/theme";

export const theme: SynctipTheme = {
  root: {
    main: "",
  },
  spinner: spinnerTheme,
  modal: modalTheme,
  avatar: avatarTheme,
  drawer: drawerTheme,
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
    bar2: Bar2IconTheme,
    chevron: chevronTheme,
  },
};
