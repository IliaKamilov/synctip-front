import { DeepPartial } from "@/types";
import { SynctipThemeToggle } from "../ThemeToggle";
import { SynctipCardTheme } from "../Card";
import { MoonIconTheme } from "../Icon/Moon";
import { SunIconTheme } from "../Icon/Sun";
import { NavbarTheme } from "../Navbar/Navbar";
import { ButtonTheme } from "../Button/Button";
import { XMarkIconTheme } from "../Icon/XMark";
import { DropdownTheme } from "../Dropdown/Dropdown";

export type CustomSynctipTheme = DeepPartial<SynctipTheme>;

export interface SynctipTheme {
  dropdown: DropdownTheme;
  button: ButtonTheme;
  navbar: NavbarTheme;
  card: SynctipCardTheme;
  theme: {
    toggle: SynctipThemeToggle;
  };
  icon: {
    moon: MoonIconTheme;
    sun: SunIconTheme;
    xMark: XMarkIconTheme;
  };
}
