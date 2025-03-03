import { DeepPartial } from "@/types";
import { SynctipThemeToggle } from "../ThemeToggle";
import { SynctipCardTheme } from "../Card";
import { MoonIconTheme } from "../Icon/Moon";
import { SunIconTheme } from "../Icon/Sun";
import { NavbarTheme } from "../Navbar/Navbar";
import { ButtonTheme } from "../Button/Button";
import { XMarkIconTheme } from "../Icon/XMark";
import { DropdownTheme } from "../Dropdown/Dropdown";
import { Bar2Theme } from "../Icon/Bar2";
import { DrawerTheme } from "../Drawer/Drawer";
import { ChevronTheme } from "../Icon/Chevron";
import { AvatarTheme } from "../Avatar/Avatar";
import { ModalTheme } from "../Modal/Modal";

export type CustomSynctipTheme = DeepPartial<SynctipTheme>;

export interface SynctipTheme {
  root: {
    main: string;
  };
  modal: ModalTheme;
  avatar: AvatarTheme;
  drawer: DrawerTheme;
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
    bar2: Bar2Theme;
    chevron: ChevronTheme;
  };
}
